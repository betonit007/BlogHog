import Layout from '../components/Layout'
import SignupComponent from '../components/auth/SignupComponent'
import Link from 'next/link'

const Signup = () => {
    return (
        <Layout>
            <h2 className='text-center pt-4 pb-4'>Signup Page</h2>
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    <SignupComponent />
                </div>
            </div>

        </Layout>
    )
}

export default Signup

