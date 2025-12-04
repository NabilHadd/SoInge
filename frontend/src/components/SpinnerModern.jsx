import React from "react";

export default function SpinnerModern({ size = 16, fullScreen = false }) {
  // size en Tailwind (px) -> 16 = 4rem aprox
  return (
    <div
      className={`${
        fullScreen ? "fixed inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm z-50" : "inline-flex"
      }`}
    >
      <div
        className={`border-4 border-blue-500 border-t-transparent rounded-full animate-spin`}
        style={{ width: `${size}px`, height: `${size}px` }}
      />
    </div>
  );
}
