import { useState, useEffect } from 'react'
import { signup, isAuth } from '../../actions/auth'
import Router from 'next/router'

const SignupComponent = () => {

	useEffect(()=> {
	 if(isAuth()) {
		 Router.push('/')
	 }

	},[])

	const [values, setValues] = useState({
		name: '',
		email: '',
		password: '',
		error: '',
		loading: false,
		message: '',
		showForm: true
	})

	const { name, email, password, error, loading, message, showForm } = values

	const handleSubmit = async (e) => {
		e.preventDefault()
		setValues({ ...values, loading: true })
		const user = { name, email, password }
    
			let res = await signup(user)
			console.log(res)
      setValues({ ...values, name: '', email: '', password: '', error: res.error ? res.error : '', loading: false, message: res.msg ? res.msg : '', showform: false})
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

	const signupForm = () => {
		return (
			<form onSubmit={handleSubmit}>
				<div className="form-group">
					<input onChange={handleChange} name='name' value={name} type="text" className="form-control" placeholder='Enter name' />
				</div>
				<div className="form-group">
					<input onChange={handleChange} name='email' value={email} type="email" className="form-control" placeholder='Enter email' />
				</div>
				<div className="form-group">
					<input onChange={handleChange} name='password' value={password} type="password" className="form-control" placeholder='Enter password' />
				</div>
				<div>
					<button className="btn btn-primary">Signup</button>
				</div>
			</form>
		)
	}

	return (
		<>
		  {showError()}
			{showLoading()}
			{showMessage()}
			{showForm && signupForm()}
		</>
	)
}

export default SignupComponent
