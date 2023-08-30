import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Header from './components/client/Header';
import Footer from './components/client/Footer';
import Home from './components/client/Home';
import FlatDetail from './components/client/FlatDetail';
import '@goongmaps/goong-js/dist/goong-js.css';
import ProductList from './components/admin/Product/ProductList';
import PostListing from './components/client/PostListing';
import SearchResult from './components/client/SearchResult';
import ProductApprove from './components/admin/Product/ProductApprove';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Upload from './components/client/upload';
import UserList from './components/admin/Product/UserList';
import ViewUser from './components/admin/Product/ViewUser';
import EditUser from './components/admin/Product/EditUser';
import PaymentHistory from './components/admin/Product/PaymentHistory';
import PaymentListing from './components/admin/Product/PaymentListing';

function App() {
  return (

    <>
      <Header />

      <Routes>
        {/* ADMIN */}

        <Route path="/productList" element={<ProductList />} />
        <Route path='/productApprove' element={<ProductApprove />} />
        <Route path='/userList' element={<UserList />} />
        <Route path="/view-user/:id" element={<ViewUser />} ></Route>
        <Route path="/edit-user/:id" element={<EditUser />} ></Route>
        <Route path="/payment-history/:id_account" element={<PaymentListing />}></Route>

        {/* CLIENT */}
        <Route path="/" element={<Home />}></Route>
        <Route path="/realestates" element={<Home />}></Route>
        <Route path="/detail-realestate/:id" element={<FlatDetail />} ></Route>
        <Route path="/add-realestate" element={<PostListing />} ></Route>
        <Route path="/edit-realestate/:id" element={<PostListing />} ></Route>
        <Route path="/search/:query" element={<SearchResult />} ></Route>
        <Route path="/upload" element={<Upload />} ></Route>

        {/* AUTH*/}
        <Route path="/login" element={<Login />} ></Route>
        <Route path="/signup" element={<Signup />} ></Route>

      </Routes>

      <Footer />
    </>

  );
}

export default App;
