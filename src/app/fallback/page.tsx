"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const Fallback: React.FC = () => {
  const [isOnline, setIsOnline] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      // Redirect to homepage if online
      router.push("/");
    };

    const handleOffline = () => {
      setIsOnline(false);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [router]);

  const handleRefresh = () => {
    if (navigator.onLine) {
      router.push("/");
    } else {
      setIsOnline(false);
    }
  };

  return (
    <div className=" xs:w-full  md:w-1/2 lg:w-1/3 min-h-screen bg-white p-4 relative text-center">
      <Image
        src="/logo.svg"
        alt="Hajj travelers fallback logo"
        width={240}
        height={240}
        className="object-contain mb-4"
        priority
      />

      <h2>You are Offline</h2>

      {isOnline ? (
        <Link
          href={"/"}
          className="mt-6 px-4 py-2 bg-green-500 text-white rounded shadow hover:bg-green-600"
        >
          Return to Homepage
        </Link>
      ) : (
        <button
          onClick={handleRefresh}
          className="mt-6 px-4 py-2 bg-green-500 text-white rounded shadow hover:bg-green-600"
        >
          Refresh
        </button>
      )}
    </div>
  );
};

export default Fallback;
