import "./WidgetScroller.scss";
import { ArticleData } from "../../FetchData";
import WidgetCard from "../../cardComponents/WidgetCard";

interface WidgetScrollerProps {
    articleData: ArticleData;
    observerDiv: JSX.Element | undefined;
}

const WidgetScroller = ({
    articleData, observerDiv,
}: WidgetScrollerProps) => {

    return (
        <div className="widget-scroller_container">
            {articleData.map((article) => {
                return (
                    <article key={`wid-${article.title}`} className="widget-card">
                        <WidgetCard
                            timestamp={article.timestamp}
                            title={article.title}
                            url={article.url}
                        />
                    </article>
                );
            })}
            {observerDiv}
        </div>
    );
};

export default WidgetScroller;
