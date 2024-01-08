import NewsApiUrl from "../../mainComponents/apiUrl/NewsApiUrl";

const SearchResults = () => {
    const mainUrl = "https://newsapi.org/v2/everything";

    return (
        <NewsApiUrl mainUrl={mainUrl} isCategoryData={true} />
    );
};

export default SearchResults; 