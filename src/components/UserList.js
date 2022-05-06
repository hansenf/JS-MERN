import React, {useState, useEffect} from "react"
import axios from "axios";

const UserList = () => {
    const [users, setUser] = useState([]);

    useEffect(()=> {
        getUsers();
    },[]);

    const getUsers = async() =>{
        const response = await axios.get('http://localhost:5000/users');
        setUser(response.data);
    }

  return(
    <div className="columns">
        <div className="column is-half">
            <table className="table is-striped is-fullwidth mt-5">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Gender</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                    <tr key={user._id}>
                        <td>{index + 1}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.gender}</td>
                        <td>
                            <button className="button is-info is-small mr-1">Edit</button>
                            <button className="button is-danger is-small mr-1">Delete</button>
                        </td>
                    </tr>
                    ))}
                    
                </tbody>
            </table>   
        </div>
    </div>
  );
};

export default UserList;