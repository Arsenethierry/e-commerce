import { Box, Button, Grid, Typography } from '@material-ui/core';
import React from 'react';
import BoxLoader from '../@components/box-loading';
import HomeHeader from '../@components/homeHeader';
import ProductCard from '../components/product-card';
import { useGetAllProductsQuery } from '../features/productsApi';

function HomePage() {

    const { data: products, isLoading, isSuccess } = useGetAllProductsQuery();

    return (
        <>  <HomeHeader />
            {isLoading && <BoxLoader />}
            {isSuccess && <Grid container spacing={3} style={{ padding: "3rem 6vw" }}>
                {
                    products.map((data)=> (
                        <Grid item key={data.id} xs={12} sm={6} md={4} lg={3}>
                            <ProductCard data={data} />
                        </Grid>
                    ))
                }
            </Grid>}
        </>
    );
}

export default HomePage;