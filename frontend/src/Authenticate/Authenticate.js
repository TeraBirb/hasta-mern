import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/auth-context";
import axios from "axios";

import "./Authenticate.css";

const GREEN_CHECK = "rgb(149, 235, 52)";
const Authenticate = () => {
    const auth = useContext(AuthContext);
    const navigate = useNavigate();

    const [isLoginMode, setIsLoginMode] = useState(true);
    const [username, setUsername] = useState("");
    const [usernameLengthisValid, setusernameLengthisValid] = useState(false);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [isInvalidCredentials, setIsInvalidCredentials] = useState(false);

    // upon password input, check if password meets requirements,
    // add green checkmark if it does and red x if it doesn't

    const [passwordHasNumber, setPasswordHasNumber] = useState(false);
    const [passwordLengthIsValid, setPasswordLengthIsValid] = useState(false);
    const [passwordsAreMatching, setPasswordsAreMatching] = useState(false);

    // SIGNUP Mode: Credential requirements listener
    useEffect(() => {
        setusernameLengthisValid(username.length >= 4);
        setPasswordLengthIsValid(password.length >= 8);
        setPasswordHasNumber(/[0-9]/.test(password));
        setPasswordsAreMatching(
            password === confirmPassword && password && confirmPassword
        );
    }, [username, password, confirmPassword]);

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
                setIsInvalidCredentials(true);
                console.log(err);
            }
        }
    };

    const signupHandler = async () => {
        if (!isLoginMode) {
            console.log("Signing up...");
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
                setIsInvalidCredentials(true);
                console.log(err);
            }
        }
    };

    return (
        <div className="authenticate">
            <form>
                <div className="form-control">
                    {isInvalidCredentials && (
                        <h3>Invalid username or password. Try again.</h3>
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
                                    Username must be at least 4 characters long{" "}
                                    {usernameLengthisValid ? (
                                        <span style={{ color: GREEN_CHECK }}>
                                            &#x2713;
                                        </span>
                                    ) : (
                                        <span style={{ color: "red" }}>
                                            &#x2717;
                                        </span>
                                    )}
                                </p>
                                <p>
                                    Password must be at least 8 characters long{" "}
                                    {passwordLengthIsValid ? (
                                        <span style={{ color: GREEN_CHECK }}>
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
                                        <span style={{ color: GREEN_CHECK }}>
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
                                        <span style={{ color: GREEN_CHECK }}>
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
