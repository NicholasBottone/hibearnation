import React from "react";
import styles from "./Review.module.css";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import ReactStars from "react-rating-stars-component";
import { useState } from "react";
import { CgCloseR } from "react-icons/cg";

interface ReviewProps {
  closeModal: () => void;
}

export default function Review(props: ReviewProps) {
  const [overallRating, setOverallRating] = useState(0);
  const [amenitiesRating, setAmenitiesRating] = useState(0);
  const [locationRating, setLocationRating] = useState(0);
  const [comfortRating, setComfortRating] = useState(0);
  const [review, setReview] = useState("");

  const overallRate = (newRating: number) => {
    setOverallRating(newRating);
  };

  const amenitiesRate = (newRating: number) => {
    setAmenitiesRating(newRating);
  };

  const locationRate = (newRating: number) => {
    setLocationRating(newRating);
  };

  const comfortRate = (newRating: number) => {
    setComfortRating(newRating);
  };

  return (
    <div className={styles.Review}>
      <div className={styles.TopRow} onClick={props.closeModal}>
        <CgCloseR className={styles.Close} />
      </div>
      <h1
        style={{ marginTop: 0, color: "black", marginBottom: 0 }}
        className={styles.Overall}
      >
        Overall Score
      </h1>
      <ReactStars
        count={5}
        size={44}
        isHalf={true}
        emptyIcon={<i className="far fa-star"></i>}
        halfIcon={<i className="fa fa-star-half-alt"></i>}
        fullIcon={<i className="fa fa-star"></i>}
        onChange={overallRate}
        activeColor="#ffd700"
      />
      <div className={styles.RatingRow}>
        <div className={styles.RatingPair}>
          <h2>Ammenities</h2>
          <ReactStars
            count={5}
            size={35}
            isHalf={true}
            emptyIcon={<i className="far fa-star"></i>}
            halfIcon={<i className="fa fa-star-half-alt"></i>}
            fullIcon={<i className="fa fa-star"></i>}
            onChange={amenitiesRate}
            activeColor="#ffd700"
          />
        </div>
        <div className={styles.RatingPair}>
          <h2>Location</h2>
          <ReactStars
            count={5}
            size={35}
            isHalf={true}
            emptyIcon={<i className="far fa-star"></i>}
            halfIcon={<i className="fa fa-star-half-alt"></i>}
            fullIcon={<i className="fa fa-star"></i>}
            onChange={locationRate}
            activeColor="#ffd700"
          />
        </div>
        <div className={styles.RatingPair}>
          <h2>Comfort</h2>
          <ReactStars
            count={5}
            size={35}
            isHalf={true}
            emptyIcon={<i className="far fa-star"></i>}
            halfIcon={<i className="fa fa-star-half-alt"></i>}
            fullIcon={<i className="fa fa-star"></i>}
            onChange={comfortRate}
            activeColor="#ffd700"
          />
        </div>
      </div>
      <div className={styles.Input}>
        {/* input field */}
        <textarea
          placeholder="Write a review..."
          className={styles.Textarea}
          onChange={(e) => setReview(e.target.value)}
        />
      </div>
      <button
        className={styles.Button}
        onClick={() => {
          console.log(
            overallRating,
            amenitiesRating,
            locationRating,
            comfortRating,
            review
          );
          props.closeModal();
        }}
      >
        Submit
      </button>
    </div>
  );
}
