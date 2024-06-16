import { FC } from 'react'
import { AiFillPlusCircle } from 'react-icons/ai'


interface EmptyDashboardStateProps {
    title: string
    onClick: () => void
    linkTitle: string
    descr: string
}

const EmptyDashboardState: FC<EmptyDashboardStateProps> = ({ onClick, linkTitle, title, descr }) => {
    return <div className='w-full flex flex-col items-center justify-center gap-2 px-5 my-5'>
        <p className='text-lg text-primary font-semibold'>
            {title}
        </p>
        <button onClick={onClick}
            className='flex items-center gap-2 hover:bg-content/10 border-none py-1 px-2 rounded-lg text-sm transition'
        >
            <AiFillPlusCircle size={20} className="text-primary" />
            <p>{linkTitle}</p>
        </button>
        <p className='text-content/70 text-center'>
        ({descr})
        </p>
    </div>
}

export default EmptyDashboardState