import connectToDb from "@/middleware/mongoose";
import Product from "@/schemas/Product";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import CartContext from "@/context/cart/CartContext";
import { toast, Slide } from "react-toastify";
import Error from "next/error";
import Head from "next/head";
// On buyNow oldcart is lost.so,need to retain it and dispaly after completion of buying product !
const Slug = ({ variantsSorted, product, errorCode }) => {
  const router = useRouter();
  const slug = router.query.slug;
  const [pincode, setpincode] = useState(null);
  const [service, setservice] = useState(null);
  const { cart, setcart, addToCart, clearCart } = useContext(CartContext);

  const checkService = async () => {
    if (pincode == null) return;
    const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pincode`);
    const pincodes = await res.json();
    if (Object.keys(pincodes).includes(pincode)) {
      setservice(true);
      toast.success("Service available to your pincode!", {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Slide,
      });
    } else {
      toast.error("Sorry,cannot deliver to this pincode!", {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Slide,
      });
      setservice(false);
    }
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      checkService();
    }
  };
  const onChange = (e) => {
    setpincode(e.target.value);
  };

  const variantKeys = Object.keys(variantsSorted);
  const [size, setsize] = useState(product.size);
  const [color, setcolor] = useState(product.color);
  const item = {
    key: product.slug,
    slug: product.slug,
    name: product.title,
    price: product.price,
    size: product.size,
    color: product.color,
    qty: 1,
  };

  const changeVariantbySize = (e) => {
    const newslug = variantsSorted[product.color][e.target.value]["slug"];
    router.push(`/product/${newslug}`);
  };
  const changeVariantbyColor = (color) => {
    const sizesAvailable = Object.keys(variantsSorted[color]);
    const newslug = variantsSorted[color][sizesAvailable[0]]["slug"];
    router.push(`/product/${newslug}`);
  };

  const buyNow = () => {
    const oldcart = { ...cart }; //Storing old cart
    const newcart = {};
    const { key, name, price, qty, size, color } = item;
    newcart[key] = { name, price, qty, size, color };
    setcart(newcart);
    router.push(`/orderwise/checkout`);
  };

  if (errorCode != null) {
    return <Error statusCode={errorCode} />;
  }

  return (
    <>
          <Head>
        <title>{product.title} - ClothStore</title>
      </Head>
      <div className="text-gray-400 bg-bgbody body-font overflow-hidden">
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <Image
              alt="ecommerce"
              className="w-2/3 h-2/3 m-auto  md:w-auto md:h-auto object-cover object-top rounded"
              src={`${product.img}`}
              width={0}
              height={0}
              priority={true}
              unoptimized
            />
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">
                ClothStore
              </h2>
              <h1 className="text-white text-3xl title-font font-medium mb-1">
                {product.title} (
                {product.color === undefined ? "-" : product.color}/
                {product.size === undefined ? "-" : product.size})
              </h1>
              <div className="flex mb-4">
                <span className="flex items-center">
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 text-pink-400"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 text-pink-400"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 text-pink-400"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 text-pink-400"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 text-pink-400"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <span className="ml-3">4 Reviews</span>
                </span>
                <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-800 text-gray-500 space-x-2">
                  <a>
                    <svg
                      fill="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                    </svg>
                  </a>
                  <a>
                    <svg
                      fill="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                    </svg>
                  </a>
                  <a>
                    <svg
                      fill="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                    </svg>
                  </a>
                </span>
              </div>
              <p className="leading-relaxed">{product.desc}</p>
              <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-800 mb-5">
                {product.color && (
                  <div className="flex">
                    <span className="mr-3">Color</span>
                    {variantKeys.map((color) => {
                      return (
                        <button
                          key={color}
                          onClick={() => {
                            changeVariantbyColor(color);
                          }}
                          className=" ml-1 rounded-full w-6 h-6 "
                          style={{
                            backgroundColor: `${color}`,
                            borderColor: `${
                              color == product.color ? "white" : `${color}`
                            }`,
                            borderWidth: `3px`,
                          }}
                        ></button>
                      );
                    })}
                  </div>
                )}
                {product.size && (
                  <div className="flex ml-6 items-center">
                    <span className="mr-3">Size</span>
                    <div className="relative ">
                      <select
                        value={product.size}
                        onChange={(e) => {
                          changeVariantbySize(e);
                        }}
                        className=" rounded border border-gray-700  bg-slate-200 text-black  py-2  pl-3 pr-3"
                      >
                        {Object.keys(variantsSorted[product.color]).map(
                          (size) => {
                            return (
                              <option value={size} key={size} >
                                {size}
                              </option>
                            );
                          }
                        )}
                      </select>
                      
                    </div>
                  </div>
                )}
              </div>
              <div className="flex mt-10">
                <span className="title-font font-medium text-2xl text-white ">
                  ₹{item.price}
                </span>
                <button
                  disabled={product.availableQuantity == 0}
                  onClick={() => {
                    buyNow();
                  }}
                  className="disabled:bg-slate-400 flex ml-auto text-white bg-pink-500 border-0 py-2 px-4 md:py-2 md:px-6 focus:outline-none hover:bg-pink-600 rounded text-sm md:text-base"
                >
                  Buy now
                </button>
                <button
                  onClick={() => {
                    addToCart(item);
                    toast.success("Item added !", {
                      position: "bottom-center",
                      autoClose: 3000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                      theme: "dark",
                      transition: Slide,
                    });
                  }}
                  className="flex mx-5 text-white bg-pink-500 border-0 py-2 px-4 md:py-2 md:px-6focus:outline-none hover:bg-pink-600 rounded text-sm md:text-base"
                >
                  Add to cart
                </button>
                <button className="rounded-full w-10 h-10 bg-gray-800 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4 ">
                  <svg
                    fill="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                  </svg>
                </button>
              </div>
              <div className="pincode mt-8">
                <input
                  onChange={onChange}
                  type="text"
                  className="px-1 bg-slate-200 text-black "
                  onKeyDown={handleKeyDown}
                />
                <button
                  onClick={checkService}
                  className=" text-white bg-pink-500 border-0 py-1 px-4 focus:outline-none hover:bg-pink-600 rounded ml-5"
                >
                  Check
                </button>
              </div>
              <div className="service h-10">
                {service && service != null && (
                  <div className="text-green-600">
                    Service available to your pincode!
                  </div>
                )}
                {!service && service != null && (
                  <div className="text-red-600">
                    Sorry,cannot deliver to this pincode! (available: 509321, 501505)
                  </div>
                )}
                {product.availableQuantity == 0 && (
                  <h2 className="text-white text-3xl title-font font-medium mt-3">
                    Out of stock!
                  </h2>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps(context) {
  connectToDb();
  const product = await Product.findOne({ slug: context.query.slug });
  if (!product) {
    return {
      props: { errorCode: 404,product:{},variantsSorted:{} }, // will be passed to the page component as props
    };
  }

  const variants = await Product.find({
    title: product.title,
    category: product.category,
  });
  const variantsSorted = {}; //format:  {color:{size1:{slug:'slug'},size2:{slug:'slug'}}}
  for (const variant of variants) {
    if (Object.keys(variantsSorted).includes(variant.color)) {
      variantsSorted[variant.color][variant.size] = { slug: variant.slug };
    } else {
      variantsSorted[variant.color] = {};
      variantsSorted[variant.color][variant.size] = { slug: variant.slug };
    }
  }

  return {
    props: {
      errorCode: null,
      product: JSON.parse(JSON.stringify(product)),
      variantsSorted: JSON.parse(JSON.stringify(variantsSorted)),
    }, // will be passed to the page component as props
  };
}

export default Slug;
