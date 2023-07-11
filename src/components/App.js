import React from "react";
import { useState } from "react";
import "./App.css";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

function App() {
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [imageURL, setImageURL] = useState("https://i.pravatar.cc/48");
  const [friends, setFriends] = useState(initialFriends);
  const [selectedFriend, setSelectedFriend] = useState(null);

  function handleAddFriend(friend) {
    setFriends((friends) => [...friends, friend]);
  }

  function handleSelect(friend) {
    setSelectedFriend((curr) => (curr?.id === friend?.id ? null : friend));
    setShowForm(false);
  }

  function handleSplitBill(value) {
    setFriends((friends) =>
      friends.map((friend) =>
        friend.id === selectedFriend.id
          ? { ...friend, balance: friend.balance + value }
          : friend
      )
    );
    setSelectedFriend(null);
  }
  return (
    <div className="app">
      <div className="sidebar">
        <FriendList
          selectedFriend={selectedFriend}
          onSelect={handleSelect}
          friends={friends}
        />

        {showForm && (
          <AddFriendForm
            onName={setName}
            name={name}
            imageURL={imageURL}
            onImageURL={setImageURL}
            onAddFriend={handleAddFriend}
          />
        )}
        <AddFriendBtn showForm={showForm} onSetShowForm={setShowForm}>
          {showForm ? "Cancle" : "Add Friend"}
        </AddFriendBtn>
      </div>
      {selectedFriend && (
        <FormSplitBill
          onSplitBill={handleSplitBill}
          selectedFriend={selectedFriend}
        />
      )}
    </div>
  );
}

function FriendList({ friends, onSelect, selectedFriend }) {
  return (
    <ul>
      {friends.map((friend) => (
        <Friend
          selectedFriend={selectedFriend}
          onSelect={onSelect}
          friend={friend}
          key={friend.id}
        />
      ))}
    </ul>
  );
}

function Friend({ friend, onSelect, selectedFriend }) {
  const isSelected = friend?.id === selectedFriend?.id;

  return (
    <li className={isSelected ? "selected" : ""}>
      <img src={friend.image} alt={friend.name}></img>
      <h3>{friend.name}</h3>

      {friend.balance < 0 && (
        <p className="red">
          You awe {friend.name} {Math.abs(friend.balance)}$
        </p>
      )}
      {friend.balance > 0 && (
        <p className="green">
          {friend.name} awes You {Math.abs(friend.balance)}$
        </p>
      )}
      {friend.balance === 0 && <p>You and {friend.name} are even</p>}

      <button onClick={() => onSelect(friend)} className="button">
        {isSelected ? "Close" : "Select"}
      </button>
    </li>
  );
}

function AddFriendBtn({ children, showForm, onSetShowForm }) {
  function handleShowForm() {
    showForm ? onSetShowForm(false) : onSetShowForm(true);
  }

  return (
    <button onClick={handleShowForm} className="button">
      {children}
    </button>
  );
}

function AddFriendForm({ name, onName, imageURL, onImageURL, onAddFriend }) {
  function handleSubmit(e) {
    e.preventDefault();

    if (!name || !imageURL) return;

    const id = crypto.randomUUID();
    const newFriend = {
      id: id,
      name: name,
      image: `${imageURL}?u=${id}`,
      balance: 0,
    };
    onAddFriend(newFriend);

    onName("");
    onImageURL("https://i.pravatar.cc/48");
  }

  function handleNameChange(e) {
    onName(e.target.value);
  }
  function handleImageChange(e) {
    onImageURL(e.target.value);
  }

  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label>🧑‍🤝‍🧑Friend name</label>
      <input value={name} onChange={handleNameChange} type="text"></input>

      <label>📷Image URL</label>
      <input value={imageURL} onChange={handleImageChange} type="text"></input>

      <Button type="submit">Add</Button>
    </form>
  );
}

function FormSplitBill({ selectedFriend, onSplitBill }) {
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

function Button({ children }) {
  return <button className="button">{children}</button>;
}

export default App;
