import { useParams } from "react-router-dom";
import { Home, General, Business, Health, Science, Sports, Technology, Favorites, SearchResults } from "./pages/imports";

const CategoryComponent = () => {
    const { categoryName } = useParams();

    const returnCategoryPage = () => {
		switch (categoryName) {
			case "home":
				return <Home />;
			case "general":
				return <General />;
			case "business":
				return <Business />;
			case "health":
				return <Health />;
			case "science":
				return <Science />;
			case "sports":
				return <Sports />;
			case "technology":
				return <Technology />;
			case "favorites":
				return <Favorites />;
			case "search-results":
				return <SearchResults />;
			default:
				return <Home />;
		}
    };

	return <>{returnCategoryPage()}</>;
};

export default CategoryComponent;
