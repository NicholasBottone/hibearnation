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
import Link from "next/link";

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
    id: string;
    createdAt: Date;
    updatedAt: Date;
    body: string;
    authorId: string;
    locationId: string;
    upvotes: { id: string }[];
    downvotes: { id: string }[];
    overallRating: number;
    amenitiesRating: number;
    comfortRating: number;
    locationRating: number;
  }[];
  refetch: () => void;
}

export default function Dorm(props: DormProps) {
  // State for reviews
  const [showAddImageModal, setShowAddImageModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const { data: sessionData } = useSession();

  let averageAmenitiesRating = props.reviews.reduce(
    (acc, review) => acc + review.amenitiesRating,
    0
  );
  averageAmenitiesRating /= props.reviews.length;
  let averageComfortRating = props.reviews.reduce(
    (acc, review) => acc + review.comfortRating,
    0
  );
  averageComfortRating /= props.reviews.length;
  let averageLocationRating = props.reviews.reduce(
    (acc, review) => acc + review.locationRating,
    0
  );
  averageLocationRating /= props.reviews.length;

  // Lightbox
  const [showLightbox, setShowLightbox] = useState(false);
  const [lightboxEntry, setLightboxEntry] = useState(0);
  const lightboxFrames = useMemo(
    () => [
      ...props.images.slice(lightboxEntry),
      ...props.images.slice(0, lightboxEntry),
    ],
    [lightboxEntry, props.images]
  );
  const numImages = props.images.length > 3 ? 3 : props.images.length;

  const getOS = () => {
    if (typeof window === "undefined") return "Linux";
    const userAgent = window.navigator.userAgent;
    const platform = window.navigator.platform;
    const macosPlatforms = ["Macintosh", "MacIntel", "MacPPC", "Mac68K"];
    const windowsPlatforms = ["Win32", "Win64", "Windows", "WinCE"];
    const iosPlatforms = ["iPhone", "iPad", "iPod"];
    let os = null;
    if (macosPlatforms.indexOf(platform) !== -1) {
      os = "Mac OS";
    } else if (iosPlatforms.indexOf(platform) !== -1) {
      os = "iOS";
    } else if (windowsPlatforms.indexOf(platform) !== -1) {
      os = "Windows";
    } else if (/Android/.test(userAgent)) {
      os = "Android";
    } else if (!os && /Linux/.test(platform)) {
      os = "Linux";
    }
    return os;
  };
  const os = getOS();
  const mobileOS = os === "Android" || os === "iOS";

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
        <Link href={`/`} className={styles.logo}>
          <AiFillHome className={styles.logo} />
        </Link>

        <h1 className={styles.buildingHeader}>
          {props.name}{" "}
          {overallRating ? "(" + overallRating.toFixed(2) + " / 10)" : ""}
        </h1>
      </div>

      {props.images.length > 0 ? (
        <div className={styles.buildingSlideshow} title="Click to view more!">
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
      ) : (
        <div className={styles.buildingNone}>
          <div className={styles.noImages}>
            <h2>No images available, be the first!</h2>
          </div>
        </div>
      )}

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
          locationId={props.id}
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
              <div className={styles.leftSide}>
                <h2 className={styles.sectionTitle}>Summary</h2>
                {!isNaN(averageAmenitiesRating) && (
                  <div className={styles.summaryEmojis}>
                    <div
                      style={{
                        backgroundColor: "#a2f0f9",
                        padding: "0.03rem 0.4rem",
                        borderRadius: "0.2rem",
                        border: "1px solid #6ed5f9",
                      }}
                    >
                      {(averageAmenitiesRating / 2).toFixed(2)} / 5{" "}
                      <b className={styles.emoji}>🚿</b>
                    </div>
                    <div
                      style={{
                        backgroundColor: "#f9a2a2",
                        padding: "0.03rem 0.4rem",
                        borderRadius: "0.2rem",
                        border: "1px solid #f96e6e",
                      }}
                    >
                      {(averageComfortRating / 2).toFixed(2)} / 5{" "}
                      <b className={styles.emoji}>🛌</b>
                    </div>
                    <div
                      style={{
                        backgroundColor: "#a2f0a2",
                        padding: "0.03rem 0.4rem",
                        borderRadius: "0.2rem",
                        border: "1px solid #3ead32",
                      }}
                    >
                      {(averageLocationRating / 2).toFixed(2)} / 5{" "}
                      <b className={styles.emoji}>📍</b>
                    </div>
                  </div>
                )}
              </div>
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
            {!isNaN(averageAmenitiesRating) && (
              <div className={styles.phoneEmojis}>
                <div
                  style={{
                    backgroundColor: "#a2f0f9",
                    padding: "0.03rem 0.4rem",
                    borderRadius: "0.2rem",
                    border: "1px solid #6ed5f9",
                  }}
                >
                  {(averageAmenitiesRating / 2).toFixed(2)} / 5{" "}
                  <b className={styles.emoji}>🚿</b>
                </div>
                <div
                  style={{
                    backgroundColor: "#f9a2a2",
                    padding: "0.03rem 0.4rem",
                    borderRadius: "0.2rem",
                    border: "1px solid #f96e6e",
                  }}
                >
                  {(averageComfortRating / 2).toFixed(2)} / 5{" "}
                  <b className={styles.emoji}>🛌</b>
                </div>
                <div
                  style={{
                    backgroundColor: "#a2f0a2",
                    padding: "0.03rem 0.4rem",
                    borderRadius: "0.2rem",
                    border: "1px solid #3ead32",
                  }}
                >
                  {(averageLocationRating / 2).toFixed(2)} / 5{" "}
                  <b className={styles.emoji}>📍</b>
                </div>
              </div>
            )}
          </div>
          <div className={styles.itemTwo}>
            <div className={styles.sectionDivider} />
            <h2 className={styles.sectionTitle}>Info</h2>
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
                  <a className={styles.listItem} key={idx} href={floorplan.url}>
                    {floorplan.name}{" "}
                  </a>
                ))}
            <br />
          </div>
          <div className={styles.itemThree}>
            <div className={styles.sectionDivider} />
            <h2 className={styles.sectionTitle}>Location</h2>
            {props.location}
          </div>
        </div>
        <div className={styles.gridColTwo}>
          <div className={styles.sectionDividerMobile} />
          <div className={styles.ReviewHeader}>
            <h2 className={styles.sectionTitle}>
              Reviews ({props.reviews.length})
            </h2>
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
          <div
            className={
              os === "Windows"
                ? // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
                  styles.scrollable + " " + styles.Windows
                : styles.scrollable
            }
            style={{
              height:
                props.reviews.length <= 3 || mobileOS ? "fit-content" : "50vh",
              minHeight:
                props.reviews.length <= 3 || mobileOS ? "0px" : "400px",
            }}
          >
            {
              // If there are no reviews, display an empty state
              props.reviews.length === 0 ? (
                <div className={styles.reviewContainerEmptyState}>
                  There are no reviews for this building yet. Leave the first
                  review!
                </div>
              ) : (
                props.reviews.map((review) => (
                  <DormReview
                    {...review}
                    key={review.id}
                    refetch={props.refetch}
                  />
                ))
              )
            }
          </div>
        </div>
      </div>
    </div>
  );
}
