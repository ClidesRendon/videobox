import { CategoriesSection } from "../sections/categories-section";

interface HomeViewProps {
    categoryId?: String;
};

export const HomeView = ({ categoryId}: HomeViewProps) => {
    return (
        <div className="max-w-[2400px] mx-auto mb-10 px-4 pt-2.5 flex flex-col gap-y-6">

            {/*THIS CONNECTS TO SRC/MODULES/HOME/UI/SECTIONS/CATEGORIES-SECTION.TSX*/}
            <CategoriesSection categoryId={categoryId}></CategoriesSection>


            
        </div>

    );
};