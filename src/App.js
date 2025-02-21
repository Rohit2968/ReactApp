import React, { useState } from "react";
import axios from "axios";
import Select from "react-select";
import "./App.css";

const API_URL = "https://restapi-1-4r9w.onrender.com/bfhl";

const handleSubmit = async () => {
  try {
    const trimmedInput = jsonInput.trim();
    
    // Ensure input is valid JSON
    const parsedData = JSON.parse(trimmedInput);
    
    if (!parsedData.data || !Array.isArray(parsedData.data)) {
      throw new Error("Invalid JSON format");
    }

    setError(""); // Clear previous errors

    // Send API request
    const response = await axios.post(API_URL, parsedData);
    setResponseData(response.data);
  } catch (err) {
    setError("Invalid JSON input. Please enter a valid JSON format.");
  }
};


function App() {
  document.title = "ABCD123";

  const [jsonInput, setJsonInput] = useState("");
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);

  const options = [
    { value: "alphabets", label: "Alphabets" },
    { value: "numbers", label: "Numbers" },
    { value: "highest_alphabet", label: "Highest Alphabet" },
  ];

  const handleSubmit = async () => {
    try {
      const parsedData = JSON.parse(jsonInput);
      if (!parsedData.data || !Array.isArray(parsedData.data)) {
        throw new Error("Invalid JSON format");
      }

      setError("");
      const response = await axios.post(API_URL, parsedData);
      setResponseData(response.data);
    } catch (err) {
      setError("Invalid JSON input. Please enter a valid JSON format.");
    }
  };

  return (
    <div className="container">
      <h1>Data Processor</h1>
      <textarea
        rows="5"
        cols="50"
        placeholder='Enter JSON (e.g., { "data": ["A", "C", "z"] })'
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
      />
      <br />
      <button onClick={handleSubmit} className="submit-btn">Submit</button>

      {error && <p className="error-msg">{error}</p>}
      {responseData && (
        <div>
          <h2>Select Data to Display</h2>
          <Select
            options={options}
            isMulti
            onChange={(selected) => setSelectedOptions(selected.map((opt) => opt.value))}
          />

          <h2>Filtered Response</h2>
          {selectedOptions.includes("numbers") && <p>Numbers: {JSON.stringify(responseData.numbers)}</p>}
          {selectedOptions.includes("alphabets") && <p>Alphabets: {JSON.stringify(responseData.alphabets)}</p>}
          {selectedOptions.includes("highest_alphabet") && <p>Highest Alphabet: {JSON.stringify(responseData.highest_alphabet)}</p>}
        </div>
      )}
    </div>
  );
}

export default App;
