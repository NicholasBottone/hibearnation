import React from "react";
import styles from "./Review.module.css";
import { useState } from "react";
import { CgCloseR } from "react-icons/cg";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import ReactStars from "react-rating-stars-component";

interface ReviewProps {
  location: string;
  closeModal: () => void;
}

export default function Review(props: ReviewProps) {
  const [amenitiesRating, setAmenitiesRating] = useState(0);
  const [locationRating, setLocationRating] = useState(0);
  const [comfortRating, setComfortRating] = useState(0);
  const [review, setReview] = useState("");

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
      <h1 className={styles.Title}>
        {/* cut location to 18 characters and add ellipse */}
        {props.location.length > 18
          ? props.location.slice(0, 18) + "..."
          : props.location}
      </h1>
      <div className={styles.RatingContainer}>
        <div className={styles.Rating}>
          <h1>Amenities</h1>
          <ReactStars
            count={5}
            onChange={amenitiesRate}
            size={35}
            isHalf={true}
            emptyIcon={<i className="far fa-star"></i>}
            halfIcon={<i className="fa fa-star-half-alt"></i>}
            fullIcon={<i className="fa fa-star"></i>}
            activeColor="#ebab34"
            color="black"
          />
        </div>
        <div className={styles.Rating}>
          <h1>Location</h1>
          <ReactStars
            count={5}
            onChange={locationRate}
            size={35}
            isHalf={true}
            emptyIcon={<i className="far fa-star"></i>}
            halfIcon={<i className="fa fa-star-half-alt"></i>}
            fullIcon={<i className="fa fa-star"></i>}
            activeColor="#ebab34"
            color="black"
          />
        </div>
        <div className={styles.Rating}>
          <h1>Comfort</h1>
          <ReactStars
            count={5}
            onChange={comfortRate}
            size={35}
            isHalf={true}
            emptyIcon={<i className="far fa-star"></i>}
            halfIcon={<i className="fa fa-star-half-alt"></i>}
            fullIcon={<i className="fa fa-star"></i>}
            activeColor="#ebab34"
            color="black"
          />
        </div>
        {/* text area for review */}
      </div>
      <div className={styles.ReviewContainer}>
        <textarea
          value={review}
          className={styles.ReviewInput}
          onChange={(e) => setReview(e.target.value)}
          placeholder="Write your review here..."
        />
      </div>
      <div className={styles.ButtonContainer}>
        <p className={styles.Button} onClick={props.closeModal}>
          Cancel
        </p>
        <p className={styles.Button} onClick={props.closeModal}>
          Submit
        </p>
      </div>
    </div>
  );
}
