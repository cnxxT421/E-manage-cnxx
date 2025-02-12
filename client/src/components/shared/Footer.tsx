import { Link } from "react-router-dom";

const Footer = () => {
	return (
		<footer className="border-t">
			<div className="flex-center wrapper flex-between flex flex-col gap-4 p-5 text-center sm:flex-row">
				<Link to="/" className="w-36">
					<img
						src="/src/assets/images/logo.jpeg"
						alt="logo"
						width={80}
					/>
				</Link>

				<p>{new Date().getFullYear()} . All Rights reserved.</p>
			</div>
		</footer>
	);
};

export default Footer;
