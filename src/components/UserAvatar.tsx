import { FC } from 'react'
import { User } from '../../types'
import { getStatusColor } from '../helpers/getStatusColor'

interface UserAvatarProps {
    user: User | null
}

const UserAvatar: FC<UserAvatarProps> = ({ user }) => {
    const avatarText = user?.name[0]

    return <div className='flex items-center gap-2 cursor-pointer sm:p-2 rounded-lg transition sm:hover:bg-gray relative'>
        <div className={`w-3 h-3 ${getStatusColor(user?.status ? user.status : "Work")} absolute -right-0.5 -top-0.5 sm:right-1.5 sm:top-1.5 z-5 rounded-full border-[2px] border-white`} />
        <div className='w-8 h-8 bg-rose-400 flex items-center justify-center rounded-full'>
            <p className='text-white'>
                {avatarText}
            </p>
        </div>
    </div>
}

export default UserAvatar
