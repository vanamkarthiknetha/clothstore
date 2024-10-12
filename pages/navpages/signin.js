import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Slide, toast } from "react-toastify";

const Signin = ({isLoggedin,setisLoggedin}) => {
  const router = useRouter();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    toast.info("Please Wait...", {
      position: "top-center",
      autoClose: 10000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Slide,
    });
    const user = { email, password };
    const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/user/signin`, {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    const data = await res.json();
    setemail("");
    setpassword("");
    toast.dismiss()
    if (data.success) {
      localStorage.setItem('token',data.token)
      localStorage.setItem('email',data.email)
      toast.success("Signin successfully !", {
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
      router.push("/");
      setisLoggedin(true)
    } else {
      toast.error(data.error, {
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
  const handleChange = (e) => {
    if (e.target.name == "email") {
      setemail(e.target.value);
    } else if (e.target.name == "password") {
      setpassword(e.target.value);
    }
  };

  useEffect(()=>{
    if(isLoggedin){
      router.push('/')
    }
  },[isLoggedin,router])
  return (
    <div className="bg-bgbody text-white flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight ">
          Sign in to your account
        </h2>
      </div>
      <Head>
        <title>signin - ClothStore</title>
      </Head>
      <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit} method="POST">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 "
            >
              Email address
            </label>
            <div className="mt-2">
              <input
              value={email}
              onChange={handleChange}
                placeholder="Enter you email"
                required
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                className="block w-full rounded-md  p-1.5 text-black placeholder:text-gray-400  sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 "
              >
                Password
              </label>
              <div className="text-sm">
                <Link
                  href="/navpages/forgot"
                  className="font-semibold text-pink-600 hover:text-pink-500"
                >
                  Forgot password?
                </Link>
              </div>
            </div>
            <div className="mt-2">
              <input
              value={password}
              onChange={handleChange}
                placeholder="Enter you password"
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="block w-full rounded-md text-black p-1.5  placeholder:text-gray-400  sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-pink-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600"
            >
              Sign in
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          No account yet ?
          <Link
            href="/navpages/signup"
            className="font-semibold leading-6 text-pink-600 hover:text-pink-500"
          >
            {" "}
            signup
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signin;
