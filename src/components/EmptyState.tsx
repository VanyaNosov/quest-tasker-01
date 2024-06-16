import { FC } from 'react'
import Button from './ui/Button'
import { AiFillPlusCircle } from 'react-icons/ai'

interface EmptyStateProps {
    title: string
    onClick: () => void
    buttonText: string
}

const EmptyState: FC<EmptyStateProps> = ({ buttonText, onClick, title }) => {
    return (
        <div className='h-full w-full flex items-center justify-center pt-[5%]'>
            <div className='flex flex-col items-center'>
                <div className='w-[260px] h-[200px] md:w-[320px] md:h-[260px] mb-14'>
                    <img
                        src="https://res.cloudinary.com/dxvrhfhtl/image/upload/v1698599540/d0jlzcrqv7t66bavordb.png"
                        alt="empty img"
                        className='h-full w-full object-contain'
                    />
                </div>
                <p className='text-lg text-primary font-semibold mb-2'>
                    {title}
                </p>
                <Button
                    bgColor='bg-transparent'
                    color='text-primary'
                    className='flex items-center gap-2 hover:bg-content/10 border-none py-1 px-2 rounded-lg'
                    onClick={onClick}
                >
                    <AiFillPlusCircle size={24} className="text-primary" />
                    <p>{buttonText}</p>
                </Button>
            </div>
        </div>
    )
}

export default EmptyState