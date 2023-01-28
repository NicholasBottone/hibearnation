import React, { useMemo, useState } from "react";

import styles from "./Building.module.css";

import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Zoom from "yet-another-react-lightbox/plugins/zoom";

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
