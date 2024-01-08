import "./SearchFilter.scss";
import { useNavigate } from "react-router-dom";
import { SearchSvg } from "../../../assets/svg/svgImports";
import { EncodedSearchInputContext } from "../../../context/EncodedSearchInputProvider";
import { Dispatch, SetStateAction, FormEventHandler, useContext, useState, useRef, useEffect } from "react"; 

interface SearchFilterProps {
    isMenuOpen?: boolean,
    setIsMenuOpen?: Dispatch<SetStateAction<boolean>>
};

const SearchFilter = ({isMenuOpen, setIsMenuOpen }: SearchFilterProps) => {
    const [localSearchInput, setLocalSearchInput] = useState("");
    const placeholders = ["Search news", "Please enter a term to search"];
    const inputRef = useRef<null | HTMLInputElement>(null);
    const navigate = useNavigate();
    const { setEncodedSearchInput } = useContext(EncodedSearchInputContext);

    const handleFormSubmit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const inputCurrent = inputRef.current;

        if (!localSearchInput && inputCurrent?.placeholder === placeholders[0]) {
            inputCurrent.placeholder = placeholders[1];
            inputCurrent.classList.replace("placeholder_0", "placeholder_1");

        } else if (localSearchInput) {
            if (inputCurrent?.placeholder === placeholders[1]) {
                inputCurrent.placeholder = placeholders[0];
                inputCurrent.classList.replace("placeholder_1", "placeholder_0");
            }

            if (isMenuOpen && setIsMenuOpen) {
                setIsMenuOpen(false);
            }

            setEncodedSearchInput(encodeURIComponent(localSearchInput));
            setLocalSearchInput("");

            navigate("/category/search-results");
        }
    };

    const handleClosingMobileKeyboardOnEnter = (keyboardEvent: KeyboardEvent) => {
        const currentInputRef = inputRef.current;
        if (keyboardEvent.key === "Enter" && currentInputRef) {
            setTimeout(() => {
                currentInputRef?.blur();
            }, 20);
        }
    };

    useEffect(() => {
        const currentInputRef = inputRef.current;

        currentInputRef?.addEventListener(
            "keydown",
            handleClosingMobileKeyboardOnEnter
        );

        return () => {
            currentInputRef?.removeEventListener(
                "keydown",
                handleClosingMobileKeyboardOnEnter
            );
        };
    }, []);

    return (
        <form onSubmit={handleFormSubmit}>
            <div>
                <SearchSvg />
                <input
                    type="search"
                    id="search"
                    aria-label="Input field"
                    placeholder={placeholders[0]}
                    autoComplete="off"
                    ref={inputRef}
                    value={localSearchInput}
                    className="placeholder_0"
                    onChange={(e) => {
                        setLocalSearchInput(e.target.value);
                    }}
                />
            </div>
            <button type="submit" className="form-btn">
                SEARCH
            </button>
        </form>
    );
};

export default SearchFilter;