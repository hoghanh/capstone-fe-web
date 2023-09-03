import Navbar from '../header/Navbar';
import Searchbar from '../header/SearchBar';
import Footer from '../footer/Footer';
import AppBreadcrumb from 'components/AppBreadcrumb';
import { Outlet } from 'react-router-dom';

const BreadcrumbUser = ({ children }) => (
  <>
    <Searchbar />
    <Navbar />
    <AppBreadcrumb />
    {children}
    <Outlet />
    <Footer />
  </>
);

export default BreadcrumbUser;
