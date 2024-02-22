import { useEffect, useState } from "react";
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
	const [isShowModal, setIsShowModal] = useState(false);

	useEffect(() => {
		dispatch(fetchTrips());
	}, [dispatch]);

	const handleOpenModal = () => {
		setIsShowModal(true);
	};

	const handleCloseModal = () => {
		setIsShowModal(false);
	};

	return (
		<>
			<h1>Weather Forecast</h1>
			<div>{isLoading && "Request in progress..."}</div>
			<TripList openModal={handleOpenModal} />
			<WeatherWeek />
			<Sidebar />
			{isShowModal && <Modal onClick={handleCloseModal} />}
		</>
	);
};
