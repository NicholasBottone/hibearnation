import React from "react";
import styles from "./AddImage.module.css";

interface AddImageProps {
  closeModal: () => void;
}

export default function AddImage(props: AddImageProps) {
  return (
    <div className={styles.AddImage}>
      <h1 className={styles.Title}>Add Image</h1>
      <p>
        Please upload an image of the location you are reviewing. This image
        will be displayed on the location&apos;s page and will be used to help
        others view the location. Please make sure the image is a .jpg or .png
        file.
      </p>
      <input type="file" className={styles.Button} />
      <div className={styles.ButtonContainer}>
        <p
          className={styles.Button}
          onClick={props.closeModal}
          style={{ backgroundColor: "#b63f3f", color: "white" }}
        >
          Cancel
        </p>
        {/* TODO: Add submit button functionality */}
        <p
          className={styles.Button}
          onClick={props.closeModal}
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
