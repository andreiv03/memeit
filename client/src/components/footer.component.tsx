import { RiFacebookCircleFill, RiInstagramFill, RiYoutubeFill } from "react-icons/ri";
import styles from "styles/components/footer.module.scss";

const Footer: React.FC = () => {
  return (
    <footer className={styles["footer"]}>
      <div className={styles["social_media"]}>
        <a href="#">
          <RiFacebookCircleFill />
        </a>
        <a href="#">
          <RiInstagramFill />
        </a>
        <a href="#">
          <RiYoutubeFill />
        </a>
      </div>
      <span>Copyright 2022 | Work, don't beg!</span>
    </footer>
  );
};

export default Footer;
