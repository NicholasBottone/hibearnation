import React from "react";
import styles from "./Review.module.css";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import ReactStars from "react-rating-stars-component";

interface ReviewProps {
  closeModal: () => void;
}

export default function Review(props: ReviewProps) {
  return (
    <div className={styles.Review}>
      <div className={styles.TopRow} onClick={props.closeModal}>
        <p>X</p>
      </div>
      <h1 style={{ marginTop: 0, color: "#fadc72", marginBottom: 0 }}>
        Overall Score
      </h1>
      <ReactStars
        count={5}
        size={44}
        isHalf={true}
        emptyIcon={<i className="far fa-star"></i>}
        halfIcon={<i className="fa fa-star-half-alt"></i>}
        fullIcon={<i className="fa fa-star"></i>}
        // color="black"
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
            // color="black"
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
            // color="black"
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
            // color="black"
            activeColor="#ffd700"
          />
        </div>
      </div>
    </div>
  );
}
