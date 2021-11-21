import Image from "next/image";
import { signIn, signOut } from "next-auth/client";

function Header({ session }) {
  return (
    <header className="border-b border-gray-300">
      <div className="container mx-auto py-4 flex items-center justify-between">
        {session ? (
          <>
            <div className="flex items-center gap-2">
              <Image
                className="rounded-full"
                src={session.user.image}
                width={30}
                height={30}
              />
              <h1 className="text-base font-semibold">{session.user.name}</h1>
            </div>
            <button
              onClick={() => signOut()}
              className="rounded-md text-white bg-black py-2 px-4"
            >
              Log out
            </button>
          </>
        ) : (
          <>
            <h1 className="text-xl font-semibold">Time Tracker</h1>
            <button
              onClick={() => signIn("facebook")}
              className="rounded-md text-white bg-black py-2 px-4"
            >
              Log In
            </button>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
