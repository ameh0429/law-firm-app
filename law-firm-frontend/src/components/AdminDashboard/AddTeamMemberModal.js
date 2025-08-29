import React from 'react';
import './styles/modal.css';

const AddTeamMemberModal = ({ showModal, setShowModal, handleSubmit }) => {
  if (!showModal) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Add Team Member</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Name" required />
          <input type="text" name="specialty" placeholder="Specialty" required />
          <input type="text" name="bio" placeholder="Bio" required />
          <input type="file" name="profileImage" accept="image/*" />
          <div className="modal-buttons">
            <button type="submit">Save</button>
            <button type="button" onClick={() => setShowModal(false)}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTeamMemberModal;