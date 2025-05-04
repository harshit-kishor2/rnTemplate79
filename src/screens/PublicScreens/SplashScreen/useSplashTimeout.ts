import {simulateApiCall} from '@helpers/utils';
import {useState, useEffect} from 'react';
// import NetInfo from '@react-native-community/netinfo';
const MIN_SPLASH_TIME = 2000;


const useSplashTimeout = () => {
  const [status, setStatus] = useState<'idle' | 'success' | 'failed' | 'no-internet'>('idle');

  useEffect(() => {
    let isMounted = true;
    let timeoutId: NodeJS.Timeout | undefined;
    const executeApiCall = async () => {
      try {
        // Wait for minimum splash time
        await new Promise(resolve => setTimeout(resolve, MIN_SPLASH_TIME));

        // TODO:  Check internet connectivity after 5 seconds
        // const netInfo = await NetInfo.fetch();
        // if (!netInfo.isConnected) {
        //   if (isMounted) setStatus('no-internet');
        //   return;
        // }

        // Proceed with API call if internet is available
        const response = await Promise.race([
          // Simulate api call here...
          simulateApiCall(MIN_SPLASH_TIME),
          new Promise<Response>((_, reject) => {
            timeoutId = setTimeout(() => reject(new Error('API timeout')), 30000);
          }),
        ]);

        if (isMounted) {
          setStatus(response.ok ? 'success' : 'failed');
        }
      } catch (error) {
        if (isMounted) {
          setStatus(error instanceof Error && error.message === 'API timeout' ? 'no-internet' : 'failed');
        }
      } finally {
        if (timeoutId) clearTimeout(timeoutId);
      }
    };

    executeApiCall();

    return () => {
      isMounted = false;
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  return status;
};

export default useSplashTimeout;
