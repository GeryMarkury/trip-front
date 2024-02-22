import { useField } from "formik";
import Select from "react-select";

const CustomCitySelect = ({ label, options, ...props }) => {
	const [field, meta, helpers] = useField(props);

	return (
		<>
			<label>{label}</label>
			<Select
				{...field}
				{...props}
				// className={css.selectMakes}
				options={options.map(option => ({ label: option, value: option }))}
				isSearchable
				placeholder="Please select a city"
				onChange={value => helpers.setValue(value)}
				value={field.value}
			/>
		</>
	);
};

export default CustomCitySelect;
