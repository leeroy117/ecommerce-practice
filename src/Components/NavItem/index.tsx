import { NavLink } from "react-router-dom";

interface Props {
    to: string;
    text: string;
    label: string;
}

const NavItem = ({to, text, label}: Props) => {
  return (
    <NavLink 
        to={to} 
        aria-label={label}
        className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "font-semibold underline underline-offset-2" : ""
        }
    >
        <span className="text-xl">{text}</span>
    </NavLink>
  );
}

export default NavItem;