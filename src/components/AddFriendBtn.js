export default function AddFriendBtn({ children, showForm, onSetShowForm }) {
  function handleShowForm() {
    showForm ? onSetShowForm(false) : onSetShowForm(true);
  }

  return (
    <button onClick={handleShowForm} className="button">
      {children}
    </button>
  );
}
