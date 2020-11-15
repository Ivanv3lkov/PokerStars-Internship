import { useState, useEffect } from "react";

const useDataHook = () => {
  const [data, setData] = useState([]);

  const fetchData = () => {
    fetch("http://localhost:3001/albums")
      .then((data) => data.json())
      .then((result) => setData(result));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, refetchData: fetchData };
};

export default useDataHook;