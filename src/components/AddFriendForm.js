import Button from "./Button";

export default function AddFriendForm({
  name,
  onName,
  imageURL,
  onImageURL,
  onAddFriend,
}) {
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
