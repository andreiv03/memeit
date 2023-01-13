import { useRef, useState } from "react";

import { useAuthContext } from "context/auth.context";
import { useLayoutContext } from "context/layout.context";
import { useMemesContext, type MemesFormData } from "context/memes.context";

import styles from "styles/pages/home.module.scss";

const Home: React.FC = () => {
  const descriptionInputRef = useRef({} as HTMLInputElement);
  const [file, setFile] = useState<File>({} as File);
  const [fileInput, setFileInput] = useState("");

  const authContext = useAuthContext();
  const layoutContext = useLayoutContext();
  const memesContext = useMemesContext();

  const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || !event.target.files[0]) return setFile({} as File), setFileInput("");
    setFile(event.target.files[0]);
    setFileInput(event.target.value);
  };

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      if (!descriptionInputRef.current.value) return alert("Description field is required!");
      if (!file || !fileInput) return alert("File field is required!");

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = async () => {
        layoutContext.Animation.handleStartAnimation();

        const formData: MemesFormData = {
          description: descriptionInputRef.current.value,
          image: reader.result ? reader.result : ""
        };

        const { memesService } = await import("services/memes.service");
        await memesService.createMeme(authContext.token, formData);

        descriptionInputRef.current.value = "";
        setFile({} as File);
        setFileInput("");
        memesContext.setCallback(!memesContext.callback);
      };
    } catch (error: any) {
      if (layoutContext.Animation.isMounted) layoutContext.Animation.handleStopAnimation();
      alert(error.response.data.message);
    }
  };

  return (
    <div className={styles["page"]}>
      <div className={styles["hero_section"]}>
        <div className={styles["content"]}>
          <h1>Sharing memes has never been easier than that!</h1>
          <p>
            The ideal platform for POLITEHNICA students, amused by how many subjects they will fail
            this semester.
          </p>
          <a href="#upload">
            <button>Upload a meme</button>
          </a>
        </div>

        <div className={styles["image"]}>
          <img
            alt="Why so salty?"
            src="/assets/hero-section-image.png"
          />
        </div>
      </div>

      <div
        className={styles["upload"]}
        id="upload"
      >
        <div className={styles["background"]} />
        <div className={styles["content"]}>
          <div className={styles["text"]}>
            <h2>Are you crazy and think you're funny?</h2>
            <p>Send us an email and maybe you'll be lucky enough to laugh when we see your meme.</p>
          </div>

          <form onSubmit={handleFormSubmit}>
            <div className={styles["container"]}>
              <label htmlFor="description">Description</label>
              <input
                id="description"
                placeholder="Description"
                ref={descriptionInputRef}
                type="text"
              />
            </div>

            <div className={styles["container"]}>
              <label htmlFor="meme">Meme {"(jpg / png / gif)"}</label>
              <input
                id="meme"
                onChange={handleFileInputChange}
                type="file"
                value={fileInput}
              />
              <label htmlFor="meme">
                <span>{file.name ? file.name : "Upload a meme"}</span>
              </label>
            </div>

            <button
              disabled={authContext.token ? false : true}
              type="submit"
            >
              Send
            </button>
          </form>
        </div>
      </div>

      <div className={styles["memes"]}>
        <h2>Most viewed</h2>
        {memesContext.memes && memesContext.memes.length ? (
          <div className={styles["wrapper"]}>
            {memesContext.memes.map((meme) => (
              <div
                className={styles["meme"]}
                key={meme._id}
              >
                <img
                  alt={meme.description}
                  src={meme.image.url}
                />
              </div>
            ))}
          </div>
        ) : (
          <span>No memes found!</span>
        )}
      </div>
    </div>
  );
};

export default Home;
