import React, { useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import "./dataTable.scss";
import Add from "../add/Add";
import axios from "axios";
import OrderItemsModal from "../orderitemsmodal/OrderItemsModal";

const DataTable = (props) => {
  const [showSuccessMessage, setShowSuccessMessage] = useState({
    bol: false,
    message: "",
    type: "",
  });
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [id, setId] = useState(null);

  const handleDelete = async (id) => {
    const token = localStorage.getItem("authToken");
    try {
      await axios.delete(
        `http://localhost:5000/api/admin/${props.slug}/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      props.setRows((prevRows) => prevRows.filter((row) => row.id !== id));
      setShowSuccessMessage({
        bol: true,
        message: "deleted successfully",
        type: "red",
      });
      setTimeout(() => {
        setShowSuccessMessage({
          bol: false,
          message: "",
          type: "",
        });
      }, 3000);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const actionColumn = {
    field: "action",
    headerName: "Action",
    width: 70,
    renderCell: (params) => {
      return (
        <div className="action">
          {props.slug === "products" && (
            <div
              className="edit"
              onClick={() => {
                setOpen(true);
                setId(params.row.id);
              }}
            >
              <img src="/view.svg" alt="View" />
            </div>
          )}
          {props.slug === "orders" && (
            <div
              className="edit"
              onClick={() => {
                setOpen1(true);
                setId(params.row.id);
              }}
            >
              <img src="/view.svg" alt="View" />
            </div>
          )}
          <div className="delete" onClick={() => handleDelete(params.row.id)}>
            <img src="/delete.svg" alt="Delete" />
          </div>
        </div>
      );
    },
  };

  return (
    <div className="dataTable">
      {showSuccessMessage.bol && (
        <div
          className="successMessage"
          style={{
            backgroundColor:
              showSuccessMessage.type === "red" ? "red" : "green",
          }}
        >{`${showSuccessMessage.message}`}</div>
      )}
      <DataGrid
        id="data"
        className="dataGrid"
        rows={props.rows}
        columns={[...props.columns, actionColumn]}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
          },
        }}
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
      />
      {open && (
        <Add
          slug={props.slug.slice(0, -1)}
          columns={props.columns.slice(0, -2)}
          setOpen={setOpen}
          id={id}
          onSuccess={props.setRefresh}
          onSuccessValue={props.refresh}
          message={setShowSuccessMessage}
        />
      )}
      {open1 && (
        <OrderItemsModal
          slug={props.slug.slice(0, -1)}
          columns={props.columns}
          setOpen={setOpen1}
          id={id}
          onSuccess={props.setRefresh}
          onSuccessValue={props.refresh}
          message={setShowSuccessMessage}
        />
      )}
    </div>
  );
};

export default DataTable;
