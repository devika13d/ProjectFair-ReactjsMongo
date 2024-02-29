import React, { useContext, useEffect } from 'react'
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import { BASE_URL } from '../services/baseurl';
import { Button } from 'react-bootstrap';
import { editUserProjectAPI } from '../services/allAPI';
import { editProjectResponseContext } from '../components/context/ContextShare'


function EditProject({ project }) {
  const { editProjectResponse, setEditProjectResponse } = useContext(editProjectResponseContext)
  // console.log(project);
  const [preview, setPreview] = useState('')
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [projectDetails, setProjectDetails] = useState({
    id: project._id,
    title: project.title,
    language: project.language,
    github: project.github,
    website: project.website,
    overview: project.overview,
    projectimage: ''
  });
  useEffect(() => {
    if (projectDetails.projectimage) {
      setPreview(URL.createObjectURL(projectDetails.projectimage))
    }
  }, [projectDetails.projectimage])
  const handleReset = () => {
    setProjectDetails({
      title: project.title,
      language: project.language,
      github: project.github,
      website: project.website,
      overview: project.overview,
      projectimage: ''
    })
    setPreview('')
  }
  const handleUpdate = async (e) => {
    e.preventDefault()
    const { title, language, github, website, overview, projectimage, id } = projectDetails;
    if (!title || !language || !github || !website || !overview || !id) {
      alert('Please fill the form completely');
    } else {
      const reqbody = new FormData();
      reqbody.append('title', title)
      reqbody.append('language', language)
      reqbody.append('github', github)
      reqbody.append('website', website)
      reqbody.append('overview', overview)
      preview ? reqbody.append("projectimage", projectimage) :
        reqbody.append('projectimage', project.projectimage)
      const token = sessionStorage.getItem('token')
      console.log(reqbody);
      console.log(token);
      console.log(preview);
      if (preview) {
        const reqHeader = {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}`
        }
        const result = await editUserProjectAPI(id, reqbody, reqHeader)
        console.log(result);
        if (result.status === 200) {
          setEditProjectResponse(result)
          alert('Project updated successfully');
          handleClose()
        } else {
          console.log(result)
        }
      } else {
        const reqHeader = {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
        const result = await editUserProjectAPI(id, reqbody, reqHeader)
        if (result.status === 200) {
          setEditProjectResponse(result)
          alert('Project updated successfully');
          handleClose()
        } else {
          alert(result)
        }
      }

    }
  }
  return (
    <>
      <button className='btn '><i class="fa-solid fa-pen-to-square text-info" onClick={handleShow}  ></i></button>

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
                <img

                  src={preview ? preview : `${BASE_URL}/uploads/${project.projectimage}`}
                  height={"200px"} alt="" />
              </label>
            </div>
            <div className='col-lg-6 d-flex flex-column justify-content-center align-items-center'>
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
          <Button variant="secondary" onClick={handleReset}>
            Reset
          </Button>
          <Button variant="success" onClick={handleUpdate}>
            Update Project
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default EditProject