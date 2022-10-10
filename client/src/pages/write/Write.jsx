import "./write.css";
import { useRef } from "react";

export default function Write() {
  const title = useRef();
  const desc = useRef();
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className="write">
      <img
        src="https://media.istockphoto.com/photos/perfect-sky-and-ocean-picture-id467367026"
        alt=""
        className="writeImg"
      />
      <form className="writeForm" onSubmit={handleSubmit}>
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <i className="writeIcon fa-solid fa-plus"></i>
          </label>
          <input type="file" id="fileInput" style={{ display: "none" }} />
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
