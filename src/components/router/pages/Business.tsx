import { memo } from "react";
import NytApiUrl from "../../mainComponents/apiUrl/NytApiUrl";

const Business = () => {

    const mainUrl = "https://api.nytimes.com/svc/news/v3/content/nyt/business.json"

    return (
        <NytApiUrl mainUrl={mainUrl} isCategoryData={true} />
    );
};

export default memo(Business);