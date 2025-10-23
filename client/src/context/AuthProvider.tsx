import { IUser } from "@/types/user";
import {
	createContext,
	PropsWithChildren,
	useContext,
	useState,
	useEffect,
} from "react";
import axios from "@/utils/axios";

type AuthProvider = {
	userData: IUser | null | undefined;
	getProfile: () => Promise<void>;
	logout: () => Promise<void>;
	isLoading: boolean;
};

type AuthProviderProps = PropsWithChildren;

const AuthContext = createContext<AuthProvider | undefined>(undefined);

export const useAuth = (): AuthProvider => {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};

export default function AuthProvider({ children }: AuthProviderProps) {
	const [userData, setUserData] = useState<IUser | null | undefined>(
		undefined
	);
	const [isLoading, setIsLoading] = useState(true);

	async function getProfile() {
		try {
			const res = await axios.get("/users/profile");
			setUserData(res.data.data);
		} catch {
			setUserData(null);
		} finally {
			setIsLoading(false);
		}
	}

	async function logout() {
		try {
			await axios.get("/users/logout");
			setUserData(null);
			window.location.href = "/sign-in";
		} catch (error) {
			console.error("Logout failed:", error);
		}
	}

	// Load user profile on initial render
	useEffect(() => {
		getProfile();
	}, []);

	return (
		<AuthContext.Provider
			value={{ userData, getProfile, logout, isLoading }}
		>
			{children}
		</AuthContext.Provider>
	);
}
