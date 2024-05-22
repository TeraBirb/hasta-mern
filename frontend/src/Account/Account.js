import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { AuthContext } from "../Context/auth-context";

import "./Account.css";

const Account = () => {
    const auth = useContext(AuthContext);
    const navigate = useNavigate();

    // Form states
    const [currentUsername, setCurrentUsername] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newUsername, setNewUsername] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    // States for changing username and password
    const [isInvalidCredentials, setIsInvalidCredentials] = useState(false);
    const [usernameLengthisValid, setusernameLengthisValid] = useState(false);
    const [passwordHasNumber, setPasswordHasNumber] = useState(false);
    const [passwordLengthIsValid, setPasswordLengthIsValid] = useState(false);
    const [passwordsAreMatching, setPasswordsAreMatching] = useState(false);

    // Credential change verification
    useEffect(() => {
        setusernameLengthisValid(newUsername.length >= 4);
        setPasswordLengthIsValid(newPassword.length >= 8);
        setPasswordHasNumber(/[0-9]/.test(newPassword));
        setPasswordsAreMatching(
            newPassword === confirmPassword && newPassword && confirmPassword
        );
    }, [newUsername, newPassword, confirmPassword]);

    // Input field listeners
    const handleCurrentUsernameInput = (event) => {
        setCurrentUsername(event.target.value);
    };

    const handleCurrentPasswordInput = (event) => {
        setCurrentPassword(event.target.value);
    };

    const handleNewUsernameInput = (event) => {
        setNewUsername(event.target.value);
    };

    const handleNewPasswordInput = (event) => {
        setNewPassword(event.target.value);
    };

    const handleConfirmPasswordInput = (event) => {
        setConfirmPassword(event.target.value);
    };

    // Resetting username or password
    const resetHandler = async (event) => {
        event.preventDefault();
        // console.log("Resetting...");
        try {
            await axios.patch(
                process.env.REACT_APP_BACKEND_URL + "/user/change-credentials",
                {
                    currentUsername,
                    currentPassword,
                    newUsername,
                    newPassword,
                    confirmPassword,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            // console.log(response);
            // auth.logout();
            // auth.login(response.data.userId, response.data.token);
            navigate("/");
        } catch (err) {
            setIsInvalidCredentials(true);
            console.log(err);
        }
    };

    const logoutHandler = event => {
        event.preventDefault();
        auth.logout();
        navigate("/");
    };

    return (
        <div className="account bg-2">
            <h1>Account settings</h1>
            <form>
                <button disabled title="Coming soon!">
                    NIGHT MODE
                </button>
                <button className="hl-1"  onClick={logoutHandler}>LOGOUT</button>
                <hr />
                <h3>Reset Username or Password</h3>
                {isInvalidCredentials && (
                    <h3>Invalid username or password. Try again.</h3>
                )}
                <div className="form-control">
                    <label htmlFor="currentUsername">Current Username</label>
                    <input
                        type="text"
                        id="currentUsername"
                        onInput={handleCurrentUsernameInput}
                    />
                </div>
                <div className="form-control">
                    <label htmlFor="currentPassword">Current Password</label>
                    <input
                        type="password"
                        id="currentPassword"
                        onInput={handleCurrentPasswordInput}
                    />
                </div>
                <div className="form-control">
                    <label htmlFor="newUsername">New Username</label>
                    <input
                        type="text"
                        id="newUsername"
                        onInput={handleNewUsernameInput}
                        placeholder="No change"
                    />
                </div>
                <div className="form-control">
                    <label htmlFor="newPassword">New Password</label>
                    <input
                        type="password"
                        id="newPassword"
                        onInput={handleNewPasswordInput}
                        placeholder="No change"
                    />
                </div>
                {newPassword && (
                    <div className="form-control">
                        <label htmlFor="confirmNewPassword">
                            Confirm New Password
                        </label>
                        <input
                            type="password"
                            id="confirmNewPassword"
                            onInput={handleConfirmPasswordInput}
                        />
                    </div>
                )}
                <div className="form-actions">
                    <button className="hl-1" type="button" onClick={resetHandler}>
                        RESET
                    </button>
                </div>
                <div className="passwordRequirements">
                    {newUsername && (
                        <p>
                            Username must have 4 characters minimum{" "}
                            {usernameLengthisValid ? (
                                <span style={{ color: "green" }}>&#x2713;</span>
                            ) : (
                                <span style={{ color: "red" }}>&#x2717;</span>
                            )}
                        </p>
                    )}
                    {newPassword && (
                        <React.Fragment>
                            <p>
                                Password must have 8 characters minimum{" "}
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
                                Password must include a number{" "}
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
                                Passwords must match{" "}
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
                        </React.Fragment>
                    )}
                </div>
            </form>
        </div>
    );
};

export default Account;
