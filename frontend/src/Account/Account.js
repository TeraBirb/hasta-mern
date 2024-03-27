import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { AuthContext } from "../Context/auth-context";

import "./Account.css";

const Account = () => {
    const auth = useContext(AuthContext);
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [usernameLengthisValid, setusernameLengthisValid] = useState(false);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isInvalidCredentials, setIsInvalidCredentials] = useState(false);

    // States for changing password
    const [passwordHasNumber, setPasswordHasNumber] = useState(false);
    const [passwordLengthIsValid, setPasswordLengthIsValid] = useState(false);
    const [passwordsAreMatching, setPasswordsAreMatching] = useState(false);

    // Password change verification
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

    return (
        <div className="account">
            <h1>Account settings</h1>
            <form>
                <button disabled title="Coming soon!">
                    NIGHT MODE
                </button>
                <button onClick={auth.logout}>LOGOUT</button>
                <hr />
                <h3>Reset Username or Password</h3>
                <div className="form-control">
                    <label htmlFor="currentUsername">Current Username</label>
                    <input type="text" id="currentUsername" />
                </div>
                <div className="form-control">
                    <label htmlFor="currentPassword">Current Password</label>
                    <input type="password" id="currentPassword" />
                </div>
                <div className="form-control">
                    <label htmlFor="newUsername">New Username</label>
                    <input type="text" id="newUsername" placeholder="" />
                </div>
                <div className="form-control">
                    <label htmlFor="newPassword">New Password</label>
                    <input type="password" id="newPassword" />
                </div>
                <div className="form-control">
                    <label htmlFor="confirmNewPassword">
                        Confirm New Password
                    </label>
                    <input type="password" id="confirmNewPassword" />
                </div>
                <div className="form-actions">
                    <button type="button">RESET</button>
                </div>
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
            </form>
        </div>
    );
};

export default Account;
