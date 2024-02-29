import React, { createContext, useState } from 'react'
export const addprojectResponseContext = createContext()
export const editProjectResponseContext = createContext()
export const isAuthTokenContext = createContext()

function ContextShare({ children }) {
    //children is a predefined props used to share data between components
    //craete a state that need tobe shared
    const [addProjectResponse, setaddProjectResponse] = useState({})
    const [editProjectResponse, setEditProjectResponse] = useState({})
    const [isAuthToken, setIsAuthToken] = useState(false)
    return (
        <>
            <addprojectResponseContext.Provider value={{ addProjectResponse, setaddProjectResponse }}>
                <editProjectResponseContext.Provider value={{ editProjectResponse, setEditProjectResponse }}>
                    <isAuthTokenContext.Provider value={{ isAuthToken, setIsAuthToken }}>
                        {children}
                    </isAuthTokenContext.Provider>
                </editProjectResponseContext.Provider>
            </addprojectResponseContext.Provider >

        </>
    )
}

export default ContextShare