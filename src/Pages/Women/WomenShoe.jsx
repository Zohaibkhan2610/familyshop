import React from "react";
import { ShoeWomenCatalog } from "../../Library/WomenLib";
import ItemCard from "./../../Components/Card";

function WomenShoe() {
  return (
    <div className="relative flex justify-center items-center">
      <div className="w-[90%] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4 z-10">
        {ShoeWomenCatalog.map((product) => (
          <ItemCard
            key={product.productId}
            {...product}
            initialStockQuantity={product.stockQuantity} // Explicit prop mapping
          />
        ))}
      </div>
    </div>
  );
}

export default WomenShoe;
