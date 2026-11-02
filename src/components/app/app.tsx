import {Route, BrowserRouter, Routes} from "react-router";
import {VenueDirectoryPage} from "@/pages/venueDirectoryPage/venueDirectoryPage.tsx";
import {NotFoundPage} from "@/pages/notFoundPage/notFoundPage.tsx";
import {PrivacyPolicyPage} from "@/pages/legal/privacyPolicyPage.tsx";
import {TermsOfServicePage} from "@/pages/terms/termsOfServicePage.tsx";
import {CreateVenuePage} from "@/pages/createVenuePage/createVenuePage.tsx";
import {EditVenuePage} from "@/pages/editVenuePage/editVenuePage.tsx";
import {ManageVenuesPage} from "@/pages/manageVenuesPage/manageVenuesPage.tsx";
import {VenueOpeningsPage} from "@/pages/venueOpeningsPage/venueOpeningsPage.tsx";
import {VenueClosuresPage} from "@/pages/venueClosuresPage/venueClosuresPage.tsx";
import {StaffVenuesVenuesPage} from "@/pages/staff/venuesPage/staffVenuesVenuesPage.tsx";
import {RequireStaff} from "@/lib/services/user/guards/requireAuthorisation.tsx";
import {RequireUser} from "@/lib/services/user/guards/requireUser.tsx";

export const App = () =>
    <BrowserRouter>
      <Routes>
          <Route index element={<VenueDirectoryPage />} />
          <Route path="/venue/:venueId" element={<VenueDirectoryPage />} />
          <Route path="/privacy" element={<PrivacyPolicyPage />} />
          <Route path="/terms" element={<TermsOfServicePage />} />
          <Route path="/venue/:venueId/edit" element={<RequireUser><EditVenuePage /></RequireUser>} />
          <Route path="/venue/:venueId/openings" element={<RequireUser><VenueOpeningsPage /></RequireUser>} />
          <Route path="/venue/:venueId/closures" element={<RequireUser><VenueClosuresPage /></RequireUser>} />
          <Route path="/venue/create" element={<RequireUser><CreateVenuePage /></RequireUser>} />
          <Route path="/venue/manage" element={<RequireUser><ManageVenuesPage /></RequireUser>} />
          <Route path="/staff/venues" element={<RequireStaff><StaffVenuesVenuesPage /></RequireStaff>} />
          <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
