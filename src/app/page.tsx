import Login from "@/components/login";
import ModeToggle from "@/components/toggle";

export default function Home() {
  return (
    <>
      <div className="m-4"><ModeToggle/></div>
      <Login/>
    </>
  )
}
