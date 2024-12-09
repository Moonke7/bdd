import { useNavigate } from 'react-router-dom';
import InfoBox from "../components/InfoBox";
import "../styles/Home.css";

function Home() {
  const navigate = useNavigate();

  const navigateToInventory = () => {
    navigate("/Inventory/folders");  // Cambia la URL a /Inventory
  };
  const navigateToDecks = () => {
    navigate("/Inventory/decks"); 
  }
  const navigateToWishlist = () => {
    navigate("/Wishlist"); 
  }

  return (
    <div className="HomeContainer">
      <h1>Bienvenido username!</h1>
      <div className="Info__container">
        <InfoBox text={"Mazos"} desc={1233} />
        <InfoBox text={"Carpetas"} desc={1233} />
        <InfoBox text={"Wishlist"} desc={1233} />
        <InfoBox text={"Cartas"} desc={1233} />
      </div>
      <div className="accesos__directos">
        <div className="acceso__directo" onClick={navigateToInventory}>
          <img
            src="https://ae-pic-a1.aliexpress-media.com/kf/H0300c3e475a84a61a23226b190a64e79N/450-Pocket-Card-Binder-Holder-Carrying-Case-Sleeves-Card-Album-Folder-Fit-for-Baseball-Trading-Football.jpg_640x640Q90.jpg_.webp"
            alt="folders"
          />
          <h3>Carpetas</h3>
        </div>
        <div className="acceso__directo" onClick={navigateToDecks}>
          <img
            src="https://media.karousell.com/media/photos/products/2024/10/15/op09_red_shanks_deck_1728972534_6876c073_progressive.jpg"
            alt="decks"
          />
          <h3>Mazos</h3>
        </div>
        <div className="acceso__directo" onClick={navigateToWishlist}>
          <img
            src="https://img.craftpix.net/2021/01/TCG-Card-Design4.webp"
            alt="wihslist"
          />
          <h3>Wishlist</h3>
        </div>
      </div>
    </div>
  );
}

export default Home;
