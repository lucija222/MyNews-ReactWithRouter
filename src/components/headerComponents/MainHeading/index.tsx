import "./MainHeading.scss"
import { memo } from "react";
import { Link } from "react-router-dom";

const MainHeading = () => {
    return (
        <h1 className="mainHeading">
            <Link to={"/category/home"}>
            <span>My</span>News
            </Link>
        </h1>
    );
};

export default memo(MainHeading);
