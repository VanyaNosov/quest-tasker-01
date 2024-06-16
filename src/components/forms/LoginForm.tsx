import { useEffect, useState } from "react"
import Button from "../ui/Button"
import {PiEyeClosedBold, PiEyeBold} from "react-icons/pi"
import { useNavigate } from "react-router-dom"
import {useForm, SubmitHandler} from "react-hook-form"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import { RootState } from "../../store/store"
import toast from "react-hot-toast"
import { signIn } from "../../helpers/auth"
import { CgSpinner } from "react-icons/cg"

const SignUpSchema = z.object({
    password: z.string().min(5, {
        message: "Password must be more than 5 letter"
    }),
    email: z.string().email(),
})

type FormValues = z.infer<typeof SignUpSchema>

const LoginForm = () => {
    const user = useAppSelector((state: RootState) => state.auth.user)

    const [isVisible, setIsVisible] = useState<boolean>(false)
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const { register, handleSubmit, reset,
        formState: { isSubmitting, isValid }
    } = useForm<FormValues>({ resolver: zodResolver(SignUpSchema) })

    const onClick = () => {
        setIsVisible(!isVisible)
    }

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        const values = {
            password: data.password,
            email: data.email,
        }
        try {
            const res = await dispatch(signIn(values))

            if (res.payload?.email) {
                toast.success("Login was successfully!")
                navigate("/dashboard")
                reset()
            } else {
                toast.error("Something went wrong! Try again.")
            }

        } catch (err) {
            toast.error("Something went wrong!")
        }
    }

    useEffect(() => {
        if(user?.email) {
            return navigate("/")
        }
    }, [navigate, user?.email])

    return (
        <div className="bg-white px-5 md:px-12 py-4 md:py-10 drop-shadow-sm rounded-lg flex flex-col items-center w-fit">
            <h3 className="text-center text-2xl md:text-3xl font-semibold mb-2">
                Welcome back!
            </h3>
            <p className="text-content text-center text-sm mb-5 sm:mb-10 md:mb-16">
                Please, enter your e-mail or phone number to login
            </p>
            <form className="w-full sm:w-[480px] mx-auto" onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-5">
                    <p className="text-content text-sm mb-2">
                        Email
                    </p>
                    <input 
                    type="email" 
                    placeholder="Enter your email"
                    className="w-full rounded-lg border-[2px] border-content/20 focus:border-primary px-2 py-1 md:px-4 md:py-2"
                    {...register("email")}
                    />
                </div>
                <div className="mb-7">
                    <p className="text-content text-sm mb-2">
                        Password
                    </p>
                    <div className="relative">
                    <input 
                    type={isVisible ? "text" : "password"} 
                    placeholder="Enter your password"
                    className="w-full rounded-lg border-[2px] border-content/20 focus:border-primary px-2 py-1 md:px-4 md:py-2"
                    {...register("password")}
                    />
                    <button 
                    onClick={onClick} 
                    className="absolute right-5 top-[7px] md:top-[14px] text-[20px] transition hover:scale-110"
                    type="button"
                    >
                        {!isVisible ? <PiEyeClosedBold/> : <PiEyeBold/>}
                    </button>
                    </div>
                </div>
                <div className="relative group">
                    <Button
                        bgColor="bg-primary"
                        color="text-white"
                        disabled={isSubmitting || !isValid}
                        type="submit"
                        className="w-full rounded-lg hover:bg-primary/90 active:bg-primary/90"
                    >
                       {(isSubmitting) ? <div className="flex items-center justify-center">
                            <CgSpinner size={24} className="animate-spin text-white" />
                        </div> : "Sign in"}
                    </Button>
                    {!isValid && <p className="text-xs opacity-0 group-hover:opacity-100 absolute transition duration-200 bottom-7 right-5 px-2 py-1 rounded-xl bg-red-500 text-white">
                        Please, check your data!
                    </p>}
                </div>
            </form>
        </div>
    )
}

export default LoginForm
