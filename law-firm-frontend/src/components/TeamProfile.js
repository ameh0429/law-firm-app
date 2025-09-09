// components/teamProfile.js
import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";

function TeamProfile() {
  const { teamId } = useParams();
  const [member, setMember] = useState(null);

  const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

   useEffect(() => {
    fetch(`${API_BASE_URL}/api/team/${teamId}`)
      .then(res => res.json())
      .then(data => setMember(data.data))
      .catch(err => console.error('Error fetching profile:', err));
  }, [teamId]);

    if (!member) return <p>Loading profile...</p>;


  return (
    <div className="team-profile">
      <img src={member.photoUrl} alt={member.name} className="profile-photo" />
      <h2>{member.name}</h2>
      <p><strong> {member.specialty}</strong></p>
      <p><strong></strong> {member.bio}</p>
    </div>
  );
}

export default TeamProfile;
