import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import { useLocation } from "react-router-dom";
import TestBanner from "./shared/TestBanner";

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const { pathname } = useLocation();
	return (
		<div className="flex h-screen flex-col">
			{pathname === "/" && <TestBanner />}
			<Header />
			<main className="flex-1">{children}</main>
			<Footer />
		</div>
	);
}
