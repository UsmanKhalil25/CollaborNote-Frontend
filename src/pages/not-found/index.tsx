import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="flex flex-col justify-center items-center text-center h-screen bg-black">
      <h1 className="text-8xl font-bold text-white transform transition duration-300 hover:scale-110">404</h1>
      <p className="text-lg text-gray-500 mt-4">
        Sorry, the page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link
        to="/"
        className="mt-6 px-6 py-2 bg-white text-black font-medium rounded-md shadow hover:bg-gray-800 transition"
      >
        Return to website
      </Link>
    </div>
  );
}
