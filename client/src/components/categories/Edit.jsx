import { Button, Form, Input, Modal, Table, message } from 'antd'
import React, { useState } from 'react'

const Edit = ({ isEditModalOpen, setIsEditModalOpen, categories, setCategories }) => {

    const [editingRow, seteditingRow] = useState({})

    const onFinish = (values) => {
        try {
            fetch("http://localhost:5000/api/categories/update-category", {
                method: "PUT",
                body: JSON.stringify({ ...values, categoryId: editingRow._id }),
                headers: { "Content-type": "application/json; charset=UTF-8" },
            });
            message.success("Kategori başarıyla güncellendi.");
            setCategories(categories.map(category => category._id === editingRow._id ? { ...category, title: values.title } : category))
        } catch (error) {
            message.success("Kategori güncellenirken hata oluştu");
        }
    };

    const deleteCategory = (id) => {
        if (window.confirm("Emin misiniz?")) {
            try {
                fetch("http://localhost:5000/api/categories/delete-category", {
                    method: "DELETE",
                    body: JSON.stringify({ categoryId: id }),
                    headers: { "Content-type": "application/json; charset=UTF-8" },
                });
                message.success("Kategori başarıyla silindi.");
                setCategories(categories.filter((item) => item._id !== id));
            } catch (error) {
                message.error("Bir şeyler yanlış gitti.");
                console.log(error);
            }
        }
    };


    const columns = [
        {
            title: 'Category Title',
            dataIndex: 'title',
            render: (_, record) => {
                if (record._id === editingRow._id) {
                    return (
                        <Form.Item className='mb-0' name="title">
                            <Input defaultValue={record.title} />
                        </Form.Item>
                    );
                }
                else {
                    return (
                        <p>{record.title}</p>
                    );
                }
            },
        },
        {
            title: "Action",
            dataIndex: "action",
            render: (_, record) => {
                return (
                    <div>
                        <Button type='link' onClick={() => seteditingRow(record)} className='pl-0'>Düzenle</Button>
                        <Button type='text' htmlType='submit'>Kaydet</Button>
                        <Button
                            type="link"
                            danger
                            onClick={() => deleteCategory(record._id)}
                        >
                            Sil
                        </Button>
                    </div>
                );
            },
        },
    ];

    return (
        <Modal
            open={isEditModalOpen}
            title="Kategori İşlemleri"
            footer={false}
            onCancel={() => setIsEditModalOpen(false)}
        >
            <Form onFinish={onFinish}>
                <Table bordered dataSource={categories} columns={columns} rowKey={"_id"} />
            </Form>
        </Modal>
    )
}

export default Edit