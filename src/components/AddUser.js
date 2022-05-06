import React, {useState} from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const AddUser = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [gender, setGender] = useState("Male");
    const navigate = useNavigate();

    const saveUser = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/users',{
                name,
                email,
                gender
            });
            navigate("/");
        }   catch (error) {
            console.log(error);
        }
    }

  return (
    <div className="columns">
        <div className="column is-half">
            <form onSubmit={saveUser}>
            <div className="field"></div>
            {/* Name */}
                <label className="label">Name</label>
                <div className="control">
                    <input 
                        type="text" 
                        className="input" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)}
                        placeholder="name"/>
                </div>
            {/* Email */}
            <div className="field"></div>
                <label className="label">Email</label>
                <div className="control">
                    <input 
                        type="text" 
                        className="input" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        placeholder="Email"/>
                </div>
            {/* Gender */}
            <div className="field"></div>
                <label className="label">Gender</label>
                <div className="control">
                    <div className="select is-fullwidth">
                        <select 
                            value={gender} 
                            onChange={(e) => setGender(e.target.value)}
                        >
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </div>
                </div>
            {/* Action */}
            <div className="field"></div>
                <div className="control">
                    <button type="submit" className="button is-success">Save</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default AddUser