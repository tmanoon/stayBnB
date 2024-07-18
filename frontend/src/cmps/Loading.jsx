export function Loading({ currentPage }) {

    function determinePage(currentPage) {

        switch (currentPage) {
            case 'details':
                return 'details-page';
            case 'dashBoard':
                return 'dashBoard-page';
            case 'payment':
                return 'payment-page';

            default:
                return '';
        }

    }
    const pageClass = determinePage(currentPage)


    return (
        <section className={`loading ${pageClass}`}>
            <img src="https://res.cloudinary.com/db7t5amdv/image/upload/v1713428937/staybnbLoading_mp3gqo.gif" alt="" />
        </section>
    );
}