import React, {useState} from 'react';
import {Formik, Form} from 'formik'
import {AiOutlineLoading3Quarters} from 'react-icons/ai'
import {FaUserCircle} from 'react-icons/fa'
import {useAuth} from '../context/AuthContext'
import { useUser } from '../context/UserContext';
import {useNavigate} from 'react-router-dom'


const ImageUpload = () => {

    const navigate = useNavigate()

    const [state, setState] = useState(false)

    const user = useAuth().state.user
    const {updateUser} = useUser()

    const readFile = (file)=>{
        const reader = new FileReader()
        reader.readAsDataURL(file)
        return reader.addEventListener("load", e=>{
            let newImg = `<img src='${e.currentTarget.result}' class='object-cover h-32 w-32 rounded-full' alt="avatar"></img>`
            document.querySelector(".resultado").innerHTML+=newImg
        })
    }
    return (
        <div className='w-[100vw] h-[100vh] flex justify-center items-center bg-neutral-900'>
            <div className="bg-black text-white rounded-xl h-[65vh] w-[500px]">            
                <div className="h-[70%] flex flex-col justify-around items-center mt-6">
                    <div className='flex flex-col justify-around items-center'>
                        {
                            state ? <div className='resultado'></div>  : <FaUserCircle className='h-32 w-32 text-white'/>
                        }
                    <h2
                    className='font-semibold text-xl'
                    >
                        {user.username}
                    </h2>
                    </div>
                    <Formik
                    initialValues={{}}
                    enableReinitialize
                    onSubmit={async (values, actions)=>{
                        await updateUser(user._id, values)
                    }}
                    >
                    {({ handleSubmit, setFieldValue, isSubmitting }) => (
                        <Form
                        className="flex flex-col justify-around items-center"
                        onSubmit={handleSubmit}
                        
                        >
                        <input 
                        type="file" 
                        name="image" 
                        className='px-3 py-2 focus:outline-none rounded bg-gray-600 text-white w-full'
                        onChange={e => {
                            readFile(e.target.files[0])
                            setState(true)
                            setFieldValue('image', e.target.files[0])
                        }}
                        />
                        <button 
                        type='submit' 
                        className='bg-indigo-600 hover:bg-indigo-500 px-4 py-1 rounded to-white 
                        focus:outline-none disabled:bg-indigo-400 mt-6'
                        disabled={isSubmitting}
                        >
                        {isSubmitting ? (
                            <AiOutlineLoading3Quarters className='animate-spin h-5 w5'/>
                            ) : 'Guardar'}
                        </button>
                        </Form>
                    )}
                    </Formik>
                </div>
                <div className="flex items-center justify-center px-2 py-1 mx-2 my-3 text-[15px]">
                <button 
                className="text-sky-600 hover:cursor-pointer inline"
                onClick={()=>{navigate('/')}}
                > 
                    Omitir
                </button>
                </div>
            </div>
        </div>
    );
};

export default ImageUpload;