import { useState } from "react";
import BudgetOverview from "../../features/budget/BudgetOverview";
import AddExpenseForm from "../../features/budget/AddExpenseForm";
import ExpenseList from "../../features/budget/ExpenseList";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";
import Spinner from "../../components/Spinner/LoadingSpinner"
import AddBudgetForm from "../../features/budget/AddBudgetForm";

const Budget = () => {
    // const [budget, setBudget] = useState(2000); // example fixed budget
    const [expenses, setExpenses] = useState([]);
    const queryClient = useQueryClient();
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const date = new Date();
    const month = date.toISOString().slice(0, 7);
    // const axiosPublic = useAxiosPublic();
    // console.log(month)
    const { mutateAsync: addBudgetAsync } = useMutation({
        mutationFn: async (data) => {
            const res = await axiosSecure.post("/budget", data);
            return res.data
        },
        onSuccess: (data) => {
            if (data.acknowledged) {
                toast.success("Budget added successfully")
                console.log(data)
            }
        },
        onError: async (err) => {
            toast.error("Something happened to the server")
            console.log(err)
        }
    });

    const { data: budget } = useQuery({
        queryKey: ['budget', month],
        queryFn: async () => {
            const res = await axiosSecure.get(`/budget?email=${user.email}&month=${month}`);
            console.log(res.data)
            return res.data
        }
    })

    const { data: myExpenses, isLoading: expensesLoding } = useQuery({
        queryKey: ["expense"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/expenses`);
            console.log(res.data)
            return res.data
        },
        refetchOnWindowFocus: false
    });

    const { mutateAsync: addExpensesAsync } = useMutation({
        mutationFn: async (data) => {
            const res = await axiosSecure.post("/expense", data);
            return res.data
        },
        onSuccess: (data) => {
            if (data.acknowledged) {
                toast.success("Expense added successfully");
                queryClient.invalidateQueries({ queryKey: ["expense"] })
            }
            console.log(data)
        }
    });

    const addExpense = (newExpense) => {
        setExpenses([...expenses, newExpense]);
    };

    const onSubmit = (data) => {
        const newData = {
            ...data,
            userEmail: user?.email
        }
        addExpensesAsync(newData)
    };

    const handleAddBudget = (data) => {
        const newData = {
            ...data,
            userEmail: user?.email
        };
        addBudgetAsync(newData)
    }

    if (expensesLoding) {
        return <Spinner />
    }

    return (
        <div className="w-full mx-auto p-4 space-y-6 flex justify-between">
            <div className="w-4/12">
                <AddBudgetForm month={month} handleAddBudget={handleAddBudget} />
            </div>
            {/* <div className="col-span-1"></div> */}
            {/* Budget Overview */}
            <div className="w-7/12">
                <BudgetOverview budget={budget} expenses={myExpenses} />

                {/* Add Expense Form */}
                <AddExpenseForm onAdd={addExpense} onSubmit={onSubmit} />

                {/* Expense List */}
                <ExpenseList expenses={myExpenses} />
            </div>
        </div>
    );
};

export default Budget;