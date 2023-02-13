import Link from "next/link";
import Image from "next/legacy/image";
import Script from "next/script";
import student from "../../../assets/student.png";
import user from "../../../assets/user.png";
import userprofile from "../../../assets/user.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	solid,
	regular,
	brands,
	icon,
} from "@fortawesome/fontawesome-svg-core/import.macro";
import style from "../../styles/profile.module.css";
import { AdminVerified, ClubVerified } from "./assets";
import React from "react";
import { AuthContext } from "./authProvider";
import User, { toUser } from "../data/User";
import api from "../util/api";

const UserProfileCard: React.FC = () => {
	const authContext = React.useContext(AuthContext);
	const [user, setUser] = React.useState<User>(undefined!);
	React.useEffect(() => {
		console.log("Use Effect");
		api
			.get("/users/getUser", {
				headers: { Authorization: `Bearer ${authContext.authState}` },
			})
			.then((res) => {
				console.log(res);
				if (res.status === 200) {
					setUser(toUser(res.data));
					console.log(user);
				} else {
					console.log("error");
				}
			})
			.catch((err) => {
				console.log("error");
				console.error(err);
			});
	}, []);
	const widget = user ? (
		<div className='container card mt-5'>
			<div className='row g-0'>
				<div className='col-md-4'>
					<FontAwesomeIcon
						className='displayimage p-5'
						icon={solid("user")}
						size='7x'
					/>
				</div>
				<div className='col-md-8 mt-4'>
					<div className='card-body'>
						<p className='fs-3'>
							{user.fullName}
							{user.userRole !== "USER" ? (
								<Image
									src={user.userRole === "CLUB" ? ClubVerified : AdminVerified}
									alt='verified'
									height={20}
									width={20}
									color='blue'
								/>
							) : (
								<></>
							)}
						</p>
						<p className='card-title'>{user.bio}</p>
						<Link href='../settings' style={{ color: "black" }}>
							<FontAwesomeIcon
								className={style.settingsicon}
								icon={solid("gear")}
								size='1x'
							/>
						</Link>
					</div>
				</div>
			</div>
		</div>
	) : (
		<></>
	);
	return widget;
};

export default UserProfileCard;
