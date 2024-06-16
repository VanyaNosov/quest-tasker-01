import { Dispatch, FC, SetStateAction } from 'react'
import { User } from '../../types'
import { useAppDispatch } from '../store/hooks'
import { setIsLogoutModalOpen, setIsProfileModalOpen } from '../store/slices/modalSlice'
import { getStatusColor } from '../helpers/getStatusColor'
import { usePopup } from '../helpers/func/utils/popupUtils'


interface UserPopupProps {
    isVisible: boolean
    setIsVisible: Dispatch<SetStateAction<boolean>>
    user: User | null
}

const UserPopup: FC<UserPopupProps> = ({ isVisible, user, setIsVisible }) => {
    const userAvatar = `${user?.name.split(" ")[0][0]}${user?.name.split(" ")[1][0]}`
    const dispatch = useAppDispatch();

    const { popupRef } = usePopup(isVisible, setIsVisible);

    return (
        <div
            ref={popupRef}
            className={`${isVisible ? "block" : "hidden"} bg-white z-40 pb-3 w-[250px] drop-shadow-md rounded-md absolute right-0`}
        >
            <div className='flex items-center gap-2 p-3'>
                <div className='relative'>
                    <div className={`w-3 h-3 ${getStatusColor(user?.status ? user.status : "Work")} absolute -right-0.5 -top-0.5 z-5 rounded-full border border-white`} />
                    <div className='w-8 h-8 rounded-full flex items-center justify-center bg-[#030235]'>
                        <p className='text-white'>{userAvatar}</p>
                    </div>
                </div>
                <p className='text-[#030235]'>
                    {user?.name}
                </p>
            </div>
            <div className='flex flex-col gap-1'>
                <button
                    className='py-1.5 px-3 text-left transition hover:bg-gray text-[#030235] border-b border-gray'
                    onClick={() => {
                        dispatch(setIsProfileModalOpen(true))
                        setIsVisible(false)
                    }}
                >
                    My profile
                </button>
                <button
                    className='py-1.5 px-3 text-left transition hover:bg-gray text-[#030235] border-b border-gray'
                    onClick={() => {
                        dispatch(setIsLogoutModalOpen(true))
                        setIsVisible(false)
                    }}
                >
                    Sign out
                </button>
            </div>
        </div>
    )
}

export default UserPopup
