import { Link, useLocation } from "react-router-dom"
import { LuLayoutDashboard, LuFolders } from "react-icons/lu"
import { AiOutlineFile } from "react-icons/ai"
import { LiaListSolid } from "react-icons/lia"
import { useGetFavouriteFoldersQuery } from "../store/services/getItems"
import { useAppDispatch, useAppSelector } from "../store/hooks"
import { RootState } from "../store/store"
import { onClose } from "../store/slices/modalSlice"
import { MdOutlineArrowForwardIos } from "react-icons/md"



const Sidebar = () => {
  const { pathname } = useLocation();
  const user = useAppSelector((state: RootState) => state.auth.user)
  const userId = user?._id ? user._id : ""
  const { data: favouriteFolders } = useGetFavouriteFoldersQuery(userId)
  const dispatch = useAppDispatch();

  const onModalClose = () => {
    dispatch(onClose())
  }

  return (
    <aside className="h-[100dvh] overflow-y-auto bg-primary py-6 fixed left-0 top-0 w-[280px] scrollbar-w-2 scrollbar-track-yellow-lighter scrollbar-thumb-yellow scrollbar-thumb-rounded z-30">
      <div className="flex items-center justify-between gap-4 mb-8 mx-6">
        <Link
          to="/dashboard" className="w-[170px] h-[35px] block"
          onClick={onModalClose}
        >
          <img
            src="https://res.cloudinary.com/dxvrhfhtl/image/upload/v1698599610/ihl7wvctz1zhwrxehe1c.png"
            alt="logo"
            className="w-full h-full"
          />
        </Link>
        <button 
        className="block lg:hidden hover:scale-110 transition"
        onClick={onModalClose}
        >
          <MdOutlineArrowForwardIos size={24} className="text-[#D0D3D8]"/>
        </button>
      </div>
      <div className="flex flex-col gap-2 mb-5">
        <Link to="/dashboard" className={`${pathname === "/dashboard" ? "bg-[#16152B]" : ""}
        relative flex items-center gap-2 text-[#D0D3D8] py-2 px-7 hover:bg-[#16152B] transition`}
          onClick={onModalClose}
        >
          {pathname === "/dashboard" && <p className="absolute w-2 h-2 bg-[#d0d3d8] rounded-full left-2 top-4" />}
          <LuLayoutDashboard size={20} className="text-[#D0D3D8]" />
          <p>Dashboard</p>
        </Link>
        <Link to="/task-manager" className={`${pathname.startsWith("/task-manager") ? "bg-[#16152B]" : ""}
        relative flex items-center gap-2 text-[#D0D3D8] py-2 px-7 hover:bg-[#16152B] transition`}
          onClick={onModalClose}
        >
          {pathname.startsWith("/task-manager") && <p className="absolute w-2 h-2 bg-[#d0d3d8] rounded-full left-2 top-4" />}
          <LuFolders size={20} className="text-[#D0D3D8]" />
          <p>Task Manager</p>
        </Link>
        <Link to="/notices" className={`${pathname === "/notices" ? "bg-[#16152B]" : ""}
        relative flex items-center gap-2 text-[#D0D3D8] py-2 px-7 hover:bg-[#16152B] transition`}
          onClick={onModalClose}
        >
          {pathname === "/notices" && <p className="absolute w-2 h-2 bg-[#d0d3d8] rounded-full left-2 top-4" />}
          <LiaListSolid size={20} className="text-[#D0D3D8]" />
          <p>Notices</p>
        </Link>
        <Link to="/storage" className={`${pathname === "/storage" ? "bg-[#16152B]" : ""}
        relative flex items-center gap-2 text-[#D0D3D8] py-2 px-7 hover:bg-[#16152B] transition`}
          onClick={onModalClose}
        >
          {pathname === "/storage" && <p className="absolute w-2 h-2 bg-[#d0d3d8] rounded-full left-2 top-4" />}
          <AiOutlineFile size={20} className="text-[#D0D3D8]" />
          <p>Storage</p>
        </Link>
      </div>
      <div>
        <p className="text-[#98A0AD] mb-2 pl-5 uppercase">
          Favorites ({favouriteFolders?.length ? favouriteFolders.length : 0})
        </p>
        <div className="flex flex-col gap-1">
          {favouriteFolders && favouriteFolders.length > 0 ? favouriteFolders.map((folder) => (
            <Link to={`/task-manager/${folder._id}`} key={folder._id}
              className={`${pathname === `/task-manager/${folder._id}` ? "bg-[#16152B]" : ""}
        relative flex items-center gap-2 text-[#D0D3D8] py-2 px-7 hover:bg-[#16152B] transition`}
              onClick={onModalClose}
            >
              <AiOutlineFile size={20} className="text-[#D0D3D8]" />
              <p>{folder.title}</p>
            </Link>
          )) : null}
        </div>
      </div>

    </aside>
  )
}

export default Sidebar
