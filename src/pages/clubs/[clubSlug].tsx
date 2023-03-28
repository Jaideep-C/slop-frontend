import { Router, useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from "next/image";
import gstudio from "../../../assets/gstudio.png";
import Header from "../../components/layout/header";
import api from "@/util/api";
import { AuthContext } from "@/components/authProvider";
import React from "react";
import Club, { toClub } from "@/data/Club";
import { getImageLink } from "@/util/image";
import Event from "@/data/Event";
import { EventPost } from "@/components/Post";
import AuthComponent from "@/components/layout/authComp";

function ClubHomePage() {
  const authContext = React.useContext(AuthContext);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [follow, setFollow] = useState("Follow");
  const [followUI, setFollowUI] = useState("btn btn-outline-primary");
  const router = useRouter();
  const [club, setClub] = useState<Club>(undefined!);
  useEffect(() => {
    if (!club) return;
    if (club.userIsFollowing) {
      setFollow("Unfollow");
      setFollowUI("btn btn-outline-dark");
    } else {
      setFollow("Follow");
      setFollowUI("btn btn-outline-primary");
    }
  }, [club, club?.userIsFollowing]);
  useEffect(() => {
    if (!router.isReady) return;
    console.log("res");
    setLoading(true);
    api
      .get(`/clubs/${router.query.clubSlug}`, {
        headers: { Authorization: `Bearer ${authContext.authState}` },
      })
      .then((res) => {
        console.log(res.data);
        if (res.status === 200) {
          const club = toClub(res.data);
          setClub(club);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [router.isReady]);
  if (loading) return <h1>Loading...</h1>;
  if (error || !club) return <h1>Error {error}</h1>;
  const handleFollow = async () => {
    setClub((prevClub) => {
      return { ...prevClub, userIsFollowing: true };
    });
    const res = await api.post(
      `/users/${authContext.userId}/follow-club/${club.id}`,
      {},
      { headers: { Authorization: `Bearer ${authContext.authState}` } }
    );
    if (res.status === 200) return;
    setClub((prevClub) => {
      return { ...prevClub, userIsFollowing: false };
    });
  };
  const handleUnFollow = async () => {
    setClub((prevClub) => {
      return { ...prevClub, userIsFollowing: false };
    });
    const res = await api.delete(
      `/users/${authContext.userId}/unfollow-club/${club.id}`,
      { headers: { Authorization: `Bearer ${authContext.authState}` } }
    );
    if (res.status === 200) return;
    setClub((prevClub) => {
      return { ...prevClub, userIsFollowing: true };
    });
  };
  return (
    <div>
      <Header pageName={club.clubName} />
      <br />
      <br />
      <br />

      <div className="card mb-3 m-3">
        <div className="row g-0">
          <div className="col-md-4">
            <Image
              height="200px"
              width="200px"
              className="card-img-top"
              src={getImageLink(club.profilePicture)}
              alt="Card image cap"
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h1 className="card-title">{club.clubName}</h1>
              <h6 className="card-text">{club.clubDescription}</h6>
              <button
                className={followUI}
                onClick={() => {
                  if (club.userIsFollowing) {
                    handleUnFollow();
                  } else {
                    handleFollow();
                  }
                }}
              >
                {follow}
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* <EventPost event={new default} /> */}
      <ClubEvents events={club.events} />
    </div>
  );
}
const ClubEvents: React.FC<{ events: Event[] }> = ({ events }) => {
  if (events.length === 0) return <h1>No Events</h1>;
  return (
    <div>
      <h1>Events</h1>
      {events.map((event) => (
        <EventPost event={event} key={event.slug} />
      ))}
    </div>
  );
};

export default () => <AuthComponent child={ClubHomePage()} />;
