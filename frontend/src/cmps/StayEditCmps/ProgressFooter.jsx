import React from 'react'

export function ProgressFooter({ editStage, setEditStage, onSaveStay, stay }) {

    const progressBarWidth = editStage * 7.7 + '%'

    function isNextBtnDisabled() {
        switch (editStage) {
            case 2:
                return !stay.placeType
            case 3:
                return !stay.propertyType
            case 4:
                return !stay.loc.country || !stay.loc.address || !stay.loc.city
            case 5:
                return stay.capacity < 1 || stay.bathrooms < 1 || stay.sumOfBeds < 1 || stay.baths < 1
            case 9:
                return !stay.summary
            case 10:
                return !stay.desc
            case 12:
                return stay.price < 1
            default:
                return false
        }
    }

    return (
        <section className="progress-footer">
            <button
                onClick={() => {
                    if (editStage > 1) {
                        setEditStage(prevStage => prevStage - 1)
                    }
                }}
                className={`back-btn ${editStage === 1 ? 'disabled' : ''}`}
                disabled={editStage === 1}
            >
                Back
            </button>

            <div>
                {editStage < 13 && (
                    <div
                        onClick={() => {
                            if (!isNextBtnDisabled()) {
                                setEditStage(prevStage => prevStage + 1)
                            }
                        }}
                        className={`next-btn ${isNextBtnDisabled() ? 'disabled' : ''}`}
                    >
                        Next
                    </div>
                )}

                {editStage >= 13 && (
                    <div onClick={onSaveStay} className="Publish-btn">
                        Publish
                    </div>
                )}
            </div>

            <div className="progress-bar-background"></div>

            <div className="progress-bar-filling" style={{ width: progressBarWidth }}></div>
        </section>
    )
}
