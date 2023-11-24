import { ArticleData } from "../../FetchData";
import RenderScroller from "../RenderScroller";
import { useRef, useEffect, useCallback } from "react";

interface InfiniteScrollerProps {
    isCategoryData: boolean;
    isLoading: boolean;
    isFavoritesCategory: boolean;
    articleData: ArticleData;
    updateApiUrlParams: () => void;
    isMaxFetchCalls: boolean;
}

const InfiniteScroller = ({
    isCategoryData, isLoading, isFavoritesCategory,
    articleData, updateApiUrlParams, isMaxFetchCalls
}: InfiniteScrollerProps) => {

    const observerRef = useRef<IntersectionObserver | null>(null);
    const observerElemRef = useRef<HTMLDivElement | null>(null);

    const observerCallback = useCallback(
        ([entry]: IntersectionObserverEntry[]) => {
            if (entry.isIntersecting && !isLoading && !isMaxFetchCalls) {
                updateApiUrlParams();
            }
        },
        [isLoading, isMaxFetchCalls, updateApiUrlParams]
    );

    useEffect(() => {
        observerRef.current = new IntersectionObserver(observerCallback, {
            root: null,
            threshold: 0.5,
        });

        const observer = observerRef.current;
        const observerElem = observerElemRef.current;

        if (observerElem && observer && !isMaxFetchCalls) {
            observer.observe(observerElem);
        }

        return () => {
            if (observer) {
                observer.disconnect();
            }
        };
    }, [observerCallback, isMaxFetchCalls]);

    return (
        <RenderScroller
            isCategoryData={isCategoryData}
            isFavoritesCategory={isFavoritesCategory}
            articleData={articleData}
            observerElemRef={observerElemRef}
        />
    );
};

export default InfiniteScroller;
