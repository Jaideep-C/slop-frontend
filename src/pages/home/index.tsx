import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import student from "../../../assets/student.png";
import user from "../../../assets/user.png";
import React from "react";
import { AuthContext } from "../../components/authProvider";
import AuthComponent from "../../components/layout/authComp";
import style from "../../../styles/profile.module.css";
import Header from "../../components/layout/header";

function Home() {
  const authContext = React.useContext(AuthContext);
  const widget = (
    <>
      <title>Home</title>
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
                  <a className="dropdown-item text-light" href="#">
                    Ongoing
                  </a>
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
              <button className="btn btn-light px-5">Hot</button>
            </div>
          </div>
        </div>

        <div className="container-md px-4 text-center">
          {/* Left Content */}
          <div className="row gx-5">
            <div className="col">
              <div className="p-3">Left</div>
            </div>

            {/* Card */}
            <div className="col">
              <div className="p-3">
                <div className="card" style={{ width: "40rem" }}>
                  <div className="card-body">
                    <h5 className="card-title">Card title</h5>
                    <h6 className="card-subtitle mb-2 text-muted">
                      Card subtitle
                    </h6>
                    <p className="card-text">
                      Some quick example text to build on the card title and
                      make up the bulk of the cards content.
                    </p>
                    <a href="#" className="card-link">
                      Card link
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Content */}
            <div className="col">
              <div className="p-3">Right</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  return <AuthComponent child={widget} />;
}

export default Home;
