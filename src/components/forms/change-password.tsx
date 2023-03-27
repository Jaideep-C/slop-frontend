import api from "@/util/api";
import React from "react";
import { AuthContext } from "../authProvider";

export default function ChangePassword() {
  const authContext = React.useContext(AuthContext);
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const onSubmit = async () => {
    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }
    if (password.length >= 5 && password.length <= 32) {
      alert("Password must be atleast 5 characters long");
      return;
    }
    const res = await api.patch(
      `/users/${authContext.userId}/password`,
      { password },
      {
        headers: { Authorization: `Bearer ${authContext.authState}` },
      }
    );
    if (res.status === 200) {
      alert("Password Updated");
    } else {
      alert("something went wrong!");
    }
  };
  return (
    <form
      className="p-3"
      onSubmit={async (e) => {
        e.preventDefault();
        await onSubmit();
      }}
    >
      <h4 className="mb-4">Change Password</h4>
      {/* <div className="mb-4">
        <input
          type="password"
          placeholder="Old Password"
          className="form-control"
          id="exampleInputPassword1"
        />
      </div> */}
      <div className="mb-4">
        <input
          type="password"
          placeholder="New Password"
          className="form-control"
          id="exampleInputPassword1"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </div>
      <div className="mb-4">
        <input
          type="password"
          placeholder="Confirm Password"
          className="form-control"
          id="exampleInputPassword1"
          onChange={(e) => {
            setConfirmPassword(e.target.value);
          }}
        />
      </div>

      <button type="submit" className="btn btn-primary">
        Update
      </button>
    </form>
  );
}
