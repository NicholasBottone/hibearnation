import React, { useState } from "react";
import { type NextPage } from "next";
import { api } from "../utils/api";
import { signIn } from "next-auth/react";

const Adminpanel: NextPage = () => {
  const createAreasMutation = api.admin.createAreas.useMutation();
  const [areaName, setAreaName] = useState("");

  const addArea = () => {
    console.log("Adding area: ", areaName);
    //alert("Adding area: " + areaName);
    createAreasMutation.mutate({ name: areaName });
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className="admin-header">
          <h1 style={{ textAlign: "center" }}>Admin Panel</h1>
          <h3 style={{ textAlign: "center" }}>
            Add new areas, locations, etc.
          </h3>
        </div>

        <button
          onClick={() => {
            console.log("Logging In...");
            void signIn();
          }}
        >
          Login
        </button>

        <div
          className="add-area"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h2 style={{ textAlign: "center" }}>Add Area:</h2>
          <label htmlFor="Area Name">Area Name:</label>
          <input
            id="Area Name"
            type="text"
            value={areaName}
            onChange={(e) => setAreaName(e.target.value)}
          />

          <button onClick={addArea}>Add Area</button>
        </div>

        <div className="add-location">
          <h2 style={{ textAlign: "center" }}>Add Location:</h2>
          <label htmlFor="Location Name">Location Name:</label>
          <input id="Location Name" type="text" />
        </div>
      </div>
    </>
  );
};

export default Adminpanel;
