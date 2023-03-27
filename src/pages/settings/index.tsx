import React from "react";
import { AuthContext } from "../../components/authProvider";
import AuthComponent from "../../components/layout/authComp";
import Header from "../../components/layout/header";
import api from "../../util/api";
import User, { toUser } from "../../data/User";
import UpdateUserForm from "../../components/forms/userUpdateForm";
import Head from "next/head";
import ChangePassword from "@/components/forms/change-password";

function Settings() {
  const authContext = React.useContext(AuthContext);
  const [user, setUser] = React.useState<User>(undefined!);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | undefined>();
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
          console.log("error", res.data);
        }
      })
      .catch((err) => {
        console.log("error");
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  const widget = loading ? (
    <>{loading}</>
  ) : (
    <div className="root" style={{ margin: "100px" }}>
      <Head>
        <title>Home</title>
      </Head>
      <Header pageName={"Settings"} />

      {/* NavTabs */}
      <ul className="nav nav-tabs" id="myTab" role="tablist">
        <li className="nav-item" role="presentation">
          <button
            className="nav-link active"
            id="home-tab"
            data-bs-toggle="tab"
            data-bs-target="#home-tab-pane"
            type="button"
            role="tab"
            aria-controls="home-tab-pane"
            aria-selected="true"
          >
            Edit Profile
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className="nav-link"
            id="profile-tab"
            data-bs-toggle="tab"
            data-bs-target="#profile-tab-pane"
            type="button"
            role="tab"
            aria-controls="profile-tab-pane"
            aria-selected="false"
          >
            Password
          </button>
        </li>
        {/* <li className="nav-item" role="presentation">
          <button
            className="nav-link"
            id="contact-tab"
            data-bs-toggle="tab"
            data-bs-target="#contact-tab-pane"
            type="button"
            role="tab"
            aria-controls="contact-tab-pane"
            aria-selected="false"
          >
            Ticket Form
          </button>
        </li> */}
      </ul>
      <div className="tab-content" id="myTabContent">
        <div
          className="tab-pane fade show active"
          id="home-tab-pane"
          role="tabpanel"
          aria-labelledby="home-tab"
          tabIndex={0}
        >
          <UpdateUserForm user={user} />
        </div>
        <div
          className="tab-pane fade"
          id="profile-tab-pane"
          role="tabpanel"
          aria-labelledby="profile-tab"
          tabIndex={0}
        >
          <div className="card mt-4" style={{ width: "100%" }}>
            <ChangePassword />
          </div>
        </div>
        {/* <div
          className="tab-pane fade"
          id="contact-tab-pane"
          role="tabpanel"
          aria-labelledby="contact-tab"
          tabIndex={0}
        >
          ...
        </div>
        <div
          className="tab-pane fade"
          id="disabled-tab-pane"
          role="tabpanel"
          aria-labelledby="disabled-tab"
          tabIndex={0}
        >
          ...
        </div> */}
      </div>
    </div>
  );
  return <AuthComponent child={widget} />;
}

export default Settings;
