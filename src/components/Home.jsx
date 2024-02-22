import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTrips } from "../redux/operations";
import { selectLoading } from "../redux/selectors";
import TripList from "./TripList";
import WeatherWeek from "./WeatherWeek";
import Sidebar from "./Sidebar";
import Modal from "./Modal";

export const Home = () => {
	const dispatch = useDispatch();
	const isLoading = useSelector(selectLoading);

	useEffect(() => {
		dispatch(fetchTrips());
	}, [dispatch]);

	return (
		<>
			<h1>Weather Forecast</h1>
			<div>{isLoading && "Request in progress..."}</div>
			<TripList />
			<WeatherWeek />
			<Sidebar />
			<Modal />
		</>
	);
};
