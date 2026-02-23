import {Route, BrowserRouter, Routes} from "react-router";
import {VenueDirectoryPage} from "@/pages/venueDirectoryPage/venueDirectoryPage.tsx";
import {NotFoundPage} from "@/pages/notFoundPage/notFoundPage.tsx";


export const App = () =>
    <BrowserRouter>
        <Routes>
            <Route index element={<VenueDirectoryPage />} />
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    </BrowserRouter>
