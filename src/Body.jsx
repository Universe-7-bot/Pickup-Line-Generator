import React, { useEffect, useState, useCallback, useRef } from "react";
import CancelIcon from '@mui/icons-material/Cancel';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
// import GitHubIcon from '@mui/icons-material/GitHub';
// import IconButton from '@mui/material/IconButton';
import Data from "./Sdata";
import ReactCanvasConfetti from "react-canvas-confetti";
import Tooltip from '@mui/material/Tooltip';
import { ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../node_modules/sbuttons/dist/sbuttons.min.css"
// import { AwesomeButton } from "react-awesome-button";
// import { ReactFloatingBalloons } from "react-floating-balloons";

const canvasStyles = {
    position: "fixed",
    pointerEvents: "none",
    width: "100%",
    height: "100%",
    top: 0,
    left: 0
};

const Body = () => {
    const [popup, setPopup] = useState(false);
    const [gender, setGender] = useState("");
    const [items, setItems] = useState(Data);
    const [show, setShow] = useState(true);
    const [disabled, setDisabled] = useState(true);
    // const [pick, setPick] = useState(false);


    const refAnimationInstance = useRef(null);

    const getInstance = useCallback((instance) => {
        refAnimationInstance.current = instance;
    }, []);

    const makeShot = useCallback((particleRatio, opts) => {
        refAnimationInstance.current &&
            refAnimationInstance.current({
                ...opts,
                origin: { y: 0.7 },
                particleCount: Math.floor(200 * particleRatio)
            });
    }, []);

    const fire = useCallback(() => {
        makeShot(0.25, {
            spread: 26,
            startVelocity: 55
        });

        makeShot(0.2, {
            spread: 60
        });

        makeShot(0.35, {
            spread: 100,
            decay: 0.91,
            scalar: 0.8
        });

        makeShot(0.1, {
            spread: 120,
            startVelocity: 25,
            decay: 0.92,
            scalar: 1.2
        });

        makeShot(0.1, {
            spread: 120,
            startVelocity: 45
        });
    }, [makeShot]);


    const closePopup = () => {
        if (gender === "") toast.warning("You didn't select anything !");
        else {
            setPopup(false);
            setShow(true);
            const updatedItems = items.filter((value, index) => {
                return value.gender === gender;
            })

            setItems(updatedItems);
        }
    }
    const submitMale = () => {
        setGender("male");
        document.getElementById("male").style.backgroundColor = "rgb(40, 40, 100)";
        document.getElementById("male").style.color = "white";

        document.getElementById("female").style.backgroundColor = "rgb(172, 172, 188)";
        document.getElementById("female").style.color = "black";
    }
    const submitFemale = () => {
        setGender("female");
        document.getElementById("female").style.backgroundColor = "rgb(40, 40, 100)";
        document.getElementById("female").style.color = "white";

        document.getElementById("male").style.backgroundColor = "rgb(172, 172, 188)";
        document.getElementById("male").style.color = "black";
    }
    const generate = () => {
        if (gender === "") {
            // setPopup(true);
            // setShow(false);
        }
        else {
            fire();
            document.getElementById("line").innerHTML = items[Math.floor(Math.random() * 10)].description;
            document.getElementById("line").style.color = "rgb(83, 82, 82)";
        }
    }

    useEffect(() => {
        setTimeout(() => {
            setPopup(true);
            setShow(false);
            setDisabled(false);
        }, 2000);
    }, []);

    const copyText = () => {
        var text = document.getElementById("line").innerHTML;
        navigator.clipboard.writeText(text);
        toast.success("Successfully copied to clipboard !");
    }

    return (
        <>
            {
                popup ?
                    <div className="main">
                        <div className="heading rounded-bottom">
                            <h2 className="p-3 text-center">Welcome to Pickup Line Generator</h2>
                        </div>
                        <div className="pickup d-flex align-items-center justify-content-center">
                            <div className="popup border border-light rounded-5">
                                <div className="delete-icon text-end mx-2 mt-2">
                                    <CancelIcon onClick={closePopup} />
                                    <ToastContainer position="top-right" autoClose={2000} transition={Zoom} theme="dark" />
                                </div>
                                <div className="modal-body p-2 text-center mb-2">
                                    <h5 className="">For whom you want pickup line?</h5>
                                    <button onClick={submitMale} id="male" className="btn border-dark m-4 mt-2 rounded-5 fw-semibold shadow sbtn liquid-btn">Male</button>
                                    <button onClick={submitFemale} id="female" className="btn border-dark m-4 mt-2 rounded-5 fw-semibold shadow sbtn liquid-btn">Female</button>
                                </div>
                            </div>
                        </div>
                        <div className="footer text-center">
                            <p className="text-secondary align-self-end">Made with ❤️ by Sohan</p>
                        </div>
                    </div>
                    :
                    ""
            }
            {/* {
                Data.map((value, index) => {
                    if (value.gender === gender)
                        return <p>{value.description}</p>;
                    else
                        return "";
                })
            } */}
            {
                show ?
                    <div className="main-div">
                        <div className="heading rounded-bottom">
                            <h2 className="p-3 text-center">Welcome to Pickup Line Generator</h2>
                        </div>
                        <div className="pickup d-flex align-items-center justify-content-center">
                            <div className="flex-column text-center">
                                <h3 className="m-2 text-white">Click the button to generate a new pickup line</h3>
                                {
                                    disabled ? <button onClick={generate} className="btn btn-primary m-2 rounded-5 sbtn splash-btn disabled fw-semibold">Generate Pickup Line</button>
                                        : <button onClick={generate} className="btn btn-primary m-2 rounded-5 sbtn splash-btn fw-semibold">Generate Pickup Line</button>
                                }
                                {/* <AwesomeButton onClick={generate} type="primary">Generate Pickup Line</AwesomeButton> */}
                                <ReactCanvasConfetti refConfetti={getInstance} style={canvasStyles} />
                                <div className="box boder border-dark bg-light m-2 mt-3 rounded-4">
                                    <div className="p-2 text-end">
                                        <Tooltip title="Copy text" placement="top" arrow>
                                            <ContentCopyIcon onClick={copyText} className="copy-icon" />
                                        </Tooltip>
                                        <ToastContainer position="top-right" autoClose={2000} transition={Zoom} theme="dark" />
                                    </div>
                                    <div className="box-body d-flex align-items-center justify-content-center">
                                        <p id="line" className="m-2 fs-6 fw-semibold">Pickup line will be visible here</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="footer text-center">
                            <p className="text-secondary align-self-end">Made with ❤️ by Sohan</p>
                        </div>
                        {/* <ReactFloatingBalloons
                            count={3}
                            msgText="Yayy!!"
                            colors={["yellow", "red"]}
                            popVolumeLevel={0.1}
                        /> */}
                    </div>
                    :
                    ""
            }
        </>
    )
};

export default Body;