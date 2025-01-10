"use client";

import { postApi } from "@/app/api/apiClient";
import Table from "@/components/table";
import { useEffect, useState } from "react";
import Popup from "./popup";

export default function Series() {
  const [data, setData] = useState([]); // Store the series data
  const [error, setError] = useState(""); // Store any error messages

  useEffect(() => {
    const loadSeries = async () => {
      try {
        const result = await postApi("/team/get_series");
        console.log("result?.data series page", result);
        setData(result?.data || []); // Fallback to an empty array if data is undefined
      } catch (err) {
       // console.error("Error fetching series:", err);
        setError(err?.message || "Failed to fetch series."); // Safely handle error messages
      }
    };

    loadSeries();
  }, []);

  return (
    <div>
      <h1>Series Page</h1>
      <p>Welcome to the series page!</p>

      {/* Display error message if any */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div className="card bg-secondary-subtle">
      <div className="card-header">
      <h5 className="card-title">Special title treatment</h5>
    <div className="card-toolbar">
    <Popup/>
  </div>
  </div>
  <div className="card-body ">

      {data?.length > 0 ? (
        <Table
          data1={data}
          columns={[
            { label: "Name", renderCell: (item) => item?.name || "N/A" },
            {
              label: "Date From",
              renderCell: (item) =>
                item?.date_from
                  ? new Date(item.date_from).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : "N/A",
            },
            { label: "Date To",   renderCell: (item) =>
              item?.date_to
                ? new Date(item.date_to).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                : "N/A",},
            {
              label: "Short Name", renderCell: (item) => item?.short_name || "N/A"
            },
          ]}
        />
      ) : (
        <p>No series data available.</p>
      )}
      </div>
      </div>
    </div>
  );
}