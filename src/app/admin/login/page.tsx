"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Loader2, Eye, EyeOff } from "lucide-react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid email or password");
      } else {
        router.push("/admin");
      }
    } catch {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#0F1419] flex items-center justify-center px-4">
      <Card padding="lg" className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#0D7B3E]">
              <span className="text-white font-bold text-lg">P</span>
            </div>
          </div>
          <h1 className="text-2xl font-bold text-white">Admin Login</h1>
          <p className="text-sm text-gray-400 mt-1">Sign in to the admin panel</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {error && (
            <div className="rounded-xl bg-red-500/10 border border-red-500/20 p-3">
              <p className="text-sm text-red-400">{error}</p>
            </div>
          )}

          <Input
            label="Email"
            type="email"
            placeholder="admin@proscout.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            id="email"
          />

          <div className="relative">
            <Input
              label="Password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              id="password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-[38px] text-gray-400 hover:text-white"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>

          <Button
            type="submit"
            variant="primary"
            loading={loading}
            className="w-full mt-2"
            size="lg"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Signing in...
              </>
            ) : (
              "Sign In"
            )}
          </Button>
        </form>
      </Card>
    </div>
  );
}
