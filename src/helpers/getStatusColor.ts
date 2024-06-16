export const getStatusColor = (status: string) => {
    switch (status) {
        case "Work":
            return "bg-green-400"
        case "In vacation":
            return "bg-red-500"
        case "Rest":
            return "bg-yellow-400"
        case "Lowest":
            return "bg-blue-100"
        case "Medium":
            return "bg-sky-300"
        case "High":
            return "bg-rose-400"
        case "Highest":
            return "bg-red-500"
        case "Open":
            return "bg-sky-300"
        case "In progress":
            return "bg-sky-600"
        case "Done":
            return "bg-green-400"
        default:
            return "bg-sky-500"

    }
}