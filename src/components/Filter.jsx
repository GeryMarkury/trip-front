import { useSelector, useDispatch } from "react-redux";
import { setFilter } from "../redux/filterSlice";
import { selectFilter } from "../redux/selectors";

const Filter = () => {
	const filter = useSelector(selectFilter);

	const dispatch = useDispatch();

	return (
		<input
			type="text"
			value={filter}
			onChange={event => dispatch(setFilter(event.currentTarget.value))}
			placeholder="Search your trip"
		/>
	);
};

export default Filter;
