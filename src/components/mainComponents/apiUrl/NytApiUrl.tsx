import FetchData from "../FetchData";
import { useParams } from "react-router-dom";
import { useState, useEffect, useCallback, useMemo,  } from "react";

interface NytApiUrlProps {
    mainUrl: string;
    isCategoryData: boolean;
}

const NytApiUrl = ({ mainUrl, isCategoryData }: NytApiUrlProps) => {
    const [urlOffset, setUrlOffset] = useState(0);
    const apiKey = process.env.REACT_APP_NYT_API_KEY;
    const [url, setUrl] = useState(
        `${mainUrl}?limit=100&offset=${urlOffset}&api-key=${apiKey}`
    );
    const [isLoading, setIsLoading] = useState(true);
    const { categoryName } = useParams();

    const maxFetchNum = useCallback(() => {
        switch (categoryName) {
            case "health":
                return 200;

            case "technology":
                return 300;

            default:
                return 400;
        }
    }, [categoryName]);

    const isMaxFetchCalls = useMemo(() => {
        return urlOffset === maxFetchNum();
    }, [urlOffset, maxFetchNum]);

    const updateApiUrlParams = useCallback(() => {
        setUrlOffset((prevState) => {
            return prevState + 100;
        })

        setTimeout(() => {
            setIsLoading(true);
        }, 20);

    }, [setIsLoading]);

    useEffect(() => {
        setUrl(
            `${mainUrl}?limit=100&offset=${urlOffset}&api-key=${apiKey}`
        );
    }, [mainUrl, urlOffset, apiKey]);

    return (
        <FetchData
            url={url}
            isCategoryData={isCategoryData}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            updateApiUrlParams={updateApiUrlParams}
            isMaxFetchCalls={isMaxFetchCalls}
        />
    );
};

export default NytApiUrl;
