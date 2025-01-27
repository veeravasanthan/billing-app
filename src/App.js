import React, { useState } from "react";

function App() {
  const [bills, setBills] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const addBill = (newBill) => {
    setBills([...bills, { id: bills.length + 1, ...newBill }]);
  };

  const filteredBills = bills.filter((bill) =>
    bill.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalAmount = filteredBills.reduce((sum, bill) => sum + bill.total, 0);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Billing App</h1>

      {/* Add New Bill*/ }
      <div style={{ border: "2px solid orange", padding: "10px", marginBottom: "10px" }}>
        <h3>Add New Bill</h3>
        <AddNewBill onAddBill={addBill} />
      </div>

      {/* Search Bill */}
      <div style={{ border: "2px solid green", padding: "10px", marginBottom: "10px" }}>
        <h3>Search Bill</h3>
        <input
          type="text"
          placeholder="Description to search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Bill Table */}
      <div style={{ border: "2px solid purple", padding: "10px", marginBottom: "10px" }}>
        <h3>Bill List</h3>
        <table border="1" width="100%">
          <thead>
            <tr>
              <th>ID</th>
              <th>Description</th>
              <th>Qty</th>
              <th>Cost</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {filteredBills.map((bill) => (
              <tr key={bill.id}>
                <td>{bill.id}</td>
                <td>{bill.description}</td>
                <td>{bill.qty}</td>
                <td>{bill.cost}</td>
                <td>{bill.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Total Amount */}
      <div style={{ border: "2px solid red", padding: "10px" }}>
        <h3>Total: {totalAmount}</h3>
      </div>
    </div>
  );
}

function AddNewBill({ onAddBill }) {
  const [description, setDescription] = useState("");
  const [cost, setCost] = useState("");
  const [qty, setQty] = useState("");

  const handleAdd = () => {
    if (description && cost && qty) {
      onAddBill({
        description,
        cost: parseFloat(cost),
        qty: parseInt(qty, 10),
        total: parseFloat(cost) * parseInt(qty, 10),
      });

      setDescription("");
      setCost("");
      setQty("");
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="number"
        placeholder="Cost"
        value={cost}
        onChange={(e) => setCost(e.target.value)}
      />
      <input
        type="number"
        placeholder="Qty"
        value={qty}
        onChange={(e) => setQty(e.target.value)}
      />
      <button onClick={handleAdd}>Add</button>
    </div>
  );
}

export default App;