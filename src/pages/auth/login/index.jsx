import React from 'react'

import AuthPageFrames from '../../../components/frames/auth-page'
import LoginForm from '../../../components/forms/login'

const Login = () => {

    // swadhin@soa.ac.in
    // python9113
    return (
        <AuthPageFrames>
            <div className="my-10">
                <LoginForm />
            </div>
        </AuthPageFrames>
    )
}

export default Login
