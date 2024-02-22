import Filter from "./Filter";
import { useSelector } from "react-redux";
import { selectAllTrips, selectFilter } from "../redux/selectors";
import { TripCard } from "./TripCard";

const TripList = ({ openModal }) => {
	const filter = useSelector(selectFilter);
	const trips = useSelector(selectAllTrips);

	const normalizedFilter = filter.toLowerCase();
	const visibleTrips = trips.filter(trip => trip.city.toLowerCase().includes(normalizedFilter));

	return (
		<>
			<Filter />
			{visibleTrips.length > 0 ? (
				<ul>
					{visibleTrips.map(({ id, city, imageUrl, timeStart, timeEnd }) => (
						<li key={id}>
							<TripCard
								cityName={city}
								img={imageUrl}
								timeStart={timeStart}
								timeEnd={timeEnd}
							/>
						</li>
					))}
					<li key="123">
						<div onClick={() => openModal()}>Add trip</div>
					</li>
				</ul>
			) : (
				<div onClick={() => openModal()}>There are no trips to display. Add trip here</div>
			)}
		</>
	);
};

export default TripList;
