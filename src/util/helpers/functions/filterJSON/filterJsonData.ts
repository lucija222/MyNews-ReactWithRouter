import { NewDataArray } from "../../../../typesAndInterfaces/apiTandI";
import { filterNewsApiJson } from "./filterNewsApiJson";
import { filterNytNewswireApiJson } from "./filterNytNewswireApiJson";

export const filterJsonData = async (
    jsonData: any,
    categoryName: string | undefined,
    isSearchCategory: boolean,
    isCategoryData: boolean,
) => {

    const newDataArray: NewDataArray =
        !isSearchCategory || !isCategoryData
            ? await filterNytNewswireApiJson(
                  jsonData,
                  isCategoryData,
                  categoryName
              )
            : await filterNewsApiJson(jsonData);

    return newDataArray;
};
