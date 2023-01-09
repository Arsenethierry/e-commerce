import React from 'react';
import { useGetAllProductsQuery } from '../features/productsApi';

function Home(props) {
    const { data, error } = useGetAllProductsQuery();
    // console.log("data :",data);
    console.log("error :",error);
    return (
        <div>
           <h1>helllo Home</h1> 
        </div>
    );
}

export default Home;