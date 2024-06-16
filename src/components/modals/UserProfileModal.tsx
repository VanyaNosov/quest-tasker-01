import { useAppDispatch, useAppSelector } from "../../store/hooks"
import { onClose } from "../../store/slices/modalSlice"
import { RootState } from "../../store/store"
import { IoIosArrowBack } from "react-icons/io"
import { useState } from "react"
import UserProfileForm from "../forms/UserProfileForm"
import StatusPicker from "../StatusPicker"
import { useModal } from "../../helpers/func/utils/modalUtils"

const statusArray = ["Work", "In vacation", "Rest"]

const UserProfileModal = () => {
    const isOpen = useAppSelector((state: RootState) => state.modal.isProfileModalOpen)
    const dispatch = useAppDispatch();
    const user = useAppSelector((state: RootState) => state.auth.user)
    const [status, setStatus] = useState(user?.status ? user.status : "Work")
    const [isStatusOpen, setIsStatusOpen] = useState(false)

    const { handleModalClick } = useModal()

    if (!user?.email) {
        return null
    }

    return (
        <div
            onClick={handleModalClick}
            className={`${isOpen ? "right-0" : "-right-full"} h-[100vh] duration-300 fixed top-0 w-[100vw] flex justify-end bg-black/50 z-[45] overflow-y-auto overflow-x-hidden`}
        >
            <div className='bg-gray pt-5 relative flex flex-col w-[90dvw] sm:max-w-xl h-[100dvh] overflow-y-auto overflow-x-hidden scrollbar-w-2 scrollbar-track-yellow-lighter scrollbar-thumb-yellow scrollbar-thumb-rounded'>
                <div className="flex px-4 sm:px-8 items-center justify-between gap-10 mb-4 sm:mb-7">
                    <StatusPicker
                        status={status}
                        setStatus={setStatus}
                        isStatusOpen={isStatusOpen}
                        setIsStatusOpen={setIsStatusOpen}
                        statusArray={statusArray}
                    />
                    <button className="hover:scale-125 transition duration-200"
                        onClick={() => dispatch(onClose())}
                    >
                        <IoIosArrowBack size={20} className="text-primary" />
                    </button>
                </div>
                <div className="flex flex-col-reverse sm:flex-row justify-between gap-4 sm:gap-10 px-4 sm:px-8 mb-4">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-white text-xl">
                            <p>{user.name[0]}</p>
                        </div>
                        <div>
                            <h3 className="text-primary font-bold text-xl leading-6">
                                {user.name}
                            </h3>
                            <p className="text-content text-sm">
                                {user.profession}
                            </p>
                        </div>
                    </div>
                    <p className="text-content">
                        ID: {user._id.slice(0, 10)}
                    </p>
                </div>
                <h6 className="text-lg px-4 sm:px-8 font-semibold text-primary mb-3">
                    Personal Details
                </h6>
                <div className="flex-1 flex flex-col">
                    <UserProfileForm
                        user={user}
                        status={status}
                    />
                </div>
            </div>
        </div>
    )
}

export default UserProfileModal
