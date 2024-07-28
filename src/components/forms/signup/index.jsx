import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import apiEndpoints from "../../../services/api";
import { showSuccessToast, showErrorToast } from '../../../components/tosters/notifications'

import { FaArrowRight } from "react-icons/fa";
import { BiHide, BiShow } from 'react-icons/bi';
import { MdConfirmationNumber } from "react-icons/md";
import { GiConfirmed } from "react-icons/gi";

const SignUpForm = () => {

    const [isLoading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordsMatch, setPasswordsMatch] = useState(false);

    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleRegistration = async (e) => {

        e.preventDefault();

        // Validation checks
        if (!name) {
            showErrorToast("Name are Required")
            return;
        }
        if (!email) {
            showErrorToast("Email are Required")
            return;
        }
        if (!password) {
            showErrorToast("Password are Required")
            return;
        }

        if (!email.endsWith("@soa.ac.in")) {
            showErrorToast("Email must end with '@soa.ac.in'")
            return;
        }

        if (password.length < 6) {
            showErrorToast("Password must be at least 6 characters long")
            return;
        }

        if (password !== confirmPassword) {
            showErrorToast("Password and Confirm Password do not match")
            setPasswordsMatch(false);
            return;
        }

        try {
            if (name && email && password && email.endsWith("@soa.ac.in") && password.length > 6 && password === confirmPassword) {
                setLoading(true)
                await apiEndpoints.register({ name, email, password });
                setLoading(false);
                setPasswordsMatch(true);
                showSuccessToast("Regiester Successfully !!")
                navigate('/teacher-login');
            } else {
                console.error('Error in input fiels')
            }
        } catch (error) {
            console.error("Error while registeration : ", error)
            setLoading(false);
            showErrorToast("Something Went Wrong!! Try again later")
        }

    };

    const handleConfirmPasswordChange = (e) => {
        const { value } = e.target;
        setConfirmPassword(value);

        // Update passwordsMatch state dynamically
        setPasswordsMatch(value === password);
    };

    const disableEvent = (e) => {
        e.preventDefault();
    };

    return (
        <form className="l">
            <input
                className="input-ghost-secondary input w-full my-3 text-secondary"
                placeholder="Name"
                type='text'
                value={name}
                onChange={(value) => setName(value.target.value)}
            />
            <div className="flex flex-col my-3">
                <input
                    className="input-ghost-secondary input w-full text-secondary"
                    placeholder="yourEmail@soa.ac.in"
                    type='email'
                    value={email}
                    onChange={(value) => setEmail(value.target.value)}
                />
                {/* <small className='text-red-700 text-xs'><strong>Note:- </strong> Email Must Be Of soa.ac.in</small> */}
            </div>
            <div className="flex my-3">
                <input
                    className="input-ghost-secondary input w-full text-secondary"
                    placeholder="Password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={password}
                    onChange={(value) => setPassword(value.target.value)}
                    onCut={disableEvent}
                    onCopy={disableEvent}
                    onPaste={disableEvent}
                    onSelect={disableEvent}
                />
                <button
                    type="button"
                    className="btn btn-outline-secondary my-auto relative right-14 border-none"
                    onClick={togglePasswordVisibility}
                >
                    {showPassword ? <BiHide /> : <BiShow />}
                </button>
            </div>
            <div className="flex my-3">
                <input
                    className="input-ghost-secondary input text-secondary"
                    placeholder="Confirm Password"
                    type="password"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    onCut={disableEvent}
                    onCopy={disableEvent}
                    onPaste={disableEvent}
                    onSelect={disableEvent}
                />
                <div className='my-auto' >
                    <span className="badge badge-outline-secondary rounded-none relative right-12 border-none">
                        {passwordsMatch ? <GiConfirmed className='text-2xl' /> : <MdConfirmationNumber className='text-2xl' />}
                    </span>
                </div>
            </div>

            {isLoading ? (
                <button className="btn bg-red-700 w-1/2 mt-2">
                    Loading ...
                </button>
            ) : (
                <button className="btn btn-secondary w-1/2 mt-2" onClick={handleRegistration}>
                    SignUp  <FaArrowRight className='mx-2' />
                </button>
            )}
            <br />

            <small className='text-black' >
                Already Having an Account ?
                <Link to='/teacher-login' className='text-blue-600'> Login</Link>
            </small>
        </form>
    )
}

export default SignUpForm
