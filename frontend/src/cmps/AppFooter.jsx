export function AppFooter() {

    const navigateTo = (url) => {
        window.open(url, '_blank')
    }
    
    return <section className="app-footer-container">
        <div className="app-footer">

            <div className="options">
                © 2024 Staybnb, Inc.
                <div>·</div>
                <span>TermsSitemap</span>
                ·
                <span>Privacy</span>
                ·
                <span>Your Privacy Choices</span>
            </div>

            <div className="media">
                <span> English (US)</span>
                <span>$ USD</span>

                <div className="share">
                    <div className="facebook" onClick={() => navigateTo("https://www.facebook.com/airbnb/")}></div>
                    <div className="twitter" onClick={() => navigateTo("https://twitter.com/airbnb")}></div>
                    <div className="instagram" onClick={() => navigateTo("https://www.instagram.com/airbnb/")}></div>
                </div>
            </div>

        </div>
    </section>
}