import NytApiUrl from "../../mainComponents/apiUrl/NytApiUrl";

const Science = () => {
    const mainUrl = "https://api.nytimes.com/svc/news/v3/content/nyt/science.json";

    return (
        <NytApiUrl mainUrl={mainUrl} isCategoryData={true} />
    );
};

export default Science;