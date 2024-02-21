import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { PrivateRoute } from "./components/PrivateRoute";
import { RestrictedRoute } from "./components/RestrictedRoute";
import { refreshUser } from "./redux/auth/operations";
import { useAuth } from "./hooks/useAuth";
import "./App.css";
import { Home } from "./components/Home";
import Login from "./components/Login";

export default function App() {
	const dispatch = useDispatch();
	const { isRefreshing } = useAuth();

	useEffect(() => {
		dispatch(refreshUser());
	}, [dispatch]);

	return isRefreshing ? (
		<b>Refreshing user...</b>
	) : (
		<Routes>
			<Route
				path="/"
				element={
					<PrivateRoute
						redirectTo="login"
						component={<Home />}
					/>
				}
			/>
			<Route
				path="login"
				element={
					<RestrictedRoute
						redirectTo="/"
						component={<Login />}
					/>
				}
			/>
			<Route
				path="*"
				element={<Home />}
			/>
		</Routes>
	);
}
