import { Fragment, useEffect, useState } from 'react';
import ProductCard from '../components/productCard';
import { useSearchParams } from 'react-router-dom';
import './product.css';

export default function Products() {
  const [products, setProducts] = useState([]);
  // const [searchParams, setSearchParams] = useSearchParams();

  const [searchParams] = useSearchParams();

  useEffect(() => {
    const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8000/api/v1';
    fetch(apiUrl + '/products?' + searchParams)
      .then(res => res.json())
      .then(res => {
        console.log('API RESPONSE:', res);
        setProducts(res.products || []);
      })
      .catch(err => console.error('Fetch error:', err));
  }, [searchParams]);

  return (
    <Fragment>
      <div className="products-header">
        <h1>Our Collection</h1>
        <p>Discover premium stationery, carefully curated books, and the best tools for your creative journey.</p>
      </div>

      <section id="products" className="container mt-5">
        <div className="row">
          {products.map(product => (
            <ProductCard key={product._id} products={product} />
          ))}
        </div>
      </section>
    </Fragment>
  );
}
