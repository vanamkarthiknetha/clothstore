import connectToDb from "@/middleware/mongoose";
import Product from "@/schemas/Product";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import React from "react";
const Tshirts = ({ tshirtsSorted }) => {
  return (
    <section className="text-gray-400 bg-bgbody body-font">
      <Head>
        <title>tshirts - ClothStore</title>
      </Head>
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap justify-center -m-4">
          
            {Object.keys(tshirtsSorted).map((key) => {
              return (<div key={tshirtsSorted[key]._id}  className="lg:w-1/5 md:w-1/2 p-4 w-full  mx-3 shadow-sm shadow-slate-600 my-3">
                <Link href={`/product/${tshirtsSorted[key].slug}`}>
                  <div className="block relative rounded  overflow-hidden ">
                    <Image
                      alt="ecommerce"
                      className="object-cover object-center w-full h-full block"
                      src={tshirtsSorted[key].img}
                      width={0}
                      height={0}
                      unoptimized
                    />
                  </div>
                  <div className="mt-4">
                    <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                      {tshirtsSorted[key].category}
                    </h3>
                    <h2 className="text-white title-font text-lg font-medium">
                    {tshirtsSorted[key].title}
                    </h2>
                    <p className="mt-1">₹{tshirtsSorted[key].price}</p>
                    <div className="flex mt-1 space-x-1">
                      {tshirtsSorted[key].size.map((size)=>{
                        return <span key={size} className="border border-gray-600 px-1">{size}</span>
                      })}
                    </div>
                    <div className="flex mt-2 space-x-1">
                      {tshirtsSorted[key].color.map((color)=>{
                        return <button key={color} className="border-2 border-gray-800  rounded-full w-6 h-6 focus:outline-none" style={{backgroundColor:`${color}`}}></button>
                      })}
                    </div>
                    <div className="flex mt-2 space-x-1">
                      {tshirtsSorted[key].color.length==0 && <p>Out of stock</p>}
                    </div>
                  </div>
                </Link>
                  </div>
              );
            })}
          
        </div>
      </div>
    </section>
  );
};

export async function getServerSideProps(context) {
  connectToDb();
  const tshirts = await Product.find({ category: "tshirt" });
  const tshirtsSorted = {};//{title:{...tshirts,size:[],color:[]}}
  for (const item of tshirts) {
    if (item.title in tshirtsSorted) {
      if (
        !tshirtsSorted[item.title].size.includes(item.size) &&
        item.availableQuantity > 0
      ) {
        tshirtsSorted[item.title].size.push(item.size);
      }
      if (
        !tshirtsSorted[item.title].color.includes(item.color) &&
        item.availableQuantity > 0
      ) {
        tshirtsSorted[item.title].color.push(item.color);
      }
    } else {
      tshirtsSorted[item.title] = JSON.parse(JSON.stringify(item));
      if (item.availableQuantity > 0) {
        tshirtsSorted[item.title].size = [item.size];
        tshirtsSorted[item.title].color = [item.color];
      }
      else{
        tshirtsSorted[item.title].size = [];
        tshirtsSorted[item.title].color = [];
      }
    }
  }
  return {
    props: { tshirtsSorted: JSON.parse(JSON.stringify(tshirtsSorted)) }, // will be passed to the page component as props
  };
}

export default Tshirts;
