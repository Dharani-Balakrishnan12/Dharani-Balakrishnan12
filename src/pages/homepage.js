import StationeryContent from "../components/stationarycontent";
import About from "../pages/about";
import Products from '../pages/product';
// import Contact from "../pages/contact";



import "./homepage.css";
import "./about.css";
import "./product.css";
// import "./contact.css";



export default function HomePage() {
  return (
    <>
      <StationeryContent />
      <About/>
      <Products/>
      {/* <Contact/> */}


    </>
  );
}
