import { createBrowserRouter } from "react-router";
import { Welcome } from "./pages/Welcome";
import { Home } from "./pages/Home";
import { SelectionScreen } from "./pages/SelectionScreen";
import { NewsScreen } from "./pages/NewsScreen";
import { InterstitialAd } from "./pages/InterstitialAd";
import { EmergencyScreen } from "./pages/EmergencyScreen";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Welcome,
  },
  {
    path: "/home",
    Component: Home,
  },
  {
    path: "/selection/:feature",
    Component: SelectionScreen,
  },
  {
    path: "/news/:type/:scope?",
    Component: NewsScreen,
  },
  {
    path: "/ad/:feature/:scope?",
    Component: InterstitialAd,
  },
  {
    path: "/emergency",
    Component: EmergencyScreen,
  },
]);