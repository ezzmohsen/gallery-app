import "./add.scss";
import React, { useState, useEffect } from "react";
import axios from "axios";

const Add = (props) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    image: "",
    category: "",
    status: "",
  });

  useEffect(() => {
    if (props.id) {
      axios
        .get(`http://localhost:5000/api/products/${props.id}`)
        .then((response) => {
          const { createdAt, updatedAt, __v, _id, ...data } = response.data;
          setFormData(data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [props.id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "price" || name === "stock" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("authToken");
    if (props.id) {
      axios
        .put(`http://localhost:5000/api/admin/products/${props.id}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          props.setOpen(false);
          props.onSuccess(!props.onSuccessValue);
          props.message({
            bol: true,
            message: "edited successfully",
            type: "green",
          });
          setTimeout(() => {
            props.message({
              bol: false,
              message: "",
              type: "",
            });
          }, 3000);
        })

        .catch((error) => {
          console.error("Error updating item:", error);
        });
    } else {
      axios
        .post(
          `http://localhost:5000/api/admin/products`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
            props.setOpen(false);
            props.onSuccess(!props.onSuccessValue);
            props.message({
              bol: true,
              message: "added successfully",
              type: "green",
            });
            setTimeout(() => {
              props.message({
                bol: false,
                message: "",
                type: "",
              });
            }, 3000);
          })
  
          .catch((error) => {
            console.error("Error updating item:", error);
          });
    }
  };
  return (
    <div className="add">
      <div className="modal">
        <span className="close" onClick={() => props.setOpen(false)}>
          X
        </span>
        <h1>{props.id ? `Edit ${props.slug}` : `Add new ${props.slug}`}</h1>
        <form onSubmit={handleSubmit}>
          {props.columns
            .filter((item) => item.field !== "id" && item.field !== "img")
            .map((column) => (
              <div className="item" key={column.field}>
                <label>{column.headerName}</label>
                {column.headerName === "Status" ? (
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    placeholder={column.field}
                  >
                    <option value="-">choose option</option>
                    <option value="available">available</option>
                    <option value="out of stock">out of stock</option>
                  </select>
                ) : (
                  <input
                    type={column.type}
                    name={column.field}
                    placeholder={column.field}
                    value={formData[column.field] || ""}
                    onChange={handleChange}
                    readOnly={column.field === "id"}
                  />
                )}
              </div>
            ))}
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};

export default Add;
