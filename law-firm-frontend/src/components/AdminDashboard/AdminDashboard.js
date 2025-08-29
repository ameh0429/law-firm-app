// import React, { useState } from 'react';
// import TeamList from './TeamList';
// import AddTeamMemberModal from './AddTeamMemberModal'; 

// function AdminDashboard() {
//   const [showModal, setShowModal] = useState(false);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const formData = new FormData(e.target);
//     const newMember = {
//       name: formData.get('name'),
//       specialty: formData.get('specialty'),
//       experience: formData.get('experience'),
//       profileImage: formData.get('profileImage'),
//     };
//     console.log('New Team Member:', newMember);
//     setShowModal(false);
//   };

//   return (
//     <div className="admin-dashboard">
//       <h2>Welcome to the Admin Dashboard</h2>
//       <button onClick={() => setShowModal(true)} className="add-button">
//         Add Team Member
//       </button>

//       <AddTeamMemberModal
//         showModal={showModal}
//         setShowModal={setShowModal}
//         handleSubmit={handleSubmit}
//       />

//       <TeamList />
//     </div>
//   );
// }

// export default AdminDashboard;

import React, { useState } from 'react';
import TeamList from './TeamList';
import AddTeamMemberModal from './AddTeamMemberModal';
import EditTeamMemberModal from './EditTeamMemberModal';

function AdminDashboard() {
  const [showModal, setShowModal] = useState(false);
  const [refreshTeam, setRefreshTeam] = useState(false); // trigger re-fetch in TeamList

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const token = localStorage.getItem('token');

    try {
      const res = await fetch('http://localhost:5000/api/team', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData
      });

      const data = await res.json();

      if (res.ok) {
        alert('Team member added successfully');
        form.reset();
        setShowModal(false);
        setRefreshTeam(prev => !prev); // trigger refresh
      } else {
        alert(data.message || 'Failed to add team member');
      }
    } catch (err) {
      console.error('Error submitting form:', err);
      alert('Server error');
    }
  };
  const [selectedMember, setSelectedMember] = useState(null);
const [showEditModal, setShowEditModal] = useState(false);

const handleEditClick = (member) => {
  setSelectedMember(member);
  setShowEditModal(true);
};
const handleEditSubmit = async (formData) => {
  const token = localStorage.getItem('token');

  try {
    const res = await fetch(`http://localhost:5000/api/team/${selectedMember._id}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: formData
    });

    const data = await res.json();
    if (res.ok) {
      alert('Team member updated successfully');
      setShowEditModal(false);
      setRefreshTeam(prev => !prev); // refresh list
    } else {
      alert(data.message || 'Update failed');
    }
  } catch (err) {
    console.error('Edit error:', err);
    alert('Server error');
  }
};

  return (
    <div className="admin-dashboard">
      <h2>Welcome to the Admin Dashboard</h2>

      <button onClick={() => setShowModal(true)} className="add-button">
        Add Team Member
      </button>

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

      <TeamList 
      refreshTrigger={refreshTeam}
      onEdit={handleEditClick}
 />
    </div>
  );
}

export default AdminDashboard;