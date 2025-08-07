import { RiCloseCircleFill } from "react-icons/ri";

import { AuthContext } from "@/contexts/auth.context";
import { useContextHook } from "@/hooks/use-context-hook";

import styles from "@/styles/components/header.module.scss";

type HeaderProps = {
  menuType: string;
  setMenuType: (type: string) => void;
};

export default function Header({ menuType, setMenuType }: HeaderProps) {
  const { user, logout } = useContextHook(AuthContext);

  return (
    <header className={styles["header"]}>
      <div className={styles["content"]}>
        <div className={styles["logo"]}>
          <img alt="MemeIT?" src="/assets/logo.png" />
        </div>

        {menuType ? (
          <div className={styles["close"]} onClick={() => setMenuType("")}>
            <RiCloseCircleFill />
          </div>
        ) : (
          <div className={styles["buttons"]}>
            {user?._id ? (
              <button onClick={logout}>Logout</button>
            ) : (
              <>
                <button onClick={() => setMenuType("LOGIN")}>Login</button>
                <button onClick={() => setMenuType("REGISTER")}>Sign up</button>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
