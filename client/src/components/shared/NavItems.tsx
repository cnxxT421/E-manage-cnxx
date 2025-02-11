import { headerLinks } from "@/constants/data";
import { NavLink } from "react-router-dom";

const NavItems = () => {
	return (
		<ul className="md:flex-between flex w-full flex-col items-start gap-5 md:flex-row">
			{headerLinks.map((link) => {
				return (
					<li key={link.route}>
						<NavLink
							to={link.route}
							className={({ isActive }) =>
								`${
									isActive && "text-red-600"
								} flex-center p-medium-16 whitespace-nowrap font-semibold`
							}
						>
							{link.label}
						</NavLink>
					</li>
				);
			})}
		</ul>
	);
};

export default NavItems;
