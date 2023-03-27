import React, { ChangeEvent, useEffect, useState } from "react";
import User from "../../data/User";
import api from "../../util/api";
import { AuthContext } from "../authProvider";

type Body = {
  fullName: string;
  bio: string;
  userSpecialization: string;
  userSchool: string;
};
const UpdateUserForm: React.FC<{ user: User }> = ({ user }) => {
  const authContext = React.useContext(AuthContext);
  const [formdata, setFormdata] = useState<FormData>(
    (() => {
      const formdata = new FormData();
      formdata.append(
        "body",
        JSON.stringify({
          fullName: user.fullName,
          bio: user.bio,
          userSpecialization: user.userSpecilization,
          userSchool: user.userSchool,
        })
      );
      formdata.append("profilePicture", "");
      return formdata;
    })()
  );
  const [err, setErr] = useState<string>("");
  const [specializationList, setSpecializationList] = useState<string[]>([
    "Select a specialization",
  ]);
  const [body, setBody] = useState<Body>({
    fullName: user.fullName,
    bio: user.bio,
    userSpecialization: user.userSpecilization ?? "Select specialization",
    userSchool: user.userSchool ?? "Select school",
  });
  const schoolList = ["Select school", "GST", "GSB", "GSC"];
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file)
      setFormdata((prev) => {
        prev.append("profilePicture", file);
        return prev;
      });
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name, value } = e.currentTarget;
    setBody({ ...body, [name]: value });
  };
  const onSubmit = async () => {
    const res = await api.patch(`/users/${authContext.userId}`, formdata, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${authContext.authState}`,
      },
    });
    if (res.status === 200) {
    } else {
      setErr(res.data.message);
    }
  };
  const validateBody = (body: Body) => {
    if (body.bio.length < 3) {
      setErr("Bio must be at least 3 characters long");
      return false;
    }
    if (body.userSchool === "Select school") {
      setErr("Please select a school");
      return false;
    }
    if (body.userSpecialization === "Select specialization") {
      setErr("Please select a specialization");
      return false;
    }
    return true;
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateBody(body)) await onSubmit();
  };
  useEffect(() => {
    setFormdata((prev) => {
      prev.delete("body");
      prev.append("body", JSON.stringify(body));
      return prev;
    });
    switch (body.userSchool) {
      case "GST":
        setSpecializationList([
          "Select specialization",
          "CSE",
          "EEE",
          "ME",
          "ECE",
          "CE",
        ]);
        break;
      case "GSB":
        setSpecializationList(["Select specialization", "BBA", "BBS"]);
        break;
      case "GSC":
        setSpecializationList(["Select specialization", "BSC", "MSC"]);
        break;
    }
  }, [body]);
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="fullName" className="form-label">
            Full Name
          </label>
          <input
            type="text"
            className="form-control"
            name="fullName"
            defaultValue={body.fullName}
          />
        </div>
        <div>
          <label htmlFor="bio" className="form-label">
            Bio
          </label>
          <input
            type="text"
            className="form-control"
            name="bio"
            defaultValue={body.bio}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="profilePicture" className="form-label">
            Profile Picture
          </label>
          <input
            type="file"
            className="form-control"
            name="profilePicture"
            onChange={handleFileChange}
          />
        </div>
        <div>
          <label htmlFor="userSchool" className="form-label">
            School
          </label>
          <select
            name="userSchool"
            className="form-control"
            onChange={(e) => {
              const { name, value } = e.currentTarget;
              setBody({ ...body, [name]: value });
            }}
            defaultValue={body.userSchool}
          >
            {schoolList.map((s) => {
              return (
                <option value={s} key={s}>
                  {s}
                </option>
              );
            })}
          </select>
        </div>
        <div>
          <label htmlFor="userSpecialization" className="form-label">
            Specialization
          </label>
          <select
            name="userSpecialization"
            className="form-control"
            defaultValue={body.userSpecialization}
            onChange={(e) => {
              const { name, value } = e.currentTarget;
              setBody({ ...body, [name]: value });
            }}
          >
            {specializationList.map((s) => {
              return <option value={s}>{s}</option>;
            })}
          </select>
        </div>
        {err ? <div className="text-danger">{err}</div> : <></>}
        <br />
        <button className="btn btn-light">submit</button>
      </form>
    </>
  );
};

export default UpdateUserForm;
