import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import HeroSection from "./Hero-Section";
import StepsSection from "./Steps-Section";
import ContributionSection from "./Contribution-Section";
import DeveloperGuide from "./Developer-Guide";


export default function Layout() {
  const location = useLocation();
  function toggleComponent() {
    if (location.pathname === "/") {
      return (
        <>
          <HeroSection />
          <StepsSection />
          <DeveloperGuide />
          <ContributionSection />
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
