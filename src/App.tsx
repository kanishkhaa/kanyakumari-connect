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
import Marketplace from "./pages/Marketplace";
import FoodEvents from "./pages/FoodEvents";
import Onboard from "./pages/Onboard";
import SearchPage from "./pages/SearchPage";
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
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/food" element={<FoodEvents />} />
          <Route path="/onboard" element={<Onboard />} />
          <Route path="/search" element={<SearchPage />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </TooltipProvider>
);

export default App;
