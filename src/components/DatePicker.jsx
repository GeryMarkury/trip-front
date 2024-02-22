import { useField, useFormikContext } from "formik";
import DatePicker from "react-datepicker";
import { addDays } from "date-fns";

export const DatePickerField = ({ ...props }) => {
	const { setFieldValue } = useFormikContext();
	const [field] = useField(props);
	return (
		<DatePicker
			{...field}
			{...props}
			selected={(field.value && new Date(field.value)) || null}
			onChange={val => {
				setFieldValue(field.name, val);
			}}
			showTimeSelect
			dateFormat="MMMM d, yyyy h:mm aa"
			timeFormat="HH:mm"
			includeDates={[new Date(), addDays(new Date(), 15)]}
		/>
	);
};

export default DatePickerField;
