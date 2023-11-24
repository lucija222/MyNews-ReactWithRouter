import { memo } from "react";
import NytApiUrl from "../../mainComponents/apiUrl/NytApiUrl";

const Technology = () => {
    const mainUrl = "https://api.nytimes.com/svc/news/v3/content/nyt/technology.json";

    return (
        <NytApiUrl mainUrl={mainUrl} isCategoryData={true} />
    );
};

export default memo(Technology);