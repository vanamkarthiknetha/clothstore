import CartContext from "@/context/cart/CartContext";
import React, { useContext, useEffect, useState } from "react";
import { FaCircleMinus, FaCirclePlus } from "react-icons/fa6";
import Script from "next/script";
import { Slide, toast } from "react-toastify";
import Link from "next/link";
import { useRouter } from "next/router";
import Head from "next/head";
CartContext;
const Checkout = ({ isLoggedin }) => {
  const [name, setName] = useState("");
  const [email, setemail] = useState("");
  const [address, setaddress] = useState("");
  const [phone, setphone] = useState("");

  const [pincode, setpincode] = useState("");
  const [city, setcity] = useState("");
  const [state, setstate] = useState("");
  const [disabled, setdisabled] = useState(true);
  const [isServiceable, setisServiceable] = useState(false);

  
  const router=useRouter()
  const { cart, totalprice, addToCart, removeFromCart, clearCart } =
    useContext(CartContext);




  useEffect(() => {
    const fetchDetails=async ()=>{
      const data={
        token:localStorage.getItem("token")
      }
      const res = await fetch(
        `/api/user/getUser`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify(data),
        }
      );
      const user = await res.json();
      setName(user.name)
      setemail(user.email)
      setaddress(user.address)
      setphone(user.phone)
      setpincode(user.pincode)
      const resp = await fetch(`/api/pincode`);
        const pincodes = await resp.json();
        if (Object.keys(pincodes).includes(user.pincode)) {
          setcity(pincodes[user.pincode][0]);
          setstate(pincodes[user.pincode][1]);
        } else {
          setcity("");
          setstate("");
        }
    }
    if (isLoggedin) {
      fetchDetails()
    }
  }, [isLoggedin]);

  const handleChange = async (e) => {
    if (e.target.name == "name") {
      setName(e.target.value);
    } else if (e.target.name == "email") {
      setemail(e.target.value);
    } else if (e.target.name == "phone") {
      if (e.target.value.length <= 10) {
        setphone(e.target.value);
      }
    } else if (e.target.name == "address") {
      setaddress(e.target.value);
    } else if (e.target.name == "pincode") {
      if (e.target.value.length <= 6) {
        setpincode(e.target.value); 
      }
      if (e.target.value.length == 6) {
        const resp = await fetch(`/api/pincode`);
        const pincodes = await resp.json();
        if (Object.keys(pincodes).includes(e.target.value)) {
          setcity(pincodes[e.target.value][0]);
          setstate(pincodes[e.target.value][1]);
        } else {
          setcity("");
          setstate("");
        }
      } else {
        setcity("");
        setstate("");
      }
    }
  };
  useEffect(() => {
    if (
      name.length > 0 &&
      email.length > 0 &&
      address.length > 0 &&
      phone.length == 10 &&
      pincode.length == 6
    ) {
      setdisabled(false);
    } else {
      setdisabled(true);
    }
  }, [name, email, address, phone, pincode]);

  const initiatePayment = async (e) => {
    console.log('hii')
    const data = {
      cart,
      email,
      address,
      totalprice: totalprice * 100,
      currency: "INR",
      receiptId: `${Date.now().toString()}&${Math.random()}`,
    };
    const res = await fetch(
      `/api/payment/getOrderId`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(data),
      }
    );
    const orderObj = await res.json();
    if (orderObj.success) {
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEYID, // Enter the Key ID generated from the Dashboard
        amount: orderObj.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: "INR",
        name: "ClothStore", //your business name
        description: "Test Transaction",
        image: "",
        order_id: orderObj.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        handler: async (response) => {
          const res = await fetch(
            `/api/payment/validateSuccess`,
            {
              headers: {
                "Content-Type": "application/json",
              },
              method: "POST",
              body: JSON.stringify({
                data,
                ...response,
                order_id: orderObj.id,
              }),
            }
          );
          const resJson = await res.json();
          if (resJson.success) {
            router.push(`/orderwise/order?id=` + `${resJson.doc._id}`);
          } else {
            // handle unauth(false) payment
          }
          clearCart();
        },
        prefill: {
          //We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
          name: "KK BHAI", //your customer's name
          email: "KKBHAI@example.com",
          contact: "9000000000", //Provide the customer's phone number for better conversion rates
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#ec4899",
        },
      };
      const rzp1 = new Razorpay(options);
      rzp1.on("payment.failed", function (response) {
        // If want handle failure of payment
      });
      rzp1.open();
      e.preventDefault();
    } else {
      toast.error(orderObj.error, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Slide,
      });
    }
  };

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`/api/pincode`);
      const pincodes = await res.json();
      if (Object.keys(pincodes).includes(pincode)) {
        setisServiceable(true)
      }else{
        setisServiceable(false)
      }
    }
    fetchData();
  }, [disabled,pincode]);
  return (
    <div className="bg-bgbody">
            <Head>
        <title>Checkout - ClothStore</title>
      </Head>
      <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>
      <h1 className="font-semibold text-2xl md:text-3xl text-center pt-3">
        Checkout
      </h1>
      <div className="deliverydetails mx-6 md:mx-20">
        <h2 className="font-semibold text-lg md:text-xl my-3">
          1.Delivery details
        </h2>

        <div className="flex space-x-4">
          <div className="mb-4 w-2/4">
            <label htmlFor="name" className="leading-7 text-sm">
              Name
            </label>
            <input
              onChange={handleChange}
              value={name}
              type="text"
              id="name"
              name="name"
              className="w-full bg-white rounded border text-base text-black py-1 px-3 "
            />
          </div>
          <div className="mb-4 w-2/4">
            <label htmlFor="email" className="leading-7 text-sm">
              Email
            </label>
            <input
              readOnly={isLoggedin}
              onChange={handleChange}
              value={email}
              type="email"
              id="email"
              name="email"
              className="w-full bg-white rounded border text-base  text-black py-1 px-3 "
            />
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="address" className="leading-7 text-sm">
            Address
          </label>
          <textarea
            onChange={handleChange}
            value={address}
            id="address"
            name="address"
            className="w-full bg-white rounded border text-base  text-black py-1 px-3 "
          />
        </div>
        <div className="flex space-x-4">
          <div className="mb-4 w-2/4">
            <label htmlFor="phone" className="leading-7 text-sm">
              Phone
            </label>
            <input
              onChange={handleChange}
              value={phone}
              type="text"
              id="phone"
              name="phone"
              className="w-full bg-white rounded border text-base text-black py-1 px-3 "
            />
          </div>
          <div className="mb-4 w-2/4">
            <label htmlFor="pincode" className="leading-7 text-sm">
              Pincode
            </label>
            <input
              onChange={handleChange}
              value={pincode}
              type="text"
              id="pincode"
              name="pincode"
              className="w-full bg-white rounded border text-base  text-black py-1 px-3 "
            />
          </div>
        </div>
        <div className="flex space-x-4">
          <div className="mb-4 w-2/4">
            <label htmlFor="city" className="leading-7 text-sm">
              City
            </label>
            <input
              value={city}
              readOnly
              type="text"
              id="city"
              name="city"
              className="w-full bg-white rounded border text-base  text-black py-1 px-3 "
            />
          </div>
          <div className="mb-4 w-2/4">
            <label htmlFor="state" className="leading-7 text-sm">
              State
            </label>
            <input
              value={state}
              readOnly
              type="text"
              id="state"
              name="state"
              className="w-full bg-white rounded border text-base text-black py-1 px-3 "
            />
          </div>
        </div>
      </div>
      <div className="review mx-6 md:mx-20 pb-5 ">
        <h2 className="font-semibold text-lg md:text-xl my-3">
          2.Review and Pay
        </h2>
        <ol className="mt-3 w-2/6 text-2xl">
          {!cart && <p className="text-xl">No items in the cart</p>}
          {cart &&
            Object.keys(cart).map((key) => {
              const { name, price, qty, size, color } = cart[key];
              const item = { key, ...cart[key] };
              return (
                <li key={key} className="flex  justify-between text-lg ">
                  <Link href={`/product/${key}`}><div className="hover:underline">{name}</div></Link>
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
        <div className="mt-4  text-2xl">
          <span className="text-lg md:text-2xl">Total amount:</span> ₹
          {totalprice}
        </div>

        <div className="text-center mt-2">
          {(disabled && <p>Fill details correctly to continue !</p>) ||
            (isNaN(phone) && <p>Enter valid phone number !</p>) ||
            (isNaN(pincode) && <p>Enter valid pincode !</p>) ||
            (!isServiceable && (
              <p className="text-red-500">Pincode is not serviceable !</p>
            ))}
        </div>

        <button
          disabled={
            disabled ||
            totalprice == 0 ||
            isNaN(phone) ||
            isNaN(pincode) ||
            !isServiceable
          }
          onClick={initiatePayment}
          className="disabled:bg-slate-400 flex mx-auto mt-6 text-white bg-pink-500  py-1 px-3  hover:bg-pink-600 rounded text-lg"
        >
          Pay ₹{totalprice}
        </button>
      </div>
    </div>
  );
};

export default Checkout;
