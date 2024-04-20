import React, { useState, useEffect } from "react";
import axios from "axios";
import ModulesList from "./ModulesList";
import ReviewsList from "./ReviewsList";
import ReviewForm from "./ReviewForm";
import "./App.css"; // Importing the CSS file

function App() {
  const [modules, setModules] = useState([]);
  const [selectedModuleId, setSelectedModuleId] = useState(null);
  const [selectedModuleCode, setSelectedModuleCode] = useState("");
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/modules")
      .then((response) => setModules(response.data))
      .catch((error) => console.error("Error fetching modules:", error));
  }, []);

  const handleModuleSelect = (moduleId) => {
    setSelectedModuleId(moduleId);

    const module = modules.find((m) => m.id === parseInt(moduleId));
    setSelectedModuleCode(module ? module.code : "");

    fetchReviews(moduleId);
  };

  const fetchReviews = (moduleId) => {
    axios
      .get(`http://localhost:3002/reviews/module/${moduleId}`)
      .then((response) => setReviews(response.data))
      .catch((error) => console.error("Error fetching reviews:", error));
  };

  return (
    <div className="container">
      <div className="left-panel">
        <ModulesList modules={modules} onModuleSelect={handleModuleSelect} />
        <ReviewForm
          moduleId={selectedModuleId}
          fetchReviews={() => fetchReviews(selectedModuleId)}
        />
      </div>
      <div className="right-panel">
        <ReviewsList moduleCode={selectedModuleCode} reviews={reviews} />
      </div>
    </div>
  );
}

export default App;
