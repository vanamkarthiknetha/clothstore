import connectToDb from "@/middleware/mongoose";
import Product from "@/schemas/Product";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import React from "react";
const Hoodies = ({ hoodiesSorted }) => {
  return (
    <section className="text-gray-400 bg-bgbody body-font">
            <Head>
        <title>hoodies - ClothStore</title>
      </Head>
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap justify-center">
          {!Object.keys(hoodiesSorted).length && (
            <p className="h-[14vh]">Out of Stock !</p>
          )}
          {Object.keys(hoodiesSorted).map((key) => {
            return (
              <div
                key={hoodiesSorted[key]._id}
                className="lg:w-1/5 md:w-1/2 p-4 w-full  mx-3 shadow-sm shadow-slate-600 my-3"
              >
                <Link href={`/product/${hoodiesSorted[key].slug}`}>
                  <div className="block relative rounded  overflow-hidden ">
                    <Image
                      alt="ecommerce"
                      className="object-cover object-center w-full h-full block"
                      src={hoodiesSorted[key].img}
                      width={0}
                      height={0}
                      unoptimized
                    />
                  </div>
                  <div className="mt-4">
                    <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                      {hoodiesSorted[key].category}
                    </h3>
                    <h2 className="text-white title-font text-lg font-medium">
                      {hoodiesSorted[key].title}
                    </h2>
                    <p className="mt-1">₹{hoodiesSorted[key].price}</p>
                    <div className="flex mt-1 space-x-1">
                      {hoodiesSorted[key].size.map((size) => {
                        return (
                          <span
                            key={size}
                            className="border border-gray-600 px-1"
                          >
                            {size}
                          </span>
                        );
                      })}
                    </div>
                    <div className="flex mt-2 space-x-1">
                      {hoodiesSorted[key].color.map((color) => {
                        return (
                          <button
                            key={color}
                            className="border-2 border-gray-800  rounded-full w-6 h-6 focus:outline-none"
                            style={{ backgroundColor: `${color}` }}
                          ></button>
                        );
                      })}
                    </div>
                    <div className="flex mt-2 space-x-1">
                      {hoodiesSorted[key].color.length==0 && <p>Out of stock</p>}
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
  const hoodies = await Product.find({ category: "hoodie" });
  const hoodiesSorted = {}; //{title:{...hoodies,size:[],color:[]}}
  for (const item of hoodies) {
    if (item.title in hoodiesSorted) {
      if (
        !hoodiesSorted[item.title].size.includes(item.size) &&
        item.availableQuantity > 0
      ) {
        hoodiesSorted[item.title].size.push(item.size);
      }
      if (
        !hoodiesSorted[item.title].color.includes(item.color) &&
        item.availableQuantity > 0
      ) {
        hoodiesSorted[item.title].color.push(item.color);
      }
    } else {
      hoodiesSorted[item.title] = JSON.parse(JSON.stringify(item));
      if (item.availableQuantity > 0) {
        hoodiesSorted[item.title].size = [item.size];
        hoodiesSorted[item.title].color = [item.color];
      }else{
        hoodiesSorted[item.title].size = [];
        hoodiesSorted[item.title].color = [];
      }
    }
  }
  return {
    props: { hoodiesSorted: JSON.parse(JSON.stringify(hoodiesSorted)) }, // will be passed to the page component as props
  };
}

export default Hoodies;
