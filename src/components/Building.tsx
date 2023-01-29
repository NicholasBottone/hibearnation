import React, { useMemo, useState } from "react";

import styles from "./Building.module.css";

import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import BuildingReview from "./DormReview";

interface BuildingProps {
  name: string;
  areaName: string;
  summary: string;
  info: {
    laundryFloor: string;
    laundryRoom: string;
    capacity: string;
    classYear: string[];
  };
  location: string;
  images: string[];
}

export default function Building2(props: BuildingProps) {
  // State for reviews
  const [buildingReviews, setBuildingReviews] = useState([]);

  // Lightbox
  const [showLightbox, setShowLightbox] = useState(false);
  const [lightboxEntry, setLightboxEntry] = useState(0);
  const lightboxFrames = useMemo(
    () => [
      ...props.images.slice(lightboxEntry),
      ...props.images.slice(0, lightboxEntry),
    ],
    [lightboxEntry]
  );
  const numImages = props.images.length > 3 ? 3 : props.images.length;

  // Reviews for the building
  const reviews = [
    {
      id: 1,
      createdAt: "2021-01-01",
      updatedAt: "2021-01-01",
      title: "Great place to live",
      body: "I lived here for 2 years and it was great. The rooms are spacious and the bathrooms are clean. The laundry is on the 3rd floor and the machines are new. The location is great and the building is quiet. The only downside is that the building is a bit old and the elevators are slow.",
      author: "Andrew",
      authorId: "1",
      location: "Grad Center A",
      locationId: "1",
      media: [],
      upvotes: [],
      downvotes: [],
      overallRating: 8,
      amenitiesRating: 8,
      comfortRating: 8,
      locationRating: 8,
    },
    {
      id: 2,
      createdAt: "2021-01-01",
      updatedAt: "2021-01-01",
      title: "Great place to live",
      body: "Terrible Place. .",
      author: "James",
      authorId: "2",
      location: "Grad Center A",
      locationId: "1",
      media: [],
      upvotes: [],
      downvotes: [],
      overallRating: 5,
      amenitiesRating: 6,
      comfortRating: 7,
      locationRating: 2,
    },
  ];

  return (
    <div className={styles.buildingContainer}>
      <div className={styles.buildingHeader}>
        <img
          src="/icon.png"
          alt="logo"
          className={styles.logo}
          onClick={() => {
            window.location.href = "/";
          }}
        />
        <h1 className={styles.buildingHeader}>{props.name}</h1>
      </div>

      <div className={styles.buildingSlideshow}>
        {props.images.slice(0, numImages).map((image, idx) => (
          <img
            src={image}
            className={styles.buildingImage}
            alt={`Frame ${idx + 1}`}
            onClick={() => {
              setShowLightbox(true);
              setLightboxEntry(idx);
            }}
            key={idx}
            style={{
              width: `${100 / numImages}%`,
            }}
          />
        ))}
      </div>

      <Lightbox
        open={showLightbox}
        close={() => setShowLightbox(false)}
        slides={lightboxFrames.map((frame, index) => ({
          src: frame,
          alt: `Sketches Frame ${index + 1}`,
        }))}
        plugins={[Zoom]}
      />

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
            Sublocation: fill
            {/* <br />
            Laundry Room: {props.info.laundryRoom}
            <br />
            Capacity: {props.info.capacity}
            <br />
            Class Year: {props.info.classYear} */}
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
          <h1 className={styles.sectionTitle}>Reviews ({reviews.length})</h1>
          {/* <WriteReplyModal
          isOpen={writeReplyModal}
          onClose={() => setWriteReplyModal(false)}
        /> */}
          <div className={styles.scrollable}>
            {
              // If there are no reviews, display an empty state
              reviews.length === 0 ? (
                <div className={styles.reviewContainerEmptyState}>
                  There are no reviews for this building yet. Leave the first
                  review!
                </div>
              ) : (
                reviews.map((review) => (
                  <BuildingReview {...review} key={review.id} />
                ))
              )
            }
          </div>
        </div>
      </div>
    </div>
  );
}
