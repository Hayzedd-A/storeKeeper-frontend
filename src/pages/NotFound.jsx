import React from "react";
import { useRouteError } from "react-router-dom";

function NotFound() {
  const error = useRouteError();
  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <p>
        The page you're looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </p>
    </div>
  );
}

export default NotFound;
