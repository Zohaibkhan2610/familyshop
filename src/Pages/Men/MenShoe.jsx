import React from 'react';
import { ShoeMenCatalog } from '../../Library/MenLib';
import ItemCard from './../../Components/Card';

function MenShoe() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {ShoeMenCatalog.map((product) => (
        <ItemCard 
          key={product.productId} 
          {...product} 
          initialStockQuantity={product.stockQuantity} // Explicit prop mapping
        />
      ))}
    </div>
  );
}

export default MenShoe;