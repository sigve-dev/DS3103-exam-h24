import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "../Pages/HomePage";
import StorePage from "../Pages/StorePage";
import RegisterPage from "../Pages/RegisterPage";
import StaffPage from "../Pages/StaffPage";
import NoPageFound from "../Pages/NoPageFound";
import MainNavigation from "../Components/shared/MainNavigation";


const AppRouting = () => {
    return (
        <BrowserRouter>
            <MainNavigation/>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/store" element={<StorePage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/staff" element={<StaffPage />} />
                    <Route path="*" element={<NoPageFound />} />
                </Routes>
            </BrowserRouter>
        );
};


export default AppRouting;
