import Searchbar from '../header/SearchBar';
import Footer from '../footer/Footer';
import { Outlet } from 'react-router-dom';
import Navbar from 'layout/header/Navbar';

const UserLayout = ({ children }) => (
  <>
    <Searchbar />
    <Navbar />
    {children}
    <Outlet />
    <Footer />
  </>
);

export default UserLayout;
