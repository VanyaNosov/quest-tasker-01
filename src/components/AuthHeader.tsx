import { Link, useLocation, useNavigate } from "react-router-dom"
import Button from "./ui/Button"


const AuthHeader = () => {
    const navigate = useNavigate()
    const {pathname} = useLocation();

    const onClick = () => {
        if(pathname === "/login") {
            return navigate("/register")
        } else {
            return navigate("/login")
        }
    }

    return (
        <header className="flex max-w-7xl mx-auto justify-between items-center px-4 py-5 mb-2 lg:mb-10">
            <Link to="/" className="w-[150px] h-[30px]">
                <img
                    src="https://res.cloudinary.com/dxvrhfhtl/image/upload/v1698599582/vi3aswhz57s7u0ny0pee.png"
                    alt="logo"
                    className="h-full w-full object-contain"
                />
            </Link>
            <Button
            bgColor="bg-transparent"
            color="text-primary"
            onClick={onClick}
            className="px-8 text-sm hover:scale-105 active:scale-105 border-[1.5px] roudned-lg py-1"
            >
            {pathname === "/login" ? "Sign Up" : "Sign In"}
            </Button>
        </header>
    )
}

export default AuthHeader
