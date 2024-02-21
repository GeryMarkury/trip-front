import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { refreshUser } from "./redux/auth/operations";
import { useAuth } from "./hooks/useAuth";
import "./App.css";
import { Register } from "./components/Register";
import { Login } from "./components/Login";

export default function App() {
	const dispatch = useDispatch();
	const { isRefreshing } = useAuth();
	const [isRegistering, setIsRegistering] = useState(true);

	useEffect(() => {
		dispatch(refreshUser());
	}, [dispatch]);

	return isRefreshing ? (
		<b>Refreshing user...</b>
	) : (
		<div className="App">
			{isRegistering ? <Register /> : <Login />}
			<p>
				{isRegistering ? (
					<>
						Already registered? Then{" "}
						<a
							href="#"
							onClick={() => setIsRegistering(false)}
						>
							Log in
						</a>
					</>
				) : (
					<>
						Not registered yet?{" "}
						<a
							href="#"
							onClick={() => setIsRegistering(true)}
						>
							Register
						</a>
					</>
				)}
			</p>
		</div>
	);
}
