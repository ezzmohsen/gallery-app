import React, { useState, useEffect } from "react";
import axios from "axios";
import "./orderItemsModal.scss";

const OrderItemsModal = (props) => {
  const [formData, setFormData] = useState({ orderStatus: "" });

  useEffect(() => {
    const token = localStorage.getItem("authToken")
    axios.get(`http://localhost:5000/api/admin/orders/${props.id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        const { orderStatus } = response.data;
        setFormData({ orderStatus });
        console.log(formData);
        console.log(orderStatus);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

  }, [props.id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("authToken");
    axios
      .put(`http://localhost:5000/api/admin/orders/${props.id}`, formData, {
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
  };
  return (
    <div className="add">
      <div className="modal">
        <span className="close" onClick={() => props.setOpen(false)}>
          X
        </span>
        <h1>{`Edit ${props.slug}`}</h1>
        <form onSubmit={handleSubmit}>
          {props.columns
            .filter(
              (item) => item.field === "orderStatus" || item.field === "id"
            )
            .map((column) => (
              <div className="item" key={column.field}>
                <label>{column.headerName}</label>
                {column.field === "orderStatus" ? (
                  <select
                    name="orderStatus"
                    value={formData.orderStatus || ""}
                    onChange={handleChange}
                  >
                    {["pending", "completed", "shipped", "cancelled"].map(
                      (status) =>
                        !(formData.orderStatus === status) && (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        )
                    )}
                    <option value={formData.orderStatus || ""}>
                      {formData.orderStatus || "Choose option"}
                    </option>
                  </select>
                ) : (
                  <input
                    type={column.type}
                    name={column.field}
                    placeholder={column.field}
                    value={
                      column.field === "id"
                        ? props.id
                        : formData[column.field] || ""
                    }
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

export default OrderItemsModal;
