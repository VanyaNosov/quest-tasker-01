import { AiOutlineFile } from "react-icons/ai";
import { LiaListSolid } from "react-icons/lia";
import { LuFolders, LuLayoutDashboard } from "react-icons/lu";
import { Link, useLocation } from "react-router-dom";


const MobileSidebar = () => {
    const { pathname } = useLocation();
    return (
        <div className="rounded-t-lg fixed w-[100dvw] bottom-0 left-0 bg-white drop-shadow-md z-30 py-2 px-3 border-t border-content/70">
            <div className="flex items-center justify-between gap-5">
                <Link to="/dashboard" className='flex flex-col items-center gap-1'>
                    <LuLayoutDashboard
                        size={20}
                        className={`${pathname === "/dashboard" ? "text-sky-600" : "text-primary"}`}
                    />
                    <p className={`${pathname === "/dashboard" ? "text-sky-600" : "text-primary"} text-sm`}>
                        Dashboard
                    </p>
                </Link>
                <Link to="/task-manager" className='flex flex-col items-center gap-1'>
                    <LuFolders
                        size={20}
                        className={`${pathname.startsWith("/task-manager") ? "text-sky-600" : "text-primary"}`}
                    />
                    <p className={`${pathname.startsWith("/task-manager") ? "text-sky-600" : "text-primary"} text-sm`}>
                        Folders
                    </p>
                </Link>
                <Link to="/notices" className='flex flex-col items-center gap-1'>
                    <LiaListSolid
                        size={20}
                        className={`${pathname === "/notices" ? "text-sky-600" : "text-primary"}`}
                    />
                    <p className={`${pathname === "/notices" ? "text-sky-600" : "text-primary"} text-sm`}>
                        Notices
                    </p>
                </Link>
                <Link to="/storage" className='flex flex-col items-center gap-1'
                >
                    <AiOutlineFile
                        size={20}
                        className={`${pathname === "/storage" ? "text-sky-600" : "text-primary"} text-sm`}
                    />
                    <p className={`${pathname === "/storage" ? "text-sky-600" : "text-primary"} text-sm`}>
                        Storage
                    </p>
                </Link>
            </div>
        </div>
    )
}

export default MobileSidebar
