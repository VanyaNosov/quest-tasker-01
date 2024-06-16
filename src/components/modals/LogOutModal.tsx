import { RxCross1 } from "react-icons/rx"
import Button from "../ui/Button";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { RootState } from "../../store/store";
import { onClose } from "../../store/slices/modalSlice";
import { logOut } from "../../store/slices/authSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useModal } from "../../helpers/func/utils/modalUtils";

const LogOutModal = () => {
    const isOpen = useAppSelector((state: RootState) => state.modal.isLogoutModalOpen);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { handleModalClick } = useModal()

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
                    Are you sure you want to log out?
                </h2>
                <p className="text-content mb-4 px-4 sm:px-7 text-sm sm:text-base">
                    Don't worry, when you log out of your account, all your data will be saved. You will be able to log back into your account!
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
                            onClick={() => {
                                dispatch(logOut())
                                navigate("/login")
                                dispatch(onClose())
                                toast.success("You are logout successfully!")
                                localStorage.removeItem('stopwatchTime');
                            }}
                        >
                            Confirm
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LogOutModal
