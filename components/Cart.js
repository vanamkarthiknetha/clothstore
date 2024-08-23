import React, { useContext } from "react";
import { FaCircleMinus, FaCirclePlus } from "react-icons/fa6";
import { IoIosCloseCircle } from "react-icons/io";
import CartContext from "@/context/cart/CartContext";
import Link from "next/link";
const Cart = ({ toggleCart }) => {
  const { cart, totalprice, addToCart, removeFromCart, clearCart } =
    useContext(CartContext);
  return (
    <>
      <IoIosCloseCircle
        onClick={toggleCart}
        className="cursor-pointer absolute right-1 top-1 text-2xl"
      />
      <h1 className="mt-5 font-bold text-center text-2xl">Shopping Cart</h1>
      <ol className="mt-3 ml-2 text-2xl">
        {!Object.keys(cart).length && (
          <p className="text-xl">No items in the cart</p>
        )}
        {cart &&
          Object.keys(cart).map((key) => {
            const { name, price, qty, size, color } = cart[key];
            const item = { key, ...cart[key] };
            return (

              <li key={key} className="flex justify-between text-lg mr-2 ">
                <div className="">
                  <Link href={`/product/${key}`}><p className="hover:underline">{name}</p></Link>
                  <p>
                    ({color === undefined ? "-" : color}/
                    {size === undefined ? "-" : size})
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  {" "}
                  <FaCircleMinus
                    onClick={() => {
                      removeFromCart(item);
                    }}
                    className="cursor-pointer"
                  />{" "}
                  <span>{qty}</span>{" "}
                  <FaCirclePlus
                    onClick={() => {
                      addToCart(item);
                    }}
                    className="cursor-pointer"
                  />
                </div>
              </li>
            );
          })}
      </ol>
      <div className="mt-4 ml-2 text-2xl">Total amount: ₹{totalprice}</div>
      <div className="flex space-x-4 my-4">
        <button></button>
        <Link  href={"/orderwise/checkout"}>
          <button
          disabled={Object.keys(cart).length==0 || totalprice==0}
            onClick={() => toggleCart()}
            className="bg-purple-950 hover:bg-bgbody disabled:bg-slate-400 text-sm  px-2 md:px-2 py-1 md:py-2 rounded-md  "
          >
            Checkout
          </button>
        </Link>
        <button
        disabled={Object.keys(cart).length==0}
          onClick={() => {
            clearCart(), toggleCart();
          }}
          className="bg-purple-950 hover:bg-bgbody disabled:bg-slate-400 text-sm  px-2 md:px-2 py-1 md:py-2 rounded-md "
        >
          Clear cart
        </button>
      </div>
    </>
  );
};

export default Cart;
