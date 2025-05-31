"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function AuthPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleCredentialsLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await signIn("credentials", {
        username: email,
        password: password,
        redirect: false,
      });
      console.log(res);
      router.push("/");
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      await signIn("google", { callbackUrl: "/" });
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-black to-gray-900 px-4 py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-gradient-to-br from-blue-600/10 to-purple-600/10 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-gradient-to-tr from-indigo-600/10 to-cyan-600/10 blur-3xl"></div>
      </div>

      <div className="relative w-full max-w-md space-y-8">
        {/* Main card container */}
        <div className=" backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-800/50 p-8 relative overflow-hidden">
          {/* Card glow effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-purple-600/5 rounded-3xl"></div>
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

          <div className="relative z-10">
            {/* Logo/Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 mb-6 shadow-lg shadow-blue-500/25">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Welcome
              </h2>
              <p className="mt-3 text-gray-400 font-medium">
                Sign in to your account to continue
              </p>
            </div>

            <div className="mt-8">

              <div className="mt-6">
                <button
                  onClick={handleGoogleLogin}
                  disabled={isLoading}
                  className="cursor-pointer group flex w-full items-center justify-center rounded-xl border border-gray-700/50 bg-gray-800/30 backdrop-blur-sm px-4 py-3.5 text-sm font-semibold text-gray-200 shadow-lg transition-all duration-200 hover:bg-gray-700/40 hover:border-gray-600/50 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-gray-500/50 disabled:opacity-70 disabled:hover:scale-100"
                >
                  <svg
                    className="mr-3 h-6 w-6 transition-transform group-hover:scale-110"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12.545 10.239v3.821h5.445c-0.712 2.315-3.188 3.875-5.445 3.875-3.332 0-6.033-2.701-6.033-6.033s2.701-6.032 6.033-6.032c1.442 0 2.765 0.516 3.799 1.369l2.718-2.718c-1.803-1.677-4.173-2.701-6.517-2.701-5.568 0-10.081 4.513-10.081 10.081s4.513 10.081 10.081 10.081c8.503 0 10.081-7.891 10.081-11.144 0-0.753-0.071-1.326-0.111-1.899h-9.97z" />
                  </svg>
                  <span>Sign in with Google</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
