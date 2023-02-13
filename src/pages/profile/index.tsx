import Link from "next/link";
import Image from "next/image";
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
import React from "react";
import { AuthContext } from "../../components/authProvider";
import AuthComponent from "../../components/layout/authComp";
import verified from "../../../assets/verified-black.png";
import style from "../../../styles/profile.module.css";
import Header from "../../components/layout/header";
import UserProfileCard from "../../components/UserProfileCard";

function Profile() {
  const authContext = React.useContext(AuthContext);
  const widget = (
    <div className="root" style={{ margin: "100px" }}>
      <title>Profile</title>
      <Header pageName={"Profile"} />
      {/* Profile Card */}
      <UserProfileCard />
    </div>
  );
  return <AuthComponent child={widget} />;
}

export default Profile;
