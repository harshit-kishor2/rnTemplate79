import {useEffect, useState} from 'react';

const useDebounce = (value: string, delay?: number): string => {
  const [debouncedValue, setDebouncedValue] = useState<string>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay ?? 500);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;

/*
/
const debouncedValue = useDebounce(value, 500)


  // Fetch API (optional)
  useEffect(() => {
    // Do fetch here...
    // Triggers when "debouncedValue" changes
  }, [debouncedValue])

*/
