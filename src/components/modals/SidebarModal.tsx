import { useModal } from "../../helpers/func/utils/modalUtils"
import { useAppSelector } from "../../store/hooks"
import { RootState } from "../../store/store"
import Sidebar from "../Sidebar"


const SidebarModal = () => {
    const isOpen = useAppSelector((state: RootState) => state.modal.isSidebarModalOpen)

    const { handleModalClick } = useModal()

    return (
        <div
            onClick={handleModalClick}
            className={`${isOpen ? "translate-x-0" : "translate-x-[-150%]"} h-[100dvh] duration-500 absolute top-0 w-[100dvw] hidden sm:flex lg:hidden justify-start bg-black/50 z-[45]`}
        >
            <Sidebar />
        </div>
    )
}

export default SidebarModal
