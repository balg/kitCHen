import React from "react";

type useLocalStorageStateOptions = {
  serialize?: (item: any) => string;
  deserialize?: (item: string) => any;
};

function useLocalStorageState(
  key: string,
  defaultValue: any = "",
  options?: useLocalStorageStateOptions
) {
  const { serialize = JSON.stringify, deserialize = JSON.parse } =
    options || {};

  const [state, setState] = React.useState(() => {
    const item = window.localStorage.getItem(key);
    if (item) {
      return deserialize(item);
    }
    return typeof defaultValue === "function" ? defaultValue() : defaultValue;
  });

  const prevKeyRef = React.useRef(key);

  React.useEffect(() => {
    const oldKey = prevKeyRef.current;

    if (oldKey !== key) {
      window.localStorage.removeItem(oldKey);
    }
    prevKeyRef.current = key;
    window.localStorage.setItem(key, serialize(state));
  }, [state, key, serialize]);

  return [state, setState];
}

export default useLocalStorageState;
