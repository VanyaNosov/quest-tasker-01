import { useRef, useState } from "react";
import Button from "../ui/Button";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { onClose } from "../../store/slices/modalSlice";
import { AiOutlineCloudUpload, AiOutlineFilePdf } from "react-icons/ai";
import axios from "axios";
import { serverUrl } from "../../helpers/constants";
import { RootState } from "../../store/store";
import toast from "react-hot-toast";
import { CgSpinner } from "react-icons/cg";
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { createFile } from "../../helpers/func/createItems/createFile";
import { useGetUserFilesQuery } from "../../store/services/getItems";

type FormValues = z.infer<typeof FileSchema>

const FileSchema = z.object({
    title: z.string().min(1, {
        message: "Your title should be more than 1 letter"
    }),
})

const CreateFileForm = () => {
    const [fileLoading, setIsFileLoading] = useState(false)
    const hiddenFileInput = useRef<null | HTMLInputElement>(null);
    const user = useAppSelector((state: RootState) => state.auth.user)
    const [file, setFile] = useState<string | null>(null)
    const dispatch = useAppDispatch();
    const userId = user?._id ? user._id : ""
    const { refetch } = useGetUserFilesQuery(userId)

    const { register, handleSubmit, reset,
        formState: { isSubmitting, isValid }
    } = useForm<FormValues>({
        resolver: zodResolver(FileSchema), defaultValues: {
            title: ""
        }
    })


    const handleClick = () => {
        hiddenFileInput?.current?.click();
    };

    const uploadHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {

        if (!e.target.files) return
        const file = e.target.files[0];
        const bodyFormData = new FormData();
        bodyFormData.append('file', file);
        try {
            setIsFileLoading(true)
            const { data } = await axios.post(`${serverUrl}/api/upload/pdf`, bodyFormData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    authorization: `Bearer ${user?.token}`
                }
            })

            setFile(data.Location)

            toast.success('File upload successfully!')
        } catch (err) {
            toast.error("Something went wrong!")
        } finally {
            setIsFileLoading(false)
        }
    }

    const onSubmit: SubmitHandler<FormValues> = async (values) => {
        if (!user || !file) {
            return
        }

        const data = {
            title: values.title,
            userId: user._id,
            file
        }

        try {
            const res = await createFile(data, user.token)

            if (res?.message === "File uploaded sucessfully") {
                reset();
                setFile(null)
                toast.success("File uploaded sucessfully!")
                refetch()
                dispatch(onClose())
            } else {
                toast.error("File creating was failed! Try again.")
            }
        } catch (err) {
            toast.error("Something went wrong")
            console.log(err);
        }
    }

    return (
        <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit(onSubmit)}>
            <div className="px-4 sm:px-7">
                <p className="text-content text-sm mb-2">
                    Create a title for your file
                </p>
                <input
                    type="text"
                    placeholder="File title"
                    className="w-full rounded-lg border-[2px] border-content/20 focus:border-primary px-3 py-2 sm:py-3"
                    {...register("title")}
                />
            </div>
            <input
                ref={hiddenFileInput}
                style={{ display: 'none' }}
                type='file'
                accept=".pdf"
                onChange={uploadHandler}
            />
            <div className="px-4 sm:px-7">
                {!file ? <Button
                    bgColor="bg-transparent"
                    color="text-black"
                    className="border-gray w-full border-dashed flex flex-col py-5 gap-2 hover:border-sky-500 items-center group"
                    onClick={handleClick}
                    type="button"
                    disabled={fileLoading}
                >
                    {fileLoading ? <CgSpinner className="animate-spin" size={30} /> : <>
                        <AiOutlineCloudUpload size={30} className="text-black group-hover:text-sky-500 transition" />
                        <p className="group-hover:text-sky-500 transition">Upload PDF File</p>
                    </>}
                </Button> : (
                    <>
                        <div
                            className="flex border border-red-400 py-2 px-3 items-center justify-between rounded-lg relative"
                        >
                            <div className="flex items-center gap-2">
                                <AiOutlineFilePdf className="text-red-400" size={26} />
                                <p className="text-red-400 text-sm sm:text-base md:text-lg">
                                    {file.split("/")[3].slice(0, 30)}
                                </p>
                            </div>
                        </div>
                        <div className="mt-3 text-right">
                            <Button
                                bgColor="bg-sky-500"
                                color="text-white"
                                disabled={isSubmitting}
                                className="border-none hover:bg-sky-600"
                                type="button"
                                onClick={() => {
                                    setFile(null)
                                    toast.success("File removed successfully")
                                }}
                            >
                                Remove
                            </Button>
                        </div>
                    </>
                )}
            </div>
            <div className="bg-gray px-4 sm:px-7 py-3 sm:py-5 rounded-br-lg rounded-bl-lg">
                <div className="flex items-center gap-5 justify-end">
                    <Button
                        bgColor="bg-transparent"
                        color="text-black"
                        className="border-none hover:bg-content/10 disabled:bg-sky-300"
                        onClick={() => {
                            dispatch(onClose())
                            setFile(null)
                        }}
                        type="button"
                    >
                        <p>Cancel</p>
                    </Button>
                    <Button
                        bgColor="bg-rose-500"
                        color="text-white"
                        className="border-none hover:bg-rose-600 disabled:bg-rose-300 disabled:cursor-not-allowed disabled:text-white"
                        disabled={!isValid || isSubmitting || !file || fileLoading}
                    >
                        {(isSubmitting || fileLoading) ? <div className="flex items-center justify-center">
                            <CgSpinner size={24} className="animate-spin text-white" />
                        </div> : "Create"}
                    </Button>
                </div>
            </div>
        </form>
    )
}

export default CreateFileForm
