import Link from "next/link";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { Button } from "@mantine/core";
import { useRouter } from "next/router";
import styled from "styled-components";

const StyleNav = styled.nav`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  `;

function Navbar() {
  const router = useRouter();
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
    <StyleNav>
          <Button onClick={() => router.push("/")}>
            Home
          </Button>
          <Button onClick={() => router.push("/addproject")}>
            Create Project
          </Button>
        {session ? (
            <div className="user-profile" onClick={handleUserImageClick}>
            <img src={session.user.image} alt="User avatar" height={50} width={50}/>
          {showDropdown && (
            <>
            <div>
              <Button onClick={() => router.push("/profile")}>
                Profile
              </Button>
            </div>
            <div>
              <Button onClick={() => router.push("/api/auth/signout")}>Sign out</Button>
            </div>
          </>)}
            </div>
        ) : (
          <div>
            <Button onClick={() => router.push("/api/auth/signin")}>Sign in</Button>
          </div>
        )}
    </StyleNav>
  );
}

export default Navbar;