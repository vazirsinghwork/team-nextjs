"use client";

import { postApi } from "@/app/api/apiClient";
import { useEffect, useState } from "react";
import SeriesCard from "@/components/dream/seriesCard";

export default function Series() {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  useEffect(() => {
    const loadSeries = async () => {
      try {
        const result = await postApi("/team/get_series_with_upcoming_matches");
        console.log("result?.data get_matches", result);
        setData(result?.data || []);
      } catch (err) {
        //console.error("Error fetching series:", err);
        setError(err?.message || "Failed to fetch series."); // Safely handle error messages
      }
    };

    loadSeries();
  }, []);

  if(data.length == 0){ return false }
  return (
    <>
    {data?.map((item,index)=> <SeriesCard name={item?.name} seriesData={item?.matches}/>)}
    </>
  );
}