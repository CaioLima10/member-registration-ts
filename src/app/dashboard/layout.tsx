import Navbar from "@/app/dashboard/components/header";

export default function Dashboardlayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Navbar/>
      { children }
    </div>
  )
}
