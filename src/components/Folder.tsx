import { FC } from 'react'
import { Link } from 'react-router-dom'
import { FolderType } from '../../types'
import { AiFillFolderOpen } from 'react-icons/ai'
import { useAppSelector } from '../store/hooks'
import { RootState } from '../store/store'

interface FolderProps {
    folder: FolderType
}

const Folder: FC<FolderProps> = ({ folder }) => {
    const user = useAppSelector((state: RootState) => state.auth.user)

    const doneTasks = folder.tasks.filter((task) => task.status === "Done")

    const tasksInProgress = folder.tasks.filter((task) => task.status === "In progress")

    return (
        <Link
            to={folder._id}
            className='w-60 rounded-xl hover:w-64 duration-200 h-[170px]'
        >
            <div
                className='pt-6 px-3 pb-4 flex items-center gap-2 rounded-t-xl'
                style={{ background: folder.color }}
            >
                <AiFillFolderOpen size={40} className="text-primary" />
                <div>
                    <h4 className='text-lg font-bold text-primary leading-5'>
                        {folder.title.length > 16 ? `${folder.title.slice(0, 16)}...` : folder.title}
                    </h4>
                    <p className='text-content text-sm'>
                        {folder.tasks.length} tasks
                    </p>
                </div>
            </div>
            <div className='pt-3 px-3 pb-4 rounded-b-xl bg-white'>
                <div className='flex items-center gap-2 mb-2'>
                    <div className='w-7 h-7 flex items-center justify-center bg-primary text-white rounded-full'>
                        <p>{user?.name[0]}</p>
                    </div>
                    <p className='text-content'>
                        {folder.type}
                    </p>
                </div>
                <div className='flex items-center gap-2 justify-end text-white text-sm'>
                    <p className='bg-green-400 rounded-xl px-1'>
                        {doneTasks.length} done
                    </p>
                    <p className='bg-rose-400 rounded-xl px-1'>
                        {tasksInProgress.length} in progress
                    </p>
                </div>
            </div>
        </Link>
    )
}

export default Folder