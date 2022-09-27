import "./header.css";

const Header = () => {
  return (
    <div className="header">
      <div className="headerTitles">
        <span className="headerTitleSm">React & NodeJS</span>
        <span className="headerTitleLg">Blog</span>
      </div>
      <img
        className="headerImg"
        src="https://cdn.pixabay.com/photo/2014/02/27/16/10/flowers-276014_960_720.jpg"
        alt=""
      />
    </div>
  );
};

export default Header;
