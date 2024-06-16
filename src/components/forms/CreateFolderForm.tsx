import { useState } from "react"
import { AiFillFolder, AiOutlineCheck } from "react-icons/ai"
import Button from "../ui/Button"
import { colors, folderTypes } from "../../helpers/constants"
import * as z from "zod"
import { useForm, SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import { RootState } from "../../store/store"
import toast from "react-hot-toast"
import { createFolder } from "../../helpers/func/createItems/createFolder"
import { onClose } from "../../store/slices/modalSlice"
import { useGetUserFoldersQuery } from "../../store/services/getItems"
import { CgSpinner } from "react-icons/cg"

const FolderSchema = z.object({
    title: z.string().min(2, {
        message: "Name must be more than 1 letter"
    }).max(30, {
        message: "This name too large"
    }),
})

type FormValues = z.infer<typeof FolderSchema>

const CreateFolderForm = () => {
    const user = useAppSelector((state: RootState) => state.auth.user)
    const [activeColor, setActiveColor] = useState<string>(colors[0])
    const [activeType, setActiveType] = useState<string>(folderTypes[0].name)
    const dispatch = useAppDispatch()
    const userId = user?._id ? user._id : ""
    const { refetch } = useGetUserFoldersQuery(userId)

    const { register, handleSubmit, reset,
        formState: { isSubmitting, isValid }
    } = useForm<FormValues>({
        resolver: zodResolver(FolderSchema), defaultValues: {
            title: ""
        }
    })

    const onSubmit: SubmitHandler<FormValues> = async (values) => {
        if (!user?.email) {
            return
        }

        const data = {
            title: values.title,
            userId: user._id,
            type: activeType,
            color: activeColor,
        }

        try {
            const res = await createFolder(data, user.token)

            if (res?.message === "Folder was created sucessfully") {
                reset()
                refetch()
                setActiveColor(colors[0])
                setActiveType(folderTypes[0].name)
                toast.success("Folder was created sucessfully!")
                dispatch(onClose())
            } else {
                toast.error("Folder creating was failed!  Try again.")
            }
        } catch (err) {
            console.log(err);
            toast.error("Something went wrong!")
        }
    }

    return (
        <form className="w-full flex flex-col flex-1" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex-1">
                <div className="flex items-center sm:gap-2 px-4 sm:px-8 mb-5 sm:mb-8 flex-1">
                    <div
                        className="w-10 h-10 min-w-[40px] sm:min-w-[48px] sm:w-12 sm:h-12 rounded-xl flex items-center justify-center"
                        style={{ background: activeColor }}
                    >
                        <AiFillFolder size={26} className="text-primary" />
                    </div>
                    <input
                        type="text"
                        placeholder="Enter folder name..."
                        className="text-xl sm:text-2xl bg-transparent border-none focus:outline-none p-2 w-full"
                        {...register("title")}
                    />
                </div>
                <div className="p-4 sm:p-8 bg-white pb-16">
                    <h5 className="text-primary font-semibold mb-4">
                        Choose a color
                    </h5>
                    <div className="flex flex-wrap items-center gap-2 text-rose mb-5 sm:mb-10">
                        {colors.map((color) => (
                            <button
                                key={color}
                                className={`rounded-full min-w-[40px] w-10 h-10 ${activeColor === color && "border-[1.5px] border-primary"} relative hover:scale-110 duration-200`}
                                style={{ background: color }}
                                onClick={() => setActiveColor(color)}
                                type="button"
                            >
                                {activeColor === color ? <AiOutlineCheck className="text-primary absolute top-3 left-3" /> : ""}
                            </button>
                        ))}
                    </div>
                    <h5 className="text-primary font-semibold mb-4">
                        Choose a goal
                    </h5>
                    <div className="flex flex-wrap sm:flex-nowrap items-center gap-3">
                        {folderTypes.map((type) => (
                            <button
                                key={type.name}
                                className="w-32 min-w-[128px] sm:min-w-[144px] sm:w-36 group relative"
                                onClick={() => setActiveType(type.name)}
                                type="button"
                            >
                                {activeType === type.name
                                    ? <AiOutlineCheck className="text-primary absolute top-2 right-3 text-lg" />
                                    : ""
                                }
                                <div className={`w-full mb-3 flex items-center justify-center p-5 rounded-xl border ${type.name === activeType ? "border-primary" : "border-content/20"} group-hover:border-primary duration-200`}>
                                    {type.icon}
                                </div>
                                <p className="text-primary font-semibold mb-1">
                                    {type.name}
                                </p>
                                <p className="text-content text-sm hidden sm:block">
                                    {type.descr}
                                </p>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
            <div className="px-4 sm:px-8 pt-3 pb-6">
                <Button
                    className="w-full rounded-xl hover:bg-primary/80 disabled:bg-content/20 disabled:text-white"
                    bgColor="bg-primary"
                    color="text-white"
                    type="submit"
                    disabled={isSubmitting || !isValid}
                >
                    {isSubmitting ? <div className="flex items-center justify-center">
                        <CgSpinner size={24} className="animate-spin text-white" />
                    </div> : "Create Folder"}
                </Button>
            </div>
        </form>
    )
}

export default CreateFolderForm
