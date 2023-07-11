export default function Friend({ friend, onSelect, selectedFriend }) {
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
