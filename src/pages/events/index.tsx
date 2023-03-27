import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import student from "../../../assets/student.png";
import user from "../../../assets/user.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  solid,
  regular,
  brands,
  icon,
} from "@fortawesome/fontawesome-svg-core/import.macro";
import AuthComponent from "../../components/layout/authComp";
import React from "react";
import { AuthContext } from "../../components/authProvider";
import Header from "../../components/layout/header";
import api from "../../util/api";
import { toEventList } from "../../data/Event";
import Event from "../../data/Event";
import EventCard from "../../components/eventCard";
import { NextPage } from "next";
import Head from "next/head";
import { EventPost } from "@/components/Post";

const EventsPage: NextPage = () => {
  const authContext = React.useContext(AuthContext);
  const [events, setEvents] = React.useState<Event[]>([]);
  React.useEffect(() => {
    api
      .get("/events", {
        headers: { Authorization: "Bearer " + authContext.authState },
      })
      .then((res) => {
        console.log("Res ", res.data);
        const events: Event[] = toEventList(res.data);
        console.log("Converted Object", events);
        setEvents(events);
      });
  }, []);
  const widget = (
    <div className="root" style={{ margin: "100px" }}>
      <Head>
        <title>Events</title>
      </Head>
      <Header pageName={"Events"} />
      <div className="container-md px-4 text-center">
        ALL EVENTS
        {/* Left Content */}
        <div className="row">
          <div className="col">
            {/* LEFT */}
            <div className="p-1"> </div>
            {/* LEFT */}
          </div>
          <div className="col">
            {events.map((event) => (
              <EventPost event={event} key={event.slug} />
            ))}
          </div>

          {/*  Right Content */}
          <div className="col">
            {/* RIGHT */}
            <div className="p-1"></div>
            {/* RIGHT */}
          </div>
        </div>
      </div>
    </div>
  );
  return <AuthComponent child={widget} />;
};

export default EventsPage;
