import React from "react";
import styles from "./Review.module.css";
import { useState } from "react";
import { useSession } from "next-auth/react";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import ReactStars from "react-rating-stars-component";
import { api } from "../../utils/api";

interface ReviewProps {
  location: string;
  closeModal: () => void;
  id: string;
  backgroundImage?: string;
}

export default function Review(props: ReviewProps) {
  const [overallRating, setOverallRating] = useState(0);
  const [amenitiesRating, setAmenitiesRating] = useState(0);
  const [locationRating, setLocationRating] = useState(0);
  const [comfortRating, setComfortRating] = useState(0);
  const [review, setReview] = useState("");
  const { data: sessionData } = useSession();
  const createReviewMutation = api.reviews.createReview.useMutation();

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

  const totalReview = sessionData
    ? {
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        title: "",
        body: review,
        author: sessionData.user?.name,
        authorId: sessionData.user?.id,
        location: props.location,
        locationId: props.id,
        media: undefined,
        upvotes: undefined,
        downvotes: undefined,
        overallRating: overallRating * 2,
        amenitiesRating: amenitiesRating * 2,
        comfortRating: comfortRating * 2,
        locationRating: locationRating * 2,
      }
    : null;

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
          <h1 style={{ fontWeight: "bold" }}>Overall</h1>
          <ReactStars
            count={5}
            onChange={overallRate}
            size={30}
            isHalf={true}
            emptyIcon={<i className="far fa-star"></i>}
            halfIcon={<i className="fa fa-star-half-alt"></i>}
            fullIcon={<i className="fa fa-star"></i>}
            activeColor="#ebab34"
            color="black"
          />
        </div>
        <div className={styles.Rating}>
          <h1>Amenities</h1>
          <ReactStars
            count={5}
            onChange={amenitiesRate}
            size={30}
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
            size={30}
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
            size={30}
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
        <p
          className={styles.Button}
          onClick={props.closeModal}
          style={{ backgroundColor: "#b63f3f", color: "white" }}
        >
          Cancel
        </p>
        <p
          className={styles.Button}
          onClick={() => {
            if (totalReview) {
              createReviewMutation.mutate(totalReview);
            }
            overallRate(0);
            setOverallRating(0);
            amenitiesRate(0);
            setAmenitiesRating(0);
            locationRate(0);
            setLocationRating(0);
            comfortRate(0);
            setComfortRating(0);
            setReview("");
            props.closeModal();
          }}
          style={{
            backgroundColor: "#60ae3c",
            color: "white",
          }}
        >
          Submit
        </p>
      </div>
    </div>
  );
}
