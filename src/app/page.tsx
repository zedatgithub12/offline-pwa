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

  return <>{splash ? <Splash /> : <PaymentCodeForm />}</>;
}
