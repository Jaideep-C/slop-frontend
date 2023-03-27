import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import student from "../../../assets/student.png";
import user from "../../../assets/user.png";
import React, { useEffect, useState } from "react";
import { EventPost } from "../../components/Post";
import { AuthContext } from "../../components/authProvider";
import AuthComponent from "../../components/layout/authComp";
import style from "../../../styles/profile.module.css";
import Header from "../../components/layout/header";
import Head from "next/head";
import api from "@/util/api";
import Event, { toEventList } from "@/data/Event";

function Home() {
  const [isActive, setIsActive] = useState(false);

  const authContext = React.useContext(AuthContext);
  const [events, setEvents] = React.useState<Event[]>();
  const [originalEvents, setOriginalEvents] = React.useState<Event[]>(); // This is used to store the original events array when the user sorts the events by likes
  useEffect(() => {
    api
      .get(`/users/${authContext.userId}/feed`, {
        headers: { Authorization: `Bearer ${authContext.authState}` },
      })
      .then((res) => {
        if (res.status === 200) {
          const data = res.data;
          const eventList = toEventList(data.events);
          setEvents(eventList);
          setOriginalEvents(eventList);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    setEvents((prevEvents) => {
      if (!isActive) return originalEvents;
      if (prevEvents) {
        return [...prevEvents].sort((a, b) => {
          if (b.numberOfLikes === a.numberOfLikes)
            return b.numberOfAttendees - a.numberOfAttendees;
          return b.numberOfLikes - a.numberOfLikes;
        });
      }
      return prevEvents;
    });
  }, [isActive]);
  // useEffect(() => {
  //   console.log(isActive);
  //   console.log(events?.map((event) => event.numberOfLikes));
  // }, [events]);
  if (events && events.length === 0)
    return (
      <>
        <Head>
          <title>Home</title>
        </Head>
        <Header pageName={"Home"} />
        <div className="text-center" style={{ margin: "100px" }}>
          <h1>
            Follow some{" "}
            <Link href="/clubs/">
              <a>clubs</a>
            </Link>{" "}
            to see home feed
          </h1>
        </div>
      </>
    );
  const widget = (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <Header pageName={"Home"} />
      <div className="" style={{ margin: "100px" }}>
        {/* This page displays only the events that the user is following */}

        <div className="container text-center">
          <div className="btn-group btn-rounded" role="group">
            <div className="dropdown">
              <button
                className="btn btn-light btn-rounded dropdown-toggle mx-1 px-4"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Current
              </button>
              <ul className="dropdown-menu">
                <li>
                  <Link href="/home/future">
                    <a className="dropdown-item text-light">Ongoing</a>
                  </Link>
                </li>
                <li>
                  <a className="dropdown-item text-light" href="#">
                    Past
                  </a>
                </li>
                <li>
                  <a className="dropdown-item text-light" href="#">
                    Future
                  </a>
                </li>
              </ul>
              <button
                className={`btn ${isActive ? "btn-light" : "btn-outline-dark"}`}
                onClick={() => setIsActive(!isActive)}
              >
                Hot
              </button>
            </div>
          </div>
        </div>

        <div className="container-md px-4 text-center">
          {/* Left Content */}
          <div className="row gx-8">
            <div className="col">
              {/* LEFT */}
              <div className="p-3"> </div>
              {/* LEFT */}
            </div>
            <div className="col">
              {events ? (
                events.map((event) => (
                  <EventPost event={event} key={event.slug} />
                ))
              ) : (
                <>Loading</>
              )}
            </div>

            {/* Right Content */}
            <div className="col">
              {/* RIGHT */}
              <div className="p-3"></div>
              {/* RIGHT */}
            </div>
          </div>
        </div>
      </div>
    </>
  );

  return <AuthComponent child={widget} />;
}

export default Home;
