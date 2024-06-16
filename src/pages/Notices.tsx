import { AiFillPlusCircle } from 'react-icons/ai'
import Button from '../components/ui/Button'
import EmptyState from '../components/EmptyState';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setIsCreateNoticeModalOpen } from '../store/slices/modalSlice';
import { useGetUserNoticesQuery } from '../store/services/getItems';
import { RootState } from '../store/store';
import NoticeItem from '../components/NoticeItem';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setNotice } from '../store/slices/noticeSlice';
import TitleLoader from '../components/loaders/TitleLoader';
import ItemLoader from '../components/loaders/ItemLoader';
import { BiSolidDownArrow } from 'react-icons/bi';
import { sortUserNotices } from '../helpers/func/sortFunc/sortUserNotices';


const Notices = () => {
    const user = useAppSelector((state: RootState) => state.auth.user)
    const userId = user?._id ? user._id : ""
    const { data: notices, isLoading } = useGetUserNoticesQuery(userId)
    const [filterMethod, setFilterMethod] = useState("")
    const [isDesc, setIsDesc] = useState(true)

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            return navigate("/login")
        }
        if (!isLoading && notices) {
            dispatch(setNotice(notices[0]))
        }
    }, [dispatch, isLoading, navigate, notices, user])

    const sortedNotices = sortUserNotices(notices, isDesc, filterMethod)

    return (
        <>
            <div className='flex items-center justify-between mb-5 md:mb-8'>
                <h2 className='text-2xl md:text-3xl font-bold'>My Notices</h2>
                {notices?.length === 0 ? <Button
                    bgColor='bg-transparent'
                    color='text-primary'
                    className='flex items-center gap-2 hover:bg-content/10 border-none py-1 px-2 rounded-lg'
                    onClick={() => dispatch(setIsCreateNoticeModalOpen(true))}
                >
                    <AiFillPlusCircle size={24} className="text-primary" />
                    <p>New Notice</p>
                </Button> : null}
            </div>
            {(notices?.length !== 0) ? <div className='flex-1 flex flex-col'>
                <h5 className='text-content mb-3'>
                    {(isLoading || !notices) ? (<TitleLoader />) : `Notices (${notices.length})`}
                </h5>
                <div className='bg-white rounded-t-lg pt-3 flex-1'>
                    <div className='flex justify-between gap-4 items-center px-4 pb-3'>
                        {isLoading ? (<TitleLoader />) : <h4 className="text-base sm:text-lg font-semibold text-primary">
                            My Notices
                        </h4>}
                        <Button
                            bgColor='bg-transparent'
                            color='text-primary'
                            className='flex items-center gap-2 hover:bg-content/10 border-none py-1 px-2 rounded-lg text-sm'
                            onClick={() => dispatch(setIsCreateNoticeModalOpen(true))}
                        >
                            <AiFillPlusCircle size={20} className="text-primary" />
                            <p className='hidden sm:block'>New Notice</p>
                        </Button>
                    </div>
                    {(isLoading || !notices) ? (<div className='flex flex-col gap-5 px-4 mt-4'>
                        {[...new Array(5)].map((_, i) => (
                            <ItemLoader key={i} />
                        ))}
                    </div>) : <div className='flex flex-col'>
                        <div className="flex items-center px-5 py-3 justify-between">
                            <div>
                                <button className="w-fit items-center flex gap-2 group" onClick={() => {
                                    setFilterMethod("Title")
                                    setIsDesc(!isDesc)
                                }}
                                >
                                    <p className="group-hover:text-primary transition">Title</p>
                                    <BiSolidDownArrow size={14} className="text-content/70 group-hover:text-primary transition"
                                    />
                                </button>
                            </div>
                            <div>
                                <button className="w-fit items-center flex gap-2 group" onClick={() => {
                                    setFilterMethod("Created At")
                                    setIsDesc(!isDesc)
                                }}
                                >
                                    <p className="group-hover:text-primary transition">Created At</p>
                                    <BiSolidDownArrow size={14} className="text-content/70 group-hover:text-primary transition"
                                    />
                                </button>
                            </div>
                        </div>
                        {sortedNotices.map((notice, i) => (
                            <NoticeItem
                                key={notice._id}
                                notice={notice}
                                user={user}
                                i={i}
                            />
                        ))}
                    </div>}
                </div>
            </div> : <EmptyState
                title="You don't have any notes yet"
                buttonText='Create new notice'
                onClick={() => dispatch(setIsCreateNoticeModalOpen(true))}
            />}
        </>
    )
}

export default Notices
