import React from "react";
import Carousel from "../Components/Carousel";
import { ShoeChildCatalog } from "../Library/ChildrenLib";
import ItemCard from "../Components/Card";
import { Link } from "react-router";
import { ShoeMenCatalog } from "../Library/MenLib";
import { ShoeWomenCatalog } from "../Library/WomenLib";

function Home() {
  return (
    <>
      <div className="flex flex-col bg-gray-400 justify-center items-center w-full">
        <div className="mt-16 w-full">
          <Carousel />
        </div>

        {/* Mens Shoes */}
        <div className="flex py-2 my-4 justify-center items-center w-full">
          <div className="relative border-transparent rounded-2xl bg-gray-300 flex flex-col items-center w-full">
            <div className="w-[80%] mt-5 flex flex-wrap justify-between items-center gap-4">
              <h2 className="text-xl text-blue-700 font-bold">Men's Shoes</h2>
              <Link
                to="/Men"
                className="text-blue-600 hover:underline font-serif font-bold"
              >
                See More
              </Link>
            </div>
            <div className="w-[90%] my-5 flex flex-wrap justify-center gap-4">
              {ShoeMenCatalog.slice(0, 4).map((product) => (
                <ItemCard
                  key={product.productId}
                  {...product}
                  initialStockQuantity={product.stockQuantity}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Womens Shoes */}
        <div className="flex py-2 my-4 justify-center items-center w-full">
          <div className="relative border-transparent rounded-2xl bg-gray-300 flex flex-col items-center w-full">
            <div className="w-[80%] mt-5 flex flex-wrap justify-between items-center gap-4">
              <h2 className="text-xl text-blue-700 font-bold">Women's Shoes</h2>
              <Link
                to="/Women"
                className="text-blue-600 hover:underline font-serif font-bold"
              >
                See More
              </Link>
            </div>
            <div className="w-[90%] my-5 flex flex-wrap justify-center gap-4">
              {ShoeWomenCatalog.slice(0, 4).map((product) => (
                <ItemCard
                  key={product.productId}
                  {...product}
                  initialStockQuantity={product.stockQuantity}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Childrens Shoes */}
        <div className="flex py-2 my-4 justify-center items-center w-full">
          <div className="relative border-transparent rounded-2xl bg-gray-300 flex flex-col items-center w-full">
            <div className="w-[80%] mt-5 flex flex-wrap justify-between items-center gap-4">
              <h2 className="text-xl text-blue-700 font-bold">
                Children's Shoes
              </h2>
              <Link
                to="/Children"
                className="text-blue-600 hover:underline font-serif font-bold"
              >
                See More
              </Link>
            </div>
            <div className="w-[90%] my-5 flex flex-wrap justify-center gap-4">
              {ShoeChildCatalog.slice(0, 4).map((product) => (
                <ItemCard
                  key={product.productId}
                  {...product}
                  initialStockQuantity={product.stockQuantity}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
