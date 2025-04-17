import {useCallback, useState} from 'react';
import ReactNativeBlobUtil, {
  Encoding,
  ReactNativeBlobUtilConfig,
} from 'react-native-blob-util';
import DeviceInfo from 'react-native-device-info';

// Custom hook with TypeScript types
const useRNBlobUtil = () => {
  const [error, setError] = useState<Error | null>(null);

  // Thresholds
  const MIN_FREE_STORAGE_MB = 50; // Minimum free storage required (in MB)
  const MAX_FILE_SIZE_MB = 500; // Maximum file size allowed (in MB)

  // Helper to handle errors
  const handleError = useCallback((err: Error) => {
    setError(err);
    console.error(err.message, err?.name || '');
    throw err;
  }, []);

  const listFilesInFolder = async (folderPath: string) => {
    try {
      // Use ls to list files in the specified directory
      const files = await ReactNativeBlobUtil.fs.ls(folderPath);
      console.log('Files in folder:', files);
      return files; // Returns an array of file names
    } catch (error) {
      console.error('Error listing files:', error);
      return [];
    }
  };

  // Validate free storage space
  const checkFreeStorage = useCallback(async () => {
    try {
      const freeStorageBytes = await DeviceInfo.getFreeDiskStorage();
      const freeStorageMB = freeStorageBytes / (1024 * 1024);
      if (freeStorageMB < MIN_FREE_STORAGE_MB) {
        throw new Error(
          `Insufficient storage: only ${freeStorageMB.toFixed(
            2
          )} MB available, ${MIN_FREE_STORAGE_MB} MB required`
        );
      }
      return freeStorageMB;
    } catch (err) {
      handleError(err as Error);
    }
  }, [handleError]);

  // Validate file size
  const validateFileSize = useCallback(
    async (filepath: string) => {
      try {
        const stats = await ReactNativeBlobUtil.fs.stat(filepath);
        const fileSizeMB = stats.size / (1024 * 1024);
        if (fileSizeMB > MAX_FILE_SIZE_MB) {
          throw new Error(
            `File size ${fileSizeMB.toFixed(
              2
            )} MB exceeds maximum limit of ${MAX_FILE_SIZE_MB} MB`
          );
        }
        return fileSizeMB;
      } catch (err) {
        handleError(err as Error);
      }
    },
    [handleError]
  );

  // Check if a file path exists
  const filePathExists = useCallback(
    async (filepath: string) => {
      try {
        return await ReactNativeBlobUtil.fs.exists(filepath);
      } catch (err) {
        handleError(err as Error);
      }
    },
    [handleError]
  );

  // Get file size from URL
  const getSizeFromUrl = useCallback(
    async (url: string) => {
      try {
        const res = await ReactNativeBlobUtil.fetch('POST', url);
        const contentLength = res.info().headers['content-length'];
        if (!contentLength) {
          throw new Error('Content-Length header not found in response');
        }
        const sizeBytes = parseInt(contentLength, 10);
        const sizeMB = sizeBytes / (1024 * 1024);
        return {sizeBytes, sizeMB};
      } catch (err) {
        handleError(err as Error);
      }
    },
    [handleError]
  );

  // Filesystem paths
  const paths = ReactNativeBlobUtil.fs.dirs;

  // Read directory contents
  const readDir = useCallback(
    async (dirpath: string) => {
      try {
        if (!(await filePathExists(dirpath))) {
          throw new Error(`Directory does not exist: ${dirpath}`);
        }
        const result = await ReactNativeBlobUtil.fs.ls(dirpath);
        return result;
      } catch (err) {
        handleError(err as Error);
      }
    },
    [handleError, filePathExists]
  );

  // Read file contents
  const readFile = useCallback(
    async (filepath: string, encoding: Encoding = 'utf8') => {
      try {
        if (!(await filePathExists(filepath))) {
          throw new Error(`File does not exist: ${filepath}`);
        }
        await validateFileSize(filepath);
        const contents = await ReactNativeBlobUtil.fs.readFile(
          filepath,
          encoding
        );
        return contents;
      } catch (err) {
        handleError(err as Error);
      }
    },
    [handleError, filePathExists, validateFileSize]
  );

  // Write to a file
  const writeFile = useCallback(
    async (filepath: string, contents: string, encoding: Encoding = 'utf8') => {
      try {
        await checkFreeStorage();
        const contentSizeMB =
          new TextEncoder().encode(contents).length / (1024 * 1024);
        if (contentSizeMB > MAX_FILE_SIZE_MB) {
          throw new Error(
            `Content size ${contentSizeMB.toFixed(
              2
            )} MB exceeds maximum limit of ${MAX_FILE_SIZE_MB} MB`
          );
        }
        await ReactNativeBlobUtil.fs.writeFile(filepath, contents, encoding);
        return true;
      } catch (err) {
        handleError(err as Error);
      }
    },
    [handleError, checkFreeStorage]
  );

  // Append to a file
  const appendFile = useCallback(
    async (filepath: string, contents: string, encoding: Encoding = 'utf8') => {
      try {
        await checkFreeStorage();
        if (!(await filePathExists(filepath))) {
          throw new Error(`File does not exist: ${filepath}`);
        }
        await ReactNativeBlobUtil.fs.appendFile(filepath, contents, encoding);
        await validateFileSize(filepath);
        return true;
      } catch (err) {
        handleError(err as Error);
      }
    },
    [handleError, checkFreeStorage, filePathExists, validateFileSize]
  );

  // Create a directory
  const mkdir = useCallback(
    async (dirpath: string) => {
      try {
        await checkFreeStorage();
        if (await filePathExists(dirpath)) {
          throw new Error(`Directory already exists: ${dirpath}`);
        }
        await ReactNativeBlobUtil.fs.mkdir(dirpath);
        return true;
      } catch (err) {
        handleError(err as Error);
      }
    },
    [handleError, checkFreeStorage, filePathExists]
  );

  // Delete a file or directory
  const unlink = useCallback(
    async (filepath: string) => {
      try {
        if (!(await filePathExists(filepath))) {
          throw new Error(`Path does not exist: ${filepath}`);
        }
        await ReactNativeBlobUtil.fs.unlink(filepath);
        return true;
      } catch (err) {
        handleError(err as Error);
      }
    },
    [handleError, filePathExists]
  );

  // Move a file
  const moveFile = useCallback(
    async (fromPath: string, toPath: string) => {
      try {
        if (!(await filePathExists(fromPath))) {
          throw new Error(`Source path does not exist: ${fromPath}`);
        }
        if (await filePathExists(toPath)) {
          throw new Error(`Destination path already exists: ${toPath}`);
        }
        await checkFreeStorage();
        await ReactNativeBlobUtil.fs.mv(fromPath, toPath);
        return true;
      } catch (err) {
        handleError(err as Error);
      }
    },
    [handleError, checkFreeStorage, filePathExists]
  );

  // Copy a file
  const copyFile = useCallback(
    async (fromPath: string, toPath: string) => {
      try {
        if (!(await filePathExists(fromPath))) {
          throw new Error(`Source path does not exist: ${fromPath}`);
        }
        if (await filePathExists(toPath)) {
          throw new Error(`Destination path already exists: ${toPath}`);
        }
        await checkFreeStorage();
        await validateFileSize(fromPath);
        await ReactNativeBlobUtil.fs.cp(fromPath, toPath);
        return true;
      } catch (err) {
        handleError(err as Error);
      }
    },
    [handleError, checkFreeStorage, filePathExists, validateFileSize]
  );

  // Get file stats
  const stat = useCallback(
    async (filepath: string) => {
      try {
        if (!(await filePathExists(filepath))) {
          throw new Error(`Path does not exist: ${filepath}`);
        }
        const stats = await ReactNativeBlobUtil.fs.stat(filepath);
        return stats;
      } catch (err) {
        handleError(err as Error);
      }
    },
    [handleError, filePathExists]
  );

  // Download a file
  const downloadFile = useCallback(
    async (
      url: string,
      destinationPath: string,
      options: ReactNativeBlobUtilConfig = {}
    ) => {
      try {
        await checkFreeStorage();
        if (await filePathExists(destinationPath)) {
          throw new Error(
            `Destination path already exists: ${destinationPath}`
          );
        }
        const fileSize = await getSizeFromUrl(url);
        console.log(`File size from URL: ${fileSize?.sizeMB.toFixed(2)} MB`);
        const res = await ReactNativeBlobUtil.config({
          path: destinationPath,
          fileCache: true,
          ...options,
        }).fetch('GET', url);
        await validateFileSize(destinationPath);
        return res;
      } catch (err) {
        handleError(err as Error);
      }
    },
    [
      handleError,
      checkFreeStorage,
      filePathExists,
      getSizeFromUrl,
      validateFileSize,
    ]
  );

  // Upload a file
  const uploadFile = useCallback(
    async (
      url: string,
      filepath: string,
      options: {headers?: Record<string, string>;} = {}
    ) => {
      try {
        if (!(await filePathExists(filepath))) {
          throw new Error(`File does not exist: ${filepath}`);
        }
        await validateFileSize(filepath);
        const res = await ReactNativeBlobUtil.fetch(
          'POST',
          url,
          {
            'Content-Type': 'application/octet-stream',
            ...options.headers,
          },
          ReactNativeBlobUtil.wrap(filepath)
        );
        return res;
      } catch (err) {
        handleError(err as Error);
      }
    },
    [handleError, filePathExists, validateFileSize]
  );

  return {
    paths,
    error,
    readDir,
    readFile,
    writeFile,
    appendFile,
    mkdir,
    unlink,
    moveFile,
    copyFile,
    stat,
    filePathExists,
    downloadFile,
    uploadFile,
    checkFreeStorage,
    validateFileSize,
    getSizeFromUrl,
    listFilesInFolder,
  };
};

export default useRNBlobUtil;
