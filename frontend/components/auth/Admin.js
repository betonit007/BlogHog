import { useEffect } from 'react'
import Router from 'next/router'
import { isAuth } from '../../actions/auth'

const Admin = ({ children }) => {

    useEffect(() => {
        if (isAuth().role !== 1) {
            Router.push('/signin')
        }
    }, [])

    return <>{children}</>
}

export default Admin;