import Sidebar from "../../components/sidebar/Sidebar";
import "./settings.css";

export default function Settings() {
  return (
    <div className="settings">
      <div className="settingsWrapper">
        <div className="settingsTitle">
          <span className="settingsUpdateTitle">Update Your</span>
          <span className="settingsDeleteTitle">Delete Account</span>
        </div>
        <form className="settingsForm">
          <label>Profile Picture</label>
          <div className="settingsPP">
            <img
              src="https://media.istockphoto.com/photos/perfect-sky-and-ocean-picture-id467367026"
              alt=""
            />
            <label htmlFor="fileInput">
              <i className="settingsPPIcon fa-regular fa-user-circle"></i>
            </label>
          </div>
          <input type="file" id="fileInput" style={{ display: "none" }} />
          <label htmlFor="">Username</label>
          <input type="text" placeholder="Joe132" />
          <label htmlFor="">Email</label>
          <input type="email" placeholder="Joe132@example.com" />
          <label htmlFor="">Password</label>
          <input type="password" />
          <button className="settingsSubmit">Update</button>
        </form>
      </div>
      <Sidebar />
    </div>
  );
}
