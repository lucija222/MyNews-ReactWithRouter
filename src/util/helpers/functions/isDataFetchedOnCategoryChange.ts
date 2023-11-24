export const isDataFetchedOnCategoryChange = (
    categoryName: string | undefined,
    url: string
) => {
    const checkMatch = (match: RegExpMatchArray | null, condition: string) => {
        if (match && match[1] === condition) {
            return true;
        }
        return false;
    };

    switch (categoryName) {
        case "search-results":
            const pageMatch = url.match(/page=(\d+)/);
            return checkMatch(pageMatch, "1");

        default:
            const offsetMatch = url.match(/offset=(\d+)/);
            return checkMatch(offsetMatch, "0");
    }
};
