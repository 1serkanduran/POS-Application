import { Table, Card, Button, Modal, message, Popconfirm } from "antd";
import Header from "../components/header/Header";
import { useState } from "react";
import CreateBill from "../components/cart/CreateBill";
import { useDispatch, useSelector } from "react-redux";
import {
  PlusCircleOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import { removeItem, decrease, increase } from "../redux/cartSlice";

const CartPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();


  const columns = [
    {
      title: "Ürün Görseli",
      dataIndex: "img",
      key: "img",
      width: "125px",
      render: (text) => {
        return <img src={text} alt="" className="w-full h-20 object-cover" />;
      },
    },
    {
      title: "Ürün Adı",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Kategori",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Ürün Fiyatı",
      dataIndex: "price",
      key: "price",
      render: (text) => {
        return <span>{text.toFixed(2)}₺</span>;
      },
    },
    {
      title: "Ürün Adedi",
      dataIndex: "quantity",
      key: "quantity",
      render: (text, record) => {
        return <div className="flex items-center">
          <Button
            type="primary"
            size="small"
            className="w-full flex items-center justify-center !rounded-full"
            icon={<MinusCircleOutlined />}
            onClick={() => {
              if (record.quantity === 1) {
                if (window.confirm("Ürünü silmek istediğinize emin misiniz?")) {
                  dispatch(removeItem(record));
                }
              }
              if (record.quantity > 1) {
                dispatch(decrease(record));
              }
            }
            }
          />
          <span className="font-bold w-6 inline-block text-center">{record.quantity}</span>
          <Button
            type="primary"
            size="small"
            className="w-full flex items-center justify-center !rounded-full"
            icon={<PlusCircleOutlined />}
            onClick={() => dispatch(increase(record))}
          />
        </div>
      },
    },
    {
      title: "Toplam Fiyat",
      dataIndex: "price",
      key: "price",
      render: (text, record) => {
        return <span>{(record.quantity * record.price).toFixed(2)}₺</span>;
      },
    },
    {
      title: "İşlemler",
      render: (_, record) => {
        return <Popconfirm
          title="Silmek için emin misiniz?"
          onConfirm={() => {
            dispatch(removeItem(record));
            message.success("Ürün Sepetten Silindi.");
          }}
          okText="Evet"
          cancelText="Hayır"
        >
          <Button
            type="link"
            danger
          >
            Sil
          </Button>
        </Popconfirm>
      },
    },
  ];

  return (
    <>
      <Header />
      <div className="px-6">
        <Table dataSource={cart.cartItems} columns={columns} bordered pagination={false} scroll={{
          x: 1200,
          y: 300,
        }} />
        <div className="cart-total flex justify-end mt-4">
          <Card className="w-72">
            <div className="flex justify-between">
              <span>Ara Toplam</span>
              <span>{(cart.total.toFixed(2))}₺</span>
            </div>
            <div className="flex justify-between my-2">
              <span>KDV Toplam %8</span>
              <span className="text-red-600">+{((cart.total * cart.tax) / 100).toFixed(2)}₺</span>
            </div>
            <div className="flex justify-between">
              <b>Toplam</b>
              <b> {(cart.total + (cart.total * cart.tax) / 100).toFixed(2)}₺</b>
            </div>
            <Button className="mt-4 w-full" type="primary" size="large" onClick={() => setIsModalOpen(true)} disabled={cart.cartItems.length === 0}>Sipariş Oluştur</Button>
          </Card>
        </div>
      </div>
      <CreateBill isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </>
  );
};

export default CartPage;
