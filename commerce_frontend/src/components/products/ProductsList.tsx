import { useEffect } from "react";
import { fetchPage } from "../../store/productSlice";
import { useDispatch } from "react-redux";
import { Table } from "react-bootstrap";

interface Product {
  id: number;
  title: string;
  discreption: string;
  imgUrl: string;
  price: number;
  categorie_id: string;
  inventory_id: string;
  discount_id?: string;
}

const ProductsList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPage());
  }, []);
  return (
    <form>
      ProductsList
      <div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Descreption</th>
              <th>IMG</th>
              <th>Price</th>
              <th>Category ID</th>
              <th>Inventory ID</th>
              <th>Discount ID</th>
              <th>#</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
          </tbody>
        </Table>
      </div>
    </form>
  );
};

export default ProductsList;
