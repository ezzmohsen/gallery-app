import "./products.scss";
import React, { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "../../components/datatable/DataTable";
import Add from "../../components/add/Add";

const columns = [
  {
    field: "id",
    headerName: "ID",
    width: 150,
  },
  {
    field: "image",
    headerName: "Image",
    width: 100,
    renderCell: (params) => {
      return (
        <img
          src={params.row.image || "profilePic.svg"}
          alt="Product"
          style={{ width: "100%", height: "auto" }}
        />
      );
    },
  },
  {
    field: "name",
    headerName: "Name",
    width: 150,
  },
  {
    field: "description",
    headerName: "Description",
    width: 200,
    renderCell: (params) => <div title={params.value}>{params.value}</div>,
  },
  {
    field: "price",
    headerName: "Price",
    width: 150,
    renderCell: (params) => `$${params.value.toFixed(2)}`,
  },
  {
    field: "stock",
    headerName: "Stock",
    width: 150,
  },
  {
    field: "category",
    headerName: "Category",
    width: 150,
  },
  {
    field: "status",
    headerName: "Status",
    width: 150,
  },
  {
    field: "createdAt",
    headerName: "Created At",
    width: 200,
    renderCell: (params) => new Date(params.value).toLocaleString(),
  },
  {
    field: "updatedAt",
    headerName: "Updated At",
    width: 200,
    renderCell: (params) => new Date(params.value).toLocaleString(),
  },
];

const Products = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
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
          "http://localhost:5000/api/products/",
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
    <div className="products">
      <div className="info">
        <h1>Products</h1>
        <button onClick={() => setOpen(true)}>Add New Product</button>
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
        slug="products"
        columns={columns}
        rows={data}
        setRefresh={setRefresh}
        refresh={refresh}
        setRows={setData}
      />
      {open && (
        <Add
          slug="product"
          columns={columns.slice(0, -2)}
          setOpen={setOpen}
          onSuccess={setRefresh}
          onSuccessValue={refresh}
          message={setShowSuccessMessage}
        />
      )}
    </div>
  );
};

export default Products;
