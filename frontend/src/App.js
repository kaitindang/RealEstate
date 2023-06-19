import './App.css';
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom'
import Header from './components/client/Header';
import Footer from './components/client/Footer';
import Home from './components/client/Home';
import FlatDetail from './components/client/FlatDetail';

import ProductList from './components/admin/Product/ProductList';
import AddProduct from './components/admin/Product/AddProduct';
import UpdateProduct from './components/admin/Product/UpdateProduct';
import Login from './components/auth/Login';

function App() {
  return (
    <>  
       
      <Header />
        <Routes>        
                {/* ADMIN */}
              <Route path="/productList" element={<ProductList />} />
              <Route path='/addProduct' element={<AddProduct/>}/>
              <Route path='/editProduct/:id_product' element={<UpdateProduct />}/>
              {/* CLIENT */}
              <Route path = "/" element = {<Home/>}></Route>
              <Route path = "/realestates" element = {<Home/>}></Route>
              <Route path = "/edit-realestate/:id" element = {<FlatDetail/>} ></Route>   
              {/* AUTH */}   
              <Route path = "/login" element = {<Login />} ></Route>        
        </Routes>
        
      <Footer />

    </>
    
  );
}

export default App;
