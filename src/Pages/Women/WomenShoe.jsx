import React from "react";
import { ShoeWomenCatalog } from "../../Library/WomenLib";
import ItemCard from "./../../Components/Card";

function WomenShoe() {
  return (
    <div className="relative pt-16 flex justify-center items-center">
      <div className="w-[90%] flex flex-wrap justify-center gap-6 p-4 z-10">
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
