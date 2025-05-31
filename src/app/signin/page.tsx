"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AuthPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      await signIn("google", { callbackUrl: "/" });
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const handleGithubLogin = async () => {
    setIsLoading(true);
    try {
      await signIn("github", { callbackUrl: "/" });
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

      <div className="relative w-full max-w-sm space-y-8">
        {/* Main card container */}
        <div className="backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-800/50 p-8 relative overflow-hidden">
          {/* Card glow effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-purple-600/5 rounded-3xl"></div>
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

          <div className="relative z-10">
            {/* Logo/Header */}
            <div className="text-center mb-10">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 mb-6 shadow-lg shadow-blue-500/25">
                <svg
                  className="w-10 h-10 text-white"
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
              <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-2">
                Welcome 
              </h2>
              <p className="text-gray-400 font-medium">
                Choose your preferred sign-in method
              </p>
            </div>

            {/* Auth Buttons */}
            <div className="space-y-4">
              <button
                onClick={handleGoogleLogin}
                disabled={isLoading}
                className="cursor-pointer group flex w-full items-center justify-center rounded-xl border border-gray-700/50 bg-gray-800/30 backdrop-blur-sm px-6 py-4 text-sm font-semibold text-gray-200 shadow-lg transition-all duration-200 hover:bg-gray-700/40 hover:border-gray-600/50 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-gray-500/50 disabled:opacity-70 disabled:hover:scale-100"
              >
                <svg
                  className="mr-3 h-6 w-6 transition-transform group-hover:scale-110"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12.545 10.239v3.821h5.445c-0.712 2.315-3.188 3.875-5.445 3.875-3.332 0-6.033-2.701-6.033-6.033s2.701-6.032 6.033-6.032c1.442 0 2.765 0.516 3.799 1.369l2.718-2.718c-1.803-1.677-4.173-2.701-6.517-2.701-5.568 0-10.081 4.513-10.081 10.081s4.513 10.081 10.081 10.081c8.503 0 10.081-7.891 10.081-11.144 0-0.753-0.071-1.326-0.111-1.899h-9.97z" />
                </svg>
                <span>Continue with Google</span>
              </button>

              <button
                onClick={handleGithubLogin}
                disabled={isLoading}
                className="cursor-pointer group flex w-full items-center justify-center rounded-xl border border-gray-700/50 bg-gray-800/30 backdrop-blur-sm px-6 py-4 text-sm font-semibold text-gray-200 shadow-lg transition-all duration-200 hover:bg-gray-700/40 hover:border-gray-600/50 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-gray-500/50 disabled:opacity-70 disabled:hover:scale-100"
              >
                <svg
                  className="mr-3 h-6 w-6 transition-transform group-hover:scale-110"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0.5c-6.351 0-11.5 5.149-11.5 11.5 0 5.082 3.293 9.394 7.863 10.919 0.575 0.106 0.784-0.25 0.784-0.555 0-0.274-0.01-0.999-0.015-1.962-3.2 0.696-3.875-1.543-3.875-1.543-0.523-1.329-1.276-1.683-1.276-1.683-1.044-0.714 0.079-0.699 0.079-0.699 1.154 0.081 1.761 1.185 1.761 1.185 1.026 1.758 2.692 1.25 3.348 0.956 0.104-0.743 0.401-1.25 0.731-1.537-2.555-0.291-5.24-1.278-5.24-5.688 0-1.256 0.449-2.284 1.185-3.089-0.119-0.291-0.513-1.462 0.112-3.047 0 0 0.966-0.309 3.166 1.18 0.918-0.255 1.902-0.383 2.883-0.388 0.978 0.005 1.964 0.133 2.883 0.388 2.199-1.489 3.165-1.18 3.165-1.18 0.626 1.585 0.232 2.756 0.113 3.047 0.737 0.805 1.184 1.833 1.184 3.089 0 4.422-2.693 5.393-5.258 5.678 0.413 0.356 0.781 1.059 0.781 2.134 0 1.542-0.014 2.783-0.014 3.161 0 0.309 0.208 0.668 0.79 0.555 4.565-1.527 7.855-5.837 7.855-10.919 0-6.351-5.149-11.5-11.5-11.5z" />
                </svg>
                <span>Continue with GitHub</span>
              </button>
            </div>

            {/* Footer */}
            <div className="mt-8 text-center">
              <p className="text-xs text-gray-500">
                By signing in, you agree to our Terms of Service and Privacy Policy
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}