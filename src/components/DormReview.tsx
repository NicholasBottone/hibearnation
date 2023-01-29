import React from "react";
import styles from "./DormReview.module.css";
import { BiUpvote, BiDownvote } from "react-icons/bi";
import { ImArrowUp, ImArrowDown } from "react-icons/im";

interface BuildingReviewProps {
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
}

export default function BuildingReview(props: BuildingReviewProps) {
  return (
    <div className={styles.BuildingReview}>
      <div className={styles.UpvoteDownvote}>
        <div className={styles.Pair}>
          <p>{props.upvotes ? props.upvotes.length : 0}</p>
          <BiUpvote className={styles.Upvote} />
        </div>
        <div className={styles.Pair}>
          <p>{props.downvotes ? props.downvotes.length : 0}</p>
          <BiDownvote className={styles.Downvote} />
        </div>
      </div>
      <div className={styles.reviewSection}>
        <div className={styles.reviewHeader}>
          <strong>
            {props.author} - {props.overallRating / 2} / 5
          </strong>
        </div>
        <div className="reviewContent">{props.body}</div>
      </div>
    </div>
  );
}
