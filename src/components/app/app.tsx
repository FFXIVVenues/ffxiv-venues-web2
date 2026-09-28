import {Route, BrowserRouter, Routes} from "react-router";
import {VenueDirectoryPage} from "@/pages/venueDirectoryPage/venueDirectoryPage.tsx";
import {NotFoundPage} from "@/pages/notFoundPage/notFoundPage.tsx";
import {PrivacyPolicyPage} from "@/pages/legal/privacyPolicyPage.tsx";
import {TermsOfServicePage} from "@/pages/terms/termsOfServicePage.tsx";
import {CreateVenuePage} from "@/pages/createVenuePage/createVenuePage.tsx";
import {EditVenuePage} from "@/pages/editVenuePage/editVenuePage.tsx";


export const App = () =>
    <BrowserRouter>
      <Routes>
          <Route index element={<VenueDirectoryPage />} />
          <Route path="/venue/:venueId" element={<VenueDirectoryPage />} />
          <Route path="/venue/:venueId/edit" element={<EditVenuePage />} />
          <Route path="/privacy" element={<PrivacyPolicyPage />} />
          <Route path="/terms" element={<TermsOfServicePage />} />
          <Route path="/venue/create" element={<CreateVenuePage />} />
          <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
