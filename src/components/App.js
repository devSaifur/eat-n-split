import React from "react";
import { useState } from "react";
import "./styles/App.css";

import FriendList from "./FriendList";
import FormSplitBill from "./FormSplitBill";
import AddFriendForm from "./AddFriendForm";
import AddFriendBtn from "./AddFriendBtn";

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

export default function App() {
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
