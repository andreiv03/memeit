import { RiCloseCircleFill } from "react-icons/ri";

import { useAuthContext } from "context/auth.context";
import { useLayoutContext } from "context/layout.context";

import styles from "styles/components/header.module.scss";

const Header: React.FC = () => {
  const authContext = useAuthContext();
  const layoutContext = useLayoutContext();

  return (
    <header className={styles["header"]}>
      <div className={styles["content"]}>
        <div className={styles["logo"]}>
          <img
            alt="MemeIT?"
            src="/assets/logo.png"
          />
        </div>

        {!authContext.user._id && layoutContext.Menu.isMounted ? (
          <div
            className={styles["close"]}
            onClick={() =>
              layoutContext.Menu.handleStopAnimation(() => layoutContext.setMenuType(""))
            }
          >
            <RiCloseCircleFill />
          </div>
        ) : (
          <div className={styles["buttons"]}>
            {authContext.user._id ? (
              <button onClick={() => authContext.handleLogout()}>Logout</button>
            ) : (
              <>
                <button
                  onClick={() => {
                    layoutContext.Menu.handleStartAnimation();
                    layoutContext.setMenuType("LOGIN");
                  }}
                >
                  Login
                </button>
                <button
                  onClick={() => {
                    layoutContext.Menu.handleStartAnimation();
                    layoutContext.setMenuType("REGISTER");
                  }}
                >
                  Sign up
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
