import { useNavigate, useParams } from "react-router-dom";
import WelcomeBand from "../components/WelcomeBand";
import { CartItem } from "../types/CartItem";
import { useCart } from "../context/CartContext";
import { useState } from "react";
import CartSummary from "../components/CartSummary";

function PurchasePage() {

    const navigate = useNavigate();
    const {bookTitle, bookId, bookPrice} = useParams();
    const {addToCart} = useCart();
    const [quantity, setQuantity] = useState<number>(0);

    const handleAddToCart = () => {
        const newItem: CartItem = {
            bookId: Number(bookId),
            bookTitle: bookTitle || "No Book Found",
            purchasePrice: Number(bookPrice),
            quantity
        };
        addToCart(newItem);
        navigate('/cart');
    };
    
    return (
        <>
            <CartSummary/>
            <div className='container mt-4'>
                <WelcomeBand/>
                <h2 className="text-center mb-4">Purchase Book</h2>
                
                <div className="card p-4 shadow-sm">
                    <h3 className="text-center mb-3">{bookTitle}</h3>
                    <h4 className="text-center mb-3">Price: ${bookPrice}</h4>

                    {/* I used focus-ring to create a blue ring around the input field when it is selected */}
                    <div className="d-flex justify-content-center mb-4">
                        <input 
                            type="number" 
                            placeholder="Enter quantity" 
                            value={quantity} 
                            onChange={(x) => setQuantity(Number(x.target.value))}
                            className="form-control w-50 focus-ring" 
                            min="1"
                        />
                    </div>

                    <div className="d-flex justify-content-center gap-3">
                        <button 
                            className="btn btn-primary w-50" 
                            onClick={handleAddToCart} 
                            disabled={quantity <= 0}
                        >
                            Add to Cart
                        </button>
                    </div>

                    <div className="d-flex justify-content-center mt-3">
                        <button 
                            className="btn btn-secondary w-50" 
                            onClick={() => navigate(-1)}
                        >
                            Go Back
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default PurchasePage;
