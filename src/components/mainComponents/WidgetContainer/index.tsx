import "./WidgetContainer.scss";
import { RedCircleSvg, RightArrowSvg } from "../../../assets/svg/svgImports";
import { memo } from "react";
import NytApiUrl from "../apiUrl/NytApiUrl";

const WidgetContainer = () => {

    return (
        <section className="widget-container" aria-hidden="true">
            <div className="latest-heading-container">
                <RedCircleSvg />
                <h2>Latest news</h2>
            </div>
             <NytApiUrl mainUrl="https://api.nytimes.com/svc/news/v3/content/all/all.json" isCategoryData={false}/>
            <div className="see-all-news">
                <a
                    href="https://www.nytimes.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    tabIndex={-1}
                >
                    See all news
                </a>
                <RightArrowSvg />
            </div>
        </section>
    );
};

export default memo(WidgetContainer);
