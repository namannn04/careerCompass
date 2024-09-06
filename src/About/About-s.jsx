import "./About-s.css";
import avatar3 from "../assets/logo-avatars/avatar3.png";
export default function About_s(){
    return(
        <div className="about_bg_s">
        <div className="about_container_s">
            <div className="about_s">
            <p>
            Our website is here to help you navigate this complex journey.<br></br> We provide detailed insights into a wide range of careers, offering you the information<br></br> and resources needed to make an informed decision and map out your path to success.
            </p>
            </div>
            <div className="avatar3">
            <img src={avatar3} alt="Avatar" />
            </div>
        </div>
        </div>
    )
}