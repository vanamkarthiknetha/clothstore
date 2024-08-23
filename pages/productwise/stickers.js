import connectToDb from "@/middleware/mongoose";
import Product from "@/schemas/Product";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import React from "react";
const Hoodies = ({ stickersSorted }) => {
  return (
    <section className="text-gray-400 bg-bgbody body-font">
      <Head>
        <title>stickers - ClothStore</title>
      </Head>
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap justify-center">
          {!Object.keys(stickersSorted).length && (
            <p className="h-[14vh]">Out of Stock !</p>
          )}
          {Object.keys(stickersSorted).map((key) => {
            return (
              <div
                key={stickersSorted[key]._id}
                className="lg:w-1/5 md:w-1/2 p-4 w-full  mx-3 shadow-sm shadow-slate-600 my-3"
              >
                <Link href={`/product/${stickersSorted[key].slug}`}>
                  <div className="block relative rounded  overflow-hidden ">
                    <Image
                      alt="ecommerce"
                      className="object-cover object-center w-full h-full block"
                      src={stickersSorted[key].img}
                      width={0}
                      height={0}
                      unoptimized
                    />
                  </div>
                  <div className="mt-4">
                    <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                      {stickersSorted[key].category}
                    </h3>
                    <h2 className="text-white title-font text-lg font-medium">
                      {stickersSorted[key].title}
                    </h2>
                    <p className="mt-1">₹{stickersSorted[key].price}</p>
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
  const stickers = await Product.find({ category: "sticker" });
  const stickersSorted = {}; //{title:{...stickers,size:[],color:[]}}
  for (const item of stickers) {
    if (item.title in stickersSorted) {
      if (
        !stickersSorted[item.title].size.includes(item.size) &&
        item.availableQuantity > 0
      ) {
        stickersSorted[item.title].size.push(item.size);
      }
      if (
        !stickersSorted[item.title].color.includes(item.color) &&
        item.availableQuantity > 0
      ) {
        stickersSorted[item.title].color.push(item.color);
      }
    } else {
      if (item.availableQuantity > 0) {
        stickersSorted[item.title] = JSON.parse(JSON.stringify(item));
        stickersSorted[item.title].size = [item.size];
        stickersSorted[item.title].color = [item.color];
      }
    }
  }
  return {
    props: { stickersSorted: JSON.parse(JSON.stringify(stickersSorted)) }, // will be passed to the page component as props
  };
}

export default Hoodies;
