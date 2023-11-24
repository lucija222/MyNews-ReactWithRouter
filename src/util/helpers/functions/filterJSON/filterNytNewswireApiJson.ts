import {
    FilteredArticleObject, NytMultimediaObj, NewDataArray, NytArticleObj,
} from "../../../../typesAndInterfaces/apiTandI";
import { filterObjNoSrc } from "./filterObjNoSrc";
import { getDataArrWithImgObjUrl } from "./getDataArrWithImgObjUrl";

export const filterNytNewswireApiJson = async (
    jsonData: any,
    isCategoryData: boolean,
    categoryName: string | undefined,
) => {
    const filteredArray_NoObjSrc: NewDataArray = [];
    const pendingFetches: Promise<Response>[] = [];
    const resultsArr: [NytArticleObj] = jsonData.results;

    for (const articleObj of resultsArr) {
        const isValidSection =
            articleObj.section && articleObj.section !== "En español";
        const isValidMultimediaArray =
            Array.isArray(articleObj.multimedia) &&
            articleObj.multimedia.length > 0;
        const validTitleAndByline = articleObj.title && articleObj.byline;

        if (isValidMultimediaArray && validTitleAndByline && isValidSection) {
            const correctMultimediaObject: NytMultimediaObj | undefined =
                articleObj.multimedia.find((multimediaObject) => {
                    if (multimediaObject.width === 440) {
                        return true;
                    } else if (multimediaObject.width === 600) {
                        return true;
                    }
                    return false;
                });

            const multimediaURL = correctMultimediaObject
                ? correctMultimediaObject.url
                : "";

            if (multimediaURL) {
                if (isCategoryData) {
                    pendingFetches.push(fetch(multimediaURL));
                }

                const filteredObj: FilteredArticleObject = filterObjNoSrc(
                    articleObj,
                    multimediaURL,
                    isCategoryData,
                    categoryName
                );

                filteredArray_NoObjSrc.push(filteredObj);
            }
        }
    }

    if (isCategoryData) {
        const completeArray = await getDataArrWithImgObjUrl(pendingFetches, filteredArray_NoObjSrc);
        return completeArray;
        
    } else { 
        return filteredArray_NoObjSrc;
    }
};