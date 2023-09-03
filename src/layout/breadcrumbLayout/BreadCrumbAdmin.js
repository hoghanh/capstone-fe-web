import Searchbar from '../header/SearchBar';
import Footer from '../footer/Footer';
import AppBreadcrumb from 'components/AppBreadcrumb';
import { Outlet } from 'react-router-dom';

const BreadcrumbAdmin = ({ children }) => (
  <>
    <Searchbar />
    <AppBreadcrumb />
    {children}
    <Outlet />
    <Footer />
  </>
);

export default BreadcrumbAdmin;
