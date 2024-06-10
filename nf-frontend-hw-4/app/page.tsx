'use client'

import ProductList from "./components/ProductList";
import HeaderElement from "./components/header";

export default function Home() {
  return (
    <>
      <h1 className=" text-center mb-10 mt-5 font-bold text-5xl text-[#002F34]">Все объявления</h1>
      <ProductList/>
    </>
  );
}
