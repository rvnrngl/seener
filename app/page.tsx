import { Auth } from "./components/Auth";

export default function Home() {
  return (
    <main className="flex min-h-full flex-col justify-center py-10 px-6 lg:px-8 bg-gray-100">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img
          src="/images/Ghosted.png"
          alt="Seener logo"
          className="w-16 h-16 mx-auto"
        />
        <h2 className="mt-2 text-center text-xl sm:text-3xl font-bold tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>
      <Auth />
    </main>
  );
}
