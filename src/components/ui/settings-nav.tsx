import { SettingNavProps } from "@/lib/types";
import { NavLink } from "react-router-dom";


const SettingNav: React.FC<SettingNavProps> = ({ items }) => {

  return (
    <nav className="flex mt-6">
        <ul className="flex gap-6 px-4 py-3 text-[18px] ">
        {items.map(({ label, path }) => (
        <li key={path}>
            <NavLink
            to={path}
            className={({ isActive }) =>
                isActive ? "border-b-2 border-blue-700 py-2 "
                    : "text-gray-700 hover:border-b-2 hover:border-blue-700 py-1"
            }
            >
            {label}
            </NavLink>
        </li>
        ))}
        </ul>
    </nav>
  );
};

export default SettingNav;
