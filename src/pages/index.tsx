import Link from "next/link";
import Head from "next/head";

const Home = () => {
  return (
    <>
      <Head>
        <title>Home - Task Management App</title>
      </Head>
      <main
        className="flex items-center justify-center min-h-screen bg-gray-100"
        role="main"
      >
        <Link
          className="px-6 py-3 text-lg font-bold text-white bg-blue-500 rounded"
          href="/taskboard"
          aria-label="Go to the Task Board page"
        >
          Go to Task Board
        </Link>
      </main>
    </>
  );
};

export default Home;
