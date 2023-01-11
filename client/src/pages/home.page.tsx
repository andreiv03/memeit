import { useRef } from "react";

import { useAuthContext } from "context/auth.context";
import { type FormData, useMemesContext } from "context/memes.context";

import styles from "styles/pages/home.module.scss";

const Home: React.FC = () => {
  const descriptionInputRef = useRef({} as HTMLInputElement);
  const fileInputRef = useRef({} as HTMLInputElement);

  const authContext = useAuthContext();
  const memesContext = useMemesContext();

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      if (!descriptionInputRef.current.value) return alert("Description field is required!");
      if (!fileInputRef.current.files || !fileInputRef.current.files[0])
        return alert("File field is required!");

      const reader = new FileReader();
      reader.readAsDataURL(fileInputRef.current.files[0]);
      reader.onloadend = async () => {
        const formData: FormData = {
          description: descriptionInputRef.current.value,
          image: reader.result ? reader.result : ""
        };
        console.log(formData);
        const { memesService } = await import("services/memes.service");
        await memesService.createMeme(authContext.token, formData);

        descriptionInputRef.current.value = "";
        fileInputRef.current.files = null;
        fileInputRef.current.value = "";
      };
    } catch (error: any) {
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
            alt=""
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
                ref={fileInputRef}
                type="file"
              />
            </div>

            <button type="submit">Send</button>
          </form>
        </div>
      </div>

      <div className={styles["memes"]}>
        <h2>Most viewed</h2>
        {memesContext.memes && memesContext.memes.length ? (
          memesContext.memes.map((meme) => (
            <div
              className={styles["meme"]}
              key={meme._id}
            >
              <img
                alt={meme.description}
                src={meme.image.url}
              />
            </div>
          ))
        ) : (
          <span>No memes found!</span>
        )}
      </div>
    </div>
  );
};

export default Home;
