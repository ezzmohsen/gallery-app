import React, { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "../../components/datatable/DataTable";
import OrderItemsView from "../../components/orderitemsview/OrderItemsView"
import "./orders.scss";

const Orders = () => {
  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 150,
    },
    {
      field: "customerName",
      headerName: "Customer Name",
      width: 150,
    },
    {
      field: "customerEmail",
      headerName: "Customer Email",
      width: 200,
    },
    {
      field: "customerPhone",
      headerName: "Customer Phone",
      width: 150,
    },
    {
      field: "customerAddress",
      headerName: "Customer Address",
      width: 200,
    },
    {
      field: "orderStatus",
      headerName: "Order Status",
      width: 150,
    },
    {
      field: "orderDate",
      headerName: "Order Date",
      width: 200,
      renderCell: (params) => new Date(params.value).toLocaleString(),
    },
    {
      field: "orderTotal",
      headerName: "Order Total",
      width: 150,
      renderCell: (params) => `$${params.value.toFixed(2)}`,
    },
    {
      field: "orderItems",
      headerName: "Order Items",
      width: 150,
      renderCell: (params) => (
        <div className="cont">
          <span>{params.value.length}</span>
          <button
            className="view"
            onClick={() => {
              setOrderItems(params.row.orderItems);
              setOpen(true);
            }}
          >
            View
          </button>
        </div>
      ),
    },
  ];

  const [orderItems, setOrderItems] = useState([]);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState({
    bol: false,
    message: "",
    type: "",
  });

  const modifyKey = (data) => {
    return data.map((item) => {
      const { _id, ...rest } = item;
      return { id: _id, ...rest };
    });
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem("authToken");
      try {
        const response = await axios.get(
          "http://localhost:5000/api/admin/orders/",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const modifiedData = modifyKey(response.data);
        setData(modifiedData);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, [refresh]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="orders">
      <div className="info">
        <h1>Orders</h1>
      </div>
      {showSuccessMessage.bol && (
        <div
          className="successMessage"
          style={{
            backgroundColor:
              showSuccessMessage.type === "red" ? "red" : "green",
          }}
        >{`${showSuccessMessage.message}`}</div>
      )}
      <DataTable
        slug="orders"
        columns={columns}
        rows={data}
        setRefresh={setRefresh}
        refresh={refresh}
        setRows={setData}
      />
      {open && (
        <OrderItemsView
          slug="product"
          orderitems={orderItems}
          setOpen={setOpen}
        />
      )}
    </div>
  );
};

export default Orders;
