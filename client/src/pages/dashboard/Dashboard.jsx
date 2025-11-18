import React from "react";
import useUserToken from "../../context/userTokenStore";
import { LogoutApi } from "../../api/userAuth/invokeLogout.api";
import useUserStore from "../../context/userStore";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { user } = useUserStore();
  const navigate = useNavigate()
  const handleSubmit = async () => {
    const respone = await LogoutApi(navigate)
  }
  return (
    <div style={{ maxWidth: 400, margin: "4rem auto", padding: "2rem", border: "1px solid #ddd", borderRadius: "1rem", fontFamily: "sans-serif" }}>
      <h2>Dashboard</h2>
      <p><strong>Username:</strong> {user?.username}</p>
      <p><strong>Email:</strong> {user?.email}</p>
      <button
        onClick={handleSubmit}
        style={{ width: "100%", padding: "0.75rem", borderRadius: "0.5rem", background: "#e63946", color: "#fff", border: "none", cursor: "pointer", marginTop: "1rem" }}
      >
        Logout
      </button>
    </div>
  );
}
