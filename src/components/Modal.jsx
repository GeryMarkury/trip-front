import { useEffect } from "react";
import { Formik } from "formik";
import { addTrip } from "../redux/operations";
import { useDispatch } from "react-redux";
import { cities } from "../helpers/cities";
import CustomCitySelect from "./CustomCitySelect";
import css from "./Modal.module.css";
import DatePickerField from "./DatePicker";
import "react-datepicker/dist/react-datepicker.css";

const Modal = ({ onClick }) => {
	const dispatch = useDispatch();

	useEffect(() => {
		const handlePressESC = e => {
			if (e.code === "Escape") onClick();
		};

		document.addEventListener("keydown", handlePressESC);

		return () => {
			document.removeEventListener("keydown", handlePressESC);
		};
	}, [onClick]);

	const handleOverlayClick = e => {
		if (e.target === e.currentTarget) {
			onClick();
		}
	};

	return (
		<div
			className={css.overlay}
			onClick={handleOverlayClick}
		>
			<div className={css.modal}>
				<button
					type="button"
					onClick={onClick}
					// className={css.closeModalBtn}
				>
					{/* <svg className={css.closeModalBtnIcon}>
						<use href={icons + "#close"}></use>
					</svg> */}
				</button>
				<p>Create trip</p>
				<Formik
					initialValues={{ city: "", timeStart: "", timeEnd: "" }}
					onSubmit={(values, { resetForm }) => {
						dispatch(addTrip(values));
						console.log(values);
						resetForm();
						onClick();
					}}
				>
					{({ values, errors, touched, handleSubmit, resetForm }) => (
						<form onSubmit={handleSubmit}>
							<CustomCitySelect
								label="City"
								name="city"
								options={cities}
							/>
							<DatePickerField name="timeStart" />
							<DatePickerField name="timeEnd" />
							<button
								type="button"
								onClick={onClick}
							>
								Cancel
							</button>
							<button type="submit">Save</button>
						</form>
					)}
				</Formik>
			</div>
		</div>
	);
};

export default Modal;
