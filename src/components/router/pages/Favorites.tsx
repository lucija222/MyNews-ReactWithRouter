import { useContext, useState, useEffect } from "react";
import { FavoriteArticlesDataContext } from "../../../context/FavoriteArticlesDataProvider";
import RenderScroller from "../../mainComponents/scrollerComponents/RenderScroller";
import Loader from "../../UIcomponents/Loader";

export interface FavoriteArticleData {
    url: string;
    title: string;
    byline: string;
    section: string;
    timestamp: string;
    img_src: string;
    img_objSrc: string;
    isFavorite: boolean;
}

const Favorites = () => {
    const { favoriteArticlesArray } = useContext(FavoriteArticlesDataContext);
    const [articleData, setArticleData] = useState(favoriteArticlesArray);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setArticleData(favoriteArticlesArray);
    }, [favoriteArticlesArray]);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    }, []);

    return (
        <>
            {isLoading && <Loader cardClass="category-card" />}
            <RenderScroller
                isCategoryData={true}
                isFavoritesCategory={true}
                articleData={articleData}   
            />
        </>
    );
};

export default Favorites;
