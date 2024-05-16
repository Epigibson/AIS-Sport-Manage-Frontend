import { useCallback, useState } from "react";
import LoadingContext from "./LoadingContext";
import PropTypes from "prop-types";

export const LoadingProvider = ({ children }) => {
  const [loadingCount, setLoadingCount] = useState(0);

  const startLoading = useCallback(() => {
    setLoadingCount((prev) => prev + 1);
  }, []);

  const stopLoading = useCallback(() => {
    setLoadingCount((prev) => Math.max(prev - 1, 0));
  }, []);

  return (
    <LoadingContext.Provider
      value={{ startLoading, stopLoading, isLoading: loadingCount > 0 }}
    >
      {children}
    </LoadingContext.Provider>
  );
};

LoadingProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
