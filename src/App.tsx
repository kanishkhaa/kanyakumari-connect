import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import Places from "./pages/Places";
import PlaceDetail from "./pages/PlaceDetail";
import Itinerary from "./pages/Itinerary";
import Stays from "./pages/Stays";
import Experiences from "./pages/Experiences";
import FoodEvents from "./pages/FoodEvents";
import Onboard from "./pages/Onboard";
import SearchPage from "./pages/SearchPage";
import TravelCare from "./pages/TravelCare";
import Events from "./pages/Events";
import Brochures from "./pages/Brochures";
import DTPC from "./pages/DTPC";
import PhotoGallery from "./pages/PhotoGallery";
import VideoGallery from "./pages/VideoGallery";
import ThingsToBuy from "./pages/ThingsToBuy";
import Specialities from "./pages/Specialities";
import SpecialityDetail from "./pages/SpecialityDetail";
import FAQ from "./pages/FAQ";
import Hospitality from "./pages/Hospitality";
import TourOperators from "./pages/TourOperators";
import NotFound from "./pages/NotFound";

const App = () => (
  <TooltipProvider>
    <Toaster />
    <Sonner />
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/places" element={<Places />} />
          <Route path="/places/:id" element={<PlaceDetail />} />
          <Route path="/itinerary" element={<Itinerary />} />
          <Route path="/stays" element={<Stays />} />
          <Route path="/experiences" element={<Experiences />} />
          <Route path="/food" element={<FoodEvents />} />
          <Route path="/onboard" element={<Onboard />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/travelcare" element={<TravelCare />} />
          <Route path="/events" element={<Events />} />
          <Route path="/ebrochures" element={<Brochures />} />
          <Route path="/dtpc" element={<DTPC />} />
          <Route path="/photo-gallery" element={<PhotoGallery />} />
          <Route path="/video-gallery" element={<VideoGallery />} />
          <Route path="/things-to-buy" element={<ThingsToBuy />} />
          <Route path="/specialities" element={<Specialities />} />
          <Route path="/specialities/:id" element={<SpecialityDetail />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/hospitality" element={<Hospitality />} />
          <Route path="/operators" element={<TourOperators />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </TooltipProvider>
);

export default App;
