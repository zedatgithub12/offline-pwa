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
    <div className="flex mx-auto max-w-[500px] w-full flex-col items-center justify-center h-screen bg-foreground text-black p-6 mt-12 text-white">
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
