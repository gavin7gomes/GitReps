import React from "react";

const RepositoriesPage = React.lazy(() =>
  import("../../screens/LandingPage/RepositoriesPage")
);

export const screenNames = {
  repositoriesPage: "/",
};

export const routes = {
  [screenNames.repositoriesPage]: {
    component: <RepositoriesPage />,
    displayName: "Respositories",
  },
};
