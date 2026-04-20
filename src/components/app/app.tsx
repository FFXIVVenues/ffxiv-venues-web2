import {Route, BrowserRouter, Routes} from "react-router";
import {VenueDirectoryPage} from "@/pages/venueDirectoryPage/venueDirectoryPage.tsx";
import {NotFoundPage} from "@/pages/notFoundPage/notFoundPage.tsx";
import {PrivacyPolicyPage} from "@/pages/legal/privacyPolicyPage.tsx";


export const App = () =>
    <BrowserRouter>
      <Routes>
        <Route index element={<VenueDirectoryPage />} />
        <Route path="/venue/:venueId" element={<VenueDirectoryPage />} />
        <Route path="/privacy" element={<PrivacyPolicyPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
