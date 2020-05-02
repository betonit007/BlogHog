import { useState, useEffect } from 'react'
import { signin, authenticate, isAuth } from '../../actions/auth'
import Router from 'next/router'

const SignupComponent = () => {

    useEffect(() => {
        if (isAuth()) {
            Router.push('/')
        }
    }, [])

    const [values, setValues] = useState({
        email: '',
        password: '',
        error: '',
        loading: false,
        message: '',
        showForm: true
    })

    const { email, password, error, loading, message, showForm } = values

    const handleSubmit = async (e) => {
        e.preventDefault()
        setValues({ ...values, loading: true })
        const user = { email, password }

        let res = await signin(user)

        if (res.user) {
            authenticate(res, () => {
                if(isAuth() && isAuth().role === 1) {
                Router.push('/admin')
                }else Router.push('/user')
            })

        } else {
            setValues({ ...values, name: '', email: '', password: '', error: res.error ? res.error : '', loading: false, message: res.msg ? res.msg : '', showform: false })
        }
    }

    const handleChange = e => {
        setValues({
            ...values,
            error: false,
            [e.target.name]: e.target.value
        })
    }

    const showLoading = () => loading ? <div className="alert alert-info">Loading...</div> : ''

    const showError = () => error ? <div className="alert alert-danger">{error}</div> : ''

    const showMessage = () => message ? <div className="alert alert-info">{message}</div> : ''

    const signinForm = () => {
        return (
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <input onChange={handleChange} name='email' value={email} type="email" className="form-control" placeholder='Enter email' />
                </div>
                <div className="form-group">
                    <input onChange={handleChange} name='password' value={password} type="password" className="form-control" placeholder='Enter password' />
                </div>
                <div>
                    <button className="btn btn-primary">Signin</button>
                </div>
            </form>
        )
    }

    return (
        <>
            {showError()}
            {showLoading()}
            {showMessage()}
            {showForm && signinForm()}
        </>
    )
}

export default SignupComponent
