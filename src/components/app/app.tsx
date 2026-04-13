import {Route, BrowserRouter, Routes} from "react-router";
import {ScheduleDirectoryPage} from "@/pages/scheduleDirectoryPage/scheduleDirectoryPage";
import {NotFoundPage} from "@/pages/notFoundPage/notFoundPage.tsx";
import {VenueDirectoryPage} from "@/pages/venueDirectoryPage/venueDirectoryPage.tsx";


export const App = () =>
    <BrowserRouter>
        <Routes>
            <Route index element={<ScheduleDirectoryPage />} />
            <Route path="/venue/:venueId" element={<ScheduleDirectoryPage />} />
            <Route path="/venues" element={<VenueDirectoryPage />} />
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    </BrowserRouter>
