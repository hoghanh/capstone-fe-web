import Header from "../header/Header";
import Footer from "../footer/Footer";
import AppBreadcrumb from "components/AppBreadcrumb";

const BreadcrumbLayout = ({ children }) => (
  <>
    <Header />
    <AppBreadcrumb />
    {children}
    <Footer />
  </>
);

export default BreadcrumbLayout;
