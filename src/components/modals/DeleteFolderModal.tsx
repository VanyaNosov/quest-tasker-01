import { useState } from 'react'
import { RxCross1 } from "react-icons/rx"
import Button from "../ui/Button"
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import { RootState } from "../../store/store"
import { onClose } from "../../store/slices/modalSlice"
import { useNavigate } from "react-router-dom"
import { useGetUserFoldersQuery } from "../../store/services/getItems"
import toast from "react-hot-toast"
import { deleteFolder } from "../../helpers/func/deleteItems/deleteFolder"
import { useModal } from "../../helpers/func/utils/modalUtils"
import { CgSpinner } from 'react-icons/cg'


const DeleteFolderModal = () => {
    const isOpen = useAppSelector((state: RootState) => state.modal.isDeleteFolderModalOpen)
    const user = useAppSelector((state: RootState) => state.auth.user)
    const id = useAppSelector((state: RootState) => state.modal.deleteFolderId)
    const dispatch = useAppDispatch();
    const userId = user?._id ? user._id : ""
    const { refetch } = useGetUserFoldersQuery(userId)
    const navigate = useNavigate();
    const [deleteFolderLoading, setIsDeleteFolderLoading] = useState(false)

    const { handleModalClick } = useModal()


    const deleteFolderWithTasks = async (id: string) => {
        if (!user) {
            return
        }

        setIsDeleteFolderLoading(true)

        try {
            const res = await deleteFolder(id, user.token, user._id)
            if (res?.message === "Folder deleted successfully") {
                toast.success(res?.message)
                refetch();
                navigate("/task-manager")
                dispatch(onClose())
            } else {
                toast.error("Something went wrong! Try again.")
            }

        } catch (err) {
            toast.error("Something went wrong")
            console.log(err);
        } finally {
            setIsDeleteFolderLoading(false)
        }
    }

    return (
        <div
            className={`${isOpen ? "block" : "hidden"} h-[100dvh] absolute top-0 left-0 w-full flex items-center justify-center bg-black/50 z-[45]`}
            onClick={handleModalClick}
        >
            <div className='bg-white rounded-lg pt-7 sm:pt-5 relative w-[80dvw] sm:max-w-md'>
                <button
                    className="absolute top-2 right-2 transition hover:scale-125"
                    onClick={() => dispatch(onClose())}
                >
                    <RxCross1 size={16} className="text-primary" />
                </button>
                <h2 className="text-lg leading-5 sm:leading-6 sm:text-xl text-primary font-bold mb-3 px-4 sm:px-7">
                    Are you sure you want to delete this folder?
                </h2>
                <p className="text-content mb-4 px-4 sm:px-7 text-sm sm:text-base">
                    Along with this folder, you will lose all tasks that were created in it without the possibility of restoring them!
                </p>
                <div className="bg-gray px-5 sm:px-7 py-3 sm:py-5 rounded-br-lg rounded-bl-lg">
                    <div className="flex items-center gap-5 justify-end">
                        <Button
                            bgColor="bg-transparent"
                            color="text-primary"
                            className="hover:bg-content/20 px-2 py-1 border-none"
                            onClick={() => dispatch(onClose())}
                        >
                            Cancel
                        </Button>
                        <Button
                            bgColor="bg-rose-500"
                            color="text-white"
                            className="border-none hover:bg-rose-400"
                            onClick={() => deleteFolderWithTasks(id)}
                        >
                            {deleteFolderLoading ? <div className="flex items-center justify-center">
                                <CgSpinner size={24} className="animate-spin text-white" />
                            </div> : "Confirm"}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DeleteFolderModal
