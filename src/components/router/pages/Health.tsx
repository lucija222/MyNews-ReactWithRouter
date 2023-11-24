import { memo } from "react";
import NytApiUrl from "../../mainComponents/apiUrl/NytApiUrl";

const Health = () => {
    const mainUrl = "https://api.nytimes.com/svc/news/v3/content/nyt/health.json";

    return (
        <NytApiUrl mainUrl={mainUrl} isCategoryData={true}/>
    );
};

export default memo(Health);