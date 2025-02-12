import { useState } from "react";
import { X } from "lucide-react";
import { Link } from "react-router-dom";

const TestBanner = () => {
	const [visible, setVisible] = useState(true);

	if (!visible) return null;

	return (
		<div className="w-full bg-red-500 text-white py-2 px-6 flex justify-center items-center shadow-md">
			<p className="text-sm md:text-base">
				username: <strong>john-doe</strong> | Password:{" "}
				<strong>john12345</strong>{" "}
				<Link to="/sign-in" className="underline font-semibold ml-3">
					Signin Now →
				</Link>
			</p>
			<button
				onClick={() => setVisible(false)}
				className="text-white absolute top-2 right-2"
			>
				<X size={20} />
			</button>
		</div>
	);
};

export default TestBanner;
