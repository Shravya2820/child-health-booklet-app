import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  return (
    <header className="header">
      <span style={{ cursor: "pointer" }} onClick={() => navigate("/dashboard")}>
        Child Health Booklet
      </span>
    </header>
  );
}
