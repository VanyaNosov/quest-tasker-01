import { useState, useEffect } from "react"
import { BiReset } from "react-icons/bi";
import { BsFillPlayFill, BsPauseFill } from "react-icons/bs";
import { RxResume } from "react-icons/rx";

const Stopwatch = () => {
    const [isActive, setIsActive] = useState(false);
    const [isPaused, setIsPaused] = useState(true);
    const [time, setTime] = useState(0);

    useEffect(() => {
        const storedTime = parseInt(localStorage.getItem('stopwatchTime') || '0');
        setTime(storedTime);

        let interval: undefined | number;

        if (isActive && !isPaused) {
            interval = setInterval(() => {
                setTime((prevTime) => prevTime + 1000);
            }, 1000);
        } else {
            clearInterval(interval);
        }

        return () => {
            clearInterval(interval);
        };

    }, [isActive, isPaused]);

    useEffect(() => {
        localStorage.setItem('stopwatchTime', time.toString());
    }, [time]);

    const handleStart = () => {
        setIsActive(true);
        setIsPaused(false);
    };

    const handlePauseResume = () => {
        setIsPaused(!isPaused);
        setIsActive(true)
    };

    const handleReset = () => {
        setIsActive(false);
        setTime(0);
        localStorage.removeItem('stopwatchTime');
    };

    return (
        <div className="flex items-center gap-1.5">
            <div className="flex items-center text-lg font-semibold text-primary">
                <span>
                    {("0" + Math.floor((time / 3600000) % 60)).slice(-2)}:
                </span>
                <span>
                    {("0" + Math.floor((time / 60000) % 60)).slice(-2)}:
                </span>
                <span>
                    {("0" + Math.floor((time / 1000) % 60)).slice(-2)}
                </span>
            </div>
            <div>
                {isActive || time > 0 ? (
                    <div className="flex items-center gap-2">
                        <div className="flex flex-col items-center group relative">
                            <button
                                onClick={handleReset}
                                className="w-8 h-8 flex items-center justify-center rounded-full bg-primary hover:scale-105 transition duration-300"
                            >
                                <BiReset size={20} className="text-white" />
                            </button>
                            <p className="text-content text-sm hidden group-hover:block absolute -top-[18px] -right-1/2">
                                Reset
                            </p>
                        </div>
                        <div className="flex flex-col items-center group relative">
                            <button
                                onClick={handlePauseResume}
                                className="w-8 h-8 flex items-center justify-center rounded-full bg-primary hover:scale-105 transition duration-300"
                            >
                                {isPaused
                                    ? <RxResume size={20} className="text-white" />
                                    : <BsPauseFill size={20} className="text-white" />}
                            </button>
                            <p className="text-content text-sm hidden group-hover:block absolute -top-[18px] -right-1/2">
                                {isPaused ? "Continue" : "Pause"}
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center group relative">
                        <button
                            onClick={handleStart}
                            className="w-8 h-8 flex items-center justify-center rounded-full bg-primary hover:scale-105 transition duration-300"
                        >
                            <BsFillPlayFill size={20} className="text-white" />
                        </button>
                        <p className="text-content text-sm hidden group-hover:block absolute -top-[18px] -right-1/2">
                            Start
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Stopwatch
