import { cn } from "@/utils/functions";
import { Outlet } from "react-router-dom";
import Footer from "../eCommerce/CommonSection/Footer";

export default function CustomerLayout() {
  const mode = import.meta.env.VITE_APP_VERSION;
  return (
    <div
      className={cn("flex flex-col min-h-screen  bg-[#F9FAFB]", {
        "h-[calc(100vh-32px)] mt-8": mode === "demo",
      })}
    >
      {/* <Header /> */}
      <main className='flex-grow'>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
