import { ArticleData } from "../../../components/mainComponents/FetchData";
import { NewDataArray } from "../../../typesAndInterfaces/apiTandI";
import { isDataFetchedOnCategoryChange } from "./isDataFetchedOnCategoryChange";

export const replaceOrMergeArticleData = (
    prevData: ArticleData,
    isCategoryData: boolean,
    categoryName: string | undefined,
    filteredData: NewDataArray,
    url: string
) => {

    let newData: ArticleData = [];

    const shouldArticleDataBeReplaced = isDataFetchedOnCategoryChange(
        categoryName,
        url
    );

    switch (isCategoryData) {

        case true:

            if (shouldArticleDataBeReplaced) {
                if (prevData.length > 0) {
                    for (const articleObj of prevData) {
                        URL.revokeObjectURL(articleObj.img_src);
                    }
                }
                return newData = filteredData;
            }
            
            return newData = [...prevData, ...filteredData];

        case false:

            return newData = shouldArticleDataBeReplaced
                ? filteredData
                : [...prevData, ...filteredData];
    }

    return newData;
};