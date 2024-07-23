import React, { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "../../components/datatable/DataTable";
import "./users.scss";

const columns = [
  {
    field: "id",
    headerName: "ID",
    width: 150,
  },
  {
    field: "img",
    headerName: "Avatar",
    width: 100,
    renderCell: (params) => {
      return <img src={params.row.img || "profilePic.svg"} alt="" />;
    },
  },
  {
    field: "name",
    type: "string",
    headerName: "Name",
    width: 150,
  },
  {
    field: "email",
    type: "string",
    headerName: "Email",
    width: 200,
  },
  {
    field: "phone",
    type: "string",
    headerName: "Phone",
    width: 200,
  },
  {
    field: "address",
    type: "string",
    headerName: "Address",
    width: 200,
  },
  {
    field: "createdAt",
    headerName: "Created At",
    width: 200,
    type: "string",
  },
];

const Users = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refresh, setRefresh] = useState(false);

  const modifyKey = (data) => {
    return data.map(item => {
      const { _id, ...rest } = item;
      return { id: _id, ...rest };
    });
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem("authToken");
      try {
        const response = await axios.get(
          "http://localhost:5000/api/admin/users",
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
    <div className="users">
      <div className="info">
        <h1>Users</h1>
      </div>
      <DataTable
        slug="users"
        columns={columns}
        rows={data}
        setRefresh={setRefresh}
        refresh={refresh}
        setRows={setData}
      />
    </div>
  );
};

export default Users;
