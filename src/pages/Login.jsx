import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  return (
    <div className="container" style={{ marginTop: "20vh" }}>
      <div className="card" style={{ maxWidth: "420px", margin: "auto" }}>
        <h1 style={{ textAlign: "center", marginBottom: "1.5rem" }}>
          Child Health Booklet
        </h1>

        <button className="btn" onClick={() => navigate("/dashboard")}>
          Login
        </button>
      </div>
    </div>
  );
}
