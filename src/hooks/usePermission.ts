// Permission hook with react-native-permissions
import {useCallback, useEffect, useState} from 'react';
import {Platform} from 'react-native';
import {
  PERMISSIONS,
  PermissionStatus,
  RESULTS,
  check,
  request,
} from 'react-native-permissions';

interface PermissionHook {
  permissionStatus: PermissionStatus;
  requestPermission: () => Promise<void>;
  checkPermission: () => Promise<void>;
  hasPermission: boolean;
  isPermissionLoading: boolean;
}

const usePermission = ({
  iosPermission,
  androidPermission,
}: {
  iosPermission: keyof typeof PERMISSIONS.IOS;
  androidPermission: keyof typeof PERMISSIONS.ANDROID;
}): PermissionHook => {
  const isIOS = Platform.OS === 'ios';
  const [permissionStatus, setPermissionStatus] = useState<PermissionStatus>(
    RESULTS.UNAVAILABLE
  );
  const [hasPermission, setHasPermission] = useState<boolean>(false);
  const [isPermissionLoading, setIsPermissionLoading] =
    useState<boolean>(false);

  const platformPermission = isIOS
    ? PERMISSIONS.IOS[iosPermission]
    : PERMISSIONS.ANDROID[androidPermission];

  const checkPermission = useCallback(async () => {
    try {
      setIsPermissionLoading(true);
      const result = await check(platformPermission);
      setPermissionStatus(result);
      setHasPermission(result === RESULTS.GRANTED);
    } catch (error) {
      console.error('Error checking permission:', error);
      setPermissionStatus(RESULTS.UNAVAILABLE);
    } finally {
      setIsPermissionLoading(false);
    }
  }, [platformPermission]);

  const requestPermission = useCallback(async () => {
    try {
      setIsPermissionLoading(true);
      // Skip request if already granted or blocked
      if (
        permissionStatus === RESULTS.GRANTED ||
        permissionStatus === RESULTS.BLOCKED
      ) {
        return;
      }

      const result = await request(platformPermission);
      setPermissionStatus(result);
      setHasPermission(result === RESULTS.GRANTED);
    } catch (error) {
      console.error('Error requesting permission:', error);
      setPermissionStatus(RESULTS.DENIED);
    } finally {
      setIsPermissionLoading(false);
    }
  }, [platformPermission, permissionStatus]);

  // Initial check
  useEffect(() => {
    let isMounted = true;

    const initCheck = async () => {
      if (isMounted) {
        await checkPermission();
      }
    };

    initCheck();

    return () => {
      isMounted = false;
    };
  }, [checkPermission]);

  // // Handle permission request after initial check
  // useEffect(() => {
  //   let isMounted = true;
  //   let timer: NodeJS.Timeout;

  //   if (permissionStatus === RESULTS.DENIED) {
  //     timer = setTimeout(async () => {
  //       if (isMounted) {
  //         await requestPermission().
  //       }
  //     }, 500)
  //   }

  //   return () => {
  //     isMounted = false;
  //     if (timer) {
  //       clearTimeout(timer);
  //     }
  //   };
  // }, [permissionStatus, requestPermission]);

  return {
    hasPermission,
    permissionStatus,
    requestPermission,
    checkPermission,
    isPermissionLoading,
  };
};

export default usePermission; 
