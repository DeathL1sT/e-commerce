import { useState } from "react";
import { createProduct } from "../../store/productSlice";
import { useDispatch } from "react-redux";
import { Button } from "react-bootstrap";
const AddProdauct = () => {
  const [title, setTitle] = useState();
  const [discreption, setDiscreption] = useState();
  const [imgUrl, setImgUrl] = useState();
  const [price, setprice] = useState();
  const [categorieId, setCategorieId] = useState();
  const [invId, setInvId] = useState();
  const [discountId, setDiscountId] = useState();

  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      createProduct({
        title,
        discreption,
        imgUrl,
        price,
        categorieId,
        invId,
        discountId,
      })
    );
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="addproduct">
        <h4>Create new Product...</h4>
        <div className="product-content">
          <input
            type="text"
            placeholder="ENTER TITLE"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="ENTER DISCRIPTION"
            value={discreption}
            onchange={(e) => setDiscreption(e.target.value)}
          />
          <input
            type="file"
            id=""
            name="myfile"
            placeholder="UPLOAD IMG"
            value={imgUrl}
            onChange={(e) => setImgUrl(e.target.value)}
          />
          <input
            type="number"
            placeholder="ENTER PRICE"
            value={price}
            onchange={(e) => setprice(e.target.value)}
          />
          <input
            type="number"
            placeholder="ENTER CATEGORIE ID"
            value={categorieId}
            onchange={(e) => setCategorieId(e.target.value)}
          />
          <input
            type="number"
            placeholder="ENTER INVENTORY ID"
            value={invId}
            onchange={(e) => setInvId(e.target.value)}
          />
          <input
            type="number"
            placeholder="ENTER DISCOUNT ID"
            value={discountId}
            onchange={(e) => setDiscountId(e.target.value)}
          />
        </div>

        <Button variant="primary" type="submit">
          Create Product
        </Button>
      </div>
    </form>
  );
};

export default AddProdauct;
