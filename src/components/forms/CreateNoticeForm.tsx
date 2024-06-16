import toast from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import Button from "../ui/Button"
import axios from "axios";
import { serverUrl } from "../../helpers/constants";
import { useRef, useState } from "react";
import { RootState } from "../../store/store";
import { BsFillTrashFill } from "react-icons/bs"
import { AiOutlineCloudUpload } from "react-icons/ai";
import { useForm, SubmitHandler } from "react-hook-form"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { createNotice } from "../../helpers/func/createItems/createNotice";
import { onClose } from "../../store/slices/modalSlice";
import { useGetUserNoticesQuery } from "../../store/services/getItems";
import { CgSpinner } from "react-icons/cg";


type FormValues = z.infer<typeof NoticeSchema>

const NoticeSchema = z.object({
    description: z.string().min(1, {
        message: "Your description should be more than 1 letter"
    }),
    title: z.string().min(1, {
        message: "Your title should be more than 1 letter"
    }),
})



const CreateNoticeForm = () => {
    const dispatch = useAppDispatch()
    const user = useAppSelector((state: RootState) => state.auth.user)
    const [images, setImages] = useState<string[]>([]);
    const [imageLoading, setImageLoading] = useState<boolean>(false)
    const hiddenFileInput = useRef<null | HTMLInputElement>(null);
    const userId = user?._id ? user._id : ""
    const { refetch } = useGetUserNoticesQuery(userId)


    const { register, handleSubmit, reset,
        formState: { isSubmitting, isValid }
    } = useForm<FormValues>({
        resolver: zodResolver(NoticeSchema), defaultValues: {
            description: "",
            title: ""
        }
    })

    const handleClick = () => {
        hiddenFileInput?.current?.click();
    };

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

    const onSubmit: SubmitHandler<FormValues> = async (values) => {
        if (!user) {
            return
        }

        const data = {
            ...values,
            userId,
            images
        }

        try {
            const res = await createNotice(data, user.token)

            if (res?.message === "Notice was created sucessfully") {
                reset()
                setImages([])
                toast.success("Notice was created sucessfully!")
                dispatch(onClose())
                refetch();
            } else {
                toast.error("Notice creating was failed! Try again.")
            }

        } catch (err) {
            console.log(err);
            toast.error("Something went wrong")
        }
    }

    return (
        <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
            <div className="px-3 sm:px-7">
                <p className="text-content text-sm sm:text-base mb-2">
                    Create a title for your notice
                </p>
                <input
                    type="text"
                    placeholder="Notice title"
                    className="w-full rounded-lg border-[2px] border-content/20 focus:border-primary px-2 py-1.5 sm:px-4 sm:py-3"
                    {...register("title")}
                />
            </div>
            <input
                ref={hiddenFileInput}
                style={{ display: 'none' }}
                type='file'
                accept="image/jpeg, image/png, image/gif, image/webp, image/svg+xml"
                onChange={uploadHandler}
            />
            <div className="px-3 sm:px-7">
                <p className="text-content mb-1 text-sm sm:text-base">
                    Create a description for your notice
                </p>
                <textarea
                    placeholder="Add more details to your notice"
                    className="rounded-xl px-2 py-1.5 sm:py-2.5 h-40 sm:px-4 border-[2px] border-content/20 focus:border-primary w-full resize-none"
                    {...register("description")}
                />
            </div>
            <div className="flex gap-2 items-center px-3 sm:px-7 flex-wrap my-2">
                {images.map((x) => (
                    <div key={x} className="h-20 min-w-[80px] w-20 relative rounded-lg border border-content cursor-pointer">
                        <img
                            src={x}
                            alt="img"
                            className="w-full h-full rounded-lg object-contain"
                        />
                        <button type='button'
                            className="-top-2 -right-2 absolute hover:scale-125 transition"
                            onClick={() => deleteFileHandler(x)}>
                            <BsFillTrashFill fontSize={20} color="red" />
                        </button>
                    </div>
                ))}
            </div>
            <div className="bg-gray px-3 py-3 sm:px-7 sm:py-5 rounded-br-lg rounded-bl-lg">
                <div className="flex items-center gap-5 justify-end">
                    <Button
                        bgColor="bg-sky-500"
                        color="text-white"
                        className="border-none flex gap-2 hover:bg-sky-600 items-center disabled:bg-sky-300 disabled:text-white"
                        onClick={handleClick}
                        type="button"
                        disabled={isSubmitting || imageLoading}
                    >
                        <AiOutlineCloudUpload size={20} className="text-white" />
                        <p>Upload Images</p>
                    </Button>
                    <Button
                        bgColor="bg-rose-500"
                        color="text-white"
                        className="border-none hover:bg-rose-600 disabled:bg-rose-300 disabled:cursor-not-allowed disabled:text-white"
                        disabled={isSubmitting || !isValid || imageLoading}
                    >
                        {(isSubmitting || imageLoading) ? <div className="flex items-center justify-center">
                            <CgSpinner size={24} className="animate-spin text-white" />
                        </div> : "Create"}
                    </Button>
                </div>
            </div>
        </form>
    )
}

export default CreateNoticeForm
