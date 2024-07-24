export function AddPhoneModal({onModal, userOrderDetails, onUserOrderDetails}) {
    return <>
        <div className='overlay' onClick={() => onModal(null)}></div>

        <div className='phone-modal flex column'>
            <header className='flex center'>
                <button onClick={() => onModal(null)} className='close-btn'></button>
                <h2>Add phone number</h2>
            </header>

            <main>
                <p>We’ll send you trip updates and a text to verify this number.</p>
                <input type='tel' name="phone" value={userOrderDetails.phone || "054-782-1812"} placeholder="Phone number" pattern="\d{3}-\d{3}-\d{4}" onChange={onUserOrderDetails} />
                <p>We'll text you a code to confirm your number. Standard message and data rates apply.</p>
                <button className='add-btn' onClick={() => onModal(null)}>Continue</button>
            </main>
        </div>
    </>
}