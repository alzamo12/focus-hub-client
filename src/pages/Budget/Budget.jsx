import { useState } from "react";
import BudgetOverview from "../../features/budget/BudgetOverview";
import AddExpenseForm from "../../features/budget/AddExpenseForm";
import ExpenseList from "../../features/budget/ExpenseList";

const Budget = () => {
    const [budget, setBudget] = useState(2000); // example fixed budget
    const [expenses, setExpenses] = useState([]);

    const addExpense = (newExpense) => {
        setExpenses([...expenses, newExpense]);
    };

    return (
        <div className="max-w-4xl mx-auto p-4 space-y-6">
            {/* Budget Overview */}
            <BudgetOverview budget={budget} expenses={expenses} />

            {/* Add Expense Form */}
            <AddExpenseForm onAdd={addExpense} />

            {/* Expense List */}
            <ExpenseList expenses={expenses} />
        </div>
    );
};

export default Budget;