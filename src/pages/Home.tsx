import { useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom"
import { RootState } from "../store/store";
import { useAppSelector } from "../store/hooks";
import Dashboard from "./Dashboard";
import Storage from "./Storage";
import TaskManager from "./TaskManager";
import Notices from "./Notices";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import FolderPage from "./FolderPage";
import MobileSidebar from "../components/MobileSidebar";

const Home = () => {
    const navigate = useNavigate();
    const user = useAppSelector((state: RootState) => state.auth.user)
    const { pathname } = useLocation();

    useEffect(() => {
        if (!user?.email) {
            return navigate("/login")
        }

        if (pathname === "/") {
            return navigate("/dashboard")
        }

    }, [navigate, pathname, user?.email])

    return (
        <div className="relative w-full max-w-[100dvw]">
            <div className="hidden lg:block">
                <Sidebar />
            </div>
            <div className="pl-0 lg:pl-[280px] bg-gray">
                <Navbar />
                <div className="flex flex-col px-2 sm:px-3 md:px-6 pb-[70px] sm:pb-0 pt-[88px] h-[100dvh] max-h-[100dvh] overflow-y-auto scrollbar-w-2 scrollbar-track-yellow-lighter scrollbar-thumb-yellow scrollbar-thumb-rounded">
                    <Routes>
                        <Route path="dashboard" element={<Dashboard />} />
                        <Route path="storage" element={<Storage />} />
                        <Route path="task-manager" element={<TaskManager />} />
                        <Route path="task-manager/:folderId" element={<FolderPage />} />
                        <Route path="notices" element={<Notices />} />
                    </Routes>
                </div>
                <div className="block sm:hidden">
                    <MobileSidebar />
                </div>
            </div>
        </div>
    )

}

export default Home
