import { useState } from "react";
import { useDispatch } from "react-redux";
import { AddCategori } from "../../store/categorieSlice";
import { Button } from "react-bootstrap";

const AddCategorie = () => {
  const [title, setTitle] = useState();
  const disptch = useDispatch();
  const handelSubmit = (e) => {
    e.preventDefault();
    disptch(AddCategori({ title }));
    setTitle("");
  };
  return (
    <form onSubmit={handelSubmit}>
      <div className="add-cat">
        <input
          type="text"
          value={title}
          placeholder="ENTER CATEGORIE TITLE"
          onChange={(e) => setTitle(e.target.value)}
        />

        <Button variant="primary" type="submit">
          Create Categorie
        </Button>
      </div>
    </form>
  );
};

export default AddCategorie;
