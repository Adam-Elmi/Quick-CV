import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import HeroSection from "./Hero-Section";
import StepsSection from "./Steps-Section";


export default function Layout() {
  const location = useLocation();
  function toggleComponent() {
    if (location.pathname === "/") {
      return (
        <>
          <HeroSection />
          <StepsSection />
        </>
      );
    } else {
      return <Outlet />;
    }
  }
  return (
    <>
      <Header />
      {toggleComponent()}
      <Footer />
    </>
  );
}
