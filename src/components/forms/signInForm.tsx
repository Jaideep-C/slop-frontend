import Link from "next/link";
import Router from "next/router";
import React from "react";
import { ValidationError } from "yup";
import api from "../../util/api";
import { signInFormValidation } from "../../util/dataValidation";
import { AuthContext } from "../authProvider";

type Prop = {
	style: {
		readonly [key: string]: string;
	};
};

type FormType = {
	emailId: string;
	password: string;
};
const SignInForm: React.FC<Prop> = ({ style }) => {
	const authContext = React.useContext(AuthContext);
	const [formVal, setFormVal] = React.useState<FormType>({
		emailId: "",
		password: "",
	});
	const [loading, setLoading] = React.useState<boolean>(false);
	const [err, setErr] = React.useState("");
	const validate = async (data: FormType) => {
		const isValid = await signInFormValidation.isValid(data);
		try {
			await signInFormValidation.validate(data);
		} catch (e: unknown) {
			if (e instanceof ValidationError) setErr(e.message);
		}
		return isValid;
	};
	const onSubmit = async () => {
		if (!(await validate(formVal))) return;
		setErr("");
		const res = await api.post("/auth/signin", formVal);
		if (res.status === 200) authContext.setAuthState(res.data);
		else setErr(res.data.message);
	};
	return (
		<div
			className='rounded-4 p-5 text-center'
			style={{ backgroundColor: "#f6fbf9" }}
		>
			<h1>Welcome back</h1>
			<input
				className={style.input}
				type='email'
				placeholder='Email ID'
				onChange={(e) => {
					const { value } = e.target;
					setFormVal((prev) => ({ ...prev, emailId: value }));
				}}
			/>
			<br />
			<input
				className={style.input}
				type='password'
				placeholder='Password'
				onChange={(e) => {
					const { value } = e.target;
					setFormVal((prev) => ({ ...prev, password: value }));
				}}
			/>
			<br />
			<div className='error-text'>{err}</div>
			<br />
			<button
				className={style.btn}
				onClick={async () => {
					setLoading(true);
					await onSubmit();
					setLoading(false);
				}}
				disabled={loading}
			>
				{loading ? (
					<span
						className='spinner-border spinner-border-sm'
						role='status'
						aria-hidden='true'
					/>
				) : (
					"Sign In"
				)}
			</button>

			<p>
				Don`t Have An Account?
				<Link href='/auth/signup' className={style.a}>
					Create One!
				</Link>
			</p>
		</div>
	);
};

export default SignInForm;
