import { FC } from 'react'
import { FileType } from '../../types'
import { AiFillFilePdf, AiOutlineCloudUpload } from 'react-icons/ai'
import moment from 'moment'
import Button from './ui/Button'
import { FaTrash } from 'react-icons/fa'
import { useAppDispatch} from '../store/hooks'
import { setIsDeleteFileModalOpen } from '../store/slices/modalSlice'

interface FileItemProps {
    file: FileType,
    i: number
}

const FileItem: FC<FileItemProps> = ({ file, i }) => {
    const dispatch = useAppDispatch();

    
    return (
        <div
            className={`w-full border-b ${i === 0 && "border-t"} p-2 sm:p-4 border-content/70 flex items-center justify-between `}
        >
            <div className='flex items-center gap-2 basis-8/12'>
                <AiFillFilePdf size={26} className="text-primary" />
                <h6 className='text-primary font-semibold text-sm sm:text-base'>
                    {file.title.length > 40 ? `${file.title.slice(0, 37)}...` : file.title}
                </h6>
            </div>
            <p className='text-primary hidden sm:block basis-2/12'>
                {moment(file.createdAt).format('MMM Do')}
            </p>
            <div className='flex items-center gap-2 basis-2/12 justify-end'>
                <a
                    href={file.file}
                    referrerPolicy='no-referrer'
                    color="text-white"
                    className="bg-sky-500 text-white border-none px-3 rounded-md py-2 flex gap-2 transition hover:bg-sky-600 items-center disabled:bg-sky-300 disabled:text-white"
                    type="button"
                >
                    <AiOutlineCloudUpload className="text-white text-base sm:text-xl" />
                </a>
                <Button
                    bgColor="bg-rose-500"
                    color="text-white"
                    className="border-none hover:bg-rose-600 disabled:bg-rose-300 disabled:cursor-not-allowed disabled:text-white"
                    onClick={() => dispatch(setIsDeleteFileModalOpen({isOpen: true, fileId: file._id}))}
                >
                    <FaTrash className="text-white text-base sm:text-xl" />
                </Button>
            </div>
        </div>
    )
}

export default FileItem