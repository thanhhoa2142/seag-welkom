"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

import { MapPin } from "lucide-react";

export function LocationPermissionForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleLocationRequest = async () => {
    setIsLoading(true);

    try {
      const permission = await navigator.permissions.query({
        name: "geolocation",
      });

      if (permission.state === "granted") {
        handleSuccess();
      } else if (permission.state === "prompt") {
        navigator.geolocation.getCurrentPosition(
          () => handleSuccess(),
          (error) => handleError(error as unknown as Error),
          { enableHighAccuracy: true }
        );
      } else {
        handleError(new Error("Location permission denied"));
      }
    } catch (error) {
      handleError(error as Error);
    }
  };

  const handleSuccess = () => {
    toast.success("Success", {
      description: "Location access granted. You can now find friends nearby!",
    });
    setIsLoading(false);
    router.push("/friend-suggestions");
  };

  const handleError = (error: Error) => {
    console.error("Location error:", error);
    toast.error("Location Access Required", {
      description: "Please enable location services to continue",
    });
    setIsLoading(false);
  };

  const handleSkip = () => {
    toast.info("Location Access Skipped", {
      description: "You can enable location services later in settings",
    });
    router.push("/friend-suggestions");
  };

  return (
    <div className="flex flex-col items-center space-y-6">
      <div className="rounded-full bg-primary/10 p-6">
        <MapPin className="h-12 w-12 text-primary" />
      </div>
      <div className="space-y-4">
        <Button
          onClick={handleLocationRequest}
          className="w-full"
          disabled={isLoading}
        >
          {isLoading ? "Requesting Access..." : "Enable Location Services"}
        </Button>
        <Button
          variant="outline"
          onClick={handleSkip}
          className="w-full"
          disabled={isLoading}
        >
          Skip for now
        </Button>
      </div>
    </div>
  );
}
