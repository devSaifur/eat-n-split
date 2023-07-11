import Friend from "./Friend";

export default function FriendList({ friends, onSelect, selectedFriend }) {
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
