import { memo } from "react";
import NytApiUrl from "../../mainComponents/apiUrl/NytApiUrl";

const Sports = () => {
    const mainUrl = "https://api.nytimes.com/svc/news/v3/content/nyt/sports.json";

    return (
        <NytApiUrl mainUrl={mainUrl} isCategoryData={true} />
    );
};

export default memo(Sports); 