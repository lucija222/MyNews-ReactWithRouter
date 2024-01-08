import NytApiUrl from "../../mainComponents/apiUrl/NytApiUrl";

const Home = () => {
    const mainUrl = "https://api.nytimes.com/svc/news/v3/content/nyt/homepage.json";

    return (
        <NytApiUrl mainUrl={mainUrl} isCategoryData={true}/>
    );
};

export default Home;