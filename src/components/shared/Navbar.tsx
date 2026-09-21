"use client";

import { removeToken } from "@/features/auth/server/auth.actions";
import { authActions } from "@/features/auth/slices/auth.slice";
import { appState } from "@/store/store";
import {
  IconBabyCarriage,
  IconChevronDown,
  IconDotsVertical,
  IconHeart,
  IconId,
  IconLogout,
  IconMail,
  IconMenu2,
  IconPhone,
  IconProgressBolt,
  IconReportMedical,
  IconSearch,
  IconShirtSport,
  IconShoppingCart,
  IconUser,
  IconUserPlus,
  IconX,
} from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import logo from "../../assets/images/freshcart-logo.svg";

export default function Navbar() {
  const { isAuthenticated } = useSelector(
    (appState: appState) => appState.authReducer,
  );

  const { logOut } = authActions;
  const dispatch = useDispatch();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleLogOut = async () => {
    dispatch(logOut());
    await removeToken();
    closeMobileMenu();
    router.push("/login");
  };

  return (
    <>
      <header>
        <div className="container mx-auto">
          {/* Top Navbar */}
          <div className="hidden lg:flex border-b text-sm border-gray-500/10 py-2  justify-between items-center *:flex *:gap-6">
            <ul className="*:flex *:gap-2 *:items-center">
              <li>
                <IconPhone stroke={2} />
                <a href="tel:+18001234567">+1 (800) 123-4567</a>
              </li>
              <li>
                <IconMail stroke={2} />
                <a href="mailto:support@freshcart.com">support@freshcart.com</a>
              </li>
            </ul>

            <ul>
              <li>
                <Link href={`/track-order`}>Track Order</Link>
              </li>
              <li>
                <Link href={`/about`}>About</Link>
              </li>
              <li>
                <Link href={`/contact`}>Contact</Link>
              </li>
              <li>
                <select>
                  <option>EGP</option>
                  <option>SAR</option>
                  <option>AED</option>
                </select>
              </li>
              <li>
                <select>
                  <option>العربية</option>
                  <option>English</option>
                </select>
              </li>
            </ul>
          </div>
          {/* Main Navigation */}
          <nav className="py-4 flex justify-between items-center">
            <h1>
              <Link href={`/`}>
                <Image src={logo} alt="" />
              </Link>
            </h1>

            <search className="relative hidden lg:flex">
              <input
                type="text"
                className="form-control w-96"
                placeholder="Search for products ..."
              />
              <IconSearch stroke={2} />
            </search>

            <button
              type="button"
              className="lg:hidden btn flex justify-center items-center bg-primary-600 text-white"
              aria-label="Open menu"
              aria-controls="mobile-menu"
              aria-expanded={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <IconMenu2 stroke={1} size={20}/>
            </button>

            <menu className="hidden lg:flex gap-6 *:hover:text-primary-500 *:transition-colors *:duration-200">
              <li>
                <Link
                  href={`/wishlist`}
                  className={`flex flex-col gap-2 items-center`}
                >
                  <IconHeart stroke={2} />
                  <span className="text-sm">Wishlist</span>
                </Link>
              </li>

              <li>
                <Link
                  href={`/cart`}
                  className={`flex flex-col gap-2 items-center`}
                >
                  <div className="relative">
                    <IconShoppingCart stroke={2} />

                    <span className="absolute top-0 -right-0.5 -translate-y-1/2 size-4.5 rounded-full bg-primary-600 text-white text-xs flex justify-center items-center">
                      0
                    </span>
                  </div>
                  <span className="text-sm">Cart</span>
                </Link>
              </li>

              {isAuthenticated ? (
                <>
                  {" "}
                  <li>
                    <Link
                      href={`/profile`}
                      className={`flex flex-col gap-2 items-center`}
                    >
                      <IconUser stroke={2} />
                      <span className="text-sm">Account</span>
                    </Link>
                  </li>
                  <li
                    onClick={handleLogOut}
                    className="flex flex-col gap-2 cursor-pointer"
                  >
                    <IconLogout stroke={2} />
                    <span className="text-sm">Logout</span>
                  </li>
                </>
              ) : (
                <>
                  {" "}
                  <li>
                    <Link
                      href={`/signup`}
                      className={`flex flex-col gap-2 items-center`}
                    >
                      <IconUserPlus stroke={2} />
                      <span className="text-sm">Signup</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={`/login`}
                      className={`flex flex-col gap-2 items-center`}
                    >
                      <IconId stroke={2} />
                      <span className="text-sm">Login</span>
                    </Link>
                  </li>
                </>
              )}
            </menu>
          </nav>
        </div>
        {/* Category Navigation */}
        <nav className="hidden lg:block bg-gray-100 py-4">
          <div className="container flex gap-6 items-center">
            <div className="group/categories relative">
              <button className="btn bg-primary-600 text-white flex gap-2 items-center">
                <IconMenu2 stroke={2} />
                <span>All Categories</span>
                <IconChevronDown stroke={2} />
              </button>

              <ul className="hidden divide-y-2 divide-gray-300/20 shadow-xl group-hover/categories:flex flex-col absolute z-50 top-10 left-0 rounded-md bg-white w-60 *:bg-white *:hover:bg-gray-100 *:transition-colors *:duration-200">
                <li>
                  <Link
                    href={`/category/6439d5b90049ad0b52b90048`}
                    className="p-3 flex gap-3 items-center"
                  >
                    <IconUser stroke={2} />

                    <span>Men&apos;s Fashion</span>
                  </Link>
                </li>

                <li>
                  <Link
                    href={`/category/6439d58a0049ad0b52b9003f`}
                    className="p-3 flex gap-3 items-center"
                  >
                    <IconShirtSport stroke={2} />

                    <span>Women&apos;s Fashion</span>
                  </Link>
                </li>

                <li>
                  <Link
                    href={`/category/6439d40367d9aa4ca97064cc`}
                    className="p-3 flex gap-3 items-center"
                  >
                    <IconBabyCarriage stroke={2} />

                    <span>Baby & Toys</span>
                  </Link>
                </li>

                <li>
                  <Link
                    href={`/category/6439d30b67d9aa4ca97064b1`}
                    className="p-3 flex gap-3 items-center"
                  >
                    <IconReportMedical stroke={2} />

                    <span>Beauty & Health</span>
                  </Link>
                </li>

                <li>
                  <Link
                    href={`/category/6439d2d167d9aa4ca970649f`}
                    className="p-3 flex gap-3 items-center"
                  >
                    <IconProgressBolt stroke={2} />

                    <span>Electronics</span>
                  </Link>
                </li>

                <li>
                  <Link
                    href={`/categories`}
                    className="p-3 flex gap-3 items-center"
                  >
                    <IconDotsVertical stroke={2} />

                    <span>View All Categories</span>
                  </Link>
                </li>
              </ul>
            </div>

            <menu className="flex gap-4">
              <li>
                <Link
                  href={`/`}
                  className={`hover:text-primary-600 transition-colors duration-200 font-medium`}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href={`/recently-added`}
                  className={`hover:text-primary-600 transition-colors duration-200 font-medium`}
                >
                  Recently Added
                </Link>
              </li>
              <li>
                <Link
                  href={`/featured`}
                  className={`hover:text-primary-600 transition-colors duration-200 font-medium`}
                >
                  Featured Products
                </Link>
              </li>
              <li>
                <Link
                  href={`/offers`}
                  className={`hover:text-primary-600 transition-colors duration-200 font-medium`}
                >
                  Offers
                </Link>
              </li>
              <li>
                <Link
                  href={`/brands`}
                  className={`hover:text-primary-600 transition-colors duration-200 font-medium`}
                >
                  Brands
                </Link>
              </li>
            </menu>
          </div>
        </nav>

        {isMobileMenuOpen && (
          <>
            <button
              type="button"
              className="fixed inset-0 bg-black/50 z-40"
              aria-label="Close menu"
              onClick={closeMobileMenu}
            />

            <div
              id="mobile-menu"
              className="offcanvas p-5 fixed w-80 max-w-[85vw] top-0 bottom-0 left-0 bg-white shadow-xl z-50 overflow-y-auto flex flex-col"
            >
              <div className="flex justify-between items-center border-b border-gray-200 pb-4">
                <div className="logo">
                  <Image src={logo} alt="FreshCart" className="h-10" />
                </div>
                <button
                  type="button"
                  className="btn p-2 rounded-full hover:bg-gray-100"
                  aria-label="Close menu"
                  onClick={closeMobileMenu}
                >
                  <IconX stroke={2} className="text-xl" />
                </button>
              </div>
              <div className="relative my-4">
                <input
                  type="text"
                  className="form-control w-full border-2 py-2 pl-3 pr-10 rounded-lg"
                  placeholder="Search for products ..."
                />
                <IconSearch
                  stroke={2}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
              </div>
              <h2 className="text-lg font-semibold mt-4 mb-2 text-gray-800">
                Main Menu
              </h2>
              <ul className="space-y-3 border-b border-gray-200 pb-4">
                <li>
                  <Link
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100"
                    href={`/wishlist`}
                    onClick={closeMobileMenu}
                  >
                    <IconHeart stroke={2} className="text-lg" />
                    <span className="font-medium">Wishlist</span>
                  </Link>
                </li>
                <li>
                  <Link
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100"
                    href={`/cart`}
                    onClick={closeMobileMenu}
                  >
                    <div className="relative">
                      <IconShoppingCart stroke={2} className="text-lg" />
                      <span className="absolute -top-1 -right-1 size-4 rounded-full bg-primary-600 text-white text-xs flex justify-center items-center">
                        {0}
                      </span>
                    </div>
                    <span className="font-medium">Cart</span>
                  </Link>
                </li>
                {isAuthenticated && (
                  <li>
                    <Link
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100"
                      href={`/profile`}
                      onClick={closeMobileMenu}
                    >
                      <IconUser stroke={2} className="text-lg" />
                      <span className="font-medium">Account</span>
                    </Link>
                  </li>
                )}
              </ul>
              <h2 className="text-lg font-semibold mt-4 mb-2 text-gray-800">
                Account
              </h2>
              <ul className="space-y-3">
                {isAuthenticated ? (
                  <li>
                    <button
                      type="button"
                      className="flex w-full items-center gap-3 p-2 rounded-lg hover:bg-gray-100 text-left"
                      onClick={handleLogOut}
                    >
                      <IconLogout stroke={2} className="text-lg" />
                      <span className="font-medium">Logout</span>
                    </button>
                  </li>
                ) : (
                  <>
                    <li>
                      <Link
                        href={`/signup`}
                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100"
                        onClick={closeMobileMenu}
                      >
                        <IconUserPlus stroke={2} className="text-lg" />
                        <span className="font-medium">Signup</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href={`/login`}
                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100"
                        onClick={closeMobileMenu}
                      >
                        <IconId stroke={2} className="text-lg" />
                        <span className="font-medium">Login</span>
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </>
        )}
      </header>
    </>
  );
}
