import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <main className="bg-[#2341AA] h-screen flex flex-col justify-center items-center px-5 sm:px-0">
      <Outlet />
    </main>
  );
}
