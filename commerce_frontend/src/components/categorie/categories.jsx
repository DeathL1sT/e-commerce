import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fichPage } from "../../store/categorieSlice";
import "./categories.scss";
const Categories = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fichPage(1));
  }, []);
  const categories = useSelector((state) => state.categorie.all);
  return (
    <form className="cat-form">
      <div className="cat-content">
        <div className="page-lapel">
          <h4>Categories</h4>
        </div>
        <div className="cat-list">
          <ul>
            {Object.values(categories).map((c) => (
              <li key={c.id}>
                <div>
                  <button type="submit">
                    <div>Categorie Name: {c.title}</div>
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </form>
  );
};

export default Categories;
