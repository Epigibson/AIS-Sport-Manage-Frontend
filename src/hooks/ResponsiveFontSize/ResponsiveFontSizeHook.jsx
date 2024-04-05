import { useEffect, useState } from "react";

export const useResponsiveFontSize = () => {
  const [fontSize, setFontSize] = useState(16);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 576) {
        setFontSize(12);
      } else if (window.innerWidth < 768) {
        setFontSize(16);
      } else {
        setFontSize(18);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Llamar al inicio para establecer el tamaño inicial

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return fontSize;
};
