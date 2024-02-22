export const TripCard = ({ cityName, img, timeStart, timeEnd }) => {
	function transformDate(dateString) {
		let date = new Date(dateString);
		let options = {
			year: "numeric",
			month: "2-digit",
			day: "2-digit",
		};
		let formattedDate = date.toLocaleString("en-GB", options).replace(/\//g, ".");
		return formattedDate;
	}

	const dateFrom = transformDate(timeStart);
	const dateTo = transformDate(timeEnd);

	return (
		<div>
			<img
				src={img}
				alt={cityName}
				width="250px"
			/>
			<p>{cityName}</p>
			<p>
				{dateFrom}-{dateTo}
			</p>
		</div>
	);
};
