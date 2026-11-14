import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useComplaints } from '../../context/ComplaintContext';
import { CATEGORIES } from '../../data/mockData';
import ceilingFanSvg from '../../assets/ceiling-fan.svg';

const RegisterComplaint = ({ onNavigate }) => {
  const { currentUser } = useAuth();
  const { addComplaint } = useComplaints();

  const [formData, setFormData] = useState({
    title: '',
    category: '',
    location: '',
    description: '',
    image: ''
  });
  const [fileName, setFileName] = useState('No file chosen');
  const [error, setError] = useState('');
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUseSampleFanImage = () => {
    setFormData((prev) => ({ ...prev, image: ceilingFanSvg }));
    setFileName('classroom_fan_photo.jpg');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!formData.title.trim()) {
      setError('Please enter a Complaint Title');
      return;
    }
    if (!formData.category) {
      setError('Please select a Category');
      return;
    }
    if (!formData.location.trim()) {
      setError('Please enter the Location');
      return;
    }
    if (!formData.description.trim()) {
      setError('Please provide a Description of the issue');
      return;
    }

    // Add complaint via context
    addComplaint(formData, currentUser);
    setSubmittedSuccess(true);

    setTimeout(() => {
      onNavigate('my-complaints');
    }, 1200);
  };

  return (
    <div className="cc-content-container">
      {/* Header */}
      <div className="cc-page-header">
        <h1 className="cc-page-title">Register a New Complaint</h1>
        <p className="cc-page-subtitle">
          Fill in the details below to submit your complaint.
        </p>
      </div>

      {submittedSuccess && (
        <div className="alert alert-success d-flex align-items-center gap-2 mb-4 p-3 rounded-3">
          <i className="bi bi-check-circle-fill fs-5"></i>
          <div>
            <strong>Complaint Submitted Successfully!</strong> Redirecting to My Complaints...
          </div>
        </div>
      )}

      {error && (
        <div className="alert alert-danger py-2 px-3 mb-4 rounded-3 small">
          {error}
        </div>
      )}

      {/* Form Card */}
      <div className="cc-form-card">
        <form onSubmit={handleSubmit}>
          {/* Complaint Title */}
          <div className="cc-form-field">
            <label className="cc-label">
              Complaint Title<span className="cc-req-star">*</span>
            </label>
            <input
              type="text"
              name="title"
              className="cc-input-text"
              placeholder="Enter a short title (e.g. Broken Fan)"
              value={formData.title}
              onChange={handleChange}
            />
          </div>

          {/* Category */}
          <div className="cc-form-field">
            <label className="cc-label">
              Category<span className="cc-req-star">*</span>
            </label>
            <select
              name="category"
              className="cc-select"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="">Select Category</option>
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Location */}
          <div className="cc-form-field">
            <label className="cc-label">
              Location<span className="cc-req-star">*</span>
            </label>
            <input
              type="text"
              name="location"
              className="cc-input-text"
              placeholder="e.g. Block A, Classroom 101, Library"
              value={formData.location}
              onChange={handleChange}
            />
          </div>

          {/* Description */}
          <div className="cc-form-field">
            <label className="cc-label">
              Description<span className="cc-req-star">*</span>
            </label>
            <textarea
              name="description"
              className="cc-textarea"
              placeholder="Describe the issue in detail..."
              value={formData.description}
              onChange={handleChange}
            ></textarea>
          </div>

          {/* Upload Image (Optional) */}
          <div className="cc-form-field">
            <label className="cc-label">Upload Image (Optional)</label>
            <div className="cc-file-upload-box">
              <label htmlFor="complaint-file-input" className="cc-file-btn m-0">
                Choose File
              </label>
              <input
                id="complaint-file-input"
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={handleFileChange}
              />
              <span className="cc-file-name">{fileName}</span>

              <button
                type="button"
                className="btn btn-sm btn-outline-secondary ms-auto text-light small py-1 px-2"
                style={{ fontSize: '0.8rem' }}
                onClick={handleUseSampleFanImage}
              >
                Use Sample Fan Photo
              </button>
            </div>
            <p className="cc-file-helper">
              You can upload a photo related to the issue (max 5MB).
            </p>

            {formData.image && (
              <div className="mt-2">
                <img
                  src={formData.image}
                  alt="Preview"
                  className="cc-image-preview-thumb"
                />
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="d-flex justify-content-end mt-4">
            <button
              type="submit"
              className="cc-btn-yellow"
              style={{ width: 'auto', minWidth: '190px' }}
            >
              <i className="bi bi-send-fill"></i>
              <span>Submit Complaint</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterComplaint;
