import Navbar from "@/components/admin/Navbar";
import React, { useState } from "react";
import { Slide, toast } from "react-toastify";

const Addproducts = () => {
  const [form, setform] = useState({
    title: '',
    slug: '',
    desc: '',
    img: '',
    category: '',
    size: '',
    color: '',
    price: '',
    availableQuantity: '',
  });
  const handleChange = (e) => {    
    setform({
      ...form,
      [e.target.name]: e.target.value
    })
  };
  const submit=async ()=>{
    const res = await fetch(
      `/api/products/addproducts`,
      {
        headers: {
         
        },
        method: "POST",
        body: JSON.stringify([form]),
      }
    );
    const resJson = await res.json();
    if(resJson.success){
      toast.success(resJson.msg, {
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
    }else{
      toast.error(resJson.msg, {
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
  }
  return (
    <>
      <style global jsx>{`
        .Navbar {
          display: none;
        }
        .Footer {
          display: none;
        }
      `}</style>
      <Navbar />
      <div className="accDetails mx-6 pt-5 md:mx-20">
        <h1 className="font-semibold text-xl md:text-2xl  py-3">Add Product</h1>
        <div className="flex space-x-4">
          <div className="mb-4 w-2/4">
            <label htmlFor="name" className="leading-7 text-sm">
              Title
            </label>
            <input
              onChange={handleChange}
              value={form.title}
              type="text"
              id="title"
              name="title"
              className="w-full bg-white rounded border text-base text-black py-1 px-3 "
            />
          </div>
          <div className="mb-4 w-2/4">
            <label htmlFor="email" className="leading-7 text-sm">
              Slug (unique)
            </label>
            <input
              onChange={handleChange}
              value={form.slug}
              type="slug"
              id="slug"
              name="slug"
              className="w-full bg-white rounded border text-base  text-black py-1 px-3 "
            />
          </div>
        </div>
        <div className="flex space-x-4">
          <div className="mb-4 w-2/4">
            <label htmlFor="name" className="leading-7 text-sm">
              Description
            </label>
            <input
              onChange={handleChange}
              value={form.desc}
              type="text"
              id="desc"
              name="desc"
              className="w-full bg-white rounded border text-base text-black py-1 px-3 "
            />
          </div>
          <div className="mb-4 w-2/4">
            <label htmlFor="email" className="leading-7 text-sm">
              Image Link
            </label>
            <input
              onChange={handleChange}
              value={form.img}
              type="img"
              id="img"
              name="img"
              className="w-full bg-white rounded border text-base  text-black py-1 px-3 "
            />
          </div>
        </div>
        <div className="flex space-x-4">
          <div className="mb-4 w-2/4">
            <label htmlFor="name" className="leading-7 text-sm">
            Category
            </label>
            <input
              onChange={handleChange}
              value={form.category}
              type="text"
              id="category"
              name="category"
              className="w-full bg-white rounded border text-base text-black py-1 px-3 "
            />
          </div>
          <div className="mb-4 w-2/4">
            <label htmlFor="email" className="leading-7 text-sm">
            Size
            </label>
            <input
              onChange={handleChange}
              value={form.size}
              type="text"
              id="size"
              name="size"
              className="w-full bg-white rounded border text-base  text-black py-1 px-3 "
            />
          </div>
        </div>
        <div className="flex space-x-4">
          <div className="mb-4 w-2/4">
            <label htmlFor="name" className="leading-7 text-sm">
            Color
            </label>
            <input
              onChange={handleChange}
              value={form.color}
              type="text"
              id="color"
              name="color"
              className="w-full bg-white rounded border text-base text-black py-1 px-3 "
            />
          </div>
          <div className="mb-4 w-2/4">
            <label htmlFor="email" className="leading-7 text-sm">
          Price
            </label>
            <input
              onChange={handleChange}
              value={form.price}
              type="text"
              id="price"
              name="price"
              className="w-full bg-white rounded border text-base  text-black py-1 px-3 "
            />
          </div>
          <div className="mb-4 w-2/4">
            <label htmlFor="email" className="leading-7 text-sm">
            Quantity
            </label>
            <input
              onChange={handleChange}
              value={form.availableQuantity}
              type="text"
              id="availableQuantity"
              name="availableQuantity"
              className="w-full bg-white rounded border text-base  text-black py-1 px-3 "
            />
          </div>
        </div>
        <button
        onClick={submit}
          className="disabled:bg-slate-400 flex mx-auto mt-6 text-white bg-pink-500  py-1 px-3  hover:bg-pink-600 rounded text-lg"
        >
          Add
        </button>
      </div>
    </>
  );
};

export default Addproducts;
