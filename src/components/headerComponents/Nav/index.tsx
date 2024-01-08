import "./Nav.scss";
import { NavLink } from "react-router-dom";
import { Dispatch, SetStateAction, MouseEventHandler } from "react";
import {
    HomeSvg, GeneralSvg, BusinessSvg, HealthSvg, ScienceSvg, SportsSvg, TechnologySvg, FavoritesSvg,
} from "../../../assets/svg/svgImports";

interface NavProps {
    setIsMenuOpen?: Dispatch<SetStateAction<boolean>>;
}

const Nav = ({ setIsMenuOpen }: NavProps) => {
    const handleNavClick: MouseEventHandler<HTMLAnchorElement> = (e) => {
        e.stopPropagation();

        if (setIsMenuOpen) {
            setIsMenuOpen(false);
        }
    };

    const svgComponentMap = {
        Home: <HomeSvg />,
        General: <GeneralSvg />,
        Business: <BusinessSvg />,
        Health: <HealthSvg />,
        Science: <ScienceSvg />,
        Sports: <SportsSvg />,
        Technology: <TechnologySvg />,
        Favorites: <FavoritesSvg />,
    };

    const categories: (keyof typeof svgComponentMap)[] = [
        "Home",
        "General",
        "Business",
        "Health",
        "Science",
        "Sports",
        "Technology",
        "Favorites",
    ];

    const returnLiElem = (category: keyof typeof svgComponentMap) => {
        return (
            <li className="li" key={category}>
                <NavLink
                    to={`/category/${category.toLowerCase()}`}
                    onClick={handleNavClick}
                >
                    {svgComponentMap[category]}
                    <span>{category}</span>
                </NavLink>
            </li>
        );
    };

    return (
        <nav className="general-nav">
            <ul>{categories.map((category) => returnLiElem(category))}</ul>
        </nav>
    );
};

export default Nav;
