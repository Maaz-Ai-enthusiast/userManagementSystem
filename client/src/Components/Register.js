import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getAllUsers } from "../redux/reducers/userSlice";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [input, setInput] = useState({
    name: "",
    email: "",
    gender: "",
    city: "",
  });

  const [file, setFile] = useState(null); // Initialize file as null instead of an array

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a new FormData object for the form data
    const formdata = new FormData();
    formdata.append("name", input.name);
    formdata.append("email", input.email);
    formdata.append("gender", input.gender);
    formdata.append("city", input.city);
    if (file) formdata.append("profile", file);

    try {
      // Post the form data to the server
      await axios.post("http://localhost:5000/api/v1/users", formdata);

      // Dispatch to update users list in Redux store
      dispatch(getAllUsers());

      // Navigate to the home page after successful submission
      navigate("/");
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  return (
    <div className="container flex items-center justify-content-center">
      <h2 className="text-center text-white p-2 m-2" style={{ backgroundColor: "blue" }}>
        Add New User
      </h2>

      <form className="p-2 m-2" onSubmit={handleSubmit}>
        <div className="form-group m-3">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="Enter Name"
            value={input.name}
            name="name"
            onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
          />
        </div>
        <div className="form-group m-3">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Enter Email"
            value={input.email}
            name="email"
            onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
          />
        </div>
        <label htmlFor="gender">Gender</label>
        <div className="form-group">
          <div className="form-check form-check-inline m-3">
            <input
              className="form-check-input"
              type="radio"
              id="male"
              value="Male"
              name="gender"
              checked={input.gender === "Male"}
              onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
            />
            <label className="form-check-label" htmlFor="male">
              Male
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              id="female"
              value="Female"
              name="gender"
              checked={input.gender === "Female"}
              onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
            />
            <label className="form-check-label" htmlFor="female">
              Female
            </label>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="city">City</label>
          <select
            className="form-select m-2"
            name="city"
            value={input.city}
            onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
          >
            <option value="Faisalabad">Faisalabad</option>
            <option value="Lahore">Lahore</option>
            <option value="Islamabad">Islamabad</option>
            <option value="Rawalpindi">Rawalpindi</option>
          </select>
        </div>
        <div className="form-group m-3">
          <label htmlFor="profile">Profile</label>
          <input
            type="file"
            name="profile"
            onChange={(e) => setFile(e.target.files[0])}
            className="form-control"
            id="profile"
            placeholder="Upload Profile"
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
        <Link to={"/"}>
          <button className="btn btn-danger m-3">Cancel</button>
        </Link>
      </form>
    </div>
  );
};

export default Register;
