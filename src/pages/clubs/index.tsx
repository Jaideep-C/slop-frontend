import Club, { toClubList } from "../../data/Club";
import React, { ReactNode, useEffect, useState } from "react";
import { AuthContext } from "../../components/authProvider";
import AuthComponent from "../../components/layout/authComp";
import Header from "../../components/layout/header";
import Head from "next/head";
import api from "../../util/api";
import Image from "next/image";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";

function Clubs() {
  const authContext = React.useContext(AuthContext);
  const [clubs, setClubs] = useState<Club[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api
      .get("/clubs", {
        headers: { Authorization: `Bearer ${authContext.authState}` },
      })
      .then((res) => {
        if (res.status === 200) {
          const clubs = toClubList(res.data.clubs);
          console.log(clubs);
          setClubs(() => [...clubs]);
        } else {
          console.log("error", res);
          alert(JSON.stringify(res));
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  const clubsList = clubs.map((club) => (
    <Link href={`/clubs/${club.clubSlug}`} key={club.clubSlug}>
      <a
        className="card my-2 mx-4 col"
        style={{
          maxWidth: "18rem",
          textDecoration: "none",
          color: "inherit",
        }}
      >
        <Image
          width={"100px"}
          height={"150px"}
          className="card-img-top"
          src={`http://localhost:8080/api/images/${club.profilePicture}`}
          alt="Card image cap"
        />
        <div className="card-body">
          <h5 className="card-title">{club.clubName}</h5>
          <p className="card-text">{club.clubDescription}</p>
        </div>
      </a>
    </Link>
  ));
  const widget = (
    <>
      <Head>
        <title>Clubs</title>
      </Head>
      <Header pageName={"Clubs"} />
      <br />
      <br />
      <br />
      <div className="row mx-3">
        {clubs ? (
          clubsList
        ) : (
          <Skeleton
            height={"500px"}
            width={"500px"}
            baseColor="grey"
            highlightColor="white"
          />
        )}
      </div>
    </>
  );
  return <AuthComponent child={widget} />;
}

export default Clubs;
