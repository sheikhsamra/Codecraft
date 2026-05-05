function Home() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Welcome to Blog App</h1>

      {user ? (
        <p className="text-lg">
          You are logged in as <b>{user.name}</b>
        </p>
      ) : (
        <p className="text-lg">
          Please login or signup to continue.
        </p>
      )}
    </div>
  );
}

export default Home;