import Image from "next/image";
import React from "react";
import SearchInput from "./SearchInput";
import NavItems from "./NavItems";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";

const Navbar = () => {
  return (
    <div className="fixed w-full bg-white z-50 shadow-md">
      <div className="flex items-center max-w-6xl justify-between h-14 mx-auto px-3">
        {/* 1st div */}

        <div className="flex items-center space-x-3">
          <Image
            src={"/linkedin-logo.webp"}
            alt="Logo"
            width={65}
            height={65}
          ></Image>

          <div className="md:block hidden">
            <SearchInput></SearchInput>
          </div>
        </div>

        {/* 2nd div */}

        <div className="flex items-center gap-5">
          <div className="md:block hidden">
            <NavItems></NavItems>
          </div>
          <div>
            <SignedIn>
              <UserButton></UserButton>
            </SignedIn>

            <SignedOut>
              <SignInButton />
              <SignUpButton />
            </SignedOut>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
