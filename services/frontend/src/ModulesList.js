import React from "react";

function ModulesList({ modules, onModuleSelect }) {
  return (
    <div>
      <h2>Select Module</h2>
      <select onChange={(e) => onModuleSelect(e.target.value)} defaultValue="">
        <option value="" disabled>
          Select a module
        </option>
        {modules.map((module) => (
          <option key={module.id} value={module.id}>
            {module.code} - {module.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default ModulesList;
