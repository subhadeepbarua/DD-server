import { useState } from "react";
import axios from 'axios';

const InputForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [designation, setDesignation] = useState("");
  const [gender, setGender] = useState("");
  const [course, setCourse] = useState("");
  const [image, setImage] = useState("");

  const generateUniqueId = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let uniqueId = '';
    for (let i = 0; i < 4; i++) {
      uniqueId += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return uniqueId;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      uniqueId: generateUniqueId(),
      name,
      email,
      mobile,
      designation,
      gender,
      course,
      image,
    };

    try {
      const response = await axios.post("http://localhost:6001/create_employee", formData);
      console.log(response.data);
      if (response.data.error === 'Email already exists!') {
        alert('Employee email already exists!');
      }
      window.location.reload();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-slate-200 rounded-md shadow-md mt-[70px]">
      <h2 className="text-2xl font-semibold mb-4">Input Form</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label htmlFor="name" className="block font-medium">
            Name:
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="input-field p-1"
          />
        </div>
        {/* Email */}
        <div>
          <label htmlFor="email" className="block font-medium">
            Email:
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="input-field p-1"
          />
        </div>
        {/* Mobile No. */}
        <div>
          <label htmlFor="mobile" className="block font-medium">
            Mobile No.:
          </label>
          <input
            type="tel"
            id="mobile"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            required
            className="input-field p-1"
          />
        </div>
        {/* Designation */}
        <div>
          <label htmlFor="designation" className="block font-medium">
            Designation:
          </label>
          <select
            id="designation"
            value={designation}
            onChange={(e) => setDesignation(e.target.value)}
            required
            className="input-field"
          >
            <option value="">Select</option>
            <option value="HR">HR</option>
            <option value="Manager">Manager</option>
            <option value="Sales">Sales</option>
          </select>
        </div>
        {/* Gender */}
        <div>
          <label className="block font-medium">Gender:</label>
          <div className="flex items-center space-x-4">
            <label htmlFor="male" className="inline-flex items-center">
              <input
                type="radio"
                id="male"
                value="Male"
                checked={gender === "Male"}
                onChange={() => setGender("Male")}
              />
              <span className="ml-2">Male</span>
            </label>
            <label htmlFor="female" className="inline-flex items-center">
              <input
                type="radio"
                id="female"
                value="Female"
                checked={gender === "Female"}
                onChange={() => setGender("Female")}
              />
              <span className="ml-2">Female</span>
            </label>
          </div>
        </div>
        {/* Course */}
        <div>
          <label className="block font-medium">Course:</label>
          <div className="flex items-center space-x-4">
            <label htmlFor="mca" className="inline-flex items-center">
              <input
                type="radio"
                id="mca"
                value="MCA"
                checked={course === "MCA"}
                onChange={(e) => setCourse(e.target.value)}
              />
              <span className="ml-2">MCA</span>
            </label>
            <label htmlFor="bca" className="inline-flex items-center">
              <input
                type="radio"
                id="bca"
                value="BCA"
                checked={course === "BCA"}
                onChange={(e) => setCourse(e.target.value)}
              />
              <span className="ml-2">BCA</span>
            </label>
            <label htmlFor="bsc" className="inline-flex items-center">
              <input
                type="radio"
                id="bsc"
                value="BSC"
                checked={course === "BSC"}
                onChange={(e) => setCourse(e.target.value)}
              />
              <span className="ml-2">BSC</span>
            </label>
          </div>
        </div>
         {/* Image Upload */}
         <div>
          <label htmlFor="image" className="block font-medium">
            Image Upload:
          </label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="input-field"
          />
        </div>
        {/* Submit Button */}
        <button type="submit" className="btn-primary bg-green-400 rounded-md p-1">
          Submit
        </button>
      </form>
    </div>
  );
};

export default InputForm;
