import React from 'react'
import Carousel from '../components/Carousel'
import Footer from '../components/Footer'
import LatestProducts from '../components/LatestProducts'
import MainNavbar from '../components/MainNavbar'
import CategoriesNavbar from '../components/CategoriesNavbar'

const HomeScreen = () => {
    return (
        <>
            <MainNavbar />
            <CategoriesNavbar />
            <Carousel />

            <section className="wrapper">
                <LatestProducts />
            </section>

            <Footer />
        </>
    )
}

export default HomeScreen
