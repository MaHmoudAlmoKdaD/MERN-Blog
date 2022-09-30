import "./singlepost.css";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

export default function SinglePost() {
  const [post, setPost] = useState({});
  const location = useLocation();
  const id = location.pathname.split("/")[2];

  useEffect(() => {
    const fetchPost = async () => {
      await axios(`/post/${id}`)
        .then((res) => setPost(res.data))
        .catch((err) => console.log(err));
    };
    fetchPost();
  }, [id]);

  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        {post.photo && <img src={post.photo} alt="" />}

        <h1 className="singlePostTitle">
          {post.title}
          <div className="singlePostEdit">
            <i className="singlePostIcon fa-regular fa-pen-to-square"></i>
            <i className="singlePostIcon fa-solid fa-trash-can"></i>
          </div>
        </h1>
        <div className="singlePostInfo">
          <span className="singlePostAuthor">
            Author: <b>{post.username}</b>
          </span>
          <span className="singlePostDate">{new Date(post.createdAt).toDateString()}</span>
        </div>
        <p className="singlePostDesc">{post.desc}</p>
      </div>
    </div>
  );
}
