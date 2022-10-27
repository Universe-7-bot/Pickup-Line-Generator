import React, { useEffect, useState } from "react";
import CancelIcon from '@mui/icons-material/Cancel';
import Data from "./Sdata";

const Body = () => {
    const [popup, setPopup] = useState(false);
    const [gender, setGender] = useState("");
    const [items, setItems] = useState(Data);
    const [show, setShow] = useState(true);
    // const [pick, setPick] = useState(false);

    const closePopup = () => {
        if (gender === "") alert("Select your gender first!!!");
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

        document.getElementById("female").style.backgroundColor = "rgb(200, 200, 212)";
        document.getElementById("female").style.color = "black";
    }
    const submitFemale = () => {
        setGender("female");
        document.getElementById("female").style.backgroundColor = "rgb(40, 40, 100)";
        document.getElementById("female").style.color = "white";

        document.getElementById("male").style.backgroundColor = "rgb(200, 200, 212)";
        document.getElementById("male").style.color = "black";
    }
    const generate = () => {
        if (gender === "") {
            setPopup(true);
            setShow(false);
        }
        else document.getElementById("line").innerHTML = items[Math.floor(Math.random() * 10)].description;
    }
    // useEffect(() => {
    //     setTimeout(() => {
    //         setPopup(true);
    //         setShow(false);
    //     }, 2000);
    // }, []);

    return (
        <>
            {
                popup ?
                    <div className="main">
                        <div className="heading rounded-bottom">
                            <h2 className="p-3 text-center">Welcome to Pickup Line Generator</h2>
                        </div>
                        <div className="pickup d-flex align-items-center justify-content-center">
                            <div className="popup border border-light bg-light rounded-5 shadow">
                                <div className="delete-icon text-end mx-2 mt-2">
                                    <CancelIcon onClick={closePopup} />
                                </div>
                                <div className="modal-body text-center mb-2">
                                    <h3 className="">For whom you want pickup line?</h3>
                                    <button onClick={submitMale} id="male" className="btn border-dark m-4 mt-2 rounded-5 fw-semibold shadow">Male</button>
                                    <button onClick={submitFemale} id="female" className="btn border-dark m-4 mt-2 rounded-5 fw-semibold shadow">Female</button>
                                </div>
                            </div>
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
                                <h4 className="m-2 text-white">Click the button to generate a new pickup line</h4>
                                <button onClick={generate} className="btn btn-primary m-2 rounded-5">Generate Pickup Line</button>
                                <p id="line" className="m-2 text-white">Pickup line will be visible here</p>
                            </div>
                        </div>
                    </div>
                    :
                    ""
            }
        </>
    )
};

export default Body;