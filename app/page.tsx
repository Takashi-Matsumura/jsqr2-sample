import CameraJsQR from "@/app/components/CameraJsQR";
import CameraJsQR2 from "@/app/components/CameraJsQR2";

export default function Home() {
  return (
    <div className="container m-auto">
      <div className="flex h-screen items-center justify-between space-x-5">
        <CameraJsQR />
        <CameraJsQR2 />
      </div>
    </div>
  );
}
