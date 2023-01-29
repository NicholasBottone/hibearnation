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

  // createdAt: "2021-01-01",
  // updatedAt: "2021-01-01",
  // title: "Great place to live",
  // body: "I lived here for 2 years and it was great. The rooms are spacious and the bathrooms are clean. The laundry is on the 3rd floor and the machines are new. The location is great and the building is quiet. The only downside is that the building is a bit old and the elevators are slow.",
  // author: "Andrew",
  // authorId: "1",
  // location: "Grad Center A",
  // locationId: "1",
  // media: [],
  // upvotes: [],
  // downvotes: [],
  // overallRating: 8,
  // amenitiesRating: 8,
  // comfortRating: 8,
  // locationRating: 8,

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
        overallRating: Math.floor(
          ((amenitiesRating + locationRating + comfortRating) / 3) * 2
        ),
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
