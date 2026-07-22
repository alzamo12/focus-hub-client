import { useState } from "react";
// import "../../../.."
const AddBudgetForm = ({ handleAddBudget, month }) => {

    const [formData, setFormData] = useState({
        name: "",
        amount: "",
        category: "",
    });


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const amount = form.amount.value;
        const month = form.month.value;
        const category = form.category.value;
        const data = {
            amount: parseInt(amount),
            month,
            category
        };
        handleAddBudget(data)
        setFormData({ name: "", amount: "", category: "" }); // reset form
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="p-4 bg-white dark:bg-black dark:text-white dark:border-primary dark:border shadow-md rounded-lg space-y-3 w-full text-gray-700"
        >
            <h2 className="text-lg font-semibold">Add Budget</h2>

            <input
                type="month"
                name="month"
                defaultValue={month}
                onChange={handleChange}
                required
                className="w-full p-2 rounded input-style"
            />

            <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                placeholder="Amount"
                required
                className="w-full p-2 rounded input-style "
            />

            <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="Category (optional)"
                className="w-full p-2 rounded input-style "
            />

            <button
                type="submit"
                className="btn btn-secondary dark:bg-black dark:border-accent text-white cursor-pointer font-bold px-4 py-2 rounded "
            >
                Add Budget
            </button>
        </form>
    );
};

export default AddBudgetForm;
