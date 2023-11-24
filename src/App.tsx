import "./App.scss";
import Root from "./components/router/pages/Root";
import ErrorMessage from "./components/UIcomponents/ErrorMessage";
import CategoryComponent from "./components/router/CategoryComponent";
import WidgetContainer from "./components/mainComponents/WidgetContainer";
import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";

const App = () => {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Root />,
            errorElement: <ErrorMessage />,
            children: [
                {
                    path: "/",
                    element: <Navigate to={"/category/home"} replace={true}/>,
                },
                {
                    path: "category/:categoryName",
                    element: <CategoryComponent />,
                },
                {
                    path: "/latest",
                    element: <WidgetContainer />,
                },
            ],
        },
    ]);

    return (
         <RouterProvider router={router} />
    );
};

export default App;