import { useState } from "react";

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
        const data = {
            amount,
            month
        };
        handleAddBudget(data)
        setFormData({ name: "", amount: "", category: "" }); // reset form
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="p-4 bg-white shadow-md rounded-lg space-y-3 w-full"
        >
            <h2 className="text-lg font-semibold">Add Budget</h2>

            <input
                type="month"
                name="month"
                defaultValue={month}
                onChange={handleChange}
                required
                className="w-full border p-2 rounded"
            />

            <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                placeholder="Amount"
                required
                className="w-full border p-2 rounded"
            />

            <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="Category (optional)"
                className="w-full border p-2 rounded"
            />

            <button
                type="submit"
                // disabled={mutation.isLoading}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
                {/* {mutation.isLoading ? "Adding..." : "Add Budget"} */}Add Budget
            </button>
        </form>
    );
};

export default AddBudgetForm;
