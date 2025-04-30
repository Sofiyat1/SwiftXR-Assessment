import React from 'react';
import { Canvas } from '@react-three/fiber'; //Integrate a 3D scene 
import { OrbitControls, useGLTF, Html } from '@react-three/drei'; //for control and loading
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa6';
import { FaRegEdit } from 'react-icons/fa';

function Model({ url, onClick }) {
    const { scene } = useGLTF(url); //Loads the 3D model from the URL
    return (
        <primitive object={scene} scale={1} onClick={onClick} /> //Display it as primitive 3D object
    )
}

function Editor() {
    const modelURL = localStorage.getItem('modelURL'); //Retrieve the URl stored in Home.jsx


    const navigate = useNavigate();
    const goBack = () => {
        navigate(-1);
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
                onClick={goBack}
                className="items-center gap-1 cursor-pointer flex self-start pl-2 pt-2 hover:text-[#818080] text-[#bbb9b9] "
            >
                <FaArrowLeft className="text-sm " />
                <span className="font-[400] text-sm">Back</span>
            </button>

            {/* Setting up the 3D canvas */}
            <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
                <ambientLight /> {/* For general Lightning */}
                <pointLight position={[10, 10, 10]} />
                <Model url={modelURL} /> {/* Render the uploaded 3D object*/}
                <OrbitControls /> {/* lets the user rotate/zoom with their mouse */}
            </Canvas>

            <div className='bg-[#023020] w-[60px] flex flex-col self-center '>
                <FaRegEdit className='text-white  text-[30px] m-3 cursor-pointer hover:text-[#e4dba1] ' />
                <FaRegEdit className='text-white text-[30px] m-3 cursor-pointer hover:text-[#e4dba1] ' />

            </div>
        </div>
    );
}

export default Editor;
