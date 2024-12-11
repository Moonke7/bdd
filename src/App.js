import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layout.js";
import Home from './pages/Home.js';
import Inventory from './pages/Inventory.js';
import AllCards from './pages/AllCards.js';
import Folders from './pages/Folders.js';
import Decks from './pages/Decks.js';
import Wishlist from './pages/Wishlist.js';
import Login from './pages/Login.js';
import Register from './pages/Register.js';
import { GlobalProvider } from './GlobalContext.js';
import FolderSelected from './pages/FolderSelected.js';
import DeckSelected from './pages/DeckSelected.js';

export default function App() {
  return (
    <GlobalProvider>
      <BrowserRouter>
        <Routes> 
          <Route path="/" element={<Layout />}>
            <Route index element={<Login />} />
            <Route path='Register' element={<Register/>}/>
            <Route path='Home' element={<Home/>}/>
            <Route path='inventory' element={<Inventory/>}/>
            <Route path='Wishlist' element={<Wishlist/>}/>
            <Route path='allCards' element={<AllCards/>}/>
            <Route path='Inventory/folders' element={<Folders/>}/>
            <Route path='Inventory/decks' element={<Decks/>}/>
            <Route path='Selected' element={<FolderSelected/>}/>
            <Route path='Deck/Selected' element={<DeckSelected/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </GlobalProvider>
  );
}
