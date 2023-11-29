import { useContext, useState } from "react";
import { InventoryContext } from "../data/inventoryContext";
import { nanoid } from "nanoid";
import { Button, TextField } from "@mui/material";

export default function ProductForm() {
  const { addProduct, setEditing, updateProduct, editing, products } =
    useContext(InventoryContext);

  let initialData = {
    name: "",
    inStock: false,
    time: "",
  };
  if (editing !== "new") {
    initialData = products.find(function (p) {
      return p.id === editing;
    });
  }

  const [product, setProduct] = useState(initialData);

  var today = new Date();
  var date =
    today.getDate() + "-" + (today.getMonth() + 1) + "-" + today.getFullYear();

  var today = new Date();
  var time = today.getHours() + ":" + today.getMinutes();

  function handleSubmit(e) {
    // e.preventDefault();

    if (editing === "new") {
      addProduct({
        ...product,
        id: nanoid(),
        time: time,
        date: date,
      });
    } else {
      updateProduct(product);
    }
  }

  function handleInput(e, field) {
    setProduct({ ...product, [field]: e.target.value });
  }
  return (
    <div className="add-form" style={{ marginTop: "1rem" }}>
      <form onSubmit={handleSubmit}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <label style={{ fontSize: 24, fontWeight: "700" }}>Task:</label>
          <TextField
            fullWidth
            id="fullWidth"
            value={product.name}
            onChange={(e) => handleInput(e, "name")}
          />
        </div>
        <div className="form-btns">
          <Button
            variant="contained"
            className="cancel-btn"
            onClick={() => setEditing(null)}
          >
            cancel
          </Button>
          <Button
            variant="contained"
            className="save-btn"
            onClick={() => handleSubmit()}
          >
            save
          </Button>
        </div>
      </form>
    </div>
  );
}
