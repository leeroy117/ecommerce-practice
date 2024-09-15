import  NavItem  from "../NavItem";
import { Icon } from "@iconify-icon/react/dist/iconify.js";
import { useRecoilState, useRecoilValue } from "recoil";
import { cartHandleState, categoriesState, countItemsCartState } from "../../state/globalState";

const Navbar = () => {
    const [cartHandle, setCartHandle] = useRecoilState<boolean>(cartHandleState);
    const count = useRecoilValue(countItemsCartState);
    const categories = useRecoilValue<string[]>(categoriesState);
    console.log("🚀 ~ Navbar ~ categories:", categories)
    const encodeCategory = encodeURI(`${categories[0]}`);
    console.log("🚀 ~ Navbar ~ encodeCategory:", encodeCategory)

  return (
    <nav className="fixed flex flex-row justify-between py-2 px-10 h-16 w-svw bg-slate-200 z-50 shadow-sm">
        <ul className="flex flex-row justify-center items-center gap-5">
            <li>
                <NavItem text={`All`} to={`/${encodeURIComponent('all')}`} label="Navegar a mis ordenes"/>
            </li>
            {
                categories.map((c,i) => (
                    <li>
                        <NavItem key={i} text={c.charAt(0).toLocaleUpperCase() + c.slice(1)} to={`/${encodeURIComponent(c.normalize())}`} label="Navegar a mis ordenes"/>
                    </li>
                ))
            }
        </ul>
        <ul className="flex flex-row justify-center items-center gap-5">
            <li>
                <NavItem text={'My Orders'} to="/my-orders" label="Navegar a mis ordenes"/>
            </li>
            <li>
                <NavItem text={'My Account'} to="/my-account" label="Navegar a mis ordenes"/>
            </li>
            <li>
                <NavItem text={'Sign In'} to="/sign-in" label="Navegar a inicio de sesion"/>
            </li>
            <li>
                <button 
                    className="relative cursor-pointer"
                    // onClick={() => setCartHandle(!cartHandle)}
                >
                    <Icon icon="majesticons:heart" width="1.3rem" height="1.3rem"  style={{color: 'black'}} />
                </button>
            </li>
            <li>
                <button 
                    className="relative cursor-pointer"
                    onClick={() => setCartHandle(!cartHandle)}
                >
                    <Icon icon="bi:cart-fill" width="1.3rem" height="1.3rem"  style={{color: 'black'}} />
                    <div className="absolute flex flex-col justify-center items-center bg-black -top-2 -right-2 min-w-4 min-h-4 rounded-full">
                        <span className="text-white text-sm ">{count}</span>
                    </div>
                </button>
            </li>
        </ul>
    </nav>
  );
}

export default Navbar;