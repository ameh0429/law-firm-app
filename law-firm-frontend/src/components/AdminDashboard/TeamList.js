// // components/TeamList.js
// import React, { useEffect, useState } from 'react';

// function TeamList() {
//   const [team, setTeam] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const token = localStorage.getItem('adminToken');

//   useEffect(() => {
//     fetch('http://localhost:5000/api/team')
//       .then(res => res.json())
//       .then(data => {
//         setTeam(data.data);
//         setLoading(false);
//       })
//       .catch(err => {
//         console.error('Error fetching team:', err);
//         setLoading(false);
//       });
//   }, []);

//   const handleDelete = async (id) => {
//     if (!window.confirm('Are you sure you want to delete this team member?')) return;

//     try {
//       const res = await fetch(`http://localhost:5000/api/team/${id}`, {
//         method: 'DELETE',
//         headers: {
//           'Authorization': `Bearer ${token}`
//         }
//       });

//       const result = await res.json();
//       if (result.success) {
//         setTeam(prev => prev.filter(member => member._id !== id));
//         alert('Team member deleted successfully');
//       } else {
//         alert(result.message || 'Failed to delete');
//       }
//     } catch (err) {
//       console.error('Delete error:', err);
//       alert('Server error');
//     }
//   };

//   if (loading) return <p>Loading team members...</p>;

//   return (
//     <section className="admin-team-list">
//       <h2>Manage Team Members</h2>
//       <div className="team-grid">
//         {team && team.map(member => (
//           <div key={member._id} className="team-card">
//             <img src={member.photoUrl} alt={member.name} />
//             <h3>{member.name}</h3>
//             <p><strong>{member.specialty}</strong></p>
//             <p>{member.bio}</p>
//             <div className="actions">
//               <button onClick={() => alert('Edit coming soon')}>Edit</button>
//               <button onClick={() => handleDelete(member._id)}>Delete</button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }

// export default TeamList;

import React, { useEffect, useState } from 'react';

function TeamList({ refreshTrigger, onEdit }) {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');

  useEffect(() => {
    setLoading(true);
    fetch('http://localhost:5000/api/team')
      .then(res => res.json())
      .then(data => {
        setTeam(data.data || []);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching team:', err);
        setTeam([]);
        setLoading(false);
      });
  }, [refreshTrigger]); // 👈 re-run when refreshTrigger changes

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this team member?')) return;

    try {
      const res = await fetch(`http://localhost:5000/api/team/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const result = await res.json();
      if (result.success) {
        setTeam(prev => prev.filter(member => member._id !== id));
        alert('Team member deleted successfully');
      } else {
        alert(result.message || 'Failed to delete');
      }
    } catch (err) {
      console.error('Delete error:', err);
      alert('Server error');
    }
  };

  if (loading) return <p>Loading team members...</p>;

  return (
    <section className="admin-team-list">
      <h2>Manage Team Members</h2>
      <div className="team-grid">
        {team.map(member => (
          <div key={member._id} className="team-card">
            <img src={member.photoUrl} alt={member.name} className="profile-photo"
/>
            <h3>{member.name}</h3>
            <p><strong>{member.specialty}</strong></p>
            <p>{member.bio}</p>
            <div className="actions">
              <button onClick={() => onEdit(member)}>Edit</button>
              <button onClick={() => handleDelete(member._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default TeamList;