import { useEffect, useState } from "react";
import loaderIcon from "/src/assets/icon-running.gif";
import { Image, Progress } from "antd";
import "./loaderIconStyles.css";
import PropTypes from "prop-types";

export const LoaderIconUtils = ({ isLoading }) => {
  const [progress, setProgress] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    let interval;
    if (isLoading) {
      interval = setInterval(() => {
        setProgress((oldProgress) => {
          return Math.min(oldProgress + Math.random() * 10, 100);
        });
      }, 200);
    } else {
      setProgress(100);
      setTimeout(() => setIsCompleted(true), 500); // Añadir una pequeña espera antes de la transición
    }

    return () => {
      clearInterval(interval);
    };
  }, [isLoading]);

  return (
    <div className={`loader-overlay ${isCompleted ? "fade-out" : ""}`}>
      <div className="loader-content">
        <Image src={loaderIcon} alt="Cargando..." />
        <span className="loader-text">Cargando...</span>
        <Progress percent={progress} showInfo={false} />
        <span className="progress-text">{Math.floor(progress)}%</span>
      </div>
    </div>
  );
};

LoaderIconUtils.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};
