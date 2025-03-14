import { LocationPermissionForm } from "../components/location-permission-form";

export const metadata: Metadata = {
  title: "Location Permission",
  description: "Enable location services to find friends nearby",
};

export default function LocationPermissionPage() {
  return (
    <div className="container relative min-h-screen py-8">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[550px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Enable Location Services
          </h1>
          <p className="text-sm text-muted-foreground">
            We need your location to help you find friends and activities nearby
          </p>
        </div>
        <LocationPermissionForm />
      </div>
    </div>
  );
}
