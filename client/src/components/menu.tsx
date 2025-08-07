import { useState } from "react";

import { AuthContext } from "@/contexts/auth.context";
import { useContextHook } from "@/hooks/use-context-hook";
import type { RegisterFormData } from "@/types/auth";
import { asyncHandler } from "@/utils/async-handler";
import { getClientInfo } from "@/utils/helpers";

import styles from "@/styles/components/menu.module.scss";

type MenuProps = {
  menuType: string;
  setMenuType: (type: string) => void;
};

export default function Menu({ menuType, setMenuType }: MenuProps) {
  const { login, register } = useContextHook(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const submitForm = asyncHandler(async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!username) {
      return alert("Username field is required");
    }

    if (menuType === "REGISTER" && !email) {
      return alert("Email field is required");
    }

    if (!password) {
      return alert("Password field is required");
    }

    const { userAgent, ip } = await getClientInfo();

    const formData = {
      username,
      password,
      ...(menuType === "REGISTER" && { email }),
      userAgent,
      ip,
    };

    if (menuType === "LOGIN") {
      await login(formData);
    } else if (menuType === "REGISTER") {
      await register(formData as RegisterFormData);
    }

    setMenuType("");
    setUsername("");
    setEmail("");
    setPassword("");
  });

  if (!menuType) {
    return null;
  }

  return (
    <div className={styles["menu"]}>
      <div className={styles["overlay"]} onClick={() => setMenuType("")} />
      <div className={styles["wrapper"]}>
        <div className={styles["content"]}>
          <h3>
            {menuType === "LOGIN" ? "Welcome back" : ""}
            {menuType === "REGISTER" ? "Welcome" : ""}
          </h3>

          <form onSubmit={submitForm}>
            <div className={styles["container"]}>
              <label htmlFor="username">Username</label>
              <input
                id="username"
                name="username"
                onChange={(event) => setUsername(event.target.value)}
                placeholder="Username"
                type="text"
                value={username}
              />
            </div>

            {menuType === "REGISTER" ? (
              <div className={styles["container"]}>
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="Email"
                  type="email"
                  value={email}
                />
              </div>
            ) : null}

            <div className={styles["container"]}>
              <label htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Password"
                type="password"
                value={password}
              />
            </div>

            <button type="submit">
              {menuType === "LOGIN" ? "Login" : ""}
              {menuType === "REGISTER" ? "Create account" : ""}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
