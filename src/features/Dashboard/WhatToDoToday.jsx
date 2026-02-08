import { useQuery } from "@tanstack/react-query";
import "../../hooks/useAxiosSecure"
import useAxiosSecure from "../../hooks/useAxiosSecure";
const WhatToDoToday = () => {
    const axiosSecure = useAxiosSecure();
    const { data } = useQuery({
        queryKey: ["dashboard", "today", "classes-tasks"],
        queryFn: async () => {
            const res = await axiosSecure.get("/dashboard/today");
            return res.data
        }
    });

    console.log(data)


    return (
        <div>

        </div>
    );
};

export default WhatToDoToday;