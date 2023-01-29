import React, { useState } from "react";
import styles from "./AddImage.module.css";

import { BiImageAdd } from "react-icons/bi";
import { env } from "../../env/client.mjs";
import { api } from "../../utils/api";

interface AddImageProps {
  closeModal: () => void;
  locationId: string;
}

export default function AddImage(props: AddImageProps) {
  const [uploading, setUploading] = useState(false);
  const [imageURL, setImageURL] = useState<string>();
  const postMediaMutation = api.reviews.postMedia.useMutation();

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);
    fetch("https://api.imgur.com/3/image", {
      method: "POST",
      headers: {
        Authorization: `Client-ID ${env.NEXT_PUBLIC_IMGUR_CLIENT_ID}`,
      },
      body: formData,
    })
      .then((res) => {
        res
          .json()
          .then((data) => {
            setImageURL((data as { data: { link: string } }).data.link);
            setUploading(false);
          })
          .catch((err) => {
            console.error(err);
          });
      })
      .catch((err) => console.log(err));
  };

  if (uploading) {
    return (
      <div className={styles.ImageUpload}>
        <div className={styles.ImageUploadBox}>
          <BiImageAdd size="4em" />
          Uploading image...
        </div>
      </div>
    );
  }

  if (imageURL) {
    return (
      <div className={styles.AddImage}>
        <div className={styles.ImageUploadContainer}>
          <p className={styles.ImageUploaded}>Uploaded! Click submit!</p>
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
              if (imageURL) {
                console.log(imageURL);
                postMediaMutation.mutate({
                  media: imageURL,
                  locationId: props.locationId,
                });
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

  return (
    <div className={styles.AddImage}>
      <div className={styles.ImageUploadContainer}>
        <label className={styles.ImageUploadLabel}>
          <input
            className={styles.ImageInput}
            type="file"
            accept="image/*"
            onChange={onFileChange}
          />
          <div className={styles.UploadButton}>
            <BiImageAdd className={styles.UploadImageIcon} />
          </div>
        </label>
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
            if (imageURL) {
              console.log(imageURL);
              postMediaMutation.mutate({
                media: imageURL,
                locationId: props.locationId,
              });
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
