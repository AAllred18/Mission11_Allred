import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { CartItem } from "../types/CartItem";

function CartPage() {
    const navigate = useNavigate();
    const { cart, removeFromCart, clearCart } = useCart();
    const totalAmount = cart.reduce((sum, item) => sum + (item.quantity * item.purchasePrice), 0);

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Your Cart</h2>

            <div className="card p-3 shadow">
                {cart.length === 0 ? (
                    <p className="text-muted text-center">Your cart is empty.</p>
                ) : (
                    // Instead of using card, I used Bootstrap list-group to organize the cart items
                    <ul className="list-group">
                        {cart.map((item: CartItem) => (
                            <li key={item.bookId} className="list-group-item">
                                <div className="d-flex flex-column align-items-center text-center">
                                    <h5 className="fw-bold">{item.bookTitle}</h5> 
                                    <p className="mb-1">Quantity: <strong>{item.quantity}</strong></p>
                                    <p className="mb-1">Price: <strong>${item.purchasePrice.toFixed(2)}</strong></p>
                                    <p className="mb-1">Subtotal: <strong>${(item.purchasePrice * item.quantity).toFixed(2)}</strong></p>
                                    <button className="btn btn-danger btn-sm mt-2" onClick={() => removeFromCart(item.bookId)}>Remove</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>


            <div className="mt-4 text-end">
                <h3>Total: <span className="fw-bold">${totalAmount.toFixed(2)}</span></h3>
            </div>

            {/* Centered Buttons with Better Spacing */}
            <div className="d-flex justify-content-center gap-4 mt-4">
                <button className="btn btn-primary px-4" onClick={() => navigate('/books')}>Continue Shopping</button>
                <button className="btn btn-warning px-4" onClick={() => clearCart()}>Clear Cart</button>
                <button className="btn btn-success px-4">Checkout</button>
            </div>
        </div>
    );
}

export default CartPage;
