import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast,Slide } from "react-toastify";

const Signup = ({isLoggedin}) => {
  const router=useRouter()
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault()
    const user = { name, email, password };
    const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/user/signup`, {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    const data = await res.json();

    setname("");
    setemail("");
    setpassword("");

    if (data.success) {
      toast.success('Account has been created successfully !', {
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
      router.push('/')
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
    if (e.target.name == "name") {
      setname(e.target.value);
    } else if (e.target.name == "email") {
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
            <Head>
        <title>signup - ClothStore</title>
      </Head>
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight ">
          Create your account
        </h2>
      </div>

      <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-6" method="POST">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium leading-6 "
            >
              Name
            </label>
            <div className="mt-2">
              <input
                value={name}
                onChange={handleChange}
                placeholder="Enter you name"
                required
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                className="block w-full rounded-md  p-1.5 text-black placeholder:text-gray-400  sm:text-sm sm:leading-6"
              />
            </div>
          </div>
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
            <label
              htmlFor="password"
              className="block text-sm font-medium leading-6 "
            >
              Password
            </label>

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
              Sign up
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Have an account ?
          <Link
            href="/navpages/signin"
            className="font-semibold leading-6 text-pink-600 hover:text-pink-500"
          >
            {" "}
            signin
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
