import { IoIosArrowBack } from "react-icons/io"
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import { RootState } from "../../store/store"
import { onClose, setIsCreateTaksModalOpen } from "../../store/slices/modalSlice"
import Button from "../ui/Button"
import CreateTaskForm from "../forms/CreateTaskForm"
import { useModal } from "../../helpers/func/utils/modalUtils"


const CreateTaskModal = () => {
    const isOpen = useAppSelector((state: RootState) => state.modal.isCreateTaskModalOpen)
    const folderId = useAppSelector((state: RootState) => state.modal.folderId)
    const dispatch = useAppDispatch()

    const { handleModalClick } = useModal()

    return (
        <div
            onClick={handleModalClick}
            className={`${isOpen ? "right-0" : "-right-full"} h-[100vh] duration-300 fixed top-0 w-[100vw] flex justify-end bg-black/50 z-[45] overflow-y-auto overflow-x-hidden`}
        >
            <div className='flex flex-col bg-gray py-3 sm:py-5 max-w-[90dvw] sm:max-w-2xl h-[100dvh] overflow-y-auto overflow-x-hidden scrollbar-w-2 scrollbar-track-yellow-lighter scrollbar-thumb-yellow scrollbar-thumb-rounded'>
                <div className="flex items-center justify-between gap-10 mb-3 sm:mb-5 px-4 sm:px-8">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-sky-500" />
                        <p className="text-primary text-sm font-bold">
                            Open
                        </p>
                    </div>
                    <Button
                        className="flex items-center gap-2 hover:bg-gray border-none"
                        onClick={() => {
                            dispatch(onClose())
                            dispatch(setIsCreateTaksModalOpen({ isOpen: false, folderId }))
                        }}
                        bgColor="bg-transparent"
                        color="text-primary"
                    >
                        <IoIosArrowBack size={20} className="text-primary" />
                        <p className="font-semibold">Back</p>
                    </Button>
                </div>
                <div className="flex-1 flex flex-col">
                    <CreateTaskForm />
                </div>
            </div>
        </div>
    )
}

export default CreateTaskModal
