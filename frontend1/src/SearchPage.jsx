import SearchUsers from "./SearchUsers";
import UserWishlist from "./UserWishlist";
import { useState } from "react";

export default function SearchPage() {
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Pretraga korisnika</h2>
      <SearchUsers onSelectUser={setSelectedUser} />
      <UserWishlist korisnik={selectedUser} />
    </div>
  );
}
