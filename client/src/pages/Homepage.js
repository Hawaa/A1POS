import React, { useEffect, useState } from "react";
import ReactDOM from 'react-dom'
import DefaultLayout from "../components/DefaultLayout"
import axios from 'axios'

//import FormList from "antd/lib/form/FormList";
import { Row } from "antd";
import { Col } from "antd";
import Item from "../components/Item";
import '../resources/items.css'
import { useDispatch } from "react-redux";

function Homepage() {
    const [itemsData, setItemsData] = useState([])
    const [selectedCategory, setSelectedCategory] = useState('makeup')
    const categories = [
        {
            name: 'Makeup',
            imageURL: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bWFrZXVwfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
        },
        {
            name: 'EyeMakeup',
            imageURL: 'https://www.a1store.so/wp-content/uploads/2021/02/Plate1-265x331.jpg',
        },
        {
            name: 'Hair Care',
            imageURL: 'https://www.a1store.so/wp-content/uploads/2020/06/MolygigeyoilCOMBO-265x331.jpg',
        },
        {
            name: 'Men',
            imageURL: 'https://www.a1store.so/wp-content/uploads/2020/06/Cantu-shea-butter-3in1-265x331.jpg',
        },
        {
            name: 'Hair Styling',
            imageURL: 'https://www.a1store.so/wp-content/uploads/2020/06/Cantu-Styling-gel-265x331.jpg',
        },
           
        {
        
            name: 'Accessories',
            imageURL: 'https://www.a1store.so/wp-content/uploads/2021/11/25.5cm-265x331.jpg',
        },
        {
            name: 'Body Care',
            imageURL: 'https://www.a1store.so/wp-content/uploads/2022/08/FairwhiteSocarrot.jpg',
        },

          
        {
            name: 'Perfumes',
            imageURL: 'https://www.a1store.so/wp-content/uploads/2021/11/DearBody-Combo-265x331.jpg',
        },
        {
            name: 'Extensions',
            imageURL: 'https://4.bp.blogspot.com/-cTK52_gVGek/VKIrnJniwdI/AAAAAAAAPuY/uNdGUJKjBXw/s1600/colour_selection.jpg',
        },
        {
            name: 'Face',
            imageURL: 'https://www.a1store.so/wp-content/uploads/2021/05/CervaGro%CC%88n-265x331.jpg',
        },
        {
            name: 'Lips',
            imageURL: 'https://www.a1store.so/wp-content/uploads/2021/01/858Les-Chocolats-Ultra-Matte-Liquid-Lipstick-7.6ml-858-Oh-My-Choc-265x331.jpg',
        },
        {
            name: 'Nails',
            imageURL: 'https://beautybosslab.com/cdn/shop/articles/press-on-nails-2.jpg?v=1664500485',
        },
        {
            name: 'Hair accessories',
            imageURL: 'https://www.a1store.so/wp-content/uploads/2020/06/HeadbandBlue-265x331.jpg',
        },

    ]
    const dispatch = useDispatch()

    const getAllItems = () => {
        dispatch({ type: 'showLoading' })
        axios.get('/api/items/get-all-items').then((response) => {
            dispatch({ type: 'hideLoading' })
            setItemsData(response.data)

        }).catch((error) => {
            dispatch({ type: 'hideLoading' })
            console.log(error);

        });
    };

    useEffect(() => {
        getAllItems();
    }, []);


    return (
        <DefaultLayout>

            <div className="d-flex categories">
                {categories.map((category)=>{
                    return <div 
                    onClick={()=>setSelectedCategory(category.name)}
                    className={`d-flex categories ${selectedCategory===category.name && 'selected-category'}`}>
                        <h4>{category.name}</h4>
                        <img src={category.imageURL} height='60' width='80' />

                    </div>
                })}

            </div>



            <Row gutter={20}>

                {itemsData.filter((i)=>i.category===selectedCategory).map((item) => {
                    return <Col xs={24} lg={6} md={12} sm={6}>
                        <Item item={item} />
                    </Col>
                })}</Row>
        </DefaultLayout>
    );
}

export default Homepage; 
