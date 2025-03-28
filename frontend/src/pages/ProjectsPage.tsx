import CookieConsent from "react-cookie-consent";
import BooksList from "../components/BooksList";
import CategoryFilter from "../components/CategoryFilter";
import WelcomeBand from "../components/WelcomeBand";
import { useState } from "react";

function ProjectsPage ()
{
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    return (
        <>
        <div className='container mt-4'>
                <WelcomeBand />
            <div className='row'>
                <div className='col-md-3'>
                    <CategoryFilter
                        selectedCategories={selectedCategories}
                        setSelectedCategories={setSelectedCategories} />
                </div>
                <div className='col-md-9'>
                    <BooksList selectedCategories={selectedCategories} />
                </div>
            </div>
        </div><CookieConsent>This website uses cookies to enhance the user experience.</CookieConsent>
        </>
    );
}

export default ProjectsPage;
