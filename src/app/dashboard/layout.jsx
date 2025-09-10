import SideBar from '../components/dashboard/SideBar';

export default function DashboardLayout({ children }) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
            <div className="w-full flex-none md:w-64">
                <SideBar />
            </div>
            <div className="flex-grow p-6 overflow-y-auto md: p-12"> {children} </div>
        </div>
  )
}