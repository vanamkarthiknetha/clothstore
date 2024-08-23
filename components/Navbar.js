import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FaShoppingCart, FaRegUserCircle } from "react-icons/fa";
import Cart from "./Cart";
import { Slide, toast } from "react-toastify";

const Navbar = ({isLoggedin,setisLoggedin}) => {
  const ref = useRef();
  const toggleCart = () => {
    if (ref.current.classList.contains("hidden")) {
      ref.current.classList.remove("hidden");
    } else {
      ref.current.classList.add("hidden");
    }
  };

  const [accMenu, setaccMenu] = useState(false);


  const logout=()=>{
    localStorage.removeItem('token')
    setisLoggedin(false);
    toast.success('Logged out successfully !', {
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
  return (
    <nav className="sticky top-0 z-20 shadow-md shadow-pink-400  flex flex-col py-3 items-center md:flex-row md:justify-between md:text-2xl font-medium bg-bgnav">
      <div className="img ml-2 text-pink-400 font-bold">
        <Link href={"/"}>
          {/* <Image
            className="h-auto w-auto"
            src="/logo.png"
            alt="img"
            width={120}
            height={0}
          /> */}
          ClothStore
        </Link>
      </div>
      <div className="navs ">
        <ul className="flex">
          <Link href={"/productwise/tshirts"}>
            <li className="mx-2 md:mx-3  hover:text-pink-400">Tshirts</li>
          </Link>
          <Link href={"/productwise/hoodies"}>
            <li className="mx-2 md:mx-3  hover:text-pink-400">Hoodies</li>
          </Link>
          <Link href={"/productwise/stickers"}>
            <li className="mx-2 md:mx-3  hover:text-pink-400">Stickers</li>
          </Link>
          <Link href={"/productwise/mugs"}>
            <li className="mx-2 md:mx-3  hover:text-pink-400">Mugs</li>
          </Link>
        </ul>
      </div>
      <div className="flex ">
        <div className="icons mr-1 md:mr-4 hover:text-pink-500 cursor-pointer">
          {!isLoggedin && (
            <Link href={"/navpages/signin"}>
              <button className="text-sm md:text-xl "
              >Signin</button>
            </Link>
          )}
        </div>
        <div className="icons my-1 mr-1 md:mr-2 ">
          {isLoggedin && (
            <FaRegUserCircle
              onClick={() => {
                setaccMenu(!accMenu);
              }}
              className="hover:text-pink-500 cursor-pointer"
            />
          )}
          {accMenu && (
            <div
            onClick={() => {
              setaccMenu(!accMenu);
            }} className="absolute bg-pink-500 top-[6.5rem] md:top-11 right-[59%] md:right-10 w-40 rounded-md">
              <ul className="text-lg">
                <Link href={"/navpages/myaccount"}>
                  <li className="hover:text-gray-800 cursor-pointer my-2 px-3">
                    My Account
                  </li>
                </Link>
                <Link href={"/orderwise/orders"}>
                  <li className="hover:text-gray-800 cursor-pointer my-2 px-3">
                    Orders
                  </li>
                </Link>
                <li onClick={logout} className="hover:text-gray-800 cursor-pointer my-2 px-3">
                  Signout
                </li>
              </ul>
            </div>
          )}
        </div>
        <div className="icons my-1 md:mr-2 hover:text-pink-500 cursor-pointer">
          {<FaShoppingCart onClick={toggleCart} />}
        </div>
      </div>
      <div
        ref={ref}
        className="hidden cart w-56 h-[100vh] md:w-80 overflow-y-scroll absolute bg-pink-500 right-0 top-0 z-10 "
      >
        <Cart toggleCart={toggleCart} />
      </div>
    </nav>
  );
};

export default Navbar;
