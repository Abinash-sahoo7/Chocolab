import React from "react";
import Header from "./_components/Header";
import Hero from "./_components/Hero";
import SpecialProduct from "./_components/SpecialProduct";
import About from "./_components/About";
import AdditionalCompo from "./_components/AdditionalCompo";
import NewsLetter from "./_components/NewsLetter";
import { Footer } from "./_components/Footer";
import Products from "./_components/Products";


const HomePage = () => {
  return (
    <>
      <Header />
      <Hero />
      <SpecialProduct />
      <AdditionalCompo />
      <About />
      {/* Products  */}
      <Products />
      <NewsLetter />
      <Footer />
    </>
  );
}

export default HomePage
