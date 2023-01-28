import React from "react";

interface ModalProps {
  children: React.ReactNode;
  show: boolean;
}

export default function Modal(props: ModalProps) {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: props.show ? "flex" : "none",
        justifyContent: "center",
        alignItems: "center",
        zIndex: "1000",
      }}
    >
      {props.children}
    </div>
  );
}
