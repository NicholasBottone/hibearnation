import React, { useMemo, useState } from "react";

import styles from "./Dorm.module.css";

import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import DormReview from "./DormReview";
import BuildingReview from "./DormReview";
import { AiFillHome } from "react-icons/ai";
import { BiPlusMedical } from "react-icons/bi";
import Modal from "./Modal";
import Review from "./Review";

interface DormProps {
  name: string;
  areaName: string;
  summary: string;
  location: string;
  sublocations: string[];
  floorplans: string[];
  images: string[];
}

export default function Dorm(props: DormProps) {
  // State for reviews
  const [buildingReviews, setBuildingReviews] = useState([]);
  const [showModal, setShowModal] = useState(false);

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
    {
      id: 3,
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
    {
      id: 4,
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
        <AiFillHome
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
      <Modal show={showModal}>
        <Review
          location={props.name}
          closeModal={() => {
            setShowModal(false);
          }}
        />
      </Modal>
      <div className={styles.buildingContentContainer}>
        <div className={styles.gridColOne}>
          <div className={styles.itemOne}>
            <h1 className={styles.sectionTitle}>Summary</h1>
            {props.summary}
          </div>
          <div className={styles.itemTwo}>
            <div className={styles.sectionDivider} />
            <h1 className={styles.sectionTitle}>Info</h1>
            Area Name: {props.areaName}
            <br />
            Sublocation:{" "}
            {props.sublocations.length === 0
              ? "N/A"
              : props.sublocations.map((sublocation, idx) => (
                  <a className={styles.listItem} key={idx}>
                    {sublocation}{" "}
                  </a>
                ))}
            <br />
            Floorplan:{" "}
            {props.floorplans.length === 0
              ? "N/A"
              : props.floorplans.map((floorplan, idx) => (
                  <a
                    className={styles.link}
                    key={idx}
                    href={floorplan}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {idx}{" "}
                  </a>
                ))}
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
          <div className={styles.ReviewHeader}>
            <h1 className={styles.sectionTitle}>Reviews ({reviews.length})</h1>
            <div
              onClick={() => {
                setShowModal(true);
              }}
              className={styles.addReview}
            >
              Add Review
              <BiPlusMedical />
            </div>
          </div>
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
                  <DormReview {...review} key={review.id} />
                ))
              )
            }
          </div>
        </div>
      </div>
    </div>
  );
}
