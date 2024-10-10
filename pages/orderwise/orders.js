import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import connectToDb from "@/middleware/mongoose";
import Link from "next/link";
import Head from "next/head";

const Orders = ({ isLoggedin }) => {
  const [orders, setorders] = useState([]);
  const router = useRouter();
  const fetchorders = async () => {
    const res = await fetch(
      `/api/user/getOrders`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ token: localStorage.getItem("token") }),
      }
    );
    const resObj = await res.json();
    setorders(resObj.orders);
  };
  useEffect(() => {
    if (!isLoggedin) {
      router.push("/");
    }
  }, [isLoggedin, router]);
  useEffect(() => {
    if (isLoggedin) {
      fetchorders();
    }
  }, [isLoggedin]);
  return (
    <div className="text-gray-400 bg-bgbody ">      <Head>
    <title>orders - ClothStore</title>
  </Head>
      <div className="m-auto  w-4/5">
        <h1 className="p-6 text-2xl font-semibold text-center">My Orders</h1>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg ">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Order Id
                </th>
                <th scope="col" className="px-6 py-3">
                  Email
                </th>
                <th scope="col" className="px-6 py-3">
                  Amount
                </th>
                <th scope="col" className="px-6 py-3">
                  Quanity
                </th>
              </tr>
            </thead>
            <tbody>
              {orders.map((item) => {
                return (
                    <tr onClick={()=>{router.push(`/orderwise/order?id=${item._id}`)}} key={item._id}  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer">
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {item.orderId}
                      </th>
                      <td className="px-6 py-4">{item.email}</td>
                      <td className="px-6 py-4">₹{item.amount}</td>
                      <td className="px-6 py-4">
                        {Object.keys(item.products).length}
                      </td>
                    </tr>
                );
              })}
            </tbody>
          </table>
          {orders.length==0&&<div className="text-center h-28 mt-10">No orders placed yet </div>}
        </div>
      </div>
    </div>
  );
};

export default Orders;
