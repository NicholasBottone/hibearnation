import React, { useState } from "react";

import styles from "./Building.module.css";

interface BuildingProps {
  name: string;
  summary: string;
  info: {
    laundryFloor: string;
    laundryRoom: string;
    capacity: string;
    classYear: string[];
  };
  location: string;
}

export default function Building2(props: BuildingProps) {
  // State for reviews
  const [buildingReviews, setBuildingReviews] = useState([]);

  return (
    <div className={styles.buildingContainer}>
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/b/b3/Grad_Center_C_building_at_Brown_University_%28cropped%29.jpg"
        className={styles.buildingImage}
        alt="Image for the building"
      />
      <h1 className={styles.buildingHeader}>{props.name}</h1>

      {/* Content */}
      <div className={styles.buildingContentContainer}>
        <div className={styles.gridColOne}>
          <div className={styles.itemOne}>
            <h1 className={styles.sectionTitle}>Summary</h1>
            {props.summary}
          </div>
          <div className={styles.itemTwo}>
            <div className={styles.sectionDivider} />
            <h1 className={styles.sectionTitle}>Info</h1>
            Laundry Floor: {props.info.laundryFloor}
            <br />
            Laundry Room: {props.info.laundryRoom}
            <br />
            Capacity: {props.info.capacity}
            <br />
            Class Year: {props.info.classYear}
          </div>
          <div className={styles.itemThree}>
            <div className={styles.sectionDivider} />
            <h1 className={styles.sectionTitle}>Location</h1>
            {props.location}
            {/* <Map
            {...viewState}
            onMove={(evt) => setViewState(evt.viewState)}
            style={{ width: "100%", height: "40vh" }}
            mapStyle="mapbox://styles/mapbox/streets-v9"
            mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
          >
            {marker.latitude === -99999999 && marker.longitude === -99999999 ? (
              <div />
            ) : (
              <Marker
                longitude={marker.longitude}
                latitude={marker?.latitude}
                anchor="bottom"
                style={{ width: 20, height: 20 }}
              >
                <img src="http://shorturl.at/cgjnM" />
              </Marker>
            )}
          </Map> */}
          </div>
        </div>
        <div className={styles.gridColTwo}>
          <h1 className={styles.sectionTitle}>
            Reviews ({buildingReviews.length})
          </h1>
          {/* <WriteReplyModal
          isOpen={writeReplyModal}
          onClose={() => setWriteReplyModal(false)}
        /> */}
          <div className={styles.scrollable}>
            {
              // If there are no reviews, display an empty state
              buildingReviews.length === 0 ? (
                <div className={styles.reviewContainerEmptyState}>
                  There are no reviews for this building yet. Leave the first
                  review!
                </div>
              ) : (
                buildingReviews
              )
            }
          </div>
        </div>
      </div>
    </div>
  );
}
