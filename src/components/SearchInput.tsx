import { useState } from 'react'
import { BsSearch } from 'react-icons/bs'
import { useGetSearchedItemsQuery } from '../store/services/getItems'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { RootState } from '../store/store'
import { getStatusColor } from '../helpers/getStatusColor'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'
import { AiFillFilePdf, AiFillFolder, AiOutlineCloudUpload } from 'react-icons/ai'
import { BiNotepad } from 'react-icons/bi'
import { setNotice } from '../store/slices/noticeSlice'
import { setIsNoticeModalOpen, setIsTaskModalOpen } from '../store/slices/modalSlice'
import { setTask } from '../store/slices/taskSlice'
import TitleLoader from './loaders/TitleLoader'


const SearchInput = () => {
    const user = useAppSelector((state: RootState) => state.auth.user)
    const [searchTerm, setSearchTerm] = useState("")
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const userId = user?._id ? user._id : ""

    const { data, isLoading } = useGetSearchedItemsQuery({ userId, searchTerm })

    return (
        <div className="flex items-center relative w-full sm:w-[400px] xl:w-[500px]">
            <BsSearch className="text-primary absolute left-3 top-[14px] text-lg" />
            <input
                type='text'
                placeholder='Search...'
                className='py-3 pl-12 pr-20 border-none rounded-t-xl bg-gray focus:border-primary w-full'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
                className='-ml-16 text-primary font-semibold transition hover:scale-110 disabled:cursor-not-allowed disabled:text-content/70 disabled:hover:scale-100'
                onClick={() => setSearchTerm("")}
                disabled={!searchTerm}
            >
                Clear
            </button>
            {(isLoading && searchTerm.length > 0 && !data)? (<div className='w-full sm:w-[400px] px-3 xl:w-[500px] max-h-[50dvh] overflow-y-auto scrollbar-w-2 scrollbar-track-yellow-lighter scrollbar-thumb-yellow scrollbar-thumb-rounded absolute top-12 left-0 bg-white rounded-b-md border-t border-content/20 pt-4 pb-1 drop-shadow-sm flex flex-col gap-2'>
                {[...new Array(5)].map((_, i) => (
                    <TitleLoader key={i}/>
                ))}
            </div>) 
            : (searchTerm.length > 0 && data) ? <div className='w-full sm:w-[400px] xl:w-[500px] max-h-[50dvh] overflow-y-auto scrollbar-w-2 scrollbar-track-yellow-lighter scrollbar-thumb-yellow scrollbar-thumb-rounded absolute top-12 left-0 bg-white rounded-b-md border-t border-content/20 pt-4 pb-1 drop-shadow-sm'>
                <h2 className='text-content/70 mb-2 px-3'>
                    Tasks ({data.tasks.length})
                </h2>
                <div className='flex flex-col mb-3'>
                    {data.tasks.map((task) => (
                        <button
                            className='px-3 py-1.5 hover:bg-gray transition flex items-center justify-between' key={task._id}
                            onClick={() => {
                                setSearchTerm("")
                                dispatch(setTask(task))
                                dispatch(setIsTaskModalOpen(true))
                            }}
                        >
                            <div className='flex items-center gap-2'>
                                <div
                                    className={`${getStatusColor(task.status)} w-4 h-4 rounded-full`}
                                />
                                <p className='text-primary text-sm sm:text-base'>
                                    {task.title.length > 20 ? `${task.title.slice(0, 17)}...` : task.title}
                                </p>
                            </div>
                            <p className='text-primary font-semibold text-sm leading-4 hidden sm:block'>
                                {moment(task.dueDate).format("MMM Do")}
                            </p>
                        </button>
                    ))}
                </div>
                <h2 className='text-content/70 mb-2 px-3'>
                    Folders ({data.folders.length})
                </h2>
                <div className='flex flex-col mb-3'>
                    {data.folders.map((folder) => (
                        <button
                            className='px-3 py-1.5 hover:bg-gray transition flex items-center justify-between' key={folder._id}
                            type='button'
                            onClick={() => {
                                setSearchTerm("")
                                navigate(`/task-manager/${folder._id}`)
                            }}
                        >
                            <div className='flex items-center gap-2'>
                                <AiFillFolder size={18} color={folder.color} />
                                <p className='text-primary text-sm sm:text-base'>
                                    {folder.title.length > 20 ? `${folder.title.slice(0, 17)}...` : folder.title}
                                </p>
                            </div>
                            <p className='text-content/70 font-semibold text-sm leading-4'>
                                {folder.type}
                            </p>
                        </button>
                    ))}
                </div>
                <h2 className='text-content/70 mb-2 px-3'>
                    Notices ({data.notices.length})
                </h2>
                <div className='flex flex-col mb-3'>
                    {data.notices.map((notice) => (
                        <button
                            className='px-3 py-1.5 hover:bg-gray transition flex items-center gap-3' key={notice._id}
                            type='button'
                            onClick={() => {
                                setSearchTerm("")
                                dispatch(setNotice(notice))
                                dispatch(setIsNoticeModalOpen(true))
                            }}
                        >
                            <BiNotepad className="text-primary" size={18} />
                            <p className='text-primary text-sm sm:text-base'>
                                {notice.title.length > 20 ? `${notice.title.slice(0, 17)}...` : notice.title}
                            </p>
                        </button>
                    ))}
                </div>
                <h2 className='text-content/70 mb-2 px-3'>
                    Files ({data.files.length})
                </h2>
                <div className='flex flex-col mb-3'>
                    {data.files.map((file) => (
                        <div
                            className='px-3 py-1.5 flex items-center justify-between gap-3 border-b border-content/20' key={file._id}
                        >
                            <div className='flex items-center gap-2'>
                                <AiFillFilePdf className="text-red-400" size={18} />
                                <p className='text-red-400 text-sm sm:text-base'>
                                    {file.title.length > 20 ? `${file.title.slice(0, 17)}...` : file.title}
                                </p>
                            </div>
                            <a
                                href={file.file}
                                referrerPolicy='no-referrer'
                                color="text-white"
                                className="bg-sky-500 text-white border-none px-2 rounded-md py-1 flex gap-2 hover:bg-sky-600 items-center disabled:bg-sky-300 disabled:text-white"
                                type="button"
                            >
                                <AiOutlineCloudUpload size={20} className="text-white" />
                            </a>
                        </div>
                    ))}
                </div>
            </div> : null}
        </div>
    )
}

export default SearchInput
