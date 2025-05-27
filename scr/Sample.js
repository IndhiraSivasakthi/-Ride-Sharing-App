import React, { useState } from "react";
import DatePicker from "react-datepicker";
import TimePicker from "react-time-picker"; 
import "react-datepicker/dist/react-datepicker.css";
import { ChromePicker } from "react-color";
import "./index.css";



export default function MyForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    age: "",
    gender: "",
    country: "",
    message: "",
    agreement: false,
    sports: [],
    dateOfBirth: null,
    favoriteColor: "#000000",
    profilePicture: null,
    rating: 0,
    toggle: false,
    range: 0,
    selectedTime: "12:00",
    hobbies: [],
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    const newValue = type === "checkbox" ? checked : type === "file" ? files[0] : value;
    setFormData({ ...formData, [name]: newValue });
  };

  
  const handleHobbiesChange = (selectedHobbies) => {
    setFormData({ ...formData, hobbies: selectedHobbies });
  };
  
  const handleSportsChange = (e) => {
    const { value, checked } = e.target;
    const updatedSports = checked
      ? [...formData.sports, value]
      : formData.sports.filter((sport) => sport !== value);
    setFormData({ ...formData, sports: updatedSports });
  };
  const handleTimeChange = (selectedTime) => {
    setFormData({ ...formData, selectedTime });
  };


  const handleDateChange = (date) => {
    setFormData({ ...formData, dateOfBirth: date });
  };

  const handleColorChange = (color) => {
    setFormData({ ...formData, favoriteColor: color.hex });
  };

  const handleRatingChange = (ratingValue) => {
    setFormData({ ...formData, rating: ratingValue });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic here to handle form submission
    alert("Form submitted successfully!");
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className={`star ${i <= formData.rating ? 'active' : ''}`}
          onClick={() => handleRatingChange(i)}
        >
          &#9733;
        </span>
      );
    }
    return stars;
  };

  return (
    <div className="container">
      <h2 className="heading">Sports Management System</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="input-group">
          <label className="label">First Name:</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="input"
          />
        </div>
        <div className="input-group">
          <label className="label">Last Name:</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="input"
          />
        </div>
        <div className="input-group">
          <label className="label">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="input"
          />
        </div>
        <div className="input-group">
          <label className="label">Age:</label>
          <div className="radio-group">
            <label className="radio-label">
              <input
                type="radio"
                name="age"
                value="under18"
                checked={formData.age === "under18"}
                onChange={handleChange}
              />
              <span>Under 18</span>
            </label>
            <label className="radio-label">
              <input
                type="radio"
                name="age"
                value="18to30"
                checked={formData.age === "18to30"}
                onChange={handleChange}
              />
              <span>18 to 30</span>
            </label>
            <label className="radio-label">
              <input
                type="radio"
                name="age"
                value="over30"
                checked={formData.age === "over30"}
                onChange={handleChange}
              />
              <span>Over 30</span>
            </label>
          </div>
        </div>
        <div className="input-group">
          <label className="label">Profile Picture:</label>
          <input
            type="file"
            name="profilePicture"
            onChange={handleChange}
            accept="image/*" // Limit to image files
            className="input"
          />
        </div>
        <div className="input-group">
          <label className="label">Gender:</label>
          <select name="gender" value={formData.gender} onChange={handleChange} className="input">
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="input-group">
          <label className="label">Country:</label>
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
            className="input"
          />
        </div>
        <div className="input-group">
  <label className="label">Hobbies:</label>
  <select
    name="hobbies"
    value={formData.hobbies}
    onChange={(e) => handleHobbiesChange(Array.from(e.target.selectedOptions, (option) => option.value))}
    multiple={true}
    className="input"
  >
    <option value="reading">Reading</option>
    <option value="music">Music</option>
    <option value="gaming">Gaming</option>
    <option value="cooking">Cooking</option>
    {/* Add more options as needed */}
  </select>
</div>

        <div className="input-group">
          <label className="label">Message:</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="textarea"
          ></textarea>
        </div>
        <div className="input-group">
          <label className="label">Sports:</label>
          <div>
            <label className="sports-label">
              <input
                type="checkbox"
                name="sports"
                value="football"
                checked={formData.sports.includes("football")}
                onChange={handleSportsChange}
              />
              Football
            </label>
            <label className="sports-label">
              <input
                type="checkbox"
                name="sports"
                value="basketball"
                checked={formData.sports.includes("basketball")}
                onChange={handleSportsChange}
              />
              Basketball
            </label>
            <label className="sports-label">
              <input
                type="checkbox"
                name="sports"
                value="tennis"
                checked={formData.sports.includes("tennis")}
                onChange={handleSportsChange}
              />
              Tennis
            </label>
          </div>
        </div>
        <div className="input-group">
          <label className="label">Date of Birth:</label>
          <DatePicker
            selected={formData.dateOfBirth}
            onChange={handleDateChange}
            dateFormat="dd/MM/yyyy"
            className="input"
          />
        </div>
        <div className="input-group">
          <label className="label">Toggle Switch:</label>
          <input
            type="checkbox"
            name="toggle"
            checked={formData.toggle}
            onChange={handleChange}
            className="switch"
          />
        </div>
        <div className="input-group">
          <label className="label">Range Slider:</label>
          <input
            type="range"
            name="range"
            min="0"
            max="100"
            value={formData.range}
            onChange={handleChange}
            className="range-slider"
          />
        </div>
        <div className="input-group">
          <label className="label">Favorite Color:</label>
          <ChromePicker
            color={formData.favoriteColor}
            onChange={handleColorChange}
          />
        </div>
        
        <div className="input-group">
          <label className="label">Time Picker:</label>
          <TimePicker
            onChange={handleTimeChange}
            value={formData.selectedTime}
            className="input"
          />
        </div>
        <div className="input-group">
          <label className="label">Rate Your Experience:</label>
          <div className="star-rating">{renderStars()}</div>
        </div>
        <div className="input-group">
          <label style={{ display: "block" }}>
            <input
              type="checkbox"
              name="agreement"
              checked={formData.agreement}
              onChange={handleChange}
              style={{ marginRight: "5px" }}
            />
            I agree to the terms and conditions
          </label>
        </div>
        <button type="submit" className="button">Submit</button>
      </form>
    </div>
  );
}
