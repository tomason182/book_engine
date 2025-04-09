import { useState, useEffect, useCallback } from "react";

export default function usePropertyInfo() {
  const [propertyInfo, setPropertyInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const propertyId = window.location.pathname.split("/").pop() || "1";
  // Default to "1" if propertyId is not found

  const fetchPropertyInfo = useCallback(() => {
    setLoading(true);
    setError(null);

    const url =
      import.meta.env.VITE_API_URL + "/search-engine/propertyInfo" + propertyId;
    const options = {
      mode: "cors",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    };

    fetch(url, options)
      .then(response => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(data => {
        setPropertyInfo(data);
      })
      .catch(error => {
        setError(error);
      })
      .finally(() => {
        setLoading(true);
      });
  }, [propertyId]);

  useEffect(() => {
    fetchPropertyInfo();
  }, [fetchPropertyInfo]);
  return { propertyInfo, loading, error };
}
