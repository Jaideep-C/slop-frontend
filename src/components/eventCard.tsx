import React from "react";
import Event from "../data/Event";
import ReactMarkdown from "react-markdown";
import { height } from "@mui/system";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	solid,
	regular,
	brands,
	icon,
} from "@fortawesome/fontawesome-svg-core/import.macro";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import Link from "next/link";
import api from "../util/api";
import { AuthContext } from "./authProvider";

const EventCard: React.FC<{
	event: Event;
	setEvents: React.Dispatch<React.SetStateAction<Event[]>>;
}> = ({ event, setEvents }) => {
	const authContext = React.useContext(AuthContext);
	const widget = (
		<div className='d-flex justify-content-center'>
			<div
				className='card m-5 '
				style={{ width: "50rem", height: "20rem", backgroundColor: "#C1E3D6" }}
			>
				<div className='card-body'>
					<div className='container '>
						<div className='row'>
							<div className='col'>
								<Link href={`/events/${event.slug}`}>
									<a>
										<h2>{event.name}</h2>
									</a>
								</Link>
							</div>
							<div className='col'>
								<Link href={`/events/${event.slug}/edit`}>
									{" "}
									<button className='btn mx-5'>
										<FontAwesomeIcon
											className=''
											icon={solid("pen-to-square")}
										/>
									</button>
								</Link>
								<Popup
									trigger={
										<button className='btn'>
											<FontAwesomeIcon className='' icon={solid("trash")} />
										</button>
									}
									position='right center'
								>
									{
										((close: () => void) => (
											<div className=''>
												Are you sure <br />
												<button
													className='btn btn-light mx-1'
													onClick={async () => {
														const res = await api.delete(
															`/events/${event.slug}`,
															{
																headers: {
																	Authorization: `Bearer ${authContext.authState}`,
																},
															}
														);
														if (res.status === 200) {
															setEvents((prev) => {
																const events = prev.filter(
																	(cur) => cur.id !== event.id
																);
																return [...events];
															});
															close();
														}
													}}
												>
													Yes
												</button>
												<button className='btn btn-danger' onClick={close}>
													No
												</button>
											</div>
										)) as any
									}
								</Popup>
							</div>
						</div>
					</div>

					<hr />
					<div className='container '>
						<div className='row'>
							<div className='col'>
								<h5>Brief Description</h5>
							</div>
							<div className='col'>{event.briefDescription}</div>
						</div>
					</div>

					<div className='container '>
						<div className='row'>
							<div className='col'>
								<h5>Start Date</h5>
							</div>
							<div className='col'>
								{event.startTime
									? event.startTime.format("dddd, MMMM Do YYYY, h:mm a")
									: "No Start Date"}
							</div>
						</div>
					</div>

					<div className='container '>
						<div className='row'>
							<div className='col'>
								<h5>End Date</h5>
							</div>
							<div className='col'>
								{event.endTime
									? event.endTime.format("dddd, MMMM Do YYYY, h:mm a")
									: "No End Date"}
							</div>
						</div>
					</div>

					<div className='container'>
						<div className='row'>
							<div className='col'>
								<h5>Event Registrations</h5>
							</div>
							<div className='col'>{event.registeredUsers.length}</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);

	return widget;
};

export default EventCard;
