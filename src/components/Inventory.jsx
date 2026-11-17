import React, { useState, useRef, useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";

export default function Inventory() {
  const [products, setProducts] = useState(() => {
    return JSON.parse(localStorage.getItem("products")) || [];
  });
  const newName = useRef();
  const newPrice = useRef();
  const newStock = useRef();
  const editName = useRef();
  const editPrice = useRef();
  const editStock = useRef();
  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);
  const addNewProduct = () => {
    let newProduct = {
      name: newName.current.value,
      price: +newPrice.current.value,
      Stock: +newStock.current.value,
    };
    let copy = [...products];
    copy.push(newProduct);
    setProducts(copy);
    newName.current.value = "";
    newPrice.current.value = "";
    newStock.current.value = "";
    toast.success("Successfully Process!");
  };
  const removeProduct = (index) => {
    let copy = [...products];
    copy.splice(index, 1);
    setProducts(copy);
    toast.success("Successfully Process!");
  };
  let productIndex = useRef(null);
  const editProduct = (index) => {
    productIndex.current = index;
    editName.current.value = products[index].name;
    editPrice.current.value = products[index].price;
    editStock.current.value = products[index].Stock;
  };
  const saveEdit = () => {
    let copy = [...products];
    copy[productIndex.current] = {
      name: editName.current.value,
      price: +editPrice.current.value,
      Stock: +editStock.current.value,
    };
    setProducts(copy);
    toast.success("Successfully Process!");
  };
  const totalStock = products.reduce((total, products) => {
    return total + products.Stock;
  }, 0);
  const totalPrice = products.reduce((total, products) => {
    return total + products.price * products.Stock;
  }, 0);
  return (
    <div className="bg-[#EEF2F3] py-8">
      <Toaster />
      <div className="mx-auto w-full max-w-300 px-4 sm:px-6 lg:px-8 xl:px-0">
        <div className=" flex flex-row justify-between pb-6">
          <div className="flex flex-col gap-2.5">
            <h1 className="font-Jakarta font-extrabold text-[30px] leading-[100%] text-[#10242A]">
              Inventory
            </h1>
            <div className="flex flex-row gap-7">
              <div className="flex flex-row gap-1.5 items-center">
                <h3 className="font-Jakarta font-bold text-[16px] leading-[100%] text-[#10242A]">
                  {products.length}
                </h3>
                <h2 className="font-Jakarta font-medium text-[14px] leading-[100%] text-[#46606A]">
                  products
                </h2>
              </div>
              <div className="flex flex-row gap-1.5 items-center">
                <h3 className="font-Jakarta font-bold text-[16px] leading-[100%] text-[#10242A]">
                  {totalStock}
                </h3>
                <h2 className="font-Jakarta font-medium text-[14px] leading-[100%] text-[#46606A]">
                  units
                </h2>
              </div>
              <div className="flex flex-row gap-1.5 items-center">
                <h3 className="font-Jakarta font-bold text-[16px] leading-[100%] text-[#10242A]">
                  {totalPrice}
                </h3>
                <h2 className="font-Jakarta font-medium text-[14px] leading-[100%] text-[#46606A]">
                  USD in stock
                </h2>
              </div>
            </div>
          </div>
          <button
            className="font-Jakarta font-bold text-[15px] leading-[100%] text-white py-3.5 px-6.5 bg-[#0F766E] rounded-[10px]"
            onClick={() => document.getElementById("add_modal").showModal()}
          >
            Add product
          </button>
        </div>
        <table className="table bg-white">
          <thead>
            <tr>
              <th className="font-Jakarta font-semibold text-[13px] leading-[100%] text-[#46606A]">
                #
              </th>
              <th className="font-Jakarta font-semibold text-[13px] leading-[100%] text-[#46606A]">
                Name
              </th>
              <th className="font-Jakarta font-semibold text-[13px] leading-[100%] text-[#46606A]">
                Price
              </th>
              <th className="font-Jakarta font-semibold text-[13px] leading-[100%] text-[#46606A]">
                Stock
              </th>
              <th className="font-Jakarta font-semibold text-[13px] leading-[100%] text-[#46606A]">
                {" "}
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((el, index) => {
              return (
                <tr key={index}>
                  <td className="font-Jakarta font-normal text-[14px] leading-[100%] text-[#10242A]">
                    {index + 1}
                  </td>
                  <td className="font-Jakarta font-semibold text-[14px] leading-[100%] text-[#10242A]">
                    {el.name}
                  </td>
                  <td className="font-Jakarta font-normal text-[14px] leading-[100%] text-[#10242A]">
                    {el.price} USD
                  </td>
                  <td>
                    <span
                      className={`font-Jakarta font-bold text-[13px] leading-[100%] rounded-3xl overflow-auto py-1 px-3 ${
                        el.Stock > 5 ? "bg-[#D5F2EE]" : "bg-[#FDE0E0]"
                      }  ${el.Stock > 5 ? "text-[#0B5C55]" : "text-[#7F1D1D]"}`}
                    >
                      {el.Stock}
                      {el.Stock < 6 ? " . low" : ""}
                    </span>
                  </td>
                  <td className="flex gap-2">
                    <button
                      className="font-Jakarta font-semibold text-[14px] leading-[100%] text-[#10242A] py-3.5 px-5.5 border border-[#AEBFC4] rounded-[10px]"
                      onClick={() => {
                        editProduct(index);
                        document.getElementById("edit_modal").showModal();
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="font-Jakarta font-semibold text-[14px] leading-[100%] text-[#FFFFFF] py-3.5 px-5.5 bg-[#C2314D] rounded-[10px]"
                      onClick={() => removeProduct(index)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <dialog id="add_modal" className="modal modal-bottom sm:modal-middle">
          <div className="modal-box ">
            <h3 className="font-Jakarta font-extrabold text-[20px] leading-[100%] text-[#10242A]">
              New Product
            </h3>{" "}
            <div className="modal-action ">
              <form method="dialog" className="flex flex-col gap-3 w-full">
                <input
                  type="text"
                  placeholder="Enter New Phone Name"
                  className="input w-full"
                  ref={newName}
                />
                <input
                  type="number"
                  placeholder="Enter New Phone Price"
                  className="input w-full"
                  ref={newPrice}
                />
                <input
                  type="number"
                  placeholder="Enter New Phone Qty"
                  className="input w-full"
                  ref={newStock}
                />
                <div className="flex flex-row justify-end gap-2.5">
                  <button className="font-Jakarta font-semibold text-[14px] leading-[100%] text-[#10242A] py-3.5 px-5.5 border border-[#AEBFC4] rounded-[10px]">
                    Close
                  </button>
                  <button
                    className="font-Jakarta font-semibold text-[14px] leading-[100%] text-[#ffffff] py-3.5 px-5.5 bg-[#0F766E] rounded-[10px]"
                    onClick={addNewProduct}
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </dialog>
        <dialog id="edit_modal" className="modal modal-bottom sm:modal-middle">
          <div className="modal-box ">
            <h3 className="font-Jakarta font-extrabold text-[20px] leading-[100%] text-[#10242A]">
              Edit Product
            </h3>{" "}
            <div className="modal-action ">
              <form method="dialog" className="flex flex-col gap-3 w-full">
                <input
                  type="text"
                  placeholder="Enter New Phone Name"
                  className="input w-full"
                  ref={editName}
                />
                <input
                  type="number"
                  placeholder="Enter New Phone Price"
                  className="input w-full"
                  ref={editPrice}
                />
                <input
                  type="number"
                  placeholder="Enter New Phone Qty"
                  className="input w-full"
                  ref={editStock}
                />
                <div className="flex flex-row justify-end gap-2.5">
                  <button className="font-Jakarta font-semibold text-[14px] leading-[100%] text-[#10242A] py-3.5 px-5.5 border border-[#AEBFC4] rounded-[10px]">
                    Close
                  </button>
                  <button
                    className="font-Jakarta font-semibold text-[14px] leading-[100%] text-[#ffffff] py-3.5 px-5.5 bg-[#0F766E] rounded-[10px]"
                    onClick={saveEdit}
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </dialog>
      </div>
    </div>
  );
}
