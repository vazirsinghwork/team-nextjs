"use client";

import { postApi } from "@/app/api/apiClient";
import Table from "@/components/table";
import { useEffect, useState } from "react";
import PlayerPopup from "./playerPopup";
import Link from "next/link";

export default function Series() {
  const [data, setData] = useState([]); // Store the series data
  const [error, setError] = useState(""); // Store any error messages
  const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTeamId, setSelectedTeamId] = useState('');
    const [selectedData, setSelectedData] = useState();
  useEffect(() => {
    const loadSeries = async () => {
      try {
        const result = await postApi("/team/get_matches");
        console.log("result?.data get_matches", result);
        setData(result?.data || []); // Fallback to an empty array if data is undefined
      } catch (err) {
        //console.error("Error fetching series:", err);
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
  </div>
  </div>
  <div className="card-body ">

      {data?.length > 0 ? (
        <Table
          data1={data}
          columns={[
            { label: "Team", renderCell: (item) => item?.team1_name || "N/A" },
            {
              label: "Team", renderCell: (item) => item?.team2_name || "N/A"
            },
            {
              label: "Time From",
              renderCell: (item) =>
                item?.time_from
                  ? new Date(item.time_from).toLocaleString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                    })
                  : "N/A",
            },
            { label: "Time To",   renderCell: (item) =>
              item?.time_to
                ? new Date(item.time_to).toLocaleTimeString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                : "N/A",},


                {
                  label: "Action",
                  renderCell: (item) => (
                    <button
        type="button"
        className="btn btn-dark"
        onClick={() => {
          setSelectedTeamId(item?.team1_id)
          setSelectedData(item)
          setIsModalOpen(true)
        }}
      >
       {`${item?.team1_name} Squard`}
      </button>
                  ),
                },
                {
                  label: "Action",
                  renderCell: (item) => (
                    <button
        type="button"
        className="btn btn-dark"
        onClick={() => {
          setSelectedTeamId(item?.team2_id)
          setSelectedData(item)
           setIsModalOpen(true)
        }}
      >
       {`${item?.team2_name} Squard`}
      </button>
                  ),
                },
                { label: "View", renderCell: (item) => <Link href={{pathname:`/admin/series_match/${item?.id}/${item?.team1_name}/${item?.team2_name}`}}>View</Link>  },
          ]}
        />
      ) : (
        <p>No series data available.</p>
      )}
      </div>

      </div>
      {isModalOpen && <PlayerPopup selectedTeamId={selectedTeamId} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} teamData={selectedData} />}
    </div>
  );
}