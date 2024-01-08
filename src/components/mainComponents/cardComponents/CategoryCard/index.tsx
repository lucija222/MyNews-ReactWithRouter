import "./CategoryCard.scss";
import { CardTitle, CardByline, HeartButton } from "../cardComponentsImports";
import { FavoriteArticlesDataContext } from "../../../../context/FavoriteArticlesDataProvider";
import { useState, MouseEventHandler, useContext, useEffect, ReactEventHandler } from "react";

interface CategoryCardProps {
    url: string;
    title: string;
    byline: string;
    section: string;
    timestamp: string;
    img_src: string;
    img_objSrc: string;
    isFavorite: boolean;
    index: number;
    isFavoritesCategory: boolean;
}

const CategoryCard = ({ index, isFavoritesCategory, ...article }: CategoryCardProps) => {
    const { url, title, byline, section, timestamp, img_src, img_objSrc, isFavorite } =
        article;
    const [isArticleFavorite, setIsArticleFavorite] = useState(
        isFavorite ? isFavorite : false
    );
    const { favoriteArticlesArray, updateFavoriteArticlesArray } = useContext(
        FavoriteArticlesDataContext
    );

    const isCardAD = index ? index % 6 === 0 : false;

    const handleFavoriteBtnClick: MouseEventHandler<HTMLButtonElement> = (
        e
    ) => {
        e.stopPropagation();
        const newIsArticleFavorite = !isArticleFavorite;
        const favoriteArticleObject = {
            url: url,
            title: title,
            byline: byline,
            section: section,
            timestamp: timestamp,
            img_src: img_src,
            img_objSrc: img_objSrc,
            isFavorite: newIsArticleFavorite,
        };
        updateFavoriteArticlesArray(
            favoriteArticleObject,
            newIsArticleFavorite
        );
        setIsArticleFavorite(newIsArticleFavorite);
    };

    const correctCategoryName = () => {
        return isArticleFavorite
            ? "favorite"
            : isCardAD
            ? "programmatic/native ad"
            : section;
    };

    const handleImgError: ReactEventHandler<HTMLImageElement> = (e) => {
        e.stopPropagation();
        const target = e.target as HTMLImageElement;
        target.src = "./images/onErrorImgURL.png";
    };

    useEffect(() => {
        const isAlreadyInFavorites = favoriteArticlesArray.some((article) => {
            return article.url === url;
        });
        if (isAlreadyInFavorites !== isArticleFavorite) {
            setIsArticleFavorite(isAlreadyInFavorites);
        }
    }, [favoriteArticlesArray, url, isArticleFavorite]);

    return (
        <>
            {isCardAD && <p className="ad">AD</p>}
            
            <div className="img_container">
                <img
                    src={isFavoritesCategory ? img_src : img_objSrc}
                    onError={handleImgError}
                    alt="Article related photograph"
                />
            </div>

            <div className="category-card__text-content">
                <p>
                    {correctCategoryName()}
                </p>
                <CardTitle url={url} title={title} isWidgetCard={false}/>
                <CardByline byline={byline} />
            </div>

            <HeartButton
                handleFavoriteBtnClick={handleFavoriteBtnClick}
                isArticleFavorite={isArticleFavorite}
            />
        </>
    );
};

export default CategoryCard;
