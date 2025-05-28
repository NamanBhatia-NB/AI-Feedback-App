"use client";

import { useSessionContext } from "@/app/components/SessionWrapper";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Profile() {
  const { session, loading } = useSessionContext();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !session) {
      router.push("/login"); //  Redirect to login if not authenticated
    }
  }, [session, loading, router]);

  if (loading) return <p>Loading...</p>;
  if (!session) return null;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Profile</h1>
      <p>Email: {session.user.email}</p>
    </div>
  );
}