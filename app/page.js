"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LoaderCircle } from "lucide-react";

export default function Home() {
  const router = useRouter();
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    setIsRedirecting(true);
    router.push("/dashboard");
  }, [router]);

  if (isRedirecting) {
    // Display a loading spinner and message while redirecting
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        <LoaderCircle size={48} className="animate-spin" />
        <div>Redirecting to the dashboard...</div>
      </div>
    );
  }

  return null;
}
