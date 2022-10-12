import "./write.css";
import { useState, useContext } from "react";
import { Context } from "./../../context/Context";
import axios from "axios";

export default function Write() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const { user } = useContext(Context);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPost = {
      username: user.username,
      title,
      desc,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      console.log(filename);
      data.append("name", filename);
      data.append("file", file);
      newPost.photo = filename;
      console.log(newPost);
      axios
        .post("/upload", data)
        .then((res) => console.log("success"))
        .catch((err) => console.log(err));
    }
    axios
      .post(`/post/${user._id}`, newPost)
      .then((res) => {
        window.location.replace(`/post/${res.data._id}`);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="write">
      {file && (
        <img src={URL.createObjectURL(file)} alt="" className="writeImg" />
      )}
      <form className="writeForm" onSubmit={handleSubmit}>
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <i className="writeIcon fa-solid fa-plus"></i>
          </label>
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            onChange={(e) => setFile(e.target.files[0])}
          />
          <input
            type="text"
            id="title"
            autoFocus={true}
            className="writeInput"
            placeholder="Title"
          />
        </div>
        <div className="writeFormGroup">
          <textarea
            placeholder="Tell your story..."
            type="text"
            className="writeInput writeText"
          ></textarea>
        </div>
        <button className="writeSubmit" type="submit">
          Publish
        </button>
      </form>
    </div>
  );
}
