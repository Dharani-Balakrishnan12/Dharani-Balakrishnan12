import Navbar from "./navbar";
// import Search from "./search";

export default function Header({ cartItems }) {
  return (
    <Navbar cartItems={cartItems} />
  );
}
