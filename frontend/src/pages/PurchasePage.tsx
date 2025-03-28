import { useNavigate, useParams } from "react-router-dom";
import WelcomeBand from "../components/WelcomeBand";
import { CartItem } from "../types/CartItem";
import { useCart } from "../context/CartContext";
import { useState } from "react";

function PurchasePage() {

    const navigate = useNavigate();
    const {bookTitle, bookId} = useParams();
    const {addToCart} = useCart();
    const {quantity, setQuantity} = useState<number>(0);

    const handleAddToCart = () => {
        const newItem: CartItem = {
            bookId: Number(bookId),
            bookTitle: bookTitle || "No Book Found",
            quantity,
            // purchasePrice
            };
            addToCart(newItem);
            navigate('/cart');
        };
    

    return (
        <>
            <WelcomeBand/>
            <h2>Purchase Book</h2>
            <h3>{bookTitle}</h3>

            <div>
                <input type="number" placeholder="Enter quantity" value={quantity} onChange={(x) => setQuantity(Number(x.target.value))}/>
                <button onClick={handleAddToCart}>Add to Cart</button>
            </div>

            <button onClick={() => navigate(-1)}>Go Back</button>
        </>
    );

}

export default PurchasePage;