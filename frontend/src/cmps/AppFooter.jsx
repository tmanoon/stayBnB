export function AppFooter() {

    const navigateTo = url => {
        window.open(url, '_blank')
    }

    return (
        <section className="footer grid">
            <div className="credits-and-links grid">
                <p className="credits">© 2024 Staybnb, Inc.<span>·</span></p>
                <div className="links flex">
                    <p>Terms</p>
                    <span>·</span>
                    <p>Sitemap</p>
                    <span>·</span>
                    <p>Privacy</p>
                </div>
            </div>
            <div className="locale flex">
                <span>English (US)</span>
                <span>$USD</span>
            </div>
            <div className="social grid">
                <span className="facebook flex center" onClick={() => navigateTo("https://www.facebook.com/airbnb/")}></span>
                <span className="twitter flex center" onClick={() => navigateTo("https://twitter.com/airbnb")}></span>
                <span className="instagram flex center" onClick={() => navigateTo("https://www.instagram.com/airbnb/")}></span>
            </div>
        </section>
    )
}