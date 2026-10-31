import {Link} from 'react-router-dom';
import "./productCard.css";

const ProductCard = ({ products }) => {
  const imageUrl = products?.images?.[0]?.image || '/images/products/tamil vaippadu.jpg';

  return ( 
    <div className="col-sm-12 col-md-6 col-lg-4 my-3">
      <div className="card p-3 rounded">
        <img 
          className="card-img-top mx-auto" 
          src={imageUrl}
          alt={products?.name || 'Product'} 
        />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">
            <Link to={"/product/" + products?._id}>{products?.name}</Link>
          </h5>   

          <p className="card-text">₹{products?.price}</p>

          <Link to={"/product/" + products?._id} id="view_btn" className="btn view_btn btn-block">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
