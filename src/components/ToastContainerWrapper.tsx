"use client";

import { Flip, Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ToastContainerWrapper() {
  return <ToastContainer autoClose={2000} transition={Slide} />;
}
