import React from "react";
import "./Header.css";

const Header = ({ handleFileInput, handleToggleSettings }) => {
  return (
    <div className="header">
      <div></div>
      <div>
        <input
          class="file-input"
          type="file"
          name="file"
          id="file-selector"
          accept=".xlsx"
          onChange={handleFileInput}
        ></input>
        <label for="file-selector">Load file</label>
      </div>
      <div onClick={handleToggleSettings} className="settings-selector">
        Settings
      </div>
    </div>
  );
};

export default Header;
