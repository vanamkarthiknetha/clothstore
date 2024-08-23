import connectToDb from "@/middleware/mongoose";
import Product from "@/schemas/Product";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import React from "react";
const Hoodies = ({ mugsSorted }) => {
  return (
    <section className="text-gray-400 bg-bgbody body-font">
            <Head>
        <title>mugs - ClothStore</title>
      </Head>
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap justify-center">
            {!Object.keys(mugsSorted).length && <p className="h-[14vh]">Out of Stock !</p>}
            {Object.keys(mugsSorted).map((key) => {
              return (<div key={mugsSorted[key]._id}  className="lg:w-1/5 md:w-1/2 p-4 w-full  mx-3 shadow-sm shadow-slate-600 my-3">
                <Link href={`/product/${mugsSorted[key].slug}`}>
                  <div className="block relative rounded  overflow-hidden ">
                    <Image
                      alt="ecommerce"
                      className="object-cover object-center w-full h-full block"
                      src={mugsSorted[key].img}
                      width={0}
                      height={0}
                      unoptimized
                    />
                  </div>
                  <div className="mt-4">
                    <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                      {mugsSorted[key].category}
                    </h3>
                    <h2 className="text-white title-font text-lg font-medium">
                    {mugsSorted[key].title}
                    </h2>
                    <p className="mt-1">₹{mugsSorted[key].price}</p>

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
  const mugs = await Product.find({ category: "mug" });
  const mugsSorted = {};//{title:{...mugs,size:[],color:[]}}
  for (const item of mugs) {
    if (item.title in mugsSorted) {
      if (
        !mugsSorted[item.title].size.includes(item.size) &&
        item.availableQuantity > 0
      ) {
        mugsSorted[item.title].size.push(item.size);
      }
      if (
        !mugsSorted[item.title].color.includes(item.color) &&
        item.availableQuantity > 0
      ) {
        mugsSorted[item.title].color.push(item.color);
      }
    } else {
      if (item.availableQuantity > 0) {
      mugsSorted[item.title] = JSON.parse(JSON.stringify(item));
        mugsSorted[item.title].size = [item.size];
        mugsSorted[item.title].color = [item.color];
      }
    }
  }
  return {
    props: { mugsSorted: JSON.parse(JSON.stringify(mugsSorted)) }, // will be passed to the page component as props
  };
}

export default Hoodies;
