import React from "react";
import { ShoeChildCatalog } from "../../Library/ChildrenLib";
import ItemCard from "./../../Components/Card";

function ChildrenShoe() {
  return (
    <div className="relative pt-16 flex justify-center items-center">
      <div className="w-[90%] flex flex-wrap justify-center gap-6 p-4 z-10">
        {ShoeChildCatalog.map((product) => (
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

export default ChildrenShoe;
