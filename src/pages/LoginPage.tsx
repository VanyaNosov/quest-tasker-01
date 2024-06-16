import { Link } from "react-router-dom"
import AuthHeader from "../components/AuthHeader"
import LoginForm from "../components/forms/LoginForm"

const LoginPage = () => {
  return (
    <div className="bg-gray min-h-[100dvh] pb-16 scrollbar-w-2">
      <AuthHeader />
      <div className="flex flex-col lg:flex-row justify-between items-center gap-4 lg:gap-10 max-w-6xl mx-auto px-4">
        <div className="max-w-xl">
          <h1 className="text-primary font-bold text-2xl sm:tetx-3xl md:text-4xl mb-0 lg:mb-7">
            Connect yourself <br /> with <span className="text-secondary">QuestTasker</span>
          </h1>
          <p className="text-primary text-sm hidden lg:block">
            Have no account? <Link to="/register"
              className="font-semibold transition hover:text-primary/80">
              Sign Up
            </Link>
          </p>
          <div className="max-w-full h-[360px] mt-10 hidden lg:block">
            <img
              src="https://res.cloudinary.com/dxvrhfhtl/image/upload/v1698599491/vwjh8cy89dterzfluvyw.png"
              alt="login img"
              className="h-full w-full object-contain"
            />
          </div>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}

export default LoginPage
