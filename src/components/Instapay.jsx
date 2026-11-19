import React, { useState, useRef, useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";

export default function Instapay() {
  const amountInput = useRef();
  const [transactions, setTransaction] = useState(() => {
    return JSON.parse(localStorage.getItem("transactions")) || [];
  });
  const [isShow, setIsShow] = useState(false);
  const [balance, setBalance] = useState(() => {
    return JSON.parse(localStorage.getItem("balance")) || 0;
  });
  useEffect(() => {
    localStorage.setItem("balance", JSON.stringify(balance));
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [balance, transactions]);
  const deposit = () => {
    let amount = +amountInput.current.value;
    if (amount >= 0) {
      let newBalance = balance + amount;
      setBalance(newBalance);
      amountInput.current.value = "";
      let newTrans = {
        beforeBalance: balance,
        type: "Deposit",
        amount: amount,
        afterBalance: newBalance,
      };
      let copy = [...transactions];
      copy.push(newTrans);
      setTransaction(copy);
      toast.success("Successfully Process!");
    } else {
      toast.error("Enter a Valid Number");
    }
  };
  const withdraw = () => {
    let amount = +amountInput.current.value;
    if (amount >= 0) {
      if (amount <= balance) {
        let newBalance = balance - amount;
        setBalance(newBalance);
        toast.success("Successfully Process!");

        amountInput.current.value = "";
        let newTrans = {
          beforeBalance: balance,
          type: "Withdraw",
          amount: amount,
          afterBalance: newBalance,
        };
        let copy = [...transactions];
        copy.push(newTrans);
        setTransaction(copy);
      } else {
        toast.error("Insufficient Process!");
      }
    } else {
      toast.error("Enter a Valid Number");
    }
  };
  return (
    <div className="bg-[#EEF0F4] py-8">
      <Toaster />
      <div className="mx-auto w-full max-w-300 px-4 sm:px-6 lg:px-8 xl:px-0">
        <div className="bg-[#3D1A6B] py-8 px-9 rounded-[20px] flex justify-between items-center">
          <div className="flex flex-col gap-1.5">
            <h3 className="font-Jakarta font-medium text-[14px] leading-[100%] text-[#D8CFF0]">
              Your balance
            </h3>
            <h1 className="font-Jakarta font-extrabold text-[52px] leading-[100%] tracking-[6px] text-[#FFFFFF]">
              {isShow ? balance : "*****"}
            </h1>
          </div>
          <button
            className="font-Jakarta font-semibold text-[14px] text-[#FFFFFF] py-3.5 px-5 rounded-[10px] bg-[#FFFFFF29]"
            onClick={() => {
              setIsShow(!isShow);
            }}
          >
            {isShow ? "Hide" : "Show"} balance
          </button>
        </div>
        <div className="my-6 flex gap-2.5 w-full">
          <input
            type="text"
            placeholder="Enter amount"
            required
            className="input flex-1 rounded-[10px] placeholder:font-Jakarta placeholder:font-medium placeholder:text-[15px] placeholder:leading-[100%] placeholder:text-[#6B6F80]"
            ref={amountInput}
          />

          <button
            className="font-Jakarta font-bold text-[15px] leading-[100%] text-[#FFFFFF] py-3.5 px-6.5 rounded-[10px] bg-[#C2314D]"
            onClick={withdraw}
          >
            Withdraw
          </button>
          <button
            className="font-Jakarta font-bold text-[15px] leading-[100%] text-[#FFFFFF] py-3.5 px-6.5 rounded-[10px] bg-[#15803D]"
            onClick={deposit}
          >
            Deposit
          </button>
        </div>
        <table className="table bg-white">
          <thead>
            <tr>
              <th className="font-Jakarta font-semibold text-[13px] leading-[100%] text-[#46606A]">
                #
              </th>
              <th className="font-Jakarta font-semibold text-[13px] leading-[100%] text-[#46606A]">
                Before
              </th>
              <th className="font-Jakarta font-semibold text-[13px] leading-[100%] text-[#46606A]">
                Type
              </th>
              <th className="font-Jakarta font-semibold text-[13px] leading-[100%] text-[#46606A]">
                Amount
              </th>
              <th className="font-Jakarta font-semibold text-[13px] leading-[100%] text-[#46606A]">
                After
              </th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((el, index) => {
              return (
                <tr
                  key={index}
                  className={`${el.type == "Deposit" ? "bg-[#DDF5E6]" : "bg-[#FDE0E0]"}`}
                >
                  <td
                    className={`font-Jakarta font-medium text-[14px] leading-[100%] ${el.type == "Deposit" ? "text-[#14532D]" : "text-[#7F1D1D]"}`}
                  >
                    {index + 1}
                  </td>
                  <td
                    className={`font-Jakarta font-medium text-[14px] leading-[100%] ${el.type == "Deposit" ? "text-[#14532D]" : "text-[#7F1D1D]"}`}
                  >
                    {el.beforeBalance} EGP
                  </td>
                  <td
                    className={`font-Jakarta font-semibold text-[14px] leading-[100%] ${el.type == "Deposit" ? "text-[#14532D]" : "text-[#7F1D1D]"}`}
                  >
                    {el.type}
                  </td>
                  <td
                    className={`font-Jakarta font-medium text-[14px] leading-[100%] ${el.type == "Deposit" ? "text-[#14532D]" : "text-[#7F1D1D]"}`}
                  >
                    {el.amount} EGP
                  </td>
                  <td
                    className={`font-Jakarta font-bold text-[14px] leading-[100%] ${el.type == "Deposit" ? "text-[#14532D]" : "text-[#7F1D1D]"}`}
                  >
                    {" "}
                    {el.afterBalance} EGP
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
