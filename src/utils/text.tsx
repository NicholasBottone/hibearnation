import styles from "../styles/text.module.css";

export const bold = (text: string) => {
  return text.split("**").map((text, i) => {
    if (i % 2 === 0) {
      return text;
    } else {
      return (
        <b key={i} style={{ color: "#822b2e" }}>
          {text}
        </b>
      );
    }
  });
};

export const lines = (text: string) => {
  return text.split("\n\n").map((text, i) => {
    return (
      <p key={i} className={styles.p}>
        {text}
      </p>
    );
  });
};
