import { Dispatch, SetStateAction } from "react"
import { BiSolidDownArrow } from "react-icons/bi"

interface TableHeaderProps {
    setIsDesc: Dispatch<SetStateAction<boolean>>
    setFilterMethod: Dispatch<SetStateAction<string>>
    isDesc: boolean
}


const TableHeader = ({ setFilterMethod, setIsDesc, isDesc }: TableHeaderProps) => {
    return (
        <div className="flex items-center px-3 py-2">
            <div className='basis-[90%] sm:basis-[60%] xl:basis-5/12 text-content/70'>
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
            <div className='items-center flex gap-2 basis-[10%] sm:basis-[20%] xl:basis-2/12 text-content/70'>
                <button className="w-fit items-center flex gap-2 group"
                    onClick={() => {
                        setFilterMethod("Status")
                        setIsDesc(!isDesc)
                    }}
                >
                    <p className="group-hover:text-primary transition">Status</p>
                    <BiSolidDownArrow size={14} className="text-content/70 group-hover:text-primary transition" />
                </button>
            </div>
            <div className='items-center gap-2 hidden xl:flex basis-2/12 text-content/70'>
                <button className="w-fit items-center flex gap-2 group"
                    onClick={() => {
                        setFilterMethod("Priority")
                        setIsDesc(!isDesc)
                    }}
                >
                    <p className="group-hover:text-primary transition">Priority</p>
                    <BiSolidDownArrow size={14} className="text-content/70 group-hover:text-primary transition" />
                </button>
            </div>
            <div className='items-center gap-2 hidden sm:flex justify-end xl:justify-start basis-[20%] xl:basis-2/12 text-content/70'>
                <button className="w-fit items-center flex gap-2 group"
                    onClick={() => {
                        setFilterMethod("Due date")
                        setIsDesc(!isDesc)
                    }}
                >
                    <p className="group-hover:text-primary transition">Due date</p>
                    <BiSolidDownArrow size={14} className="text-content/70 group-hover:text-primary transition" />
                </button>
            </div>
            <p className='hidden xl:block text-right text-content/70 basis-1/12'>
                Actions
            </p>
        </div>
    )
}

export default TableHeader
