"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { activate } from "@/store/slice/authSlice";
import SpinnerLoader from "@/components/SpinnerLoader";
import { toast } from "sonner";
import { useRouter, useSearchParams, useParams } from "next/navigation";

const Page = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = useParams();
  const [activated, setActivated] = useState(false);

  const { activationLoading: loading, activationError: error } = useSelector(
    (state: RootState) => state.auth,
  );

  const activationCode = searchParams.get("code");
  const uid = params.uid as string;
  const token = params.token as string;

  useEffect(() => {
    if (activationCode) {
      dispatch(activate({ uid: "", token: activationCode }))
        .unwrap()
        .then(() => {
          setActivated(true);
          toast.success("Account activated successfully!");
          setTimeout(() => router.push("/"), 2000);
        })
        .catch((err) => {
          toast.error(err.message || "Activation failed");
        });
    }
  }, [activationCode, dispatch, router]);

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!uid || !token) {
      toast.error("Invalid activation link");
      return;
    }

    dispatch(activate({ uid, token }))
      .unwrap()
      .then(() => {
        setActivated(true);
        toast.success("Account activated successfully!");
        setTimeout(() => router.push("/"), 2000);
      })
      .catch((err) => {
        toast.error(err.message || "Activation failed");
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="w-full max-w-md p-8 space-y-6 bg-card rounded-lg border shadow-lg">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-bold">Activate Account</h1>
          <p className="text-muted-foreground">
            {activated
              ? "Your account has been activated successfully!"
              : "Click the button below to activate your account"}
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <Button
            className="w-full"
            onClick={handleSubmit}
            disabled={loading || activated}
          >
            {loading ? (
              <SpinnerLoader />
            ) : activated ? (
              "Activated!"
            ) : (
              "Activate Account"
            )}
          </Button>
        </div>

        {activated && (
          <p className="text-center text-sm text-muted-foreground">
            Redirecting to login...
          </p>
        )}
      </div>
    </div>
  );
};

export default Page;
