import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber'; //Integrate a 3D scene 
import { OrbitControls, useGLTF, Html } from '@react-three/drei'; //for control and loading
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa6';
import { FaRegEdit } from 'react-icons/fa';

function Model({ url, onModelClick }) {
    const { scene } = useGLTF(url); //Loads the 3D model from the URL
    scene.traverse((child) => {
        if (child.isMesh) {
            child.userData.clickable = true;
        }
    });

    return (
        <primitive object={scene} scale={1} onClick={(e) => {
            e.stopPropagation;
            if (e.object.userData.clickable) {
                onModelClick(e.point);
                console.log(e.point)
            }
        }} /> //Display it as primitive 3D object
    )
}

function Editor2() {
    const modelURL = localStorage.getItem('modelURL'); //Retrieve the URl stored in Home.jsx
    const navigate = useNavigate();
    const [isLabel, setIsLabel] = useState(false);
    const [labelPending, setLabelPending] = useState(null);
    const [labels, setLabels] = useState([]);

    const handleEditClick = () => {
        setIsLabel(true);
        setLabelPending(null);
    };

    const handleModelClick = (point) => {
        if (isLabel) {
            setLabelPending(point)
        }
    };

    const handleLabelSubmit = (e) => {
        e.preventDefault();
        const text = e.target.elements.label.value.trim();
        if (text) {
            setLabels([...labels, { position: labelPending, text }]);
        }
        setLabelPending(null);
        setIsLabel(false);
    };


    //If no URL exists
    if (!modelURL) {
        return (
            <div className="flex items-center justify-center h-screen bg-black text-white">
                No model selected. Go back and upload a file.
            </div>
        );
    }

    return (
        <div className="h-screen w-full bg-black flex"> {/* The overall background */}
            {/* The Back Button */}
            <button
                onClick={() => navigate(-1)}
                className="items-center gap-1 cursor-pointer flex self-start pl-2 pt-2 hover:text-[#818080] text-[#bbb9b9] "
            >
                <FaArrowLeft className="text-sm " />
                <span className="font-[400] text-sm">Back</span>
            </button>

            {/* Setting up the 3D canvas */}
            <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
                <ambientLight /> {/* For general Lightning */}
                <pointLight position={[10, 10, 10]} />
                <Model url={modelURL} onModelClick={handleModelClick} /> {/* Render the uploaded 3D object*/}
                <OrbitControls /> {/* lets the user rotate/zoom with their mouse */}

                {labels.map((label, i) => (
                    <Html key={i} position={label.position}>
                        <div className="bg-white text-black text-xs px-2 py-1 rounded shadow"> {label.text}
                        </div>
                    </Html>
                ))}
                {labelPending && (
                    <Html position={labelPending} >
                        <form
                            onSubmit={handleLabelSubmit}
                            className="bg-white p-2 rounded shadow flex flex-col"
                        >
                            <input
                                type="text"
                                name="label"
                                placeholder="type label..."
                                autoFocus
                                className="text-sm px-1 py-1 rounded border border-gray-300 mb-2"
                            />
                            <button
                                type="submit"
                                className="bg-[#023020] text-[#FDF5BF] text-xs px-1 py-1 rounded hover:bg-white font-bold hover:text-[#023020] border-2 border-[#023020] "
                            >
                                Add Label
                            </button>
                        </form>
                    </Html>
                )}
            </Canvas>

            <div className='bg-[#023020] w-[60px] flex flex-col self-center '>
                <FaRegEdit onClick={handleEditClick} title='Click on the model to start labeling' className='text-white  text-[30px] m-3 cursor-pointer hover:text-[#e4dba1] ' />
                <FaRegEdit onClick={handleEditClick} title='Click on the model to start labeling' className='text-white text-[30px] m-3 cursor-pointer hover:text-[#e4dba1] ' />

            </div>
        </div>
    );
}

export default Editor2;
