import './ProductList.css'
import ProductCard from './ProductCard'

function ProductList({ products, itemCount, onItemCountChange, onAddToCart }) {
  return (
    <div className="products-grid">
      {products.map((product) => (
        <ProductCard 
          key={product.id}
          product={product}
          itemCount={itemCount}
          onItemCountChange={onItemCountChange}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  )
}

export default ProductList 