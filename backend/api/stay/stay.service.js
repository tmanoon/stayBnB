import { dbService } from '../../services/db.service.js'
import { logger } from '../../services/logger.service.js'
import { utilService } from '../../services/util.service.js'
import mongodb from 'mongodb'
const { ObjectId } = mongodb

async function query(filterBy) {
    console.log("🚀 ~ query ~ filterBy:", filterBy)
    try {
        const criteria = {}

        if (filterBy.priceRange.min && filterBy.priceRange.max < Infinity) criteria.price = { $gte: +filterBy.priceRange.min, $lte: +filterBy.priceRange.max }

        if (+filterBy.guestCount.adults > 1 || +filterBy.guestCount.children) {
            const filterCapacity = parseInt(filterBy.guestCount.adults || 0) + parseInt(filterBy.guestCount.children || 0)
            criteria.capacity = { $gte: filterCapacity }
        }

        if (+filterBy.guestCount.pets) {
            criteria.amenities = { $in: ['pets allowed', 'Pets are welcome', 'Allows pets on property', 'Allows pets as host'] }
        }

        if (filterBy.amenities && filterBy.amenities.length > 0) {
            criteria.amenities = { $all: filterBy.guestCount.infants ? [...filterBy.amenities, 'crib'] : filterBy.amenities }
        }

        if (filterBy.accessibility && filterBy.accessibility.length > 0) criteria.accessibility = { $all: filterBy.accessibility }

        if (filterBy.label) criteria.labels = { $in: [filterBy.label] }

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

        if (filterBy.bookingOpts.instant === 'true' || filterBy.bookingOpts.selfCheckIn === 'true' || Boolean(filterBy.bookingOpts.allowsPets === 'true')) {
            criteria.$and = []
            if (filterBy.bookingOpts.instant === 'true') criteria.$and.push({ "bookingOpts.instant": true })
            if (filterBy.bookingOpts.selfCheckIn === 'true') criteria.$and.push({ "bookingOpts.selfCheckIn": true })
            if (filterBy.bookingOpts.allowsPets === 'true') criteria.$and.push({ "bookingOpts.allowsPets": true })
        }

        if (filterBy.bbb.bedrooms !== 'any' || filterBy.bbb.beds !== 'any' || filterBy.bbb.bathrooms !== 'any') {
            if (filterBy.bbb.bedrooms !== 'any') criteria['bbb.numOfBedrooms'] = { $gte: +(filterBy.bbb.bedrooms.replace('+', '')) }
            if (filterBy.bbb.beds !== 'any') criteria['bbb.beds'] = { $gte: +(filterBy.bbb.beds.replace('+', '')) }
            if (filterBy.bbb.bathrooms !== 'any') criteria['bbb.bathrooms'] = { $gte: +(filterBy.bbb.bathrooms.replace('+', '')) }
        }

        if (filterBy.placeType !== 'any') criteria.placeType = filterBy.placeType === 'house' ? 'house' : 'room'

        if (filterBy.propType && filterBy.propType.length) criteria.propertyType = { $in: filterBy.propType }

        if (filterBy.hostLngs && filterBy.hostLngs.length) criteria.hostLngs = { $all: filterBy.hostLngs }

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
        const stayToSave = { ...stay }
        delete stayToSave._id
        const collection = await dbService.getCollection('stay')
        await collection.updateOne({ _id: new ObjectId(stay._id) }, { $set: stayToSave })
        return stayToSave
    } catch (err) {
        logger.error(`cannot update stay ${stay._id}`, err)
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
    removeStayMsg,
}
