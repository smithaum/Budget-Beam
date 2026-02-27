import React, { useContext, useState } from "react";
import API from "../api";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import PrivateNavbar from "../components/PrivateNavbar";
import "../styles/EditProfile.css";

function EditProfile() {
  const { user, token, setUser, logout } = useContext(AuthContext);
  const [name, setName] = useState(user?.name || "");
  const navigate = useNavigate();

  // ✅ UPDATE PROFILE
  const handleSave = async () => {
    try {
      const res = await API.put(
        "/auth/profile",
        { name },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUser(res.data);
      alert("Profile updated!");
      navigate("/dashboard");
    } catch (err) {
      console.log(err.response?.data || err.message);
      alert("Update failed");
    }
  };

  // ✅ DELETE ACCOUNT (FIXED)
 const handleDelete = async () => {
  if (!window.confirm("Are you sure? This cannot be undone.")) return;

  try {
    await API.delete("/auth/delete", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Clear auth state
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    // Redirect to signup page
    navigate("/signup");

  } catch (err) {
    alert("Delete failed");
  }
};

  return (
    <>
      <PrivateNavbar />

      <div className="edit-profile-wrapper">
        <div className="edit-profile-card">

          <div className="profile-avatar">
            {user?.name?.charAt(0).toUpperCase()}
          </div>

          <h2>Your Profile</h2>

          <div className="profile-field">
            <span className="profile-label">Email</span>
            <div className="profile-email">
              {user?.email}
            </div>
          </div>

          <div className="profile-field">
            <span className="profile-label">Username</span>
            <input
              type="text"
              className="profile-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <button className="profile-save" onClick={handleSave}>
            Save Changes
          </button>

          <button className="profile-delete" onClick={handleDelete}>
            Delete Account
          </button>

        </div>
      </div>
    </>
  );
}

export default EditProfile;