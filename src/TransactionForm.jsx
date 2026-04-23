import { useState } from 'react';

function TransactionForm({ categories, onAdd }) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");
  const [category, setCategory] = useState("food");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description || !amount) return;

    onAdd({
      id: Date.now(),
      description,
      amount: Number(amount),
      type,
      category,
      date: new Date().toISOString().split('T')[0],
    });

    setDescription("");
    setAmount("");
    setType("expense");
    setCategory("food");
  };

  return (
    <div className="add-transaction">
      <h2>Add Transaction</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="tx-description" className="visually-hidden">Description</label>
        <input
          id="tx-description"
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <label htmlFor="tx-amount" className="visually-hidden">Amount</label>
        <input
          id="tx-amount"
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <label htmlFor="tx-type" className="visually-hidden">Type</label>
        <select id="tx-type" value={type} onChange={(e) => setType(e.target.value)}>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <label htmlFor="tx-category" className="visually-hidden">Category</label>
        <select id="tx-category" value={category} onChange={(e) => setCategory(e.target.value)}>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default TransactionForm;
