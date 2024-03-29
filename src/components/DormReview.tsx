import React from "react";
import styles from "./DormReview.module.css";
import { BiUpvote, BiDownvote } from "react-icons/bi";
import { ImArrowUp, ImArrowDown } from "react-icons/im";
import { useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { api } from "../utils/api";

interface BuildingReviewProps {
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
  refetch: () => void;
}

export default function BuildingReview(props: BuildingReviewProps) {
  const { data: sessionData } = useSession();
  const userId = sessionData?.user?.id;
  const upvoteCount = props.upvotes ? props.upvotes.length : 0;
  const downvoteCount = props.downvotes ? props.downvotes.length : 0;
  const [count, setCount] = useState(upvoteCount - downvoteCount);
  const [upvoted, setUpvoted] = useState(
    props.upvotes?.map((user) => user.id).includes(userId || "a")
  );
  const [downvoted, setDownvote] = useState(
    props.downvotes?.map((user) => user.id).includes(userId || "a")
  );
  const upvoteMutation = api.reviews.upvoteReview.useMutation();
  const undoUpvoteMutation = api.reviews.undoUpvoteReview.useMutation();
  const downvoteMutation = api.reviews.downvoteReview.useMutation();
  const undoDownvoteMutation = api.reviews.undoDownvoteReview.useMutation();

  const upvoteAction = () => {
    if (!sessionData) {
      void signIn();
    }
    if (upvoted) {
      undoUpvoteMutation.mutate({ id: props.id });
      setCount(count - 1);
      setUpvoted(false);
    } else {
      upvoteMutation.mutate({ id: props.id });
      setUpvoted(true);
      if (downvoted) {
        undoDownvoteMutation.mutate({ id: props.id });
        setDownvote(false);
        setCount(count + 2);
      } else {
        setCount(count + 1);
      }
    }
  };

  const downvoteAction = () => {
    if (!sessionData) {
      void signIn();
    }
    if (downvoted) {
      undoDownvoteMutation.mutate({ id: props.id });
      setCount(count + 1);
      setDownvote(false);
    } else {
      downvoteMutation.mutate({ id: props.id });
      setDownvote(true);
      if (upvoted) {
        undoUpvoteMutation.mutate({ id: props.id });
        setUpvoted(false);
        setCount(count - 2);
      } else {
        setCount(count - 1);
      }
    }
  };

  return (
    <div className={styles.BuildingReview}>
      <div className={styles.UpvoteDownvoteAndNumber}>
        <p className={styles.Number}>{count}</p>
        <div className={styles.UpvoteDownvote}>
          {upvoted ? (
            <ImArrowUp className={styles.UpvoteFilled} onClick={upvoteAction} />
          ) : (
            <BiUpvote className={styles.Upvote} onClick={upvoteAction} />
          )}
          {downvoted ? (
            <ImArrowDown
              className={styles.DownvoteFilled}
              onClick={downvoteAction}
            />
          ) : (
            <BiDownvote className={styles.Downvote} onClick={downvoteAction} />
          )}
        </div>
      </div>
      <div className={styles.reviewSection}>
        <div className={styles.reviewHeader}>
          <div
            style={{
              backgroundColor: "#fce9a2",
              padding: "0.03rem 0.4rem",
              borderRadius: "0.2rem",
              border: "1px solid #f9d56e",
            }}
          >
            {props.overallRating / 2} / 5 <b className={styles.emoji}>⭐</b>
          </div>
          <div
            style={{
              backgroundColor: "#a2f0f9",
              padding: "0.03rem 0.4rem",
              borderRadius: "0.2rem",
              border: "1px solid #6ed5f9",
            }}
          >
            {props.amenitiesRating / 2} / 5 <b className={styles.emoji}>🚿</b>
          </div>
          <div
            style={{
              backgroundColor: "#f9a2a2",
              padding: "0.03rem 0.4rem",
              borderRadius: "0.2rem",
              border: "1px solid #f96e6e",
            }}
          >
            {props.comfortRating / 2} / 5 <b className={styles.emoji}>🛌</b>
          </div>
          <div
            style={{
              backgroundColor: "#a2f0a2",
              padding: "0.03rem 0.4rem",
              borderRadius: "0.2rem",
              border: "1px solid #3ead32",
            }}
          >
            {props.locationRating / 2} / 5 <b className={styles.emoji}>📍</b>
          </div>
        </div>
        <div className="reviewContent">{props.body}</div>
      </div>
    </div>
  );
}
