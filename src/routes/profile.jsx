import '../styles/profile.css';
function Profile() {


    const nameU = 'ytoyoyo';
    const idU = 1231;
    const emailU = 'algo@algo.com';
    const rolU = 'perra';

    return (
        <div id="profile-container" className='center'>
            <div id="info-container">
                <div id="info" className='container mt-3'>
                    <div>
                        <h2>Update Profile</h2>
                    </div>
                    <form action="" method="post" id="form">
                        <div className='mb-3 mt-3'>
                            <label htmlFor="name">Name</label>
                            <input type="text" className='form-control' name="name" id="name" placeholder={nameU} />
                        </div>
                        <div className='mb-3 mt-3'>
                            <label htmlFor="">User ID</label>
                            <input type="text" className='form-control' name="userid" id="userid" placeholder={idU} disabled />
                        </div>
                        <div className='mb-3 mt-3'>
                            <label htmlFor="email">Email</label>
                            <input type="email" className='form-control' name="email" id="email" placeholder={emailU} />
                        </div>
                        <div className='mb-3 mt-3'>
                            <label htmlFor="role">Role</label>
                            <input type="text" className='form-control' name="role" id="" placeholder={rolU} />
                        </div>
                        
                            <input type="submit" className='btn btn-primary' value="submit" />
                        
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Profile;