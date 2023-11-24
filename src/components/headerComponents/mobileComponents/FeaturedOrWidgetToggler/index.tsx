import "./FeaturedOrWidgetToggler.scss";
import { MouseEventHandler, memo } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const FeaturedOrWidgetToggler = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const isFeaturedActive = location.pathname.includes("/category");
    const isLatestActive = location.pathname.includes("/latest");

    const handleFeaturedClick: MouseEventHandler<HTMLButtonElement> = (e) => {
        e.stopPropagation();
        
        if (isLatestActive) {
            navigate(-1);
        }
    };

    return (
        <div className="toggler-contaier">
            <button
                className={
                    isFeaturedActive
                        ? "selected-mobile-toggler"
                        : "mobile-toggler"
                }
                onClick={handleFeaturedClick}
            >
                Featured
            </button>
            <Link
                to={"/latest"}
                replace={isLatestActive ? true : false}
                className={
                    isLatestActive
                        ? "selected-mobile-toggler"
                        : "mobile-toggler"
                }
            >
                Latest
            </Link>
        </div>
    );
};

export default memo(FeaturedOrWidgetToggler);