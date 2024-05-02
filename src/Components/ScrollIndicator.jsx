import { useEffect, useState } from "react";
import "./Scroll.css";

export const ScrollIndicator = ({ url }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [scrollPercentage, setScrollPercentage] = useState(0);

  const fetchData = async (getUrl) => {
    try {
      setLoading(true);
      const response = await fetch(getUrl);
      const data = await response.json();

      if (data && data.products && data.products.length > 0) {
        setData(data.products);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setErrorMessage(error.message);
    }
  };

  useEffect(() => {
    fetchData(url);
  }, [url]);

  const handleScrollPercentage = () => {};

  useEffect(() => {
    window.addEventListener("scroll", handleScrollPercentage);

    return () => {
      window.removeEventListener("scroll", () => {});
    };
  });
  console.log(data, loading);
  return (
    <div>
      <h1>Custom Scroll Indicator</h1>
      <div className="data-container">
        {data && data.length > 0
          ? data.map((dataItem, i) => <p key={i}>{dataItem.title}</p>)
          : null}
      </div>
    </div>
  );
};

//
