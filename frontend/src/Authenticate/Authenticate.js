import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/auth-context";
import axios from "axios";

import "./Authenticate.css";

const Authenticate = () => {
    const auth = useContext(AuthContext);
    const navigate = useNavigate();

    const [isLoginMode, setIsLoginMode] = useState(true);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [isInvalidCredentials, setIsInvalidCredentials] = useState(false);

    // upon password input, check if password meets requirements,
    // add green checkmark if it does and red x if it doesn't

    const [isPasswordValid, setIsPasswordValid] = useState(false);
    const [passwordHasNumber, setPasswordHasNumber] = useState(false);
    const [passwordLengthIsValid, setPasswordLengthIsValid] = useState(false);
    const [passwordsAreMatching, setPasswordsAreMatching] = useState(false);

    // SIGNUP Mode: Password requirements listener
    useEffect(() => {
        setPasswordLengthIsValid(password.length >= 8);
        setPasswordHasNumber(/[0-9]/.test(password));
        setPasswordsAreMatching(password === confirmPassword);
    }, [password, confirmPassword]);

    // SIGNUP Mode: isValid Setter
    useEffect(() => {
        const isValid =
            passwordHasNumber && passwordLengthIsValid && passwordsAreMatching;
        setIsPasswordValid(isValid);
    }, [passwordHasNumber, passwordLengthIsValid, passwordsAreMatching]);

    // Input field listeners
    const handleUsernameInput = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordInput = (event) => {
        setPassword(event.target.value);
    };

    const handleConfirmPasswordInput = (event) => {
        setConfirmPassword(event.target.value);
    };

    // User logging in
    const loginHandler = async () => {
        if (isLoginMode) {
            console.log("Logging in...");
            try {
                const response = await axios.post(
                    process.env.REACT_APP_BACKEND_URL + "/user/login",
                    {
                        username,
                        password,
                    },
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );
                console.log(response);
                auth.login(response.data.userId, response.data.token);
                navigate("/");
            } catch (err) {
                console.log(err);
            }
        }
    };

    const signupHandler = async () => {
        if (!isLoginMode) {
            console.log("Signing up...");
            console.log(
                "Password is valid: ",
                isPasswordValid,
                "Password has number: ",
                passwordHasNumber,
                "Password is at least 8 characters long: ",
                passwordLengthIsValid,
                "Passwords match: ",
                passwordsAreMatching
            );
            try {
                const response = await axios.post(
                    process.env.REACT_APP_BACKEND_URL + "/user/signup",
                    {
                        username,
                        password,
                        confirmPassword,
                    },
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );
                console.log(response);
                auth.login(response.data.userId, response.data.token);
                navigate("/");
            } catch (err) {
                console.log(err);
            }
        }
    };

    return (
        <div className="authenticate">
            <form>
                <div className="form-control">
                    {isInvalidCredentials && (
                        <h3>Invalid username or password. Try Again</h3>
                    )}
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        onInput={handleUsernameInput}
                    />
                </div>
                <div className="form-control">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        onInput={handlePasswordInput}
                    />
                </div>
                <div className="form-actions">
                    {isLoginMode ? (
                        <React.Fragment>
                            <button type="button" onClick={loginHandler}>
                                LOGIN
                            </button>

                            <button
                                type="button"
                                onClick={() =>
                                    setIsLoginMode((prevMode) => !prevMode)
                                }
                            >
                                Switch to Signup
                            </button>
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            <label htmlFor="confirmPassword">
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                id="confirmPassword"
                                onInput={handleConfirmPasswordInput}
                            />
                            <div className="passwordRequirements">
                                <p>
                                    Password must be at least 8 characters long{" "}
                                    {passwordLengthIsValid ? (
                                        <span style={{ color: "green" }}>
                                            &#x2713;
                                        </span>
                                    ) : (
                                        <span style={{ color: "red" }}>
                                            &#x2717;
                                        </span>
                                    )}
                                </p>
                                <p>
                                    Password must contain at least one number{" "}
                                    {passwordHasNumber ? (
                                        <span style={{ color: "green" }}>
                                            &#x2713;
                                        </span>
                                    ) : (
                                        <span style={{ color: "red" }}>
                                            &#x2717;
                                        </span>
                                    )}
                                </p>
                                <p>
                                    Password and confirm password must match{" "}
                                    {passwordsAreMatching ? (
                                        <span style={{ color: "green" }}>
                                            &#x2713;
                                        </span>
                                    ) : (
                                        <span style={{ color: "red" }}>
                                            &#x2717;
                                        </span>
                                    )}
                                </p>
                            </div>
                            <button type="button" onClick={signupHandler}>
                                SIGNUP
                            </button>

                            <button
                                type="button"
                                onClick={() =>
                                    setIsLoginMode((prevMode) => !prevMode)
                                }
                            >
                                Switch to Login
                            </button>
                        </React.Fragment>
                    )}
                </div>
            </form>
        </div>
    );
};

export default Authenticate;
