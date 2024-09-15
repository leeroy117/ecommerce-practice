import { Outlet } from 'react-router-dom'; 
import  Navbar from "../Navbar";
import Cart from '../Cart';

export const Layout = () => {
  return (
    <div>
        <Cart />
        <Navbar />
        <div className='absolute top-16'>
          <Outlet />
        </div>
    </div>
  );
}

export default Layout;