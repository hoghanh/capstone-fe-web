import Searchbar from '../header/SearchBar';
import Footer from '../footer/Footer';
import { Outlet } from 'react-router-dom';

const AdminLayout = ({ children }) => (
  <>
    <Searchbar />
    {children}
    <Outlet />
    <Footer />
  </>
);

export default AdminLayout;
