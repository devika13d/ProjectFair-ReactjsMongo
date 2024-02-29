import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { addProjectAPI } from '../services/allAPI';
import { addprojectResponseContext } from './context/ContextShare';


function AddProject() {
  const {addProjectResponse, setaddProjectResponse}=useContext(addprojectResponseContext)
  //useContext hook is used to access contextAPI
  const [projectDetails, setProjectDetails] = useState({
    title: '',
    language: '',
    github: '',
    website: '',
    overview: '',
    projectimage: ''
  });
  const [preView, setPreView] = useState('')
  const [token, setToken] = useState('')
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    setToken(sessionStorage.getItem('token'))
  }, [])

  const handleAdd = async (e) => {
    e.preventDefault()
    // console.log('get project details', projectDetails);
    const { title, language, github, website, overview, projectimage } = projectDetails;

    if (!title || !language || !github || !website || !overview || !projectimage) {
      alert('Fill the form completely')
    } else {
      //for uploading files we have to send data as formdata
      //content type is multipart/form-data
      const reqbody = new FormData()
      reqbody.append('title', title)
      reqbody.append('language', language)
      reqbody.append('github', github)
      reqbody.append('website', website)
      reqbody.append('overview', overview)
      reqbody.append('projectimage', projectimage)

      const reqHeader = {
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${token}`
      }
      const result = await addProjectAPI(reqbody, reqHeader)
      if (result.status === 200) {
        alert('Project added successfullY')
        setaddProjectResponse(result)
        handleCloseClear();
        handleClose()
      } else {
        alert(result.response.data)
      }
    }
  }
  useEffect(() => {
    if (projectDetails.projectimage) {
      //default code to create Preview of image that we take from input box with type file
      setPreView(URL.createObjectURL(projectDetails.projectimage))
    }
  }, [projectDetails.projectimage])


  const handleCloseClear = () => {
    setProjectDetails({
      title: '',
      language: '',
      github: '',
      website: '',
      overview: '',
      projectimage: ''
    })
    setPreView('')
  }
 

  return (
    <>
      <Button variant="success" onClick={handleShow}>Add Project</Button>
      <Modal show={show} onHide={handleClose} size='lg'>
        <Modal.Header closeButton>
          <Modal.Title>Add Project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='row'>
            <div className='col-lg-6'>
              <label htmlFor="project-ImageUpload">
                <input type="file" style={{ display: 'none' }}
                  onChange={(e => setProjectDetails({ ...projectDetails, projectimage: e.target.files[0] }))}
                  id='project-ImageUpload' />
                <img src={preView ? preView : "https://www.pngplay.com/wp-content/uploads/8/Upload-Icon-Logo-PNG-Photos.png"}
                  height={"200px"} alt="" />
              </label>
            </div>
            <div className='col-lg-6 d-flex flex-column justify-content-center align-items-center '>
              <div className='w-100 mt-3 mb-3'>
                <input type="text" value={projectDetails.title}
                  onChange={(e => setProjectDetails({ ...projectDetails, title: e.target.value }))} className='form-control' placeholder='Project title' />
              </div>
              <div className='mt-3 mb-2 w-100'>
                <input type="text" className='form-control'
                  value={projectDetails.language}
                  onChange={(e => setProjectDetails({ ...projectDetails, language: e.target.value }))} placeholder='Languages used' />
              </div>
              <div className='mt-3 mb-2 w-100'>
                <input type="text" className='form-control'
                  value={projectDetails.github}
                  onChange={(e => setProjectDetails({ ...projectDetails, github: e.target.value }))} placeholder='GitHub Url' />
              </div>
              <div className='mt-3 mb-2 w-100'>
                <input type="text" className='form-control'
                  value={projectDetails.website}
                  onChange={(e => setProjectDetails({ ...projectDetails, website: e.target.value }))} placeholder='Website Url' />
              </div>
              <div className='mt-3 mb-2 w-100'>
                <textarea className='form-control'
                  value={projectDetails.overview}
                  onChange={(e => setProjectDetails({ ...projectDetails, overview: e.target.value }))} placeholder='OverView'></textarea>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseClear}>
            Clear
          </Button>
          <Button variant="success" onClick={handleAdd}>
            Add Project
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default AddProject