export function GalleryModal({ stay, setGalleryModal }) {

    function leaveModal() {
        setGalleryModal(false)
    }

    return <>
        <div className="overlay" onClick={leaveModal}></div>

        <section className="gallery-modal">
            <header className="flex center">
                <button className='back-btn' onClick={leaveModal}></button>
                <h1>{stay.name} Galley</h1>
            </header>

            <main className="grid">
                {stay.imgUrls.map((url, idx) => <img key={idx} src={url} className={`img-${idx}`} />)}
            </main>
        </section>
    </>
}