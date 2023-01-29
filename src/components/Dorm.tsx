import React, { useEffect, useMemo, useState } from "react";

import styles from "./Dorm.module.css";

import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import DormReview from "./DormReview";
import { AiFillHome } from "react-icons/ai";
import { BiPlusMedical } from "react-icons/bi";
import Modal from "./Modal";
import Review from "./buttons/Review";
import AddImage from "./buttons/AddImage";
import { useSession, signIn } from "next-auth/react";
import { api } from "../utils/api";
import ReactStars from "react-rating-stars-component";

interface DormProps {
  id: string;
  name: string;
  areaName: string;
  summary: string;
  location: string;
  sublocations: string[];
  floorplans: {
    id: string;
    locationId: string;
    name: string;
    url: string;
  }[];
  images: string[];
  reviews: {
    id: number;
    createdAt: string;
    updatedAt: string;
    title: string;
    body: string;
    author: string;
    authorId: string;
    location: string;
    locationId: string;
    media: string[];
    upvotes: string[];
    downvotes: string[];
    overallRating: number;
    amenitiesRating: number;
    comfortRating: number;
    locationRating: number;
  }[];
}

export default function Dorm(props: DormProps) {
  // State for reviews
  const [buildingReviews, setBuildingReviews] = useState([]);
  const [showAddImageModal, setShowAddImageModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const { data: sessionData } = useSession();

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

  // Overall dorm rating
  const [overallRating, setOverallRating] = useState(0);
  useEffect(() => {
    let total = 0;
    let count = 0;
    props.reviews.forEach((review) => {
      if (review.overallRating) {
        total += review.overallRating;
        count++;
      }
    });
    setOverallRating(((total / count) * 10) / 10);
  }, [props.reviews]);

  // alert(overallRating);

  return (
    <div className={styles.buildingContainer}>
      <div className={styles.buildingHeader}>
        <AiFillHome
          className={styles.logo}
          onClick={() => {
            window.location.href = "/";
          }}
        />
        <h1 className={styles.buildingHeader}>
          {props.name} ({overallRating ? overallRating.toFixed(2) : "NA"} / 10)
        </h1>
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
      <Modal show={showAddImageModal}>
        <AddImage
          closeModal={() => {
            setShowAddImageModal(false);
          }}
        />
      </Modal>
      <Modal show={showReviewModal}>
        <Review
          location={props.name}
          closeModal={() => {
            setShowReviewModal(false);
          }}
          id={props.id}
        />
      </Modal>
      <div className={styles.buildingContentContainer}>
        <div className={styles.gridColOne}>
          <div className={styles.itemOne}>
            <div className={styles.summaryHeader}>
              <h1 className={styles.sectionTitle}>Summary</h1>
              <div
                onClick={() => {
                  sessionData ? setShowAddImageModal(true) : void signIn();
                }}
                className={styles.addImage}
              >
                Add Image
                <BiPlusMedical />
              </div>
            </div>
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
            {/* {props.floorplans.length === 0
              ? "N/A"
              : props.floorplans.map((floorplan, idx) => (
                  <a
                    className={styles.link}
                    key={idx}
                    href={floorplan.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {floorplan.name}{" "}
                  </a>
                ))} */}
          </div>
          <div className={styles.itemThree}>
            <div className={styles.sectionDivider} />
            <h1 className={styles.sectionTitle}>Location</h1>
            {props.location}
          </div>
        </div>
        <div className={styles.gridColTwo}>
          <div className={styles.ReviewHeader}>
            <h1 className={styles.sectionTitle}>
              Reviews ({props.reviews.length})
            </h1>
            <div
              onClick={() => {
                sessionData ? setShowReviewModal(true) : void signIn();
              }}
              className={styles.addReview}
            >
              Add Review
              <BiPlusMedical />
            </div>
          </div>
          <div className={styles.scrollable}>
            {
              // If there are no reviews, display an empty state
              props.reviews.length === 0 ? (
                <div className={styles.reviewContainerEmptyState}>
                  There are no reviews for this building yet. Leave the first
                  review!
                </div>
              ) : (
                props.reviews.map((review) => (
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
