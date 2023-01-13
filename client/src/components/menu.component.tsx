import { useRef } from "react";

import { type AuthFormData, useAuthContext } from "context/auth.context";
import { useLayoutContext } from "context/layout.context";

import styles from "styles/components/menu.module.scss";

const Menu: React.FC = () => {
  const emailInputRef = useRef({} as HTMLInputElement);
  const passwordInputRef = useRef({} as HTMLInputElement);
  const usernameInputRef = useRef({} as HTMLInputElement);

  const authContext = useAuthContext();
  const layoutContext = useLayoutContext();

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      if (layoutContext.menuType === "REGISTER" && !emailInputRef.current.value)
        return alert("Email field is required!");
      if (!passwordInputRef.current.value) return alert("Password field is required!");
      if (!usernameInputRef.current.value) return alert("Username field is required!");

      const formData: AuthFormData = {
        email: emailInputRef.current ? emailInputRef.current.value : "",
        password: passwordInputRef.current.value,
        username: usernameInputRef.current.value
      };

      passwordInputRef.current.value = "";
      authContext.handleAuth(formData);
      localStorage.setItem("authenticated", "true");
      layoutContext.Menu.handleStopAnimation(() => layoutContext.setMenuType(""));
    } catch (error: any) {
      alert(error.response.data.message);
    }
  };

  return (
    <layoutContext.Menu.Component>
      <div className={styles["overlay"]} />
      <div className={styles["wrapper"]}>
        <div className={styles["content"]}>
          <h3>
            {layoutContext.menuType === "LOGIN" ? "Welcome back" : ""}
            {layoutContext.menuType === "REGISTER" ? "Welcome" : ""}
          </h3>

          <form onSubmit={handleFormSubmit}>
            <div className={styles["container"]}>
              <label htmlFor="username">Username</label>
              <input
                autoComplete="username"
                id="username"
                placeholder="Username"
                ref={usernameInputRef}
                type="text"
              />
            </div>

            {layoutContext.menuType === "REGISTER" ? (
              <div className={styles["container"]}>
                <label htmlFor="email">Email</label>
                <input
                  autoComplete="email"
                  id="email"
                  placeholder="Email"
                  ref={emailInputRef}
                  type="email"
                />
              </div>
            ) : null}

            <div className={styles["container"]}>
              <label htmlFor="password">Password</label>
              <input
                autoComplete="current-password"
                id="password"
                placeholder="Password"
                ref={passwordInputRef}
                type="password"
              />
            </div>

            <button type="submit">
              {layoutContext.menuType === "LOGIN" ? "Login" : ""}
              {layoutContext.menuType === "REGISTER" ? "Create account" : ""}
            </button>
          </form>
        </div>
      </div>
    </layoutContext.Menu.Component>
  );
};

export default Menu;
