import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layout.js";
import Home from './pages/Home.js';
import Inventory from './pages/Inventory.js';
import AllCards from './pages/AllCards.js';
import Folders from './pages/Folders.js';
import Decks from './pages/Decks.js';
import Wishlist from './pages/Wishlist.js';

export default function App() {
  return (
    <BrowserRouter>
      <Routes> 
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='inventory' element={<Inventory/>}/>
          <Route path='Wishlist' element={<Wishlist/>}/>
          <Route path='allCards' element={<AllCards/>}/>
          <Route path='Inventory/folders' element={<Folders/>}/>
          <Route path='Inventory/decks' element={<Decks/>}/>

        </Route>
      </Routes>
    </BrowserRouter>
  );
} 