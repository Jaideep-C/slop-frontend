import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import student from "../../../assets/student.png";
import "flatpickr/dist/themes/material_green.css";
import Flatpickr from "react-flatpickr";
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
import { date } from "yup";
import Event from "../../data/Event";
import api from "../../util/api";
import { useRouter } from "next/router";
import moment from "moment";
import EventForm from "../../components/forms/eventForm";

function Submit() {
  const authContext = React.useContext(AuthContext);
  const [event, setEvent] = React.useState<Event>(new Event());
  const router = useRouter();
  const onFormSubmit = async () => {
    const res = await api.post("/events", event, {
      headers: { Authorization: "Bearer " + authContext.authState },
    });
    if (res.status === 200) await router.push("/events");
    else {
      if (res.data.errors) throw new Error(JSON.stringify(res.data.errors));
      else if (res.data.message) throw new Error(res.data.message);
    }
  };

  const widget = (
    <div className="root" style={{ margin: "100px" }}>
      <Header pageName={"Clubs"} />
      <EventForm
        event={event}
        setEvent={setEvent}
        onFormSubmit={onFormSubmit}
      />
    </div>
  );
  return <AuthComponent child={widget} />;
}

export default Submit;
