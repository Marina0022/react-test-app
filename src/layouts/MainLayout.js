import { Link } from "react-router-dom";

export default function MainLayout({ children }) {
  return (
    <>
      <nav className="flex gap-5 p-5">
        <Link className="text-[#1976d2] text-decoration-none" to="/edit-users">
          Edit users
        </Link>
        <Link
          className="text-[#1976d2] text-decoration-none"
          to="/"
        >
          Registration
        </Link>
      </nav>
      {children}
    </>
  );
}
