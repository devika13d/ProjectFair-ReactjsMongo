import React, { useContext, useEffect, useState } from 'react'
import AddProject from './AddProject'
import { deleteProjectAPI, getUserProjectAPI } from '../services/allAPI'
import { addprojectResponseContext, editProjectResponseContext } from './context/ContextShare'
import EditProject from './EditProject'

function Myprojects() {
  const { addProjectResponse, setaddProjectResponse } = useContext(addprojectResponseContext)
  const {editprojectResponse,setEditProjectResponse}=useContext(editProjectResponseContext)
  const [userProject, setUserProject] = useState([])
  const getUserProject = async () => {
    const token = sessionStorage.getItem('token')
    const reqHeader = {
      "Content-type": "application/json",
      "Authorization": `Bearer ${token}`
    }
    const result = await getUserProjectAPI(reqHeader)
    console.log('inside my projects', result.data);
    setUserProject(result.data)
  }
  useEffect(() => {
    getUserProject()
  }, [addProjectResponse,editprojectResponse])
  const handleDelete=async(id)=>{
    const token=sessionStorage.getItem('token')
    const reqHeader={
      "Content-Type":"application/json",
      "Authorization":`Bearer ${token}`
    }
    const result=await deleteProjectAPI(id,reqHeader)
    if(result.status===200){
      alert('project deleted successfully')
      getUserProject()
    }
  }
  return (
    <>
      <div className='card shadow p-5 ms-3 me-3 mb-5 m-4'>
        <div className='d-flex mb-3'>
          <h3 className='text-success ms-3'>My Projects</h3>
          <div className='ms-auto'>
            <AddProject />
          </div>
        </div>
        <div>
          {
            userProject?.length > 0 ?
              userProject?.map((item) => (
                <div className='border d-flex align-items-center rounded p-2 mb-3'>
                  <h5>{item.title}</h5>
                  <div className='ms-auto'>
                    <EditProject project={item}/>
                    <a href={item.github} target='_blank'>
                      <button className='btn'><i className="fa-brands fa-github text-success"></i></button></a>

                    <button className='btn'><i class="fa-solid fa-trash text-danger" onClick={()=>handleDelete(item._id)}></i></button>
                  </div>
                </div>

              )) :
              <p className='text-danger fw-bolder fs-4 mt-3'>No Projects Uploaded Yet!</p>
          }


        </div>
      </div>
    </>
  )
}

export default Myprojects