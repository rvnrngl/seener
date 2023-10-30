import { Auth } from "./components/Auth";

/*
 * Home Component: Responsible for rendering the main content of the home page.
 * - Displays the Seener logo and a title for the sign-in page.
 * - Includes the "Auth" component for rendering the authentication form and its related components.
 * - Defines the styling for the home page content.
 */

export default function Home() {
  return (
    <main className="flex min-h-full flex-col justify-center bg-gray-100 px-6 py-10 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img
          src="/images/Ghosted.png"
          alt="Seener logo"
          className="mx-auto h-16 w-16"
        />
        <h2 className="mt-2 text-center text-xl font-bold tracking-tight text-gray-900 sm:text-3xl">
          Sign in to your account
        </h2>
      </div>
      <Auth />
    </main>
  );
}
