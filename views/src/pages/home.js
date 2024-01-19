import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="App">
      <h1 className="text-4xl font-bold italic underline flex justify-center m-20">
        SecretKeyper
      </h1>
      <h2 className="text-2xl font-bold flex justify-center m-20">
        A password store that keeps your data confidential
      </h2>

      <h1 className="text-2xl font-bold flex justify-center m-20">
        <Link to="/dashboard">Dashboard</Link>
      </h1>
      <h1 className="text-2xl font-bold flex justify-center m-20">
        <Link to="/password-checker">Password Checker</Link>
      </h1>
    </div>
  );
}

export default Home;
