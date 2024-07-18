import { stayService } from "../services/stay.service"
import { utilService } from "../services/util.service"

export function StayPreview({ stay, filterBy }) {
    

    return <article className="stay-preview">
        <img src={stay.imgUrls[0]}/>
        
        {!filterBy.loc.city && <h1>{stay.loc.city}, {stay.loc.country}</h1>}
        {filterBy.loc.city && <h1>{stay.loc.address.split(', ')[0]}</h1>}

        {!filterBy.loc.city && <p className="grayTxt">{stayService.generateRandomDistance(stay) + " kilometers away"}</p>}
        {filterBy.loc.city && <p className="grayTxt">{stay.summary.length > 34 ? stay.summary.substring(0, 35) + '...' : stay.summary}</p>}

        {!filterBy.entryDate &&  <p className="grayTxt">{stayService.generateRandomDate(+stay.price)}</p>}

        {!filterBy.entryDate && <p><span className="boldTxt"><span className="moneySgn">$</span>{stay.price.toLocaleString()}</span> night</p>}
        {filterBy.entryDate && <p><span className="boldTxt"><span className="moneySgn">$</span>{stay.price.toLocaleString()}</span> night • <span className="grayTxt underline"><span className="moneySgn">$</span>{(stayService.getNumberOfNights(filterBy) * stay.price).toLocaleString()} total</span></p>}
    </article>
}