import React, { FC, JSX } from "react";
import { CompactTable } from "@table-library/react-table-library/compact";
import { useTheme } from "@table-library/react-table-library/theme";
import { getTheme } from "@table-library/react-table-library/baseline";
import { usePagination } from "@table-library/react-table-library/pagination";

export interface TableProps {
  data1: any[]; // Array of data objects
  columns: any;
}

const Table: FC<TableProps> = ({ data1, columns }): JSX.Element => {
  const theme = useTheme(getTheme());

  // Map JSON data to the format expected by `@table-library`
  const nodes = data1?.map((item) => ({
    id: item.id?.toString() || "",
    name: item.name || "",
    team1_name: item.team1_name || "",
    team2_name: item.team2_name || "",
    date_from:item.date_from || "",
    time_from:item.time_from || "",
    time_to:item.time_to || "",
    date_to:item.date_to || "",
    short_name: item.short_name || "",
    nodes: item.nodes || 0,
    ...item
  })) || [];

  const data = { nodes };
  const pagination = usePagination(data, {
    state: {
      page: 0,
      size: 5, // Page size
    },
    onChange: onPaginationChange,
  });

  // Handle pagination changes
  function onPaginationChange(action, state) {
    console.log("Pagination Action:", action);
    console.log("Pagination State:", state);
  }

  return (
    <>
      <CompactTable
        columns={columns}
        data={data}
        theme={theme}
        pagination={pagination}
      />

      <br />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        {/* Total Pages */}
        <span>
          Total Pages: {data?.nodes?.length ? pagination.state.getTotalPages(data.nodes) : 0}
        </span>

        {/* Pagination Buttons */}
        <span>
          {data?.nodes?.length ? (
            pagination.state.getPages(data.nodes).map((_, index) => (
              <button
                key={index}
                type="button"
                style={{
                  padding: "0.5em 1em",
                  margin: "0 0.2em",
                  background: pagination.state.page === index ? "#007bff" : "#f8f9fa",
                  color: pagination.state.page === index ? "#fff" : "#000",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontWeight: pagination.state.page === index ? "bold" : "normal",
                }}
                onClick={() => pagination.fns.onSetPage(index)}
              >
                {index + 1}
              </button>
            ))
          ) : (
            "No Data"
          )}
        </span>
      </div>

      <br />
    </>
  );
};

export default Table;