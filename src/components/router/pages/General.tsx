import NytApiUrl from "../../mainComponents/apiUrl/NytApiUrl";

const General = () => {
    const mainUrl = "https://api.nytimes.com/svc/news/v3/content/nyt/world.json";

    return (
        <NytApiUrl mainUrl={mainUrl} isCategoryData={true} />
    );
};

export default General;