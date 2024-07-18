import { dbService } from '../../services/db.service.js'
import { logger } from '../../services/logger.service.js'
import { utilService } from '../../services/util.service.js'
import mongodb from 'mongodb'
const { ObjectId } = mongodb

const PAGE_SIZE = 3


async function query(filterBy) {
    console.log("🚀 ~ query ~ filterBy:", filterBy)
    try {
        const criteria = {}

        if (filterBy.priceRange.min && filterBy.priceRange.max < Infinity) {
            criteria.price = {
                $gte: +filterBy.priceRange.min,
                $lte: +filterBy.priceRange.max
            }
        }

        if (filterBy.guestCount.adults > 1 || filterBy.guestCount.children) {
            const filterCapacity = parseInt(filterBy.guestCount.adults || 0) + parseInt(filterBy.guestCount.children || 0);
            criteria.capacity = { $gte: filterCapacity };
        }

        if (+filterBy.guestCount.pets) {
            criteria.amenities = { $in: ['pets allowed', 'Pets are welcome', 'Allows pets on property', 'Allows pets as host'] };
        }

        if (+filterBy.guestCount.infants) {
            criteria.amenities = { $in: ['Crib'] };
        }


        if (filterBy.amenities && filterBy.amenities.length > 0) {
            const formattedAmenities = filterBy.amenities.map(amenity => {
                return amenity.replace(/_/g, ' ').replace(/^\w/, c => c.toUpperCase());
            });
            criteria.amenities = { $all: formattedAmenities };
        }

        if (filterBy.label) {
            const formattedLabel = filterBy.label[0].replace(/_/g, ' ').replace(/^\w/, c => c.toUpperCase());
            criteria.labels = { $in: [formattedLabel] };
        }

        if (filterBy.entryDate && filterBy.exitDate) {
            criteria.$or = [
                {
                    bookedDates: {
                        $not: {
                            $elemMatch: {
                                $and: [
                                    { entryDate: { $lt: +filterBy.exitDate } },
                                    { exitDate: { $gt: +filterBy.entryDate } }
                                ]
                            }
                        }
                    }
                },
                { bookedDates: { $exists: false } }
            ]
        }

        if (filterBy.bathrooms !== 'any') {
            criteria.bathrooms = { $gte: +filterBy.bathrooms };
        }

        if (filterBy.beds !== 'any') {
            criteria.sumOfBeds = { $gte: +filterBy.beds };
        }

        if (filterBy.placeType === "entire home") {
            criteria.placeType = "An entire home";
        } else if (filterBy.placeType === "room") {
            criteria.placeType = "Room";
        }
        // if (filterBy.bedrooms !== 'any') {
        //     const requiredBedrooms = parseInt(filterBy.bedrooms);
        //     criteria.bedroomsCount = { $gte: +requiredBedrooms };
        // }

 
        if (filterBy.propType && filterBy.propType.length > 0) {
            const capitalizedTypes = filterBy.propType.map(type => type.charAt(0).toUpperCase() + type.slice(1));
            criteria.propertyType = { $in: capitalizedTypes }
        }

        logger.info(criteria)
        const collection = await dbService.getCollection('stay')
        const stayCursor = await collection.find(criteria).limit(+filterBy.pagination)
        const stays = await stayCursor.toArray()
        return stays
    } catch (err) {
        logger.error('cannot find stays', err)
        throw err
    }
}

async function getById(stayId) {
    try {
        const collection = await dbService.getCollection('stay')
        // console.log(collection);
        const stay = collection.findOne({ _id: new ObjectId(stayId) })
        return stay
    } catch (err) {
        logger.error(`while finding stay ${stayId}`, err)
        throw err
    }
}

async function remove(stayId) {
    try {
        const collection = await dbService.getCollection('stay')
        await collection.deleteOne({ _id: new ObjectId(stayId) })
        return stayId
    } catch (err) {
        logger.error(`cannot remove stay ${stayId}`, err)
        throw err
    }
}

async function add(stay) {
    try {
        const collection = await dbService.getCollection('stay')
        await collection.insertOne(stay)
        return stay
    } catch (err) {
        logger.error('cannot insert stay', err)
        throw err
    }
}

async function update(stay) {
    try {
        const stayToSave = {
            vendor: stay.vendor,
            price: stay.price
        }
        const collection = await dbService.getCollection('stay')
        await collection.updateOne({ _id: new ObjectId(stay._id) }, { $set: stayToSave })
        return stay
    } catch (err) {
        logger.error(`cannot update stay ${stayId}`, err)
        throw err
    }
}

async function addStayMsg(stayId, msg) {
    try {
        msg.id = utilService.makeId()
        const collection = await dbService.getCollection('stay')
        await collection.updateOne({ _id: new ObjectId(stayId) }, { $push: { msgs: msg } })
        return msg
    } catch (err) {
        logger.error(`cannot add stay msg ${stayId}`, err)
        throw err
    }
}

async function removeStayMsg(stayId, msgId) {
    try {
        const collection = await dbService.getCollection('stay')
        await collection.updateOne({ _id: new ObjectId(stayId) }, { $pull: { msgs: { id: msgId } } })
        return msgId
    } catch (err) {
        logger.error(`cannot add stay msg ${stayId}`, err)
        throw err
    }
}

export const stayService = {
    remove,
    query,
    getById,
    add,
    update,
    addStayMsg,
    removeStayMsg
}
