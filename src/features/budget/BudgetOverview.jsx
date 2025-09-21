const BudgetOverview = ({ budget, expenses }) => {
    const totalSpent = expenses.reduce((sum, e) => sum + e.amount, 0);
    const balance = budget - totalSpent;

    return (
        <div className="p-6 rounded-2xl shadow-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white flex justify-between items-center">
            <div>
                <h2 className="text-xl font-bold">Monthly Budget</h2>
                <p className="mt-1">Budget: {budget} BDT</p>
                <p>Spent: {totalSpent} BDT</p>
                <p className="font-semibold">Left: {balance} BDT</p>
            </div>
            <div className="text-5xl font-bold">{balance}</div>
        </div>
    );
};

export default BudgetOverview