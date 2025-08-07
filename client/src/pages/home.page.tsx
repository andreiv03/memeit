import { useState } from "react";

import { AuthContext } from "@/contexts/auth.context";
import { MemesContext } from "@/contexts/memes.context";
import { useContextHook } from "@/hooks/use-context-hook";
import { asyncHandler } from "@/utils/async-handler";

import styles from "@/styles/pages/home.module.scss";

export default function Home() {
  const { user } = useContextHook(AuthContext);
  const { state, uploadMeme } = useContextHook(MemesContext);

  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File>({} as File);
  const [fileData, setFileData] = useState("");

  const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || !event.target.files[0]) {
      return setFile({} as File), setFileData("");
    }

    setFile(event.target.files[0]);
    setFileData(event.target.value);
  };

  const submitForm = asyncHandler(async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!description) {
      return alert("Description field is required");
    }

    if (!file || !fileData) {
      return alert("File field is required");
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async () => {
      if (!user?._id) {
        return alert("You must be logged in to upload a meme");
      }

      const formData = {
        userId: user._id,
        description,
        image: reader.result ? (reader.result as string) : "",
      };

      await uploadMeme(formData);

      setDescription("");
      setFile({} as File);
      setFileData("");
    };
  });

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
          <img alt="Why so salty?" src="/assets/hero-section-image.png" />
        </div>
      </div>

      <div className={styles["upload"]} id="upload">
        <div className={styles["background"]} />
        <div className={styles["content"]}>
          <div className={styles["text"]}>
            <h2>Are you crazy and think you're funny?</h2>
            <p>Send us an email and maybe you'll be lucky enough to laugh when we see your meme.</p>
          </div>

          <form onSubmit={submitForm}>
            <div className={styles["container"]}>
              <label htmlFor="description">Description</label>
              <input
                id="description"
                name="description"
                placeholder="Description"
                onChange={(event) => setDescription(event.target.value)}
                type="text"
                value={description}
              />
            </div>

            <div className={styles["container"]}>
              <label htmlFor="meme">Meme {"(jpg / png / gif)"}</label>
              <input
                id="meme"
                name="meme"
                onChange={handleFileInputChange}
                type="file"
                value={fileData}
              />
              <label htmlFor="meme">
                <span>{file.name ? file.name : "Upload a meme"}</span>
              </label>
            </div>

            <button disabled={user?._id ? false : true} type="submit">
              Send
            </button>
          </form>
        </div>
      </div>

      <div className={styles["memes"]}>
        <h2>Most viewed</h2>
        {state.memes.length ? (
          <div className={styles["wrapper"]}>
            {state.memes.map((meme) => (
              <div className={styles["meme"]} key={meme._id}>
                <img alt={meme.description} src={meme.image.url} />
              </div>
            ))}
          </div>
        ) : (
          <span>No memes found!</span>
        )}
      </div>
    </div>
  );
}
