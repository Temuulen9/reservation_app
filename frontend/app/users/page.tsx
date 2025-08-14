export default async function UsersPage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users`);

  const users = await res.json();

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.length > 0
          ? users.map((user: any) => <li key={user._id}>{user.name}</li>)
          : ""}
      </ul>
    </div>
  );
}
