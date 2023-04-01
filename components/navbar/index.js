import Link from "next/link";
import { useSession } from "next-auth/react";
import { useState } from "react";

function Navbar() {
    const { data: session } = useSession();

    const [showDropdown, setShowDropdown] = useState(false);

  // function to handle clicking on the user's image
  const handleUserImageClick = () => {
    setShowDropdown(!showDropdown);
  };

  // function to handle signing out the user
  const handleSignOut = async () => {
    // call your sign out API or method here
  };

  return (
    <nav>
      <ul>
        <li>
          <Link href="/">
            Home
          </Link>
        </li>
        <li>
          <Link href="/create-project">
            Create Project
          </Link>
        </li>
        {session ? (
            <div className="user-profile" onClick={handleUserImageClick}>
            <img src={session.user.image} alt="User avatar" height={50} width={50}/>
          {showDropdown && (
            <>
            <li>
              <Link href="/profile">
                Profile
              </Link>
            </li>
            <li>
              <Link href="/api/auth/signout">Sign out</Link>
            </li>
          </>)}
            </div>
        ) : (
          <li>
            <Link href="/api/auth/signin">Sign in</Link>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;