"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import { authApi } from "@/lib/auth";
import { Toast} from "../app/components/ui/toast"; // ✅ FIXED missing import



// -------------------------------
// Type Definitions
// -------------------------------

export interface UseAuthOptions {
  redirectOnFail?: boolean;
}

// Provide a default in function signature
export function useAuth(options: UseAuthOptions = { redirectOnFail: true }) {
  const { redirectOnFail } = options;

  const router = useRouter();
  const queryClient = useQueryClient();

  const [bootstrapping, setBootstrapping] = useState(true);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  // -------------------------------
  // Load Authenticated User
  // -------------------------------

  const {
    data: user,
    isLoading,
    isError,
    error,
    refetch: refetchProfile,
  } = useQuery({
    queryKey: ["auth", "me"],
    queryFn: async () => {
      const res = await authApi.me();
      return res.data;
    },
    enabled: true,
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (!isLoading) {
      setBootstrapping(false);
    }
  }, [isLoading]);

  // -------------------------------
  // Redirect on 401
  // -------------------------------

  useEffect(() => {
    if (
      isError &&
      (error as AxiosError | undefined)?.response?.status === 401 &&
      redirectOnFail
    ) {
      router.replace("/login");
    }
  }, [isError, error, redirectOnFail, router]);

  // -------------------------------
  // Login Mutation
  // -------------------------------

  const loginMutation = useMutation({
    mutationFn: authApi.login,
    onMutate: () => {
      setIsAuthenticating(true);
    },
    onSuccess: async () => {
      try {
        await new Promise((res) => setTimeout(res, 50)); // Wait for cookie
        const { data } = await refetchProfile();

        // Role checking
        if (data?.role !== "admin" && data?.role !== "company") {
          Toast({
            title: "Access Denied",
            description:
              "Only admin or company accounts can access this dashboard.",
            variant: "destructive",
          });
          setIsAuthenticating(false);
          return;
        }

        Toast({
          title: "Login Successful",
          description: "Welcome back!",
        });

        queryClient.setQueryData(["auth", "me"], data);
        router.replace("/dashboard");
      } catch (err) {
        Toast({
          title: "Login Error",
          description: "Login succeeded but loading user profile failed.",
          variant: "destructive",
        });
      } finally {
        setIsAuthenticating(false);
      }
    },
    onError: (error: AxiosError) => {
      let message = "Login failed";

      if (
        error?.response &&
        typeof error.response.data === "object" &&
        error.response.data !== null &&
        "message" in error.response.data
      ) {
        message =
          (error.response.data as { message?: string }).message ||
          error?.message ||
          message;
      } else if (error?.message) {
        message = error.message;
      }

      Toast({
        title: "Login Failed",
        description: message,
        variant: "destructive",
      });

      setIsAuthenticating(false);
    },
  });

  // -------------------------------
  // Logout Mutation
  // -------------------------------

  const logoutMutation = useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      queryClient.clear();
      router.replace("/login");
    },
    onError: () => {
      queryClient.clear();
      router.replace("/login");
    },
  });

  // -------------------------------
  // Memoized Authentication State
  // -------------------------------

  const isAuthenticated = useMemo(
    () => !!user && !isLoading && !isError,
    [user, isLoading, isError]
  );

  // -------------------------------
  // Returned Values
  // -------------------------------

  return {
    user,
    isLoading,
    isAuthenticated,
    login: loginMutation.mutate,
    logout: logoutMutation.mutate,
    isLoggingIn: loginMutation.isPending,
    isLoggingOut: logoutMutation.isPending,
    isAuthenticating,
    role: user?.role,
    hasRole: (role: string) => user?.role === role,
    bootstrapping,
  };
}
