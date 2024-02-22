import { useState } from "react";
import { Formik, Field } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logIn, register } from "../redux/auth/operations";
import { selectIsLoggedIn } from "../redux/auth/selectors";

const registerSchema = yup.object().shape({
	name: yup.string().required("required"),
	email: yup.string().email("invalid email").required("required"),
	password: yup.string().required("required"),
});

const loginSchema = yup.object().shape({
	email: yup.string().email("invalid email").required("required"),
	password: yup.string().required("required"),
});

const initialValuesRegister = {
	name: "",
	email: "",
	password: "",
};

const initialValuesLogin = {
	email: "",
	password: "",
};

const Login = () => {
	const [pageType, setPageType] = useState("login");
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const isLogin = pageType === "login";
	const isRegister = pageType === "register";

	const isUserLoggedIn = useSelector(selectIsLoggedIn);

	const signUp = (values, onSubmitProps) => {
		dispatch(register(values));
		onSubmitProps.resetForm();
		if (isUserLoggedIn) navigate("/");
	};

	const login = (values, onSubmitProps) => {
		dispatch(logIn(values));
		onSubmitProps.resetForm();
		if (isUserLoggedIn) navigate("/");
	};

	const handleFormSubmit = (values, onSubmitProps) => {
		if (isLogin) login(values, onSubmitProps);
		if (isRegister) signUp(values, onSubmitProps);
	};

	return (
		<Formik
			onSubmit={handleFormSubmit}
			initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
			validationSchema={isLogin ? loginSchema : registerSchema}
		>
			{({ values, errors, touched, handleBlur, handleChange, handleSubmit, resetForm }) => (
				<form onSubmit={handleSubmit}>
					<div>
						{isRegister && (
							<>
								<label htmlFor="name">Your name</label>
								<input
									id="name"
									onBlur={handleBlur}
									onChange={handleChange}
									type="text"
									value={values.name}
									name="name"
								/>
								{touched.name && errors.name ? <div>{errors.name}</div> : null}
							</>
						)}
						<label htmlFor="email">Email</label>
						<input
							id="email"
							onBlur={handleBlur}
							onChange={handleChange}
							type="text"
							value={values.email}
							name="email"
						/>
						{touched.email && errors.email ? <div>{errors.email}</div> : null}
						<label htmlFor="password">Password</label>
						<input
							id="password"
							type="password"
							onBlur={handleBlur}
							onChange={handleChange}
							value={values.password}
							name="password"
						/>
						{touched.password && errors.password ? <div>{errors.password}</div> : null}
					</div>
					<div>
						<button type="submit">{isLogin ? "LOGIN" : "REGISTER"}</button>
						<span
							onClick={() => {
								setPageType(isLogin ? "register" : "login");
								resetForm();
							}}
						>
							{isLogin
								? "Don't have an account? Sign Up here."
								: "Already have an account? Login here."}
						</span>
					</div>
				</form>
			)}
		</Formik>
	);
};

export default Login;
