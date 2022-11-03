import React from "react";

export const onError = (error: Error, info: { componentStack: string }) => {
  console.log("error.message", error.message);
  console.log("info.componentStack", info.componentStack);
};

export const FetchError: React.FC = () => {
  return <div>Data fetching is failed</div>;
};
