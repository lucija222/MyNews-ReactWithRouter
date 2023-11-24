import "./RenderMain.scss";
import { useContext, memo } from "react";
import { Outlet } from "react-router-dom";
import Nav from "../../headerComponents/Nav";
import { ViewportSizesContext } from "../../../context/ViewportSizesProvider";
import FavoriteArticlesDataProvider from "../../../context/FavoriteArticlesDataProvider";

const RenderMain = () => {
    const { isSmallViewport } = useContext(ViewportSizesContext);
    
    return (
        <main className={isSmallViewport ? "main-flex" : "main-grid"}>
            <FavoriteArticlesDataProvider>
                    {!isSmallViewport && (
                        <>
                            <div className="main-grid__nav">
                                <Nav />
                            </div>
                            <h2 className="main-grid__heading">News</h2>
                        </>
                    )}
                    <Outlet />
            </FavoriteArticlesDataProvider>
        </main>
    );
};

export default memo(RenderMain);
