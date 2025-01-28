"use client";

import Splash from "@/components/Splash";
import React, { useEffect, useState } from "react";
const PaymentCodeForm = React.lazy(
  () => import("@/components/PaymentCodeForm")
);

export default function Home() {
  const [splash, setSplash] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setSplash(false), 1200);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker
          .register("/sw.js")
          .then((registration) => {
            console.log(
              "Service Worker registered in scope:",
              registration.scope
            );
          })
          .catch((error) => {
            console.error("Service Worker registration failed:", error);
          });
      });
    }
  }, []);
  
  return <>{splash ? <Splash /> : <PaymentCodeForm />}</>;
}
