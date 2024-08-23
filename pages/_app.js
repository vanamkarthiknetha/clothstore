import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import CartState from "@/context/cart/CartState";
import "@/styles/globals.css";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingBar from 'react-top-loading-bar'

export default function App({ Component, pageProps }) {
  const router=useRouter()
  const [progress, setProgress] = useState(0)
  
  useEffect(() => {
    router.events.on('routeChangeStart', ()=>setProgress(50))
    router.events.on('routeChangeComplete',()=> setProgress(100))
  }, [router]);
  
  const [isLoggedin, setisLoggedin] = useState(false);
  useEffect(()=>{
    setisLoggedin(localStorage.getItem("token")!=null);
  },[])
  

  return (
    <>
      <CartState>
      <LoadingBar
        waitingTime={400}
        color='#ec4899'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
        <ToastContainer/>
        <div className="Navbar">
        <Navbar  isLoggedin={isLoggedin} setisLoggedin={setisLoggedin} setProgress={setProgress}/>
        </div>
        <div className="min-h-screen  bg-bgbody">
        <Component isLoggedin={isLoggedin}  setisLoggedin={setisLoggedin}  setProgress={setProgress} {...pageProps} />
        </div>
        <div className="Footer">
        <Footer />
        </div>
      </CartState>
    </>
  );
}
