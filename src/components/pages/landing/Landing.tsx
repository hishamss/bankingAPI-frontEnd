import { useState } from "react";
import { loginAPI, branchesAPI } from "../../../API";
import { LoginForm, Branch } from "../../../types";
import Cookie from "js-cookie";
export const Landing: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [branches, setBranches] = useState<Branch[]>();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (username && password) {
      const loginFormData: LoginForm = {
        username: username,
        password: password,
      };
      const data = await loginAPI(loginFormData);
      if (data.jwt) {
        Cookie.set("token", data.jwt);
        setIsAuthenticated(true);
      } else {
        console.log("unauthorized");
      }
    }
  };
  const handleLogout = () => {
    Cookie.remove("token");
    setIsAuthenticated(false);
  };

  const handleBranches = async () => {
    console.log("branches");
    const data = await branchesAPI();
    if (data) {
      setBranches(data);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="username"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
        />
        <button type="submit">Login</button>
      </form>
      {isAuthenticated && <button onClick={handleLogout}>Logout</button>}
      {isAuthenticated && <button onClick={handleBranches}>Branches</button>}
      {branches &&
        branches.map((branch, index) => {
          return (
            <div key={index}>
              <p>Name: {branch.branchName}</p>
              <p>City: {branch.branchCity}</p>
            </div>
          );
        })}
    </div>
  );
};
