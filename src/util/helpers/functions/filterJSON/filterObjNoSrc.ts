import {
    FilteredArticleObject, NytArticleObj,
} from "../../../../typesAndInterfaces/apiTandI";
import { extractTime } from "../extractTime";

export const filterObjNoSrc = (
    articleObj: NytArticleObj,
    multimediaURL: string,
    isCategoryData: boolean,
    categoryName: string | undefined,
) => {
    const correctCategorySection = () => {
        switch (categoryName) {
            case "search-results":
                return "search result";
            
            case "general":
                return "General";
        
            default:
                return articleObj.section;
        }
    };

    switch (isCategoryData) {
        case true:
            const filteredCategoryObj: FilteredArticleObject = {
                url: articleObj.url,
                title: articleObj.title,
                byline: articleObj.byline,
                section: correctCategorySection(),
                timestamp: articleObj.created_date,
                img_src: multimediaURL,
                img_objSrc: "",
                isFavorite: false,
            };
            
            return filteredCategoryObj;

        case false:
            const filteredWidgetObj: FilteredArticleObject = {
                url: articleObj.url,
                title: articleObj.title,
                byline: articleObj.byline,
                section: "widget",
                timestamp: extractTime(articleObj.created_date),
                img_src: multimediaURL,
                img_objSrc: "",
                isFavorite: false,
            };

            return filteredWidgetObj;
    }
};
