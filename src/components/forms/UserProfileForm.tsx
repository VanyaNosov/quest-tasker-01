import { FC, useState } from 'react'
import Button from '../ui/Button'
import PhoneInput from 'react-phone-input-2'
import { User } from '../../../types'
import * as z from "zod"
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, SubmitHandler } from "react-hook-form"
import { updateUser } from '../../helpers/func/updateItems/updateUser'
import toast from 'react-hot-toast'
import { useAppDispatch } from '../../store/hooks'
import { onClose } from '../../store/slices/modalSlice'
import { CgSpinner } from 'react-icons/cg'

interface UserProfileFormProps {
    user: User | null
    status: string
}

type FormValues = z.infer<typeof UserProfileSchema>

const UserProfileSchema = z.object({
    firstName: z.string().min(2, {
        message: "Name should be more than 1 letter"
    }),
    lastName: z.string().min(2, {
        message: "Surname should be more than 1 letter"
    }),
    description: z.string(),
    profession: z.string().min(3, {
        message: "Your profession should be more than 2 letter"
    }),
    email: z.string().email(),
})

const UserProfileForm: FC<UserProfileFormProps> = ({ user, status }) => {
    const dispatch = useAppDispatch()
    const [phone, setPhone] = useState(user?.phone ? user.phone : "")


    const { register, handleSubmit,
        formState: { isSubmitting, isValid }
    } = useForm<FormValues>({
        resolver: zodResolver(UserProfileSchema), defaultValues: {
            description: user?.description,
            email: user?.email,
            firstName: user?.name.split(" ")[0],
            lastName: user?.name.split(" ")[1],
            profession: user?.profession
        }
    })

    const validPhone = phone?.length > 10

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        if (!user) {
            return
        }

        const values = {
            name: `${data.firstName} ${data.lastName}`,
            phone: phone ? phone : "",
            description: data.description,
            profession: data.profession,
            status
        }

        try {
            const res = await updateUser(values, user._id, user.token)

            if (res?.email) {
                toast.success("User updated successfully!")
                localStorage.setItem("userProfile", JSON.stringify(res))
                window.location.reload();
                dispatch(onClose())
            } else {
                toast.error("Something went wrong!")
            }
        } catch (err) {
            toast.error("Something went wrong")
        }


    }

    return (
        <form className="w-full sm:w-[590px] flex-1 flex flex-col" onSubmit={handleSubmit(onSubmit)}>
            <div className='flex-1'>
                <div className="flex flex-col sm:grid grid-cols-2 px-4 sm:px-8 gap-3 sm:gap-x-4 sm:gap-y-5 bg-white py-3 sm:py-6">
                    <div>
                        <p className="text-content mb-1">
                            Your Name
                        </p>
                        <input
                            type="text"
                            placeholder="Enter your name"
                            className="rounded-xl py-1.5 px-2.5 sm:py-2.5 sm:px-4 border-[2px] border-content/20 focus:border-primary w-full"
                            disabled={isSubmitting}
                            {...register("firstName")}
                        />
                    </div>
                    <div>
                        <p className="text-content mb-1">
                            Your Surname
                        </p>
                        <input
                            type="text"
                            placeholder="Enter your surname"
                            className="rounded-xl py-1.5 px-2.5 sm:py-2.5 sm:px-4 border-[2px] border-content/20 focus:border-primary w-full"
                            disabled={isSubmitting}
                            {...register("lastName")}
                        />
                    </div>
                    <div>
                        <p className="text-content mb-1">
                            Phone
                        </p>
                        <PhoneInput
                            country={'ua'}
                            value={phone}
                            onChange={(e) => setPhone(e)}
                            inputStyle={{
                                width: "100%",
                                borderWidth: "2px",
                                borderRadius: "0.75rem",
                                borderColor: "rgb(107 110 133 / 0.2)",
                                height: "48px",
                                fontSize: "16px"
                            }}
                            disabled={isSubmitting}
                        />
                    </div>
                    <div>
                        <p className="text-content mb-1">
                            E-mail
                        </p>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="rounded-xl py-1.5 px-2.5 sm:py-2.5 sm:px-4 border-[2px] border-content/20 focus:border-primary w-full"
                            disabled={isSubmitting}
                            {...register("email")}
                        />
                    </div>
                    <div>
                        <p className="text-content mb-1">
                            Your profession
                        </p>
                        <input
                            type="text"
                            placeholder="Enter your profession"
                            className="rounded-xl py-1.5 px-2.5 sm:py-2.5 sm:px-4 border-[2px] border-content/20 focus:border-primary w-full"
                            disabled={isSubmitting}
                            {...register("profession")}
                        />
                    </div>
                    <div className="col-span-2">
                        <p className="text-content mb-1">
                            Description
                        </p>
                        <textarea
                            placeholder="Add more details to your profile"
                            className="rounded-xl py-1.5 sm:py-2.5 h-32 px-2.5 sm:px-4 border-[2px] border-content/20 focus:border-primary w-full resize-none"
                            disabled={isSubmitting}
                            {...register("description")}
                        />
                    </div>
                </div>
            </div>
            <div className="px-4 sm:px-8 bg-gray py-3">
                <div className="relative group">
                    <Button
                        bgColor="bg-primary"
                        color="text-white"
                        type="submit"
                        className="col-span-2 w-full hover:bg-primary/80 rounded-lg disabled:bg-content/50"
                        disabled={isSubmitting || !isValid || !validPhone}
                    >
                        {(isSubmitting) ? <div className="flex items-center justify-center">
                            <CgSpinner size={24} className="animate-spin text-white" />
                        </div> : "Save chages"}
                    </Button>
                    {(!isValid || !validPhone) && <p className="text-xs opacity-0 group-hover:opacity-100 absolute transition duration-200 bottom-7 right-5 px-2 py-1 rounded-xl bg-red-500 text-white">
                        Please, check your data!
                    </p>}
                </div>
            </div>
        </form>
    )
}

export default UserProfileForm