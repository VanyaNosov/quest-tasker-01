import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PiEyeClosedBold, PiEyeBold } from "react-icons/pi"
import Button from "../ui/Button";
import { useForm, SubmitHandler } from "react-hook-form";
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import PhoneInput from 'react-phone-input-2'
import toast from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { RootState } from "../../store/store";
import { signUp } from "../../helpers/auth";
import { CgSpinner } from "react-icons/cg";

const SignUpSchema = z.object({
    firstName: z.string().min(2, {
        message: "Name must be more than 1 letter"
    }),
    lastName: z.string().min(2, {
        message: "Surname must be more than 1 letter"
    }),
    password: z.string().min(5, {
        message: "Password must be more than 5 letter"
    }),
    email: z.string().email(),
})

type FormValues = z.infer<typeof SignUpSchema>

const RegisterForm = () => {
    const { user } = useAppSelector((state: RootState) => state.auth)
    const [isVisible, setIsVisible] = useState<boolean>(false)
    const navigate = useNavigate();
    const [phone, setPhone] = useState<string>("")
    const dispatch = useAppDispatch();

    const validPhone = phone.length < 10

    const { register, handleSubmit, reset,
        formState: { isSubmitting, isValid }
    } = useForm<FormValues>({ resolver: zodResolver(SignUpSchema) })

    const onSubmit: SubmitHandler<FormValues> = async (data) => {

        if (validPhone) {
            toast.error("Please, check your phone number")
            return
        }

        const values = {
            password: data.password,
            email: data.email,
            name: `${data.firstName} ${data.lastName}`,
            phone
        }
        try {
            const res = await dispatch(signUp(values))

            if (res.payload?.email) {
                toast.success("Registration was successfully!")
                navigate("/dashboard")
                reset()
            } else {
                toast.error("Something went wrong! Try again.")
            }

        } catch (err) {
            toast.error("Something went wrong!")
        }
    }

    const onClick = () => {
        setIsVisible(!isVisible)
    }

    useEffect(() => {
        if (user?.email) {
            return navigate("/")
        }
    }, [navigate, user?.email])

    return (
        <div className="bg-white px-5 md:px-12 py-4 md:py-10 drop-shadow-sm rounded-lg flex flex-col items-center">
            <h3 className="text-center text-2xl md:text-3xl font-semibold mb-7">
                Registration
            </h3>
            <form className="w-full sm:w-[480px] mx-auto" onSubmit={handleSubmit(onSubmit)}>
                <div className="flex items-center gap-4">
                    <div className="mb-5">
                        <p className="text-content text-sm mb-2">
                            Your name
                        </p>
                        <input
                            type="text"
                            placeholder="Name"
                            className="w-full rounded-lg border-[2px] border-content/20 focus:border-primary px-2 py-1 md:px-4 md:py-2"
                            {...register("firstName")}
                        />
                    </div>
                    <div className="mb-5">
                        <p className="text-content text-sm mb-2">
                            Your surname
                        </p>
                        <input
                            type="text"
                            placeholder="Surname"
                            className="w-full rounded-lg border-[2px] border-content/20 focus:border-primary px-2 py-1 md:px-4 md:py-2"
                            {...register("lastName")}
                        />
                    </div>
                </div>
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
                <div className="mb-5">
                    <p className="text-content text-sm mb-2">
                        Phone number*
                    </p>
                    <PhoneInput
                        country={'ua'}
                        value={phone}
                        onChange={(e) => setPhone(e)}
                        inputStyle={{
                            width: "100%",
                            borderWidth: "2px",
                            borderRadius: "0.5rem",
                            borderColor: "rgb(107 110 133 / 0.2)",
                            height: "51px",
                            fontSize: "16px",
                        }}
                    />
                </div>
                <div className="mb-7">
                    <p className="text-content text-sm mb-2">
                        Password
                    </p>
                    <div className="relative">
                        <input
                            type={isVisible ? "text" : "password"}
                            placeholder="Create password"
                            className="w-full rounded-lg border-[2px] border-content/20 focus:border-primary px-2 py-1 md:px-4 md:py-2"
                            {...register("password")}
                        />
                        <button
                            onClick={onClick}
                            className="absolute right-5 top-[7px] md:top-[14px] text-[20px] transition hover:scale-110"
                            type="button"
                        >
                            {!isVisible ? <PiEyeClosedBold /> : <PiEyeBold />}
                        </button>
                    </div>
                </div>
                <div className="relative group">
                    <Button
                        bgColor="bg-primary"
                        color="text-white"
                        disabled={isSubmitting || !isValid || validPhone}
                        type="submit"
                        className="w-full rounded-lg hover:bg-primary/90 active:bg-primary/90"
                    >
                        {(isSubmitting) ? <div className="flex items-center justify-center">
                            <CgSpinner size={24} className="animate-spin text-white" />
                        </div> : "Registration"}
                    </Button>
                    {(!isValid || validPhone) && <p className="text-xs opacity-0 group-hover:opacity-100 absolute transition duration-200 bottom-7 right-5 px-2 py-1 rounded-xl bg-red-500 text-white">
                        Please, check your data!
                    </p>}
                </div>
            </form>
        </div>
    )
}

export default RegisterForm
