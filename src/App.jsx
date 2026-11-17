import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Inventory from "./components/Inventory";
import Instapay from "./components/Instapay";
export default function App() {
  return (
    <div className="w-full h-dvh overflow-auto" data-theme="light">
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Navigate to="/Instapay" replace />} />
          <Route path="/instapay" element={<Instapay />} />
          <Route path="/inventory" element={<Inventory />} />
        </Route>
      </Routes>
    </div>
  );
}
