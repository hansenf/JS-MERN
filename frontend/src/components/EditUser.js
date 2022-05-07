import React, {useEffect, useState} from 'react';
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';

const EditUser = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [gender, setGender] = useState("Male");
    const navigate = useNavigate();
    const {id} = useParams();

    useEffect(()=>{
        getUserById();
    },[]);

    const getUserById = async() =>{
        const response = await axios.get(`http://localhost:5000/users/${id}`);
        setName(response.data.name);
        setEmail(response.data.email);
        setGender(response.data.gender);
    }

    const updateUser = async (e) => {
        e.preventDefault();
        try {
            await axios.patch(`http://localhost:5000/users/${id}`, {
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
            <form onSubmit={updateUser}>
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
                    <button type="submit" className="button is-success">
                        Update
                    </button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default EditUser