import "./singlepost.css";

export default function SinglePost() {
  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        <img
          src="https://media.istockphoto.com/photos/perfect-sky-and-ocean-picture-id467367026"
          alt=""
        />
        <h1 className="singlePostTitle">
          Lorem ipsum dolor sit amet.
          <div className="singlePostEdit">
            <i className="singlePostIcon fa-regular fa-pen-to-square"></i>
            <i className="singlePostIcon fa-solid fa-trash-can"></i>
          </div>
        </h1>
        <div className="singlePostInfo">
          <span className="singlePostAuthor">
            Author <b>Safak</b>
          </span>
          <span className="singlePostDate">1 Hour ago</span>
        </div>
        <p className="singlePostDesc">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nisi
          voluptates dolore quos tenetur hic labore, eaque omnis placeat
          provident inventore veritatis dolor repudiandae harum aut ullam et qui
          perferendis officiis. Lorem ipsum dolor sit, amet consectetur
          adipisicing elit. Nisi voluptates dolore quos tenetur hic labore,
          eaque omnis placeat provident inventore veritatis dolor repudiandae
          harum aut ullam et qui perferendis officiis. Lorem ipsum dolor sit,
          amet consectetur adipisicing elit. Nisi voluptates dolore quos tenetur
          hic labore, eaque omnis placeat provident inventore veritatis dolor
          repudiandae harum aut ullam et qui perferendis officiis. Lorem ipsum
          dolor sit, amet consectetur adipisicing elit. Nisi voluptates dolore
          quos tenetur hic labore, eaque omnis placeat provident inventore
          veritatis dolor repudiandae harum aut ullam et qui perferendis
          officiis. Lorem ipsum dolor sit, amet consectetur adipisicing elit.
          Nisi voluptates dolore quos tenetur hic labore, eaque omnis placeat
          provident inventore veritatis dolor repudiandae harum aut ullam et qui
          perferendis officiis.
        </p>
      </div>
    </div>
  );
}
