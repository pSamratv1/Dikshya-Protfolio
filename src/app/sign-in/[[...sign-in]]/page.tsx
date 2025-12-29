import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex justify-center items-center h-screen bg-[#F9F8F4]">
      <SignIn />
    </div>
  );
}
