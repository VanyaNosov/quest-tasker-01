import { Dispatch, FC, SetStateAction } from 'react'
import { BiSolidDownArrow } from 'react-icons/bi'
import { getStatusColor } from '../helpers/getStatusColor'

interface StatusPickerProps {
    isStatusOpen: boolean
    status: string
    statusArray: string[]
    setIsStatusOpen: Dispatch<SetStateAction<boolean>>
    setStatus: Dispatch<SetStateAction<string>>
}

const StatusPicker: FC<StatusPickerProps> = ({ isStatusOpen, status, statusArray, setIsStatusOpen, setStatus}) => {
  
    return (
        <div className="relative">
            <button
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => setIsStatusOpen(!isStatusOpen)}
                type='button'
            >
                <p className={`w-3 h-3 rounded-full ${getStatusColor(status)}`} />
                <p className="font-semibold text-primary">{status}</p>
                <BiSolidDownArrow
                    size={10}
                    className={`${isStatusOpen ? "rotate-0" : "rotate-180"}text-primary`}
                />
            </button>
            <div className={`${isStatusOpen ? "block" : "hidden"} py-2 bg-white drop-shadow-md rounded-md left-0 absolute top-8 flex flex-col`}>
                {statusArray.map((status) => (
                    <button
                    type='button'
                        key={status}
                        className="text-primary px-5 py-2 hover:bg-gray transition text-left flex items-center gap-2"
                        onClick={() => {
                            setStatus(status)
                            setIsStatusOpen(false)
                        }}>
                        <p className={`w-3 h-3 rounded-full ${getStatusColor(status)}`} />
                        <p className='whitespace-nowrap'>{status}</p>
                    </button>
                ))}
            </div>
        </div>
    )
}

export default StatusPicker