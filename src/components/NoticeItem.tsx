import { FC } from 'react'
import { Notice, User } from '../../types'
import moment from 'moment'
import { useAppDispatch } from '../store/hooks'
import { setNotice } from '../store/slices/noticeSlice'
import { setIsNoticeModalOpen } from '../store/slices/modalSlice'

interface NoticeItemProps {
    notice: Notice
    user: User | null,
    i: number
}

const NoticeItem: FC<NoticeItemProps> = ({ notice, user, i }) => {
    const dispatch = useAppDispatch();

    const onNoticeClick = () => {
        dispatch(setNotice(notice))
        dispatch(setIsNoticeModalOpen(true))
    }

    return <div className={`w-full border-b ${i === 0 && "border-t"} p-2 sm:p-4 border-content/70 flex items-center justify-between cursor-pointer transition-all hover:bg-content/10`}
        onClick={onNoticeClick}
    >
        <div className='flex items-center gap-2'>
            <div className='w-6 h-6 flex items-center justify-center bg-primary rounded-full text-white'>
                {user?.name[0]}
            </div>
            <h6 className='text-primary font-semibold text-sm sm:text-base'>
                {notice.title.length > 40 ? `${notice.title.slice(0, 37)}...` : notice.title}
            </h6>
        </div>
        <p className='text-content hidden sm:block'>
            {moment(notice.createdAt).format('LL')}
        </p>
    </div>
}

export default NoticeItem