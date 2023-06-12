import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Header from './components/client/Header';
import Footer from './components/client/Footer';
import Home from './components/client/Home';
import FlatDetail from './components/client/FlatDetail';

import ProductList from './components/admin/Product/ProductList';
import AddProduct from './components/admin/Product/AddProduct';
import UpdateProduct from './components/admin/Product/UpdateProduct';
import TableProduct from './components/client/TableProduct';
import AddProduct1 from './components/client/AddProduct';
import SearchResult from './components/client/SearchResult';

function App() {
  return (

    <BrowserRouter>
      <Header />
   
      <Routes>
        {/* ADMIN */}

        <Route path="/productList" element={<ProductList />} />
        <Route path='/addProduct' element={<AddProduct />} />
        <Route path='/editProduct/:id_product' element={<UpdateProduct />} />

        {/* CLIENT */}
        <Route path="/" element={<Home />}></Route>
        <Route path="/realestates" element={<Home />}></Route>
        <Route path="/detail-realestate/:id" element={<FlatDetail />} ></Route>
        <Route path="/add-realestate" element={<AddProduct1/>} ></Route>
        <Route path = "/edit-realestate/:id" element = {<AddProduct1/>} ></Route>
        <Route path = "/search/:query" element = {<SearchResult/>} ></Route>
      </Routes>
 
      <Footer />
    </BrowserRouter>

  );
}

export default App;
