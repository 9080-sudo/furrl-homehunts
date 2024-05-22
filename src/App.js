import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Banner from "./components/Banner/Banner";
import ProductList from "./components/ProductList/ProductList";

function App() {
  return (
    <>
      <Navbar />
      <Banner />
      <ProductList />
    </>
  );
}

export default App;
