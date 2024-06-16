import { BsListTask } from "react-icons/bs"
import { MdAttachMoney, MdOutlineBusinessCenter } from "react-icons/md"

export const serverUrl = import.meta.env.VITE_SERVER_URL || "http://localhost:8888"

export const statusTaskArray = ["Open", "In progress", "Done"]

export const colors = ["#f4cd48", "#9ACFF0", "#FFBBBB", "#A5DDB8", "#C9C7EF", "#EFC7C7", "#A8E7EF", "#CBDDA5", "#FB7185"]

export const priorityArray = ["Highest", "High", "Medium", "Lowest"]

export const folderTypes = [
    {
        name: "Work",
        descr: "You can add work tasks to this folder.",
        icon: <MdOutlineBusinessCenter size={40} className="text-primary" />
    },
    {
        name: "Business",
        descr: "You can add trade tasks to this folder.",
        icon: <MdAttachMoney size={40} className="text-primary" />
    },
    {
        name: "Daily Activites",
        descr: "You can add daily taksk to this folder.",
        icon: <BsListTask size={40} className="text-primary" />
    },
]

export const statusOrder = {
    'Done': 1,
    'In progress': 2,
    'Open': 3,
} as {
    [key: string]: number;
};

export const priorityOrder = {
    "Highest": 1,
    "High": 2,
    "Medium": 3,
    "Lowest": 4
} as {
    [key: string]: number;
};
