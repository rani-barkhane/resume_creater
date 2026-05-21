import { Suspense } from "react";
import LoginForm from "./LoginForm";
import { Skeleton } from "@/components/ui/Skeleton";
import { AuthThemeBar } from "@/components/layout/AuthThemeBar";

export default function LoginPage() {
  return (
    <>
      <AuthThemeBar />
      <Suspense
      fallback={
        <main className="min-h-screen pt-16 flex items-center justify-center">
          <Skeleton className="w-full max-w-md h-80 rounded-2xl" />
        </main>
      }
    >
      <LoginForm />
    </Suspense>
    </>
  );
}
