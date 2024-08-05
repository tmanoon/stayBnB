import React from 'react'

export function ProgressFooter({ editStage, setEditStage, onSaveStay, stay }) {

    const progressBarWidth = editStage * 6.25 + '%'

    function isNextBtnDisabled() {
        switch (editStage) {
            case 2:
                return !stay.propertyType
            case 3:
                return !stay.placeType
            case 4:
                return !stay.loc.country || !stay.loc.address || !stay.loc.city
            case 5:
                return stay.capacity < 1 || stay.bbb.bathrooms < 1 || stay.bbb.beds < 1
            case 9:
                return !stay.name
            case 11:
                return !stay.summary
            case 15:
                return stay.price < 1
            default:
                return false
        }
    }

    return (
        <section className="progress-footer">
            <button
                onClick={() => { if (editStage > 0) { setEditStage(prevStage => prevStage - 1) } }}
                className={`back-btn ${editStage === 0 ? 'disabled' : ''}`}
                disabled={editStage === 0}
            >Back</button>

            <div className='continue-btns'>
                {editStage <= 0 && <button onClick={() => { if (!isNextBtnDisabled()) { setEditStage(prevStage => prevStage + 1) } }} className={`start-btn ${isNextBtnDisabled() ? 'disabled' : ''}`}>Get Started</button>}
                {editStage < 16 && editStage > 0 && <button onClick={() => { if (!isNextBtnDisabled()) { setEditStage(prevStage => prevStage + 1) } }} className={`next-btn ${isNextBtnDisabled() ? 'disabled' : ''}`}>Next</button>}
                {editStage >= 16 && <button onClick={onSaveStay} className="Publish-btn">Publish</button>}
            </div>

            <div className="progress-bar-background"></div>

            <div className="progress-bar-filling" style={{ width: progressBarWidth }}></div>
        </section>
    )
}
