import React from "react";

export const Skelton: React.FC = () => {
  return (
    <div
      role="status"
      className="p-4 max-w-sm rounded border border-neutral-200 shadow animate-pulse md:p-2 dark:border-neutral-600 w-56"
    >
      <div className="flex justify-center items-center mb-4 h-24 bg-neutral-300 rounded dark:bg-neutral-600">
        <svg
          className="w-8 h-8 text-neutral-200 dark:text-neutral-700"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 640 512"
        >
          <path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" />
        </svg>
      </div>
      <div className="h-2.5 bg-neutral-200 rounded-full dark:bg-neutral-600 w-24 mb-4 mx-auto"></div>
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export const SkeltonList = () => {
  const arr = [];
  for (let i = 0; i < 50; i++) {
    arr.push(i);
  }
  return (
    <ul className="flex w-10/12 flex-wrap gap-5 justify-center">
      {arr.map((i) => (
        <Skelton key={i}/>
      ))}
    </ul>
  );
};
