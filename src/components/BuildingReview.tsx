import React from "react";

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
    <div className="reviewContainer">
      <div className="reviewTitleBar">
        <img src="/anonymous.png" alt="anonymous" />
        <strong>
          {props.author} - {props.overallRating} / 5
        </strong>
      </div>
      <div className="reviewContent">{props.body}</div>
      <div className="reviewFooter">
        <p>Last Modified: {props.updatedAt}</p>
        {/* <Button
          text="Reply"
          style={reviewButtonStyle}
          onClick={() => {
            setParentReview(review.reviewId);
            setWriteReplyModal(true);
          }}
        /> */}
      </div>
    </div>
  );
}
