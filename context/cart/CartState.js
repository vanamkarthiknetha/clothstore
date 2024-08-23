//fetch from db and update cart and do CRUD ops
// .................................................!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
import { useEffect, useState } from "react";
import CartContext from "./CartContext";

const CartState = (props) => {
    const [totalprice, settotalprice] = useState(0);
    const [cart, setcart] = useState({});
    useEffect(() => {
        // console.log(JSON.parse(localStorage.getItem("cart")))
        if (!localStorage.getItem("cart")) {
            localStorage.setItem("cart", "{}");
        } else {
            try {
                const localCart = JSON.parse(localStorage.getItem("cart"));
                setcart(localCart);
            } catch (error) {
                localStorage.setItem("cart", "{}");
            }
        }
    }, []);

    useEffect(() => {
        const totalPrice = () => {
            let totalprice = 0;
            for (const key in cart) {
                totalprice += cart[key].qty * cart[key].price;
            }
            settotalprice(totalprice);
        };
        totalPrice();
    }, [cart]);

    const addToCart = (item) => {
        const newcart = { ...cart };
        const { key, name, price, qty, size, color } = item;
        if (key in cart) {
            newcart[key].qty += 1;
        } else {
            newcart[key] = { name, price, qty, size, color };
        }
        setcart(newcart);
        localStorage.setItem("cart",JSON.stringify(newcart))
    };
    const removeFromCart = (item) => {
        const newcart = { ...cart };
        const { key, name, price, qty, size, color } = item;
        if (qty <=1) {
            // newcart[key].qty=0
            delete newcart[key];
        } else {
            newcart[key].qty -= 1;
        }
        setcart(newcart);
        localStorage.setItem("cart",JSON.stringify(newcart))
    };
    const clearCart = () => {
        setcart({});
        localStorage.setItem("cart","{}")
        // Changes (of state) wont be reflected immediately  !
    };

    return (
        <CartContext.Provider
            value={{
                cart,
                setcart,
                totalprice,
                addToCart,
                removeFromCart,
                clearCart,
            }}
        >
            {props.children}
        </CartContext.Provider>
    );
};

export default CartState;
