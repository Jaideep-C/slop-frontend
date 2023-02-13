import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import student from "../../../assets/student.png";
import user from "../../../assets/user.png";
import CodeX from "../../../assets/CodeX.png";
import kala from "../../../assets/kala.png";
import gusac from "../../../assets/gusac.png";
import gstudio from "../../../assets/gstudio.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	solid,
	regular,
	brands,
	icon,
} from "@fortawesome/fontawesome-svg-core/import.macro";
import React from "react";
import { AuthContext } from "../../components/authProvider";
import AuthComponent from "../../components/layout/authComp";
import Header from "../../components/layout/header";

function Clubs() {
	const authContext = React.useContext(AuthContext);
	const widget = (
		<div className='root' style={{ margin: "100px" }}>
			<title>Clubs</title>
			<Header pageName={"Clubs"} />
			{/* Body start */}

			<style jsx>{`
				.card {
					width: 18rem;
					height: 30rem;
				}
			`}</style>

			<div className='row row-cols-1 row-cols-md-4 g-4 m-3'>
				{/* CodeX Card */}
				<div className='col'>
					<div className='card'>
						<Image className='card-img-top' src={CodeX} alt='Card image cap' />
						<div className='card-body'>
							<h5 className='card-title'>CodeX</h5>
							<p className='card-text'>
								This Club reveals and supports your passion for coding. It
								builds up your strength about expressing yourself through it.
							</p>
							<a href='#' className='btn btn-light'>
								More
							</a>
						</div>
					</div>
				</div>
				{/* Kalakrithi Card */}
				<div className='col'>
					<div className='card'>
						<Image className='card-img-top' src={kala} alt='Card image cap' />
						<div className='card-body'>
							<h5 className='card-title'>Kalakrithi</h5>
							<p className='card-text'>
								Arts & entertainment Cultural club GITAM Bengaluru 🖤 | Dance |
								Music |
							</p>
							<a href='#' className='btn btn-light'>
								More
							</a>
						</div>
					</div>
				</div>
				{/* Gusac Card */}
				<div className='col'>
					<div className='card'>
						<Image className='card-img-top' src={gusac} alt='Card image cap' />
						<div className='card-body'>
							<h5 className='card-title'>Gusac</h5>
							{/* eslint-disable-next-line react/no-unescaped-entities */}
							<p className='card-text'>“तमसो मा ज्योतिर्गमय"</p>
							<a href='#' className='btn btn-light'>
								More
							</a>
						</div>
					</div>
				</div>
				{/* Gstudio Card */}
				<div className='col'>
					<div className='card'>
						<Image
							className='card-img-top'
							src={gstudio}
							alt='Card image cap'
						/>
						<div className='card-body'>
							<h5 className='card-title'>Gstudio</h5>
							<p className='card-text'>
								We decide the vibe of photography, much more than just media 😌
							</p>
							<Link href='/clubs/codex'>
								<a className='btn btn-light'>More</a>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
	return <AuthComponent child={widget} />;
}

export default Clubs;
