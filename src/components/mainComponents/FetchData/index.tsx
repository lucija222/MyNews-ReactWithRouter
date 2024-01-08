import { useParams } from "react-router-dom";
import Loader from "../../UIcomponents/Loader";
import ErrorMessage from "../../UIcomponents/ErrorMessage";
import InfiniteScroller from "../scrollerComponents/InfiniteScroller";
import { filterJsonData } from "../../../util/helpers/functions/filterJSON/filterJsonData";
import { allowOrDisableScroll } from "../../../util/helpers/functions/allowOrDisableScroll";
import { replaceOrMergeArticleData } from "../../../util/helpers/functions/replaceOrMergeArticleData";
import { useCallback, useEffect, useState, useRef, Dispatch, SetStateAction } from "react";

export type ArticleData = {
    url: string;
    title: string;
    byline: string;
    section: string;
    timestamp: string;
    img_src: string;
    img_objSrc: string;
    isFavorite: boolean;
}[];

interface FetchDataProps {
    isCategoryData: boolean;
    url: string;
    isLoading: boolean;
    setIsLoading: Dispatch<SetStateAction<boolean>>;
    updateApiUrlParams: () => void;
    isMaxFetchCalls: boolean;
    setTotalPageNum?: Dispatch<SetStateAction<number>>;
}

const FetchData = ({ isCategoryData, url, isLoading, setIsLoading, updateApiUrlParams, isMaxFetchCalls, setTotalPageNum }: FetchDataProps) => {
    const [isError, setIsError] = useState(false);
    const [articleData, setArticleData] = useState<ArticleData>([]);
    const { categoryName } = useParams();

    const isFavoritesCategory = categoryName === "favorites";
    const isSearchCategory = categoryName === "search-results";
    const cardClass = isCategoryData ? "category-card" : "widget-card";
    const isThereArticleData = articleData.length > 0;

    const timeoutIdRef = useRef<null | NodeJS.Timeout>(null);

    const fetchData = useCallback(
        async (url: string) => {
            try {
                const response = await fetch(url);

                if (!response.ok) {
                    console.error("Error: !response.ok");
                    setIsError(true);
                    return;
                }

                const jsonData = await response.json();

                if (
                    isSearchCategory &&
                    url.includes("page=1&") && setTotalPageNum
                ) {
                    setTotalPageNum(
                        Math.floor(jsonData.totalResults / 100)
                    );
                }

                const filteredData = await filterJsonData(
                    jsonData,
                    categoryName,
                    isSearchCategory,
                    isCategoryData
                );
                
                if (filteredData) {
                    setArticleData((prevData) => {
                        return replaceOrMergeArticleData(
                            prevData,
                            isCategoryData,
                            categoryName,
                            filteredData,
                            url
                        );
                    });
                }
            } catch (error) {
                setIsError(true);
                console.error("Error in fetchData:", error);

            } finally {
                setIsLoading(false);
            }
        },
        [
            setIsLoading,
            isCategoryData,
            categoryName,
            isSearchCategory,
            setTotalPageNum,
        ]
    );

    const debounceFetchCalls = useCallback(
        (url: string, fetchFunc: (url: string) => Promise<void>) => {
            if (timeoutIdRef.current) {
                clearTimeout(timeoutIdRef.current);
            }

            timeoutIdRef.current = setTimeout(() => {
                fetchFunc(url);
            }, 100);
        }, []);

    useEffect(() => {
        allowOrDisableScroll(isError);
    }, [isError]);

    useEffect(() => {   
        if (url && isLoading) {
            debounceFetchCalls(url, fetchData);
        } 
    }, [
        url,
        isLoading,
        debounceFetchCalls,
        fetchData,
    ]);

    return (
        <>
            {isLoading && <Loader cardClass={cardClass} />}
            {isError && <ErrorMessage />}
            {(isThereArticleData || isSearchCategory) && ( 
                <InfiniteScroller
                isCategoryData={isCategoryData}
                    isLoading={isLoading}
                    isFavoritesCategory={isFavoritesCategory}
                    articleData={articleData}
                    updateApiUrlParams={updateApiUrlParams}
                    isMaxFetchCalls={isMaxFetchCalls}
                />
            )} 
        </>
    );
};

export default FetchData;
