import "./CategoryScroller.scss";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { ArticleData } from "../../FetchData";
import WidgetContainer from "../../WidgetContainer";
import { ViewportSizesContext } from "../../../../context/ViewportSizesProvider";
import {
    NoCardElems, BreakingNewsCard, CategoryCard,
} from "../../cardComponents/cardComponentsImports";

interface CategoryScrollerProps {
    isFavoritesCategory: boolean;
    articleData: ArticleData;
    observerDiv?: JSX.Element | undefined;
}

const CategoryScroller = ({
    isFavoritesCategory,
    articleData,
    observerDiv,
}: CategoryScrollerProps) => {
    const { categoryName } = useParams();
    const { isSmallViewport, isMidViewport, isBigViewport } =
        useContext(ViewportSizesContext);

    const noArticleData = articleData.length === 0;
    const isSearchCategory = categoryName === "search-results";
    const isSearchNoResults = isSearchCategory && noArticleData;

    const isFavoriteOrSearchCategory = isFavoritesCategory || isSearchCategory;
    const isFavoritesNoData = isFavoritesCategory && noArticleData;
    const dataLength = articleData.length - 1;

    const returnCardElems = (data: ArticleData) => {
        if (isFavoritesNoData) {
            return <NoCardElems isNoFavorites={true} />;
        } else if (isSearchNoResults) {
            return <NoCardElems isNoFavorites={false} />;
        }

        return data.map((article, index) => {
            const isBreakingCard =
                (isMidViewport && index === 1) ||
                (isBigViewport && index === 3);

            if (!isFavoriteOrSearchCategory && isBreakingCard) {
                return (
                    <article
                        key={`cat-${article.title}`}
                        className="category-card breaking-news-card"
                    >
                        <BreakingNewsCard
                            title={article.title}
                            byline={article.byline}
                            url={article.url}
                        />
                    </article>
                );
            } else {
                return (
                    <article
                        key={`cat-${article.title}`}
                        className="category-card"
                    >
                        <CategoryCard
                            index={index}
                            isFavoritesCategory={isFavoritesCategory}
                            {...article}
                        />
                        {!isFavoritesCategory &&
                            dataLength === index &&
                            observerDiv}
                    </article>
                );
            }
        });
    };

    return (
        <div className="category-scroller__grid">
            {!isSmallViewport && !isFavoriteOrSearchCategory && (
                <WidgetContainer />
            )}

            {returnCardElems(articleData)}
        </div>
    );
};

export default CategoryScroller;
