import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TeamList from "./TeamList";
import AddTeamMemberModal from "./AddTeamMemberModal";
import EditTeamMemberModal from "./EditTeamMemberModal";

function AdminDashboard() {
  const [showModal, setShowModal] = useState(false);
  const [refreshTeam, setRefreshTeam] = useState(false); // trigger re-fetch in TeamList
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const token = localStorage.getItem("token");

    const API_BASE_URL =
      process.env.REACT_APP_API_URL || "http://localhost:5000/api";
    try {
      const res = await fetch(`${API_BASE_URL}/api/team`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        alert("Team member added successfully");
        form.reset();
        setShowModal(false);
        setRefreshTeam((prev) => !prev); // trigger refresh
      } else {
        alert(data.message || "Failed to add team member");
      }
    } catch (err) {
      console.error("Error submitting form:", err);
      alert("Server error");
    }
  };
  const [selectedMember, setSelectedMember] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const handleEditClick = (member) => {
    setSelectedMember(member);
    setShowEditModal(true);
  };
  const handleEditSubmit = async (formData) => {
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(
        `http://localhost:5000/api/team/${selectedMember._id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const data = await res.json();
      if (res.ok) {
        alert("Team member updated successfully");
        setShowEditModal(false);
        setRefreshTeam((prev) => !prev); // refresh list
      } else {
        alert(data.message || "Update failed");
      }
    } catch (err) {
      console.error("Edit error:", err);
      alert("Server error");
    }
  };

  return (
    <div className="admin-dashboard">
      <h2>Welcome to the Admin Dashboard</h2>

      <div className="admin-actions">
        <button onClick={() => setShowModal(true)} className="add-button">
          Add Team Member
        </button>
        <button
          onClick={() => navigate("/admin/blogs")}
          className="manage-button"
        >
          Manage Blog Posts
        </button>
      </div>

      <AddTeamMemberModal
        showModal={showModal}
        setShowModal={setShowModal}
        handleSubmit={handleSubmit}
      />

      <EditTeamMemberModal
        member={selectedMember}
        showModal={showEditModal}
        setShowModal={setShowEditModal}
        handleSubmit={handleEditSubmit}
      />

      <TeamList refreshTrigger={refreshTeam} onEdit={handleEditClick} />
    </div>
  );
}

export default AdminDashboard;
