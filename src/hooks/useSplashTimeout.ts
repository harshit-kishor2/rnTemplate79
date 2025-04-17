import {useState, useEffect} from 'react';

const SPLASH_TIMEOUT = 5000;

const useSplashTimeout = (callback?: () => void) => {
  const [isSplashEnd, setIsSplashEnd] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSplashEnd(true);
      if (callback) {
        callback(); // Execute the provided callback function
      }
    }, SPLASH_TIMEOUT);

    return () => clearTimeout(timer);
  }, [callback]);

  return isSplashEnd;
};

export default useSplashTimeout;
