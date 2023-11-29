import { useContext } from "react";
import { Button, Checkbox } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

import { InventoryContext } from "../data/inventoryContext";

export default function Product({ product }) {
  var today = new Date();
  var date =
    today.getDate() + "-" + (today.getMonth() + 1) + "-" + today.getFullYear();

  var today = new Date();
  var time = today.getHours() + ":" + today.getMinutes();

  const { deleteProduct, setEditing, updateProduct } =
    useContext(InventoryContext);

  function handleCheckbox() {
    updateProduct({
      ...product,
      inStock: !product.inStock,
    });
  }

  return (
    <div className="product">
      <label>
        <Checkbox    checked={product.inStock}
          onChange={handleCheckbox} />
        {product.inStock ? <del>{product.name}</del> : product.name}
      </label>
      <div>
        Started at: {product.time} on {product.date}
      </div>
      {product.inStock ? (
        <div>
          Completed at: {time} on {date}
        </div>
      ) : (
        <></>
      )}
      <div className="buttons">
        <Button
          variant="contained"
          className="edit-btn"
          onClick={() => setEditing(product.id)}
        >
          Edit
        </Button>
        <IconButton
          aria-label="delete"
          size="large"
          onClick={() => deleteProduct(product.id)}
        >
          <DeleteIcon fontSize="inherit" />
        </IconButton>
      </div>
    </div>
  );
}
