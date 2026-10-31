
// import "./navbar.css";

// import { Link } from "react-router-dom";
// export default function Navbar() {
//   return (
//    <header className="navbar">
//       {/* RIGHT */}
//       <div className="nav-left">

//         <nav className="navbar-links">
//           <Link to="/homepage">Home</Link>
//           <Link to="/about">About</Link>
//           <Link to="/product">Products</Link>
//           <Link to="/contact">Contact</Link>
//         </nav>
//       </div>
//     </header>
//   );
// }
// import "./navbar.css";
// import { Link } from "react-router-dom";

// export default function Navbar() {
//   return (
//     <header className="navbar">
//       <div className="navbar-container">

//         {/* LEFT - LOGO */}
//         {/* <div className="nav-logo">
//           <img src="images\logo.jpeg" alt="Logo" />
//         </div> */}

//         {/* RIGHT - LINKS */}
//         <nav className="navbar-links">
//           <Link to="/homepage">Home</Link>
//           <Link to="/about">About</Link>
//           <Link to="/product">Products</Link>
//           <Link to="/contact">Contact</Link>
//         </nav>

//       </div>
//     </header>
//   );
// }

import React, { useState, useEffect } from "react";
import "./navbar.css";
import { Link } from "react-router-dom";

export default function Navbar({ cartItems = [] }) {
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", (e) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later.
      setDeferredPrompt(e);
    });
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      // Show the install prompt
      deferredPrompt.prompt();
      // Wait for the user to respond to the prompt
      const { outcome } = await deferredPrompt.userChoice;
      console.log(`User response to the install prompt: ${outcome}`);
      // We've used the prompt, and can't use it again, throw it away
      setDeferredPrompt(null);
    }
  };
  // Function to change language via Google Translate's hidden combo box or cookie
  const changeLanguage = (langCode) => {
    // Set the cookie for google translate (e.g., /en/ta for English to Tamil)
    document.cookie = `googtrans=/en/${langCode}; path=/; domain=${window.location.hostname}`;
    document.cookie = `googtrans=/en/${langCode}; path=/;`;

    // Attempt to update the select element directly if it's rendered
    const select = document.querySelector('.goog-te-combo');
    if (select) {
      select.value = langCode;
      select.dispatchEvent(new Event('change'));
    } else {
      // If select isn't available, reload to apply cookie
      window.location.reload();
    }
  };

  return (
    <header className="navbar">

      <div className="navbar-container">
        {/* LEFT - LOGO */}
        <div className="nav-logo">
          <Link to="/">
            <img src="/images/logo.jpeg" alt="Logo" />
            <span className="brand-name">Innilai</span>
          </Link>
        </div>

        {/* RIGHT - NAV LINKS */}
        <nav className="navbar-links">
          <Link to="/homepage">Home</Link>
          <Link to="/about">About Us</Link>

          <div className="dropdown">
            <span className="dropbtn">Services</span>
            <div className="dropdown-content">
              <Link to="/service/education">Education</Link>
              <Link to="/service/mental-health">Mental Health</Link>
            </div>
          </div>

          <Link to="/product">Products</Link>
          <Link to="/contact">Contact Us</Link>
          {localStorage.getItem('userEmail') ? (
            <span 
              className="login-link" 
              style={{ cursor: 'pointer' }} 
              onClick={() => {
                localStorage.removeItem('userEmail');
                window.location.href = '/login';
              }}
            >
              Logout
            </span>
          ) : (
            <Link to="/login" className="login-link">Login</Link>
          )}

          {/* APP INSTALL (PWA) */}
          {deferredPrompt && (
            <button onClick={handleInstallClick} className="download-btn">
              Install App
            </button>
          )}

          {/* CART */}
          <Link to="/cart" className="btn-primary cart-btn">
            <span>Cart</span>
            <span className="cart-count">
              {cartItems.length}
            </span>
          </Link>

          {/* CUSTOM LANGUAGE DROPDOWN */}
          <div className="language-dropdown">
            <span className="language-dropbtn">
              <i className="fa fa-globe"></i> Language
            </span>
            <div className="language-dropdown-content">
              <button onClick={() => changeLanguage('en')}>English</button>
              <button onClick={() => changeLanguage('ta')}>தமிழ் (Tamil)</button>
            </div>
          </div>

          {/* HIDDEN GOOGLE TRANSLATE WIDGET CONTAINER */}
          <div id="google_translate_element" style={{ display: 'none' }}></div>
        </nav>
      </div>
    </header>
  );
}
