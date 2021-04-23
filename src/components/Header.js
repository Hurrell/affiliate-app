import React, { useState } from "react";
import "./Header.css";

const Header = ({ handleFileInput, handleToggleSettings }) => {
  const [toggleLoadFile, setToggleLoadFile] = useState(false);

  const handleToggleLoadFile = (event) => {
    setToggleLoadFile(!toggleLoadFile);
  };

  let loadFileOptions;
  if (toggleLoadFile) {
    loadFileOptions = (
      <div className="load-options">
        {":"}
        <input
          data-country="usa"
          className="file-input"
          type="file"
          name="file"
          id="file-selector-usa"
          accept=".xlsx"
          onChange={(event) => {
            handleToggleLoadFile();
            handleFileInput(event);
          }}
        ></input>
        <label htmlFor="file-selector-usa">USA</label>
        <input
          data-country="canada"
          className="file-input"
          type="file"
          name="file"
          id="file-selector-canada"
          accept=".xlsx"
          onChange={(event) => {
            handleToggleLoadFile();
            handleFileInput(event);
          }}
        ></input>
        <label htmlFor="file-selector-canada">Canada</label>
        <input
          data-country="uk"
          className="file-input"
          type="file"
          name="file"
          id="file-selector-uk"
          accept=".xlsx"
          onChange={(event) => {
            handleToggleLoadFile();
            handleFileInput(event);
          }}
        ></input>
        <label htmlFor="file-selector-uk">UK</label>
        {"|"}
      </div>
    );
  }

  return (
    <div className="header">
      <div></div>

      {/* <div>
        <input
          className="file-input"
          type="file"
          name="file"
          id="file-selector"
          accept=".xlsx"
          onChange={handleFileInput}
        ></input>
        <label htmlFor="file-selector">Load file</label>
      </div> */}
      <div onClick={handleToggleLoadFile} className="load-file">
        Upload
      </div>
      {loadFileOptions}
      <div onClick={handleToggleSettings} className="settings-selector">
        Settings
      </div>
    </div>
  );
};

export default Header;
