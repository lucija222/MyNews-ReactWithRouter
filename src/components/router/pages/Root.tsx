import Header from "../../headerComponents/Header";
import RenderMain from "../../mainComponents/RenderMain";
import ViewportSizesProvider from "../../../context/ViewportSizesProvider";
import EncodedSearchInputProvider from "../../../context/EncodedSearchInputProvider";

const Root = () => {
    
    return (
        <ViewportSizesProvider>
            <EncodedSearchInputProvider>
                <Header />
                <RenderMain />
            </EncodedSearchInputProvider>
        </ViewportSizesProvider>
    );
};

export default Root;
