import Image from "next/image";
import React, { useEffect, useState } from "react";
import Order from "@/schemas/Order";
import connectToDb from "@/middleware/mongoose";
import { useRouter } from "next/router";
import Error from 'next/error'
import Head from "next/head";
const mongoose = require('mongoose');

const MyOrder = ({ errorCode,order, isLoggedin }) => {
  const router = useRouter();
  const products = order.products;
  const [date, setdate] = useState("");
  useEffect(() => {
    if (!isLoggedin) {
      router.push("/");
    }
  }, [isLoggedin, router]);
  useEffect(() => {
    const d = new Date(order.createdAt);
    setdate(d.toUTCString());
  }, []);

  if (errorCode !=null) {
    return <Error statusCode={errorCode} />
  }  

  return (
    <section className="text-white body-font overflow-hidden bg-bgbody max-h-screen">
            <Head>
        <title>order - ClothStore</title>
      </Head>
      <div className="container px-5 py-14 mx-auto ">
        <div className="lg:w-full mx-auto flex flex-wrap md:flex-nowrap">
          <div className="w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
            <h2 className="text-sm title-font text-white tracking-widest">
              ClothStore.com
            </h2>
            <h1 className="text-white text-xl title-font font-medium ">
              Order id:{" "}
              <span className="font-bold text-pink-400 ">{order.orderId}</span>
            </h1>
            <p className=" mt-2">
              Order placed on:{" "}
              <span className="font-bold text-pink-400 ">{date}</span>
            </p>
            <p className="mb-4 mt-2">
              Payment Status:{" "}
              <span className="font-bold text-pink-400 ">{order.status}</span>
            </p>
            <div className="relative overflow-x-auto">
              <table className=" w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Item
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Quatity
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Totalprice
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(products).map((key) => {
                    return (
                      <tr
                        onClick={() => {
                          router.push(`/product/${key}`);
                        }}
                        key={key}
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer"
                      >
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          {products[key].name} (
                          {products[key].size === undefined
                            ? "-"
                            : products[key].size}
                          /
                          {products[key].color === undefined
                            ? "-"
                            : products[key].color}
                          )
                        </th>
                        <td className="px-6 py-4">{products[key].qty}</td>
                        <td className="px-6 py-4">
                          {products[key].qty} X {products[key].price} = ₹{" "}
                          {products[key].qty * products[key].price}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="flex justify-around mt-4">
              <div>
                <button className="flex text-white bg-pink-500 border-0 py-1 px-4 focus:outline-none hover:bg-pink-600 rounded">
                  Track Order
                </button>
              </div>
              <div></div>
              <span className="title-font font-medium text-2xl text-white">
                ₹ {order.amount}
              </span>
            </div>
          </div>
          <Image
            alt="ecommerce"
            unoptimized
            height={0}
            width={0}
            className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
            src="https://m.media-amazon.com/images/I/81yy1eVTggL._AC_UL480_FMwebp_QL65_.jpg"
          />
        </div>
      </div>
    </section>
  );
};


export async function getServerSideProps(context) {
  connectToDb();
  let order={}
  if(mongoose.Types.ObjectId.isValid(context.query.id)){
    order = await Order.findById(context.query.id);
  }
  
  if(Object.keys(order).length==0){
    return {
      props: { errorCode:404,order:{} }, // will be passed to the page component as props
    };
  }
  return {
    props: { errorCode:null,order: JSON.parse(JSON.stringify(order)) }, // will be passed to the page component as props
  };
}
export default MyOrder;
