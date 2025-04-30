import React, { useState } from 'react'; //To track and manage state
import { useNavigate } from 'react-router-dom'; //To programmatically moves to another page
import { FaUpload } from 'react-icons/fa6'; //An "upload" Icon for interractive UI


function Home() {
    const [fileName, setFileName] = useState(null); //stores the name of the uploaded file
    const [fileObjectUrl, setFileObjectUrl] = useState(null); //saves it URl locally 
    const navigate = useNavigate();

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFileName(file.name);
            const url = URL.createObjectURL(file);
            setFileObjectUrl(url);
            localStorage.setItem('modelURL', url); // Save to localStorage for Editor to access
        } else {
            setFileName(null);
            setFileObjectUrl(null);
        }
    };

    //when the edit button is clicked, if a file is uploaded, navigate to editor, if not "alert"...
    const handleEditClick = () => {
        if (fileObjectUrl) {
            navigate('/editor'); // Navigate to Editor
        } else {
            alert('Please upload a file first!');
        }
    };

    return (
        <div className='bg-[#FDF5BF]'> {/* The overall background */}
            <div className="h-[300px] w-full bg-[#023020]"> {/* The top background wrapping the whole content */}
                <div className="text-center py-10"> {/* The header */}
                    <h1 className="text-[#FDF5BF] font-bold text-4xl">3D SCENE</h1>
                </div>
                <div className="w-full flex justify-center my-8"> {/* The container wrapper the upload section */}
                    <div className="w-3/4 h-64 bg-[#FDF5BF] mt-14 shadow-xl rounded-xl relative flex flex-col items-center justify-center space-y-4"
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={(e) => {
                        e.preventDefault();
                        const file = e.dataTransfer.files[0];
                        if (file) {
                          setFileName(file.name);
                          const url = URL.createObjectURL(file);
                          setFileObjectUrl(url);
                          localStorage.setItem('modelURL', url);
                        }
                      }}
                    >  
                    <input
                            id="file-upload" //Accept only .glb file
                            type="file"
                            accept=".glb"
                            className="hidden"
                            onChange={handleFileChange}
                        />
                        <label //The upload button
                            htmlFor="file-upload"
                            className="bg-[#023020] text-[#FDF5BF] px-6 py-3 rounded font-bold cursor-pointer hover:bg-[#000] flex gap-2 items-center border-2 border-black transform hover:scale-105 transition duration-200"
                            style={{ zIndex: 10 }}
                        >
                            Choose 3D File
                            <FaUpload />
                        </label>
                        {/* Show the uploaded file name in italics and the the "Edit" button if a file is picked otherwise show "No file choosen" */}
                        <div className="text-black text-center">
                            {fileName ? ( 
                                <div className="flex items-center space-x-2">
                                    <span className=' italic '>{fileName}</span>
                                    <button
                                        onClick={handleEditClick}
                                        className="underline text-[#FDF5BF] leading-2 px-2 py-1 bg-black rounded hover:bg-[#535252] hover:text-black transition"
                                    >
                                        Edit
                                    </button>
                                </div>
                            ) : (
                                "No file chosen"
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-[#023020] h-[250px] w-full mt-20"></div> {/* The bottom background */}
        </div>
    );
}

export default Home;
