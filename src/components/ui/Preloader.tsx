import { useEffect } from "react";

import "../../index.css";
import { preLoaderAnim } from "../../animations";

const PreLoader = () => {
  useEffect(() => {
    preLoaderAnim();
  }, []);

  return (
    <div className="preloader bg-primary-500">
      <div className="text-container">
        <span>Welcome to Eventify! 🎉 </span>
      </div>
    </div>
  );
};

export default PreLoader;
