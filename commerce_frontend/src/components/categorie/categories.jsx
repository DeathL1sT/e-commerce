import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fichPage } from "../../store/categorieSlice";
import Card from "react-bootstrap/Card";
import { Button } from "react-bootstrap";
import "./categories.scss";
const Categories = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fichPage(1));
  }, []);
  const categories = useSelector((state) => state.categorie.all);
  return (
    <form className="cat-form">
      <div className="page-lapel">
        <h4>Categories</h4>
      </div>
      <div className="cat-list">
        <ul>
          {Object.values(categories).map((c) => (
            <li key={c.id}>
              <Card style={{ width: "18rem" }}>
                <Card.Img variant="top" src={c.img} />
                <Card.Body>
                  <Card.Title>{c.title}</Card.Title>
                  <Card.Text>{c.des}</Card.Text>
                  <Button variant="success" size="lg">
                    الذهاب الى {c.title}
                  </Button>
                </Card.Body>
              </Card>
            </li>
          ))}
        </ul>
      </div>
    </form>
  );
};

export default Categories;
