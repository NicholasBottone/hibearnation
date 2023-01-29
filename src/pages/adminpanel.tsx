import React, { useState } from "react";
import { type NextPage } from "next";
import { api } from "../utils/api";
import { signIn, signOut, useSession } from "next-auth/react";

const AdminPanel: NextPage = () => {
  const [areaName, setAreaName] = useState("");

  const [locationName, setLocationName] = useState("");
  const [locationAddress, setLocationAddress] = useState("");
  const [locationCoordinates, setLocationCoordinates] = useState("");
  const [locationAreaname, setLocationAreaname] = useState("");
  const [locationSummary, setLocationSummary] = useState("");
  const [locationSubs, setLocationSubs] = useState<string[]>([]);
  const [locationFloorplans, setLocationFloorplans] = useState<string[]>([]);
  const location_setters = [
    setLocationName,
    setLocationAddress,
    setLocationCoordinates,
    setLocationAreaname,
    setLocationSummary,
  ];

  const createAreaMutation = api.admin.createAreas.useMutation();
  const createLocationMutation = api.admin.createLocation.useMutation();

  const { data: sessionData } = useSession();

  const addArea = () => {
    console.log("Adding area: ", areaName);
    //alert("Adding area: " + areaName);
    createAreaMutation.mutate({ name: areaName });
  };

  const addLocation = () => {
    console.log("Adding location: ", locationName + "...");
    console.log(
      "Address: ",
      locationAddress,
      " | Coordinates: ",
      locationCoordinates,
      " | Area Name: ",
      locationAreaname,
      " | Sublocations: ",
      locationSubs,
      " | Floorplans: ",
      locationFloorplans
    );
    createLocationMutation.mutate({
      name: locationName,
      summary: locationSummary,
      address: locationAddress,
      coordinates: locationCoordinates,
      areaName: locationAreaname,
      sublocations: locationSubs,
      floorplans: locationFloorplans,
    });
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

        <button onClick={() => void signIn()}>Login</button>
        <button onClick={() => void signOut()}>Logout</button>

        {sessionData && (
          <div>
            <img
              src={sessionData.user?.image || ""}
              style={{ width: 50, height: 50 }}
            />
            <h3>Logged in as: {sessionData.user?.email}</h3>
          </div>
        )}

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

          <button
            onClick={() => {
              setAreaName("");
            }}
          >
            Clear Fields
          </button>

          <label htmlFor="Area Name">Area Name:</label>
          <input
            id="Area Name"
            type="text"
            value={areaName}
            onChange={(e) => setAreaName(e.target.value)}
          />

          <button onClick={addArea}>Add Area</button>
          <p>{createAreaMutation.data}</p>
        </div>

        <div
          className="add-location"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h2 style={{ textAlign: "center" }}>Add Location:</h2>

          <button
            onClick={() => {
              location_setters.forEach((setter) => setter(""));
              setLocationSubs([]);
              setLocationFloorplans([]);
            }}
          >
            Clear Fields
          </button>

          <label htmlFor="Location Name">Location Name:</label>
          <input
            id="Location Name"
            type="text"
            value={locationName}
            onChange={(e) => setLocationName(e.target.value)}
          />

          <label htmlFor="Location Address">Location Address:</label>
          <input
            id="Location Address"
            type="text"
            value={locationAddress}
            onChange={(e) => setLocationAddress(e.target.value)}
          />

          <label htmlFor="Location Coordinates">Location Coordinates:</label>
          <input
            id="Location Coordinates"
            type="text"
            value={locationCoordinates}
            onChange={(e) => setLocationCoordinates(e.target.value)}
          />

          <label htmlFor="Location Area Name">Location Area Name:</label>
          <input
            id="Location Area Name"
            type="text"
            value={locationAreaname}
            onChange={(e) => setLocationAreaname(e.target.value)}
          />

          <label htmlFor="Location Sublocations (Empty or comma-separated list)">
            Location Sublocations:
          </label>
          <input
            id="Location Sublocations"
            type="text"
            value={locationSubs}
            onChange={(e) => {
              const originalString = e.target.value;
              //Separate the string by commas
              const sublocations = originalString.split(",");
              //Remove any empty strings
              const filteredSublocations = sublocations.filter(
                (sublocation) => sublocation !== ""
              );
              //if there are no locations, set to empty array
              if (!originalString) {
                setLocationSubs([]);
              }
              //otherwise, set to the filtered array
              else {
                setLocationSubs(filteredSublocations);
              }
            }}
          />

          <label htmlFor="Location Floorplans">Location Floorplans:</label>
          <input
            id="Location Floorplans"
            type="text"
            value={locationFloorplans}
            onChange={(e) => {
              const originalString = e.target.value;
              //Separate the string by commas
              const floorplans = originalString.split(",");
              //Remove any empty strings
              const filteredFloorplans = floorplans.filter(
                (floorplan) => floorplan !== ""
              );
              //if there are no locations, set to empty array
              if (!originalString) {
                setLocationFloorplans([]);
              }
              //otherwise, set to the filtered array
              else {
                setLocationFloorplans(filteredFloorplans);
              }
            }}
          />

          <label htmlFor="Location Summary">Location Summary:</label>
          <input
            id="Location Summary"
            type="text"
            value={locationSummary}
            onChange={(e) => setLocationSummary(e.target.value)}
          />

          <button onClick={addLocation}>Add Location</button>
          <p>{createLocationMutation.data}</p>
        </div>
      </div>
    </>
  );
};

export default AdminPanel;
