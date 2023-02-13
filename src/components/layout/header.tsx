import React from "react";
import Link from "next/link";
import Image from "next/image";
import { StudentLifeLogo, UserIcon } from "../assets";
import { AuthContext } from "../authProvider";
import User, { toUser } from "../../data/User";
import api from "../../util/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	solid,
	regular,
	brands,
	icon,
} from "@fortawesome/fontawesome-svg-core/import.macro";

const Header: React.FC<{ pageName: string }> = ({ pageName }) => {
	const authContext = React.useContext(AuthContext);

	return (
		<nav className='navbar navbar-expand-sm bg-light p-0 fixed-top'>
			<div className='container-fluid p-0'>
				<Link href='/home'>
					<a>
						<Image
							src={StudentLifeLogo}
							alt='student'
							height='60'
							width='60'
						></Image>
					</a>
				</Link>

				{/* Dropdown Menu */}

				<div className='btn-group border border-dark rounded'>
					<button
						className='btn btn-light btn-lg dropdown-toggle'
						type='button'
						data-bs-toggle='dropdown'
						aria-expanded='false'
					>
						{pageName}
					</button>
					<ul className='dropdown-menu'>
						<li>
							<Link href='/home' className='dropdown-item'>
								Home
							</Link>
						</li>
						<li>
							<Link href='/clubs' className='dropdown-item'>
								Clubs
							</Link>
						</li>
						<li>
							<Link href='/events' className='dropdown-item'>
								Events
							</Link>
						</li>
						<li>
							<hr className='dropdown-divider' />
						</li>
						<li>
							<Link href='/profile' className='dropdown-item'>
								Profile
							</Link>
						</li>
						<li>
							<Link href='/settings' className='dropdown-item'>
								Settings
							</Link>
						</li>
					</ul>
				</div>

				{/* Search Bar */}
				<nav className='navbar bg-light'>
					<div className='container-fluid'>
						<form className='d-flex px-5' role='search' style={{}}>
							<input
								className='form-control me-2'
								type='search'
								placeholder='Search'
								aria-label='Search'
							/>
							<button className='btn btn-outline-success' type='submit'>
								Search
							</button>
						</form>
					</div>
				</nav>

				{/* Create a POST */}
				<div className='btn-group'>
					<Link href='/clubs/submit'>
						<button className='btn btn-light btn-lg' type='button'>
							<FontAwesomeIcon icon={solid("square-plus")} />
						</button>
					</Link>
				</div>

				{/* PROFILE  */}
				<div className='btn-group '>
					<button
						className='btn btn-light btn-lg dropdown-toggle'
						type='button'
						data-bs-toggle='dropdown'
						aria-expanded='false'
					>
						<Image src={UserIcon} alt='profile' width='30' height='30'></Image>
					</button>
					<ul className='dropdown-menu'>
						<li>
							<a className='dropdown-item'>Upgrade to CLUB</a>
						</li>
						<li>
							<a
								className='dropdown-item'
								onClick={() => {
									authContext.setAuthState(undefined);
								}}
							>
								Logout
							</a>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
};

export default Header;
