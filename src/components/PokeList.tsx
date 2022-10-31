import React, { useEffect } from "react";

const sleep = () => {
  return new Promise((resolve) => setTimeout(() => resolve("ok"), 1000));
};
export const PokeList: React.FC = () => {
  if (Math.random() < 0.5) {
    throw sleep();
  }
  return <div>PokeList</div>;
};
