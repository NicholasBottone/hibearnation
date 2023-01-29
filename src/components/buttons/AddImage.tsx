import React, { useState } from "react";
import styles from "./AddImage.module.css";

import { BiImageAdd } from "react-icons/bi";

interface AddImageProps {
  closeModal: () => void;
}

export default function AddImage(props: AddImageProps) {
  const [uploading, setUploading] = useState(false);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);
    fetch("https://api.imgur.com/3/image", {
      method: "POST",
      headers: {
        Authorization: `Client-ID ${
          process.env.NEXT_PUBLIC_IMGUR_CLIENT_ID ?? ""
        }`,
      },
      body: formData,
    })
      .then((res) => {
        res
          .json()
          .then((data) => {
            // props.setImageURL((data as { data: { link: string } }).data.link);
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

  // if (props.imageURL) {
  //   return (
  //     <div
  //       className={
  //         props.type === "post"
  //           ? styles.PostImageContainer
  //           : styles.EventImageContainer
  //       }
  //     >
  //       <img
  //         className={styles.UploadedImage}
  //         src={props.imageURL}
  //         alt="Upload preview"
  //       />
  //     </div>
  //   );
  // }

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
