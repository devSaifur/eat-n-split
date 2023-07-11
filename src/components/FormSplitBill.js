import { useState } from "react";

export default function FormSplitBill({ selectedFriend, onSplitBill }) {
  const [bill, setBill] = useState("");
  const [myBill, setMyBill] = useState("");
  const payedByFriend = bill > myBill ? bill - myBill : 0;
  const [whoIsPaying, setWhoIsPaying] = useState("Me");

  function handleSubmit(e) {
    e.preventDefault();

    if (!bill || !myBill) return;

    onSplitBill(whoIsPaying === "Me" ? payedByFriend : -payedByFriend);
  }

  return (
    <form className="form-split-bill" onSubmit={handleSubmit}>
      <h2>Split a bill with {selectedFriend.name}</h2>

      <label>💵 Bill value</label>
      <input
        value={bill}
        onChange={(e) => setBill(Number(e.target.value))}
        type="text"
      ></input>

      <label>🧑 Your expense</label>
      <input
        value={myBill}
        onChange={(e) =>
          setMyBill(
            Number(e.target.value) < bill ? Number(e.target.value) : bill
          )
        }
        type="text"
      ></input>

      <label>🧑‍🤝‍🧑{selectedFriend.name}'s expense</label>
      <input value={payedByFriend} type="text" disabled></input>

      <label>Who is paying the bill?</label>
      <select
        value={whoIsPaying}
        onChange={(e) => setWhoIsPaying(e.target.value)}
      >
        <option value="Me">Me</option>
        <option value="friend">{selectedFriend.name}</option>
      </select>
      <button className="button">Split Bill</button>
    </form>
  );
}
