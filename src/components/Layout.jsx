import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

export default function Layout() {
  const { pathname } = useLocation();
  const bg = pathname === "/inventory" ? "bg-[#10242A]" : "bg-[#1E1033]";
  return (
    <div>
      <header className={`p-4  ${bg} text-white`}>
        <div className="mx-auto w-full max-w-300 px-4 sm:px-6 lg:px-8 xl:px-0 flex justify-between">
          <h1 className="font-Jakarta font-extrabold text-[20px] leading-[100%]">
            Logo
          </h1>
          <div className="flex gap-4">
            <Link
              to="/instapay"
              className="font-semibold font-Jakarta text-[14px] leading-[100%] text-[#C4D6DB] focus:bg-white focus:text-[#10242A] focus:rounded-2xl px-1 flex items-center"
            >
              InstaPay
            </Link>
            <Link
              to="/inventory"
              className="font-semibold font-Jakarta text-[14px] leading-[100%] text-[#C4D6DB] focus:bg-white focus:text-[#10242A] focus:rounded-2xl px-1 flex items-center"
            >
              Inventory
            </Link>
          </div>
        </div>
      </header>
      <Outlet />
    </div>
  );
}
