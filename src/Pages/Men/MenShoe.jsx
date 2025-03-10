import React from "react";
import { ShoeMenCatalog } from "../../Library/MenLib";
import ItemCard from "./../../Components/Card";

function MenShoe() {
  return (
    <div className="relative pt-16 flex justify-center items-center">
      <div className="w-[90%] flex flex-wrap justify-center gap-6 p-4 z-10">
        {ShoeMenCatalog.map((product) => (
          <ItemCard
            key={product.productId}
            {...product}
            initialStockQuantity={product.stockQuantity}
          />
        ))}
      </div>
    </div>
  );
}

export default MenShoe;
