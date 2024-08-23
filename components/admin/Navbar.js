
import Link from "next/link";


const Navbar = ({}) => {
 
  return (
    <nav className="sticky top-0 z-20 shadow-md shadow-pink-400  flex flex-col py-3 items-center md:flex-row md:justify-between md:text-xl font-medium bg-bgnav">
      <div className="img ml-2 text-pink-400 font-bold">
        <Link href={"/admin"}>
          {/* <Image
            className="h-auto w-auto"
            src="/logo.png"
            alt="img"
            width={120}
            height={0}
          /> */}
          ClothStore (Admin)
        </Link>
      </div>
      <div className="navs ">
        <ul className="flex">
          <Link href={"/admin/"}>
            <li className="mx-2 md:mx-3  hover:text-pink-400">Dashboard</li>
          </Link>
          <Link href={"/admin/productwise/viewproducts"}>
            <li className="mx-2 md:mx-3  hover:text-pink-400">View Products</li>
          </Link>
          <Link href={"/admin/productwise/addproducts"}>
            <li className="mx-2 md:mx-3  hover:text-pink-400">Add Products</li>
          </Link>
          <Link href={"/admin/orderwise/orders"}>
            <li className="mx-2 md:mx-3  hover:text-pink-400">Orders</li>
          </Link>
        </ul>
      </div>

    </nav>
  );
};

export default Navbar;
