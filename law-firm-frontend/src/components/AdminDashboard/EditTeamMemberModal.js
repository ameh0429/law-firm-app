import React, { useEffect, useState } from 'react';
import './styles/modal.css';

function EditTeamMemberModal({ member, showModal, setShowModal, handleSubmit }) {
  const [formValues, setFormValues] = useState({
    name: '',
    specialty: '',
    bio: '',
    profileImage: null
  });

  useEffect(() => {
    if (member) {
      setFormValues({
        name: member.name || '',
        specialty: member.specialty || '',
        bio: member.bio || '',
        profileImage: null
      });
    }
  }, [member]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'profileImage') {
      setFormValues(prev => ({ ...prev, profileImage: files[0] }));
    } else {
      setFormValues(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleLocalSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', formValues.name);
    formData.append('specialty', formValues.specialty);
    formData.append('bio', formValues.bio);
    if (formValues.profileImage) {
      formData.append('profileImage', formValues.profileImage);
    }
    handleSubmit(formData); // passed from AdminDashboard
  };

  if (!showModal) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Edit Team Member</h2>
        <form onSubmit={handleLocalSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formValues.name}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="specialty"
            placeholder="Specialty"
            value={formValues.specialty}
            onChange={handleChange}
            required
          />
          <textarea
            name="bio"
            placeholder="Bio"
            value={formValues.bio}
            onChange={handleChange}
            required
          />
          <input
            type="file"
            name="profileImage"
            accept="image/*"
            onChange={handleChange}
          />
          <div className="modal-buttons">
            <button type="submit">Update</button>
            <button type="button" onClick={() => setShowModal(false)}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditTeamMemberModal;