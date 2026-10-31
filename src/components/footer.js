// export default function Footer(){
//     return (

//         <footer className="py-1 bg-dark">
//           <p className="text-center text-white mt-1 ">
//             JVLcart - 2023-2024, All Rights Reserved
//           </p>
//         </footer>
//     );
// }
import { Link } from "react-router-dom";
import "./footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* About */}
        <div className="footer-section">
          <h3> Innilai About</h3>
          <p>
            your trusted destination for quality stationery and books. We believe that the right tools can inspire creativity, learning, and productivity
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/product">Products</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
          </ul>
        </div>
        {/* Contact */}
        <div className="footer-section">
          <h3>Contact Us</h3>
          <p>Email: innilaiacademy@gmail.com</p>
          <p>Phone: 08220765780</p>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <p>© 2026 Innilai. All Rights Reserved.</p>
      </div>
    </footer>
  );
}
