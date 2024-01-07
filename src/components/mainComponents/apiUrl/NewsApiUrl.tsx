import FetchData from "../FetchData";
import { memo, useState, useContext, useEffect, useMemo, useCallback, } from "react";
import { EncodedSearchInputContext } from "../../../context/EncodedSearchInputProvider";

interface NewsApiUrlProps {
    mainUrl: string;
    isCategoryData: boolean;
}

const NewsApiUrl = ({ mainUrl, isCategoryData }: NewsApiUrlProps) => {
    const { encodedSearchInput } = useContext(EncodedSearchInputContext);
    const [urlPageNum, setUrlPageNum] = useState(1);
    const apiKey = process.env.REACT_APP_NEWS_API_KEY;
    const [url, setUrl] = useState(
        `${mainUrl}?q=${encodedSearchInput}&searchIn=title&language=en&page=${urlPageNum}&apiKey=${apiKey}`

    );
    const [totalPageNum, setTotalPageNum] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    const isMaxFetchCalls = useMemo(() => {
        return urlPageNum === totalPageNum;
    }, [urlPageNum, totalPageNum]);

    const updateApiUrlParams = useCallback(() => {
        setUrlPageNum((prevState) => {
            return prevState + 1;
        });

        setTimeout(() => {
            setIsLoading(true);
        }, 20);
    }, [setIsLoading]);

    useEffect(() => {
        setUrl(
            `${mainUrl}?q=${encodedSearchInput}&searchIn=title&language=en&page=${urlPageNum}&apiKey=${apiKey}`
        );
    }, [mainUrl, encodedSearchInput, urlPageNum, apiKey]);

    return (
        <FetchData
            url={url}
            isCategoryData={isCategoryData} 
            isLoading={isLoading} 
            setIsLoading={setIsLoading}
            updateApiUrlParams={updateApiUrlParams}
            isMaxFetchCalls={isMaxFetchCalls}
            setTotalPageNum={setTotalPageNum}
        />
    );
};

export default memo(NewsApiUrl);
