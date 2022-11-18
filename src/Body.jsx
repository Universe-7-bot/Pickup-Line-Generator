import React, { useEffect, useState, useCallback, useRef } from "react";
import CancelIcon from '@mui/icons-material/Cancel';
import MenuIcon from '@mui/icons-material/Menu';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
// import IconButton from '@mui/material/IconButton';
// import GitHubIcon from '@mui/icons-material/GitHub';
// import IconButton from '@mui/material/IconButton';
import Data from "./Sdata";
import newData from "./Dank";
import ReactCanvasConfetti from "react-canvas-confetti";
import Tooltip from '@mui/material/Tooltip';
import { ToastContainer, toast, Zoom } from 'react-toastify';
import { WhatsappShareButton, WhatsappIcon } from "react-share";
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
    const [text, setText] = useState("new");
    const [count, setCount] = useState(0);
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
            if (count <= items.length - 1) {
                fire();
                // document.getElementById("line").innerHTML = items[Math.floor(Math.random() * 10)].description;
                document.getElementById("line").innerHTML = items[count].description;
                setCount(count + 1);
                document.getElementById("line").style.color = "rgb(83, 82, 82)";
            }
            else {
                document.getElementById("line").innerHTML = "Sorry!😞 No more pickup lines are available right now.";
                document.getElementById("line").style.color = "red";
                // document.getElementById("line").style.fontWeight = "bold";
            }
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

    const generateDank = () => {
        setText("dank");
        setItems(newData);
        setCount(0);
        document.getElementById("line").innerHTML = "Pickup line will be visible here";
        document.getElementById("line").style.color = "rgb(152, 149, 149)";
    }

    const generateNormal = () => {
        setText("new");
        const updated = Data.filter((value, index) => {
            return value.gender === gender;
        })

        setItems(updated);
        setCount(0);
        document.getElementById("line").innerHTML = "Pickup line will be visible here";
        document.getElementById("line").style.color = "rgb(152, 149, 149)";
    }

    return (
        <>
            {
                popup ?
                    <div className="main">
                        <div className="heading rounded-bottom d-flex flex-row">
                            {/* <div className="row"> */}
                            <div className="hamburg d-flex align-items-center justify-content-center">
                                {/* off-canvas */}
                                <button className="btn off-btn shadow rounded-2" type="button" data-bs-toggle="offcanvas" data-bs-target="#staticBackdrop" aria-controls="staticBackdrop">
                                    <MenuIcon className="text-white" />
                                </button>
                            </div>
                            <div className="head">
                                <h2 className="p-3 text-center">Welcome to Pickup Line Generator</h2>
                            </div>
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
                            <p className="text-secondary align-self-end">Made with <img className="heart" height={20} width={25} src="https://img.icons8.com/color/2x/hearts.png" alt="icon" /> by Sohan</p>
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
                        <div className="heading rounded-bottom d-flex flex-row">
                            {/* <div className="row"> */}
                            <div className="hamburg d-flex align-items-center justify-content-center">
                                {/* off-canvas */}
                                <button className="btn off-btn shadow rounded-2" type="button" data-bs-toggle="offcanvas" data-bs-target="#staticBackdrop" aria-controls="staticBackdrop">
                                    <MenuIcon className="text-white" />
                                </button>
                                <div className="offcanvas offcanvas-start rounded-end" data-bs-backdrop="static" tabindex="-1" id="staticBackdrop" aria-labelledby="staticBackdropLabel">
                                    <div className="offcanvas-header">
                                        <h5 className="offcanvas-title fw-semibold" id="staticBackdropLabel">Pickup Line Generator</h5>
                                        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                                    </div>
                                    <div className="offcanvas-body d-flex align-items-center justify-content-center">
                                        <div className="off flex-column">
                                            <div className="text-center">
                                                <button className="btn off-btn-main text-white shadow rounded-5 sbtn pudding-btn">Home</button>
                                            </div>
                                            <div className="text-center my-4">
                                                <button className="btn off-btn-main text-white shadow rounded-5 sbtn pudding-btn">About</button>
                                            </div>
                                            <div className="text-center my-4">
                                                <button onClick={generateNormal} className="btn off-btn-main text-white shadow rounded-5 sbtn pudding-btn">Normal Pickup Lines</button>
                                            </div>
                                            <div className="text-center mb-4">
                                                <button onClick={generateDank} className="btn off-btn-main text-white shadow rounded-5 sbtn pudding-btn">Dank Pickup Lines</button>
                                                <img className="px-2 heart" src="https://img.icons8.com/fluency/48/null/new--v1.png" alt="icon" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="head">
                                <h2 className="p-3 text-center">Welcome to Pickup Line Generator</h2>
                            </div>
                            {/* </div> */}
                        </div>
                        <div className="pickup d-flex align-items-center justify-content-center">
                            <div className="flex-column text-center">
                                <h3 className="m-2 text-white">Click the button to generate a {text} pickup line</h3>
                                {
                                    disabled ? <button onClick={generate} className="btn btn-primary m-2 rounded-5 sbtn splash-btn disabled fw-semibold">Generate Pickup Line</button>
                                        : <button onClick={generate} className="btn btn-primary m-2 rounded-5 sbtn splash-btn fw-semibold">Generate Pickup Line</button>
                                }
                                {/* <AwesomeButton onClick={generate} type="primary">Generate Pickup Line</AwesomeButton> */}
                                <ReactCanvasConfetti refConfetti={getInstance} style={canvasStyles} />
                                <div className="box boder border-dark bg-light m-2 mt-3 rounded-4">
                                    <div className="p-2 d-flex justify-content-end">
                                        <div className="whatsapp mx-2">
                                            <Tooltip title="Share on Whatsapp" placement="top" arrow>
                                                <WhatsappShareButton title="" url="https://universe-7-bot.github.io/Pickup-Line-Generator/">
                                                    <WhatsappIcon size={27} round={true}></WhatsappIcon>
                                                </WhatsappShareButton>
                                            </Tooltip>
                                        </div>
                                        <div className="copy">
                                            <Tooltip title="Copy text" placement="top" arrow>
                                                <ContentCopyIcon onClick={copyText} className="copy-icon" />
                                            </Tooltip>
                                            <ToastContainer position="top-right" autoClose={2000} transition={Zoom} theme="dark" />
                                        </div>
                                    </div>
                                    <div className="box-body d-flex align-items-center justify-content-center">
                                        <p id="line" className="m-2 fs-6 fw-semibold">Pickup line will be visible here</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="footer text-center">
                            <p className="text-secondary align-self-end">Made with <img className="heart" height={20} width={25} src="https://img.icons8.com/color/2x/hearts.png" alt="icon" /> by Sohan</p>
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