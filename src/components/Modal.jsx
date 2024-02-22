import { useEffect } from "react";
import { Formik, Form } from "formik";
import { addTrip } from "../redux/operations";
import { useDispatch } from "react-redux";
import { cities } from "../helpers/cities";
import CustomCitySelect from "./CustomCitySelect";

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
			// className={css.overlay}
			onClick={handleOverlayClick}
		>
			<div>
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
					}}
				>
					{props => (
						<Form>
							<CustomCitySelect
								label="City"
								name="city"
								options={cities}
							/>
							<button
								type="button"
								onClick={onClick}
							>
								Cancel
							</button>
							<button type="submit">Save</button>
						</Form>
					)}
				</Formik>
			</div>
		</div>
	);
};

export default Modal;
