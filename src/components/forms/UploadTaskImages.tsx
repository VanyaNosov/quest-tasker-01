import { Dispatch, FC, SetStateAction, useRef } from 'react'
import toast from 'react-hot-toast'
import { BiTrash } from 'react-icons/bi'
import { PiPlus } from 'react-icons/pi'
import { serverUrl } from '../../helpers/constants'
import axios from 'axios'
import { User } from '../../../types'

interface UploadTaskImagesProps {
    images: string[]
    setImages: Dispatch<SetStateAction<string[]>>
    setImageLoading: Dispatch<SetStateAction<boolean>>
    user: User | null
}

const UploadTaskImages: FC<UploadTaskImagesProps> = ({
    images, setImages,
    setImageLoading, user
}) => {
    const hiddenFileInput = useRef<null | HTMLInputElement>(null);

    const deleteFileHandler = async (fileName: string) => {
        setImages(images.filter(x => x !== fileName))
        toast.success('Image Deleted successfully!');
    }

    const uploadHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {

        if (!e.target.files) return
        const file = e.target.files[0];
        const bodyFormData = new FormData();
        bodyFormData.append('file', file);
        try {
            setImageLoading(true)
            const { data } = await axios.post(`${serverUrl}/api/upload`, bodyFormData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    authorization: `Bearer ${user?.token}`
                }
            })
            setImages([...images, data.secure_url])
            toast.success('Image upload successfully!')
        } catch (err) {
            toast.error("Something went wrong!")
        } finally {
            setImageLoading(false)
        }
    }

    const handleClick = () => {
        hiddenFileInput?.current?.click();
    };

    return <div className='flex items-center gap-5 flex-wrap'>
        <input
            type="file"
            accept="image/jpeg, image/png, image/gif, image/webp, image/svg+xml"
            className='hidden'
            onChange={uploadHandler}
            ref={hiddenFileInput}
        />
        <button
            className='w-40 h-28 flex items-center justify-center border border-dashed border-content/70 rounded-lg hover:border-primary transition'
            type='button'
            onClick={handleClick}
        >
            <div className='flex flex-col items-center gap-1'>
                <PiPlus size={28} className="text-primary font-semibold" />
                <p className='text-center font-semibold'>
                    Upload Image
                </p>
            </div>
        </button>
        {images.map((image) => (
            <div className='w-40 h-28 relative rounded-lg' key={image}>
                <img
                    src={image}
                    alt="image"
                    className='w-full h-full rounded-lg'
                />
                <button
                    className='absolute -top-2 -right-2 hover:scale-105 transition'
                    type='button'
                    onClick={() => deleteFileHandler(image)}
                >
                    <BiTrash className="text-red-500" size={20} />
                </button>
            </div>
        ))}
    </div>
}

export default UploadTaskImages