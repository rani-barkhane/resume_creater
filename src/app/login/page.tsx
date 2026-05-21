import { Suspense } from "react";
import LoginForm from "./LoginForm";
import { Skeleton } from "@/components/ui/Skeleton";

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen pt-16 flex items-center justify-center">
          <Skeleton className="w-full max-w-md h-80 rounded-2xl" />
        </main>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
