import Link from "next/link";

const Home = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Link
        className="px-6 py-3 text-lg font-bold text-white bg-blue-500 rounded"
        href="/taskboard"
      >
        Go to Task Board
      </Link>
    </div>
  );
};

export default Home;
