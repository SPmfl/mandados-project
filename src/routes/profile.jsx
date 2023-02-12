import { useEffect, useState } from 'react';
import useSWR from 'swr';
import '../styles/profile.css';
import axios from 'axios';

import ErrorPage from '../utils/errorPage'


const urlOperatorInfo = 'http://localhost:4500/api/operator/profile';
// const fetcher = async (url) => await axios.get(url)
//     .then(response => {
//         return response.data;
//     });

const fetcher = async (url) => await axios.get(url,
    {
        headers: {
            'x_access_token': localStorage.getItem('x_access_token')
       }
    })
    .then(response => {
        console.log(response.data.message);
        return response.data;
    });


function Profile() {
    const { data, error, isLoading } = useSWR(urlOperatorInfo, fetcher);

    const [userID, setUserID] = useState(0);
    const [userEmail, setUserEmail] = useState('');
    const [userName, setUserName] = useState('');
    const [userRol, setUserRol] = useState('');
    const [formData, setFormData] = useState({});

 try {
       if (error) return <ErrorPage />
       if (isLoading) return <h1>Loading ...</h1>
 } catch (error) {
    console.error("error verifying useSWR data",error);
 }

    /*Form data changes on user input */
    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    };

    /**Form submit function */
    const handleSubmit = (event) => {
        event.preventDefault();
        axios.put('http://localhost:4500/api/operator/profile', {
            body: "mensaje desde front"
        })
            .then(response => response.data)
            .then(data => console.log("respuesta handleSubmit:", data))
            .catch(error => console.error(error));
    }




    // useEffect((userId) => {
    //     fetch('http://localhost:4500/api/operator/info')
    //         .then(res => {
    //             setUserID(res.body.userid);
    //             setUserEmail(res.body.email);
    //             setUserName(res.body.name);
    //             setUserRol(res.body.rol);
    //             console.log(data);
    //         }).catch(err => console.error("error catchinf user info", err));
    // }, [data]);

    return (
        <div id="profile-container" className='center'>
            <div id="info-container">
                <div id="info" className='container mt-3'>
                    <div>
                        <h2>Update Profile</h2>
                    </div>
                    <form onSubmit={handleSubmit} method="PUT" id="form">
                        <div className='mb-3 mt-3'>
                            <label htmlFor="name">Name</label>
                            <input type="text"
                                className='form-control'
                                name="name"
                                id="name"
                                placeholder={userName}
                                autoFocus={true}
                                onChange={handleChange} />
                        </div>
                        <div className='mb-3 mt-3'>
                            <label htmlFor="">User ID</label>
                            <input type="text"
                                className='form-control'
                                name="iduser" id="userid"
                                placeholder={userID}
                                onChange={handleChange} disabled />
                        </div>
                        <div className='mb-3 mt-3'>
                            <label htmlFor="email">Email</label>
                            <input type="email"
                                className='form-control'
                                name="email" id="email"
                                placeholder={userEmail}
                                onChange={handleChange} />
                        </div>
                        <div className='mb-3 mt-3'>
                            <label htmlFor="role">Role</label>
                            <input type="text"
                                className='form-control'
                                name="rol" id="" placeholder={userRol}
                                onChange={handleChange}
                                disabled />
                        </div>

                        <button type="submit" className='btn btn-dark'> Save </button>

                    </form>
                </div>
            </div>
        </div>
    );
}

export default Profile;