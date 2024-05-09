import CameraStreamWithQRReader from "@/app/components/CameraStreamWithQRReader";

export default function Home() {
  return (
    <div className="container m-auto">
      <div className="flex flex-col h-screen items-center justify-center">
        <CameraStreamWithQRReader />
      </div>
    </div>
  );
}
