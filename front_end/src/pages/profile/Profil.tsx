import React, { FC } from "react";
import { useNavigate } from "react-router-dom";



const Profile: FC = () => {

    const navigate=useNavigate()
    const hundelLogOut=()=>{
        localStorage.clear()
        navigate('/auth/login')
    }
    return (
        <><div className="card-container">
            <span className="pro">PRO</span>
            <img className="round" src="https://randomuser.me/api/portraits/women/79.jpg" alt="user" />
            <h3>Ricky Park</h3>
            <h6>New York</h6>
            <p>User interface designer and <br /> front-end developer</p>
     
            <div className="skills">
                <h6>Skills</h6>
                <ul>
                    <li>UI / UX</li>
                    <li>Front End Development</li>
                    <li>HTML</li>
                    <li>CSS</li>
                    <li>JavaScript</li>
                    <li>React</li>
                    <li>Node</li>
                </ul>
            </div>
            <div className="buttons">
		<button className="primary" onClick={hundelLogOut}>
			Sign out
		</button>

	</div>
        </div></>
    )
}

export default Profile; 