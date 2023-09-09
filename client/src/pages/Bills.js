import DefaultLayout from "../components/DefaultLayout"
import axios from 'axios'
import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { EyeOutlined } from '@ant-design/icons'
import { Table, Modal, Input, Form, Button, Select, message, } from "antd";
import ReactToPrint from 'react-to-print';
import { useReactToPrint } from 'react-to-print';


function Bills() {
    const componentRef = useRef();
    const [billsData, setBillsData] = useState([])
    const [printBillModalVisibility, setPrintBillModalVisibility] = useState(false)
    const [selectedBill, setSelectedBill] = useState(null)
    const dispatch = useDispatch()

    const getAllBills = () => {
        /*dispatch({ type: 'showLoading' })*/
        axios.get('/api/bills/get-all-bills').then((response) => {
            dispatch({ type: 'hideLoading' })
            const data = response.data
            data.reverse()
            setBillsData(data)

        }).catch((error) => {
            dispatch({ type: 'hideLoading' })
            console.log(error);

        });
    };


    const columns = [
        {
            title: 'Id',
            dataIndex: '_id'
        },
        {
            title: 'Customer',
            dataIndex: 'customerName',

        },
        {
            title: 'SubTotal',
            dataIndex: 'subTotal'

        },
        {
            title: 'Tax',
            dataIndex: 'tax'

        },
        {
            title: 'Total',
            dataIndex: 'totalAmount'

        },



        {
            title: 'Actions',
            dataIndex: '_id',
            render: (id, record) => <div className="d-flex">

                <EyeOutlined className="mx-2" onClick={() => {
                    setSelectedBill(record)
                    setPrintBillModalVisibility(true)
                }} />


            </div>
        }
    ]

    const cartcolumns = [
        {
            title: 'Name',
            dataIndex: 'name'
        },

        {
            title: 'Price',
            dataIndex: 'price'

        },

        {
            title: 'Quantity',
            dataIndex: '_id',
            render: (id, record) => <div>

                <b>{record.quantity}</b>

            </div>
        },

        {
            title: 'Total fare',
            dataIndex: '_id',
            render: (id, record) => <div>

                <b>{record.quantity * record.price}</b>

            </div>
        },

    ]

    useEffect(() => {
        getAllBills();
    },);

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    return (
        <DefaultLayout>
            <div className="d-flex justify-content-between">
                <h3>Items</h3>

            </div>
            <Table columns={columns} dataSource={billsData} bordered />
            {printBillModalVisibility && (
                <Modal onCancel={() => {
                    setPrintBillModalVisibility(false)
                }} visible={printBillModalVisibility}
                    title="Bill Details"
                    footer={false}
                    width={800}
                >
                    <div className="bill-model p-3" ref={componentRef}>
                        <div className="d-flex justify-content-between bill-header pb-2">
                            <div>
                                <h2><b>A1MAKEUP STORE</b></h2>

                            </div>
                            <div>
                                <p>Mogadishu</p>
                                <p>Via Liberia</p>
                                <p>0618234009</p>

                            </div>

                        </div>
                        <div className="bill-customer-details my-2">
                            <p><b>Name</b> : {selectedBill.customerName}</p>
                            <p><b>Phone Number</b> : {selectedBill.customerPhoneNumber}</p>
                            <p><b>Date</b> : {selectedBill.createdAt.toString().substring(0, 10)}</p>


                        </div>
                        <Table dataSource={selectedBill.cartItems} columns={cartcolumns} pagination={false} />
                        <div className="dotted-border mt-2 pb-2">
                            <p><b>SUB TOTAL</b> : {selectedBill.subTotal}</p>
                            <p><b>Tax</b> : {selectedBill.tax}</p>

                        </div>

                        <div>
                            <h2><b>GRAND TOTAL : {selectedBill.totalAmount} $/-</b></h2>
                        </div>
                        <div className="dotted-border mt-2"></div>
                        <div className="text-center">
                            <p>Mahadsanid</p>
                            <p>Nasoo Booqo Markale</p>

                        </div>
                        <div>
                        <div className="dotted-border mt-2">

                            <p><b>Alaabta 24 Saac kadib Masoo Celin Kartid, Hadaad Furtayna Lama Celinayo</b></p>
                            

                        </div>
                        </div>
                        
                        
                    </div>

                    <div className="d-flex justify-content-end">
                        <Button type="primary" onClick={handlePrint}>Print Bill</Button>

                    </div>


                </Modal>
            )}
        </DefaultLayout>
    )
}

export default Bills  