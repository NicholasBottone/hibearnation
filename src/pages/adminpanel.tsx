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
  const location_reset = () => {
    setLocationName("");
    setLocationAddress("");
    setLocationCoordinates("");
    setLocationAreaname("");
    setLocationSummary("");
    setLocationSubs([]);
    setLocationFloorplans([]);
  };

  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewBody, setReviewBody] = useState("");
  const [reviewLocationId, setReviewLocationId] = useState("");
  const [reviewMedia, setReviewMedia] = useState<string[]>([]);
  const [reviewOverallRating, setReviewOverallRating] = useState(5);
  const [reviewAmenitiesRating, setReviewAmenitiesRating] = useState(5);
  const [reviewComfortRating, setReviewComfortRating] = useState(5);
  const [reviewLocationRating, setReviewLocationRating] = useState(5);
  const review_reset = () => {
    setReviewTitle("");
    setReviewBody("");
    setReviewLocationId("");
    setReviewMedia([]);
    setReviewOverallRating(5);
    setReviewAmenitiesRating(5);
    setReviewComfortRating(5);
    setReviewLocationRating(5);
  };

  const createAreaMutation = api.admin.createAreas.useMutation();
  const createLocationMutation = api.admin.createLocation.useMutation();
  const createReviewMutation = api.reviews.createReview.useMutation();

  const { data: allAreas } = api.locations.getAllAreas.useQuery();

  const { data: sessionData } = useSession();

  const addArea = () => {
    console.log("Adding area: ", areaName);
    if (areaName === "") {
      console.log("Area name is empty. Not adding area.");
      alert("Area name is empty. Not adding area.");
      return;
    }
    //alert("Adding area: " + areaName);
    createAreaMutation.mutate({ name: areaName });
  };

  const addLocation = () => {
    console.log("Adding location: ", locationName + "...");
    if (
      locationName === "" ||
      locationAddress === "" ||
      locationCoordinates === "" ||
      locationAreaname === "" ||
      locationSummary === "" ||
      locationFloorplans.length === 0
    ) {
      console.log("Location is missing nesecary fields. Not adding location.");
      alert("Location is missing nesecary fields. Not adding location.");
      return;
    }
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

  const addReview = () => {
    console.log("Adding review...");
    if (reviewTitle === "" || reviewBody === "" || reviewLocationId === "") {
      console.log("nesecary fields are empty. Not adding review.");
      alert("nesecary fields are empty. Not adding review.");
      return;
    }
    createReviewMutation.mutate({
      title: reviewTitle,
      body: reviewBody,
      locationId: reviewLocationId,
      media: reviewMedia,
      overallRating: reviewOverallRating,
      amenitiesRating: reviewAmenitiesRating,
      comfortRating: reviewComfortRating,
      locationRating: reviewLocationRating,
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

          <button onClick={location_reset}>Clear Fields</button>

          <label htmlFor="Location Name">Location Name:</label>
          <input
            id="Location Name"
            type="text"
            value={locationName}
            onChange={(e) => setLocationName(e.target.value)}
          />

          <label htmlFor="Location Address">Location Address:</label>
          <textarea
            id="Location Address"
            value={locationAddress}
            onChange={(e) => setLocationAddress(e.target.value)}
          />

          <label htmlFor="Location Coordinates">Location Coordinates:</label>
          <textarea
            id="Location Coordinates"
            value={locationCoordinates}
            onChange={(e) => setLocationCoordinates(e.target.value)}
          />

          {/* TODO Make this a dropdown */}
          <label htmlFor="Location Area Name">Location Area Name:</label>
          <div className="area-name-dropdown-div">
            <select
              id="Location Area Name"
              onChange={(e) => {
                setLocationAreaname(e.target.value);
              }}
            >
              {allAreas?.map((area) => (
                <option value={area.name} key={area.id}>
                  {area.name}
                </option>
              ))}
            </select>
          </div>

          <label htmlFor="Location Sublocations (Empty or comma-separated list)">
            Location Sublocations:
          </label>
          <textarea
            id="Location Sublocations"
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
          <textarea
            id="Location Floorplans"
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
          <textarea
            id="Location Summary"
            value={locationSummary}
            onChange={(e) => setLocationSummary(e.target.value)}
          />

          <button onClick={addLocation}>Add Location</button>
          <p>{createLocationMutation.data}</p>
        </div>

        <div
          className="add-review"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h2 style={{ textAlign: "center" }}>Add Review:</h2>

          <button onClick={review_reset}>Clear Fields</button>

          <label htmlFor="Review Title">Review Title:</label>
          <textarea
            id="Review Title"
            value={reviewTitle}
            onChange={(e) => setReviewTitle(e.target.value)}
          />

          <label htmlFor="Review Body">Review Body:</label>
          <textarea
            id="Review Body"
            value={reviewBody}
            onChange={(e) => setReviewBody(e.target.value)}
          />

          <label htmlFor="Review Location ID">Review Location ID:</label>
          <input
            id="Review Location ID"
            type="text"
            value={reviewLocationId}
            onChange={(e) => setReviewLocationId(e.target.value)}
          />

          <label htmlFor="Review Media (Empty or comma-separated list)">
            Review Media:
          </label>
          <input
            id="Review Media"
            type="text"
            value={reviewMedia}
            onChange={(e) => {
              const originalString = e.target.value;
              //Separate the string by commas
              const media = originalString.split(",");
              //Remove any empty strings
              const filteredMedia = media.filter(
                (mediaItem) => mediaItem !== ""
              );
              //if there are no locations, set to empty array
              if (!originalString) {
                setReviewMedia([]);
              }
              //otherwise, set to the filtered array
              else {
                setReviewMedia(filteredMedia);
              }
            }}
          />

          <label htmlFor="Review Overall Rating">Review Overall Rating:</label>
          <input
            id="Review Overall Rating"
            type="number"
            value={reviewOverallRating}
            onChange={(e) => setReviewOverallRating(Number(e.target.value))}
            max={10}
            min={1}
          />

          <label htmlFor="Review Amenities Rating">
            Review Amenities Rating:
          </label>
          <input
            id="Review Amenities Rating"
            type="number"
            value={reviewAmenitiesRating}
            onChange={(e) => setReviewAmenitiesRating(Number(e.target.value))}
            max={10}
            min={1}
          />

          <label htmlFor="Review Comfort Rating">Review Comfort Rating:</label>
          <input
            id="Review Comfort Rating"
            type="number"
            value={reviewComfortRating}
            onChange={(e) => setReviewComfortRating(Number(e.target.value))}
            max={10}
            min={1}
          />

          <label htmlFor="Review Location Rating">
            Review Location Rating:
          </label>
          <input
            id="Review Location Rating"
            type="number"
            value={reviewLocationRating}
            onChange={(e) => setReviewLocationRating(Number(e.target.value))}
            max={10}
            min={1}
          />

          <button onClick={addReview}>Add Review</button>
          <p>{String(createReviewMutation.data)}</p>
        </div>
      </div>
    </>
  );
};

export default AdminPanel;
