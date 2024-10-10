import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Slide, toast } from "react-toastify";

const Forgot = ({ isLoggedin }) => {
  const [email, setEmail] = useState("");
  const [passwordObj, setPasswordObj] = useState({
    newPassword: "",
    confirmNewPassword: "",
  });
  const router = useRouter();
  useEffect(() => {
    if (isLoggedin) {
      router.push("/");
    }
  }, [isLoggedin, router]);

  const handleChange = async (e) => {
    if (e.target.name == "email") {
      setEmail(e.target.value);
    } else if (e.target.name == "newPassword") {
      setPasswordObj({ ...passwordObj, newPassword: e.target.value });
    } else if (e.target.name == "confirmNewPassword") {
      setPasswordObj({ ...passwordObj, confirmNewPassword: e.target.value });
    }
  };

  const sendEmail = async (e) => {

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
    const data = {email};
    const res = await fetch(
      `/api/user/forgot`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(data),
      }
    );
    const resJson = await res.json();
    toast.dismiss()
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
      router.push('/navpages/signin')
    }
    else{
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

  };
  const changePassword = async (e) => {
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
    const data = {passwordObj,token:router.query.token};
    const res = await fetch(
      `/api/user/forgot`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "PUT",
        body: JSON.stringify(data),
      }
    );
    const resJson = await res.json();
    toast.dismiss()
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
      router.push('/navpages/signin')
    }
    else{
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
  };

  return (
    <div className="bg-bgbody text-white flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <Head>
        <title>forgot password - ClothStore</title>
      </Head>
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight ">
          Forgot Password
        </h2>
      </div>

      {!router.query.token && (
        <div className="sendEmail mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 "
              >
                Email address
              </label>
              <div className="mt-2">
                <input
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
              <button
                disabled={email.length==0}
                onClick={sendEmail}
                type="submit"
                className="disabled:bg-pink-400  flex w-full justify-center rounded-md bg-pink-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600"
              >
                Continue
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Got password ?
            <Link
              href="/navpages/signin"
              className="font-semibold leading-6 text-pink-600 hover:text-pink-500"
            >
              {" "}
              signin
            </Link>
          </p>
        </div>
      )}
      {router.query.token && (
        <div className="changePassword mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST">
            <div>
              <label
                htmlFor="newPassword"
                className="block text-sm font-medium leading-6 "
              >
                New Password
              </label>
              <div className="mt-2">
                <input
                  onChange={handleChange}
                  placeholder="Enter your new password"
                  required
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  autoComplete="newPassword"
                  className="block w-full rounded-md  p-1.5 text-black placeholder:text-gray-400  sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="confirmNewPassword"
                className="block text-sm font-medium leading-6 "
              >
                Confirm New Password
              </label>
              <div className="mt-2">
                <input
                  onChange={handleChange}
                  placeholder="Enter your new password to confirm"
                  required
                  id="confirmNewPassword"
                  name="confirmNewPassword"
                  type="password"
                  autoComplete="confirmNewPassword"
                  className="block w-full rounded-md  p-1.5 text-black placeholder:text-gray-400  sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
              disabled={passwordObj.newPassword.length==0 | passwordObj.confirmNewPassword.length==0}
                onClick={changePassword}
                type="submit"
                className="disabled:bg-pink-400 flex w-full justify-center rounded-md bg-pink-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600"
              >
                Continue
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Got password ?
            <Link
              href="/navpages/signin"
              className="font-semibold leading-6 text-pink-600 hover:text-pink-500"
            >
              {" "}
              signin
            </Link>
          </p>
        </div>
      )}

    </div>
  );
};

export default Forgot;
