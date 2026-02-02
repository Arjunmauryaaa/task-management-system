import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

import Navbar from "../components/Navbar";

export default function Profile() {
  const { user } = useContext(AuthContext);

  return (
    <>
      <Navbar />
      <h2>Profile</h2>
      <p>Name: {user?.name}</p>
      <p>Email: {user?.email}</p>
    </>
  );
}
