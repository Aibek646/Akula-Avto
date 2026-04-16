import React, { useEffect, useState } from "react";
import debounce from "lodash.debounce";

const useDebounce = <T>(value: T, delay: number = 300): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const debounceUpdate = debounce(() => {
      setDebouncedValue(value);
    }, delay);
    debounceUpdate();
    return () => {
      debounceUpdate.cancel();
    };
  }, [value, delay]);
  return debouncedValue;
};
export default useDebounce;
