import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Slide, toast } from "react-toastify";

const MyAccount = ({ isLoggedin }) => {
  const [name, setName] = useState("");
  const [email, setemail] = useState("");
  const [address, setaddress] = useState("");
  const [phone, setphone] = useState("");
  const [pincode, setpincode] = useState("");

  const [currPassword, setcurrPassword] = useState("");
  const [newPassword, setnewPassword] = useState("");
  const [confirmNewPassword, setconfirmNewPassword] = useState("");



  const router = useRouter();
  useEffect(() => {
    if (!isLoggedin) {
      router.push("/");
    }
  }, [isLoggedin, router]);

  useEffect(() => {
    const fetchDetails = async () => {
      const data = {
        token: localStorage.getItem("token"),
      };
      const res = await fetch(
        `/api/user/getUser`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify(data),
        }
      );
      const user = await res.json();
      setName(user.name);
      setemail(user.email);
      setaddress(user.address);
      setphone(user.phone);
      setpincode(user.pincode);
    };
    if (isLoggedin) {
      fetchDetails();
    }
  }, [isLoggedin]);

  const handleChange = async (e) => {
    if (e.target.name == "name") {
      setName(e.target.value);
    } else if (e.target.name == "phone") {
      if (e.target.value.length <= 10) {
        setphone(e.target.value);
      }
    } else if (e.target.name == "address") {
      setaddress(e.target.value);
    } else if (e.target.name == "pincode") {
      if (e.target.value.length <= 6) {
        setpincode(e.target.value);
      }
    }
    else if (e.target.name == "currPassword") {
      setcurrPassword(e.target.value);
    }
    else if (e.target.name == "newPassword") {
      setnewPassword(e.target.value);
    }
    else if (e.target.name == "confirmNewPassword") {
      setconfirmNewPassword(e.target.value);
    }
  };

  const handleUpdateDetails = async () => {
    const data = {
      token: localStorage.getItem("token"),
      name,
      address,
      phone,
      pincode,
    };
    const res = await fetch(
      `/api/user/updateDetails`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "PUT",
        body: JSON.stringify(data),
      }
    );
    const resJson = await res.json();
    if (resJson.success) {
      toast.success("Updated Successfully !", {
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
    } else {
      toast.error("Error Cannot Update !", {
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
  const handleChangePassword = async () => {
    const data = {
      token: localStorage.getItem("token"),
      currPassword,newPassword,confirmNewPassword
    };
    const res = await fetch(
      `/api/user/changePassword`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "PUT",
        body: JSON.stringify(data),
      }
    );
    const resJson = await res.json();
    if (resJson.success) {
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
      setcurrPassword("")
      setnewPassword("")
      setconfirmNewPassword("")
    } else {
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
    <div className="bg-bgbody ">
            <Head>
        <title>myaccount - ClothStore</title>
      </Head>
      <div className="accDetails mx-6 pt-5 md:mx-20">
        <h1 className="font-semibold text-xl md:text-2xl  py-3">
          1.Update Account
        </h1>
        <div className="flex space-x-4">
          <div className="mb-4 w-2/4">
            <label htmlFor="name" className="leading-7 text-sm">
              Name
            </label>
            <input
              onChange={handleChange}
              value={name}
              type="text"
              id="name"
              name="name"
              className="w-full bg-white rounded border text-base text-black py-1 px-3 "
            />
          </div>
          <div className="mb-4 w-2/4">
            <label htmlFor="email" className="leading-7 text-sm">
              Email (Cannot Change )
            </label>
            <input
              readOnly={isLoggedin}
              onChange={handleChange}
              value={email}
              type="email"
              id="email"
              name="email"
              className="w-full bg-white rounded border text-base  text-black py-1 px-3 "
            />
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="address" className="leading-7 text-sm">
            Address
          </label>
          <textarea
            onChange={handleChange}
            value={address}
            id="address"
            name="address"
            className="w-full bg-white rounded border text-base  text-black py-1 px-3 "
          />
        </div>
        <div className="flex space-x-4">
          <div className="mb-4 w-2/4">
            <label htmlFor="phone" className="leading-7 text-sm">
              Phone
            </label>
            <input
              onChange={handleChange}
              value={phone}
              type="text"
              id="phone"
              name="phone"
              className="w-full bg-white rounded border text-base text-black py-1 px-3 "
            />
          </div>
          <div className="mb-4 w-2/4">
            <label htmlFor="pincode" className="leading-7 text-sm">
              Pincode
            </label>
            <input
              onChange={handleChange}
              value={pincode}
              type="text"
              id="pincode"
              name="pincode"
              className="w-full bg-white rounded border text-base  text-black py-1 px-3 "
            />
          </div>
        </div>

        <button
          onClick={handleUpdateDetails}
          className="disabled:bg-slate-400 flex mx-auto mt-6 text-white bg-pink-500  py-1 px-3  hover:bg-pink-600 rounded text-lg"
        >
          Update
        </button>
      </div>
      <div className="changePassword mx-6 pt-5 md:mx-20">
        <h1 className="font-semibold text-xl md:text-2xl  py-3">
          1.Change Password
        </h1>
        <div className="flex md:space-x-4 flex-col md:flex-row ">
          <div className="mb-4 w-full md:w-2/4">
            <label htmlFor="currPassword" className="leading-7 text-sm">
              Old password
            </label>
            <input
              onChange={handleChange}
              value={currPassword}
              type="password"
              id="currPassword"
              name="currPassword"
              className="w-full bg-white rounded border text-base text-black py-1 px-3 "
            />
          </div>
          <div className="mb-4 w-full md:w-2/4">
            <label htmlFor="newPassword" className="leading-7 text-sm">
              New password
            </label>
            <input
              onChange={handleChange}
              value={newPassword}
              type="password"
              id="newPassword"
              name="newPassword"
              className="w-full bg-white rounded border text-base  text-black py-1 px-3 "
            />
          </div>
          <div className="mb-4 w-full md:w-2/4">
            <label htmlFor="confirmNewPassword" className=" leading-7 text-sm ">
            Confirm new password
            </label>
            <input
              onChange={handleChange}
              value={confirmNewPassword}
              type="text"
              id="confirmNewPassword"
              name="confirmNewPassword"
              className="w-full bg-white rounded border text-base  text-black py-1 px-3 "
            />
          </div>
        </div>
        
        <button
          onClick={handleChangePassword}
          className="disabled:bg-slate-400 flex mx-auto mt-6 text-white bg-pink-500  py-1 px-3  hover:bg-pink-600 rounded text-lg"
        >
          Change
        </button>
      </div>
    </div>
  );
};

export default MyAccount;
