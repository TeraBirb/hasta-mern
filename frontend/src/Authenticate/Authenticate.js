import React, { useEffect, useState } from "react";

import "./Authenticate.css";

const Authenticate = () => {
    const [isLoginMode, setIsLoginMode] = useState(true);

    // upon password input, check if password meets requirements,
    // add green checkmark if it does and red x if it doesn't

    const [isPasswordValid, setIsPasswordValid] = useState(false);
    const [passwordHasNumber, setPasswordHasNumber] = useState(false);
    const [passwordLengthIsValid, setPasswordLengthIsValid] = useState(false);
    const [passwordsAreMatching, setPasswordsAreMatching] = useState(false);

    const passwordInputHandler = (event) => {
        const password = document.getElementById("password").value || "";
        setPasswordLengthIsValid(password.length >= 8);
        setPasswordHasNumber(/[0-9]/.test(password));
    
        // compare the password field to the confirmPassword field, if empty, set to ""
        const confirmPassword =
            document.getElementById("confirmPassword").value || "";
        setPasswordsAreMatching(password === confirmPassword);
    };
    
    useEffect(() => {
        const isValid =
            passwordHasNumber && passwordLengthIsValid && passwordsAreMatching;
        setIsPasswordValid(isValid);
    
        console.log(
            passwordHasNumber,
            passwordLengthIsValid,
            passwordsAreMatching
        );
    }, [passwordHasNumber, passwordLengthIsValid, passwordsAreMatching]);
    

    const loginHandler = () => {
        console.log("Logging in...");
    };

    const signupHandler = () => {
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
    };

    return (
        <div className="authenticate">
            <form>
                <div className="form-control">
                    <label htmlFor="email">Username</label>
                    <input type="email" id="email" />
                </div>
                <div className="form-control">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        onInput={passwordInputHandler}
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
                                onInput={passwordInputHandler}
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
