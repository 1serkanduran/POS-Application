import { addProduct } from "../../redux/cartSlice";
import { useDispatch, useSelector } from "react-redux";

const ProductItem = ({item}) => {
  const cart = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(addProduct(item));
  }


  return (
    <div className="product-item border hover:shadow-lg cursor-pointer transition-all select-none">
      <div className="product-img" onClick={handleClick}>
        <img
          src={item.img}
          alt=""
          className="h-28 object-cover w-full border-b"
        />
      </div>
      <div className="product-info flex flex-col p-3">
        <span className="font-bold">{item.title}</span>
        <span>{item.price}₺</span>
      </div>
    </div>
  );
};

export default ProductItem;