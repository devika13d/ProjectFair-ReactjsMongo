import React from 'react'
import Collapse from 'react-bootstrap/Collapse';
import { useState } from 'react';

function Profile() {
    const [open, setOpen] = useState(false);
    return (
        <>
            <div className='card shadow p-5 m-4'>
                <div className='d-flex justify-content-between'>
                    <h1>Profile</h1>
                    <button onClick={() => setOpen(!open)} className='btn btn-outline-info'>
                        <i class='fa-solid fa-angle-down'></i>
                    </button>
                </div>
                <Collapse in={open} >
                    <div >
                        <label htmlFor="profile" className='text-center mb-2 mt-3 '>
                            <input type="file" id='profile' style={{ display: 'none' }} />
                            <img className='rounded'
                                src="https://th.bing.com/th/id/R.01da0902c89677030d1b4653bd4a1351?rik=NuG6S0lHm51WxQ&riu=http%3a%2f%2fwww.pngall.com%2fwp-content%2fuploads%2f5%2fUser-Profile-PNG-Free-Image.png&ehk=0ER186lOvX51zPC0dwi85VKFnvFXEjj%2fvWxVS0bOqbk%3d&risl=&pid=ImgRaw&r=0"
                                width={'200px'} height={'200px'} alt="" />
                        </label>
                        <div className='mt-3'>
                            <input placeholder='Github Link' type="text" className='form-control' />
                        </div>
                        <div className='mt-3 mb-3'>
                            <input placeholder='Github Link' type="text" className='form-control' />
                        </div>
                        <button className='btn btn-success rounded w-100'>Update</button>
                    </div>
                </Collapse>
            </div>
        </>
    )
}

export default Profile