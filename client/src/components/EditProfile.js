import React, {useEffect, useState} from 'react';
import {Formik, Form, Field} from 'formik'
import { useNavigate} from 'react-router-dom';

import {useAuth} from '../context/AuthContext'
import { useUser } from '../context/UserContext';

import {AiOutlineLoading3Quarters, AiOutlineCamera} from 'react-icons/ai'
import { FaUserCircle } from 'react-icons/fa';
 
const EditProfile = () => {

    const {updateUser} = useUser()
    const user = useAuth().state.user

    const [userState, setUserState] = useState(false)
    const [coverState, setCoverState] = useState(false)
    
    const navigate = useNavigate()

    const readFile = (file)=>{
        const reader = new FileReader()
        reader.readAsDataURL(file)
        return reader.addEventListener("load", e=>{
            let newImg = `<img src='${e.currentTarget.result}' class='object-cover h-[133px] w-[133px] rounded-full border-4 border-black' alt="avatar"></img>`
            document.querySelector(".resultado").innerHTML+=newImg
        })
    }

    const readCover = (file)=>{
        const reader = new FileReader()
        reader.readAsDataURL(file)
        return reader.addEventListener("load", e=>{
            let newImg = `<img src='${e.currentTarget.result}' class='object-cover h-[200px] w-[600px]' alt="avatar"></img>`
            document.querySelector(".resultado-cover").innerHTML+=newImg
        })
    }

    useEffect(()=>{
        const addAutoResize = () => {
            document.querySelectorAll('[data-autoresize]').forEach(function (element) {
              element.style.boxSizing = 'border-box';
              var offset = element.offsetHeight - element.clientHeight;
              element.addEventListener('input', function (event) {
                event.target.style.height = 'auto';
                event.target.style.height = event.target.scrollHeight + offset + 'px';
              });
              element.removeAttribute('data-autoresize');
            });
          }
          addAutoResize()
    }, [])

    return (
        <div>

            <div>
                {coverState 
                    ?<div className='resultado-cover'>
                        <div className='absolute h-[200px] w-[600px] flex items-center justify-center'>
                            <label for="user-cover">
                                <div className='w-[42px] h-[42px] hover:cursor-pointer hover:bg-neutral-800/50 rounded-full flex items-center justify-center'>
                                    <AiOutlineCamera
                                    className='w-[22px] h-[22px] hover:cursor-pointer'/>
                                </div>
                            </label>
                        </div>
                    </div>

                    : user?.cover
                        ? <div>
                            <div className='absolute h-[200px] w-[600px] flex items-center justify-center'>
                                <label for="user-cover">
                                    <div className='w-[42px] h-[42px] hover:cursor-pointer hover:bg-neutral-800/50 rounded-full flex items-center justify-center'>
                                        <AiOutlineCamera
                                        className='w-[22px] h-[22px] hover:cursor-pointer'/>
                                    </div>
                                </label>
                            </div>
                            <img className='object-cover h-[200px] w-[596px]' src={user.cover.url} alt={user.cover.public_id} />
                          </div>
                        : <div className='h-[200px] container bg-amber-700 flex items-center justify-center'>
                            <label for="user-cover">
                                <div className='w-[42px] h-[42px] hover:cursor-pointer hover:bg-neutral-800/50 rounded-full flex items-center justify-center'>
                                    <AiOutlineCamera
                                    className='w-[22px] h-[22px] hover:cursor-pointer'/>
                                </div>
                            </label>
                        </div>
                    
                }
                
            </div>

            <div className='mt-[-70px] ml-[-20px] px-[32px]'>
            <div>
                {
                    userState ? <div className='resultado'></div> : (
                        
                        user?.image 
                            ?  <div>
                                  <img className='object-cover h-[133px] w-[133px] rounded-full border-4 border-black' src={user.image.url} alt={user.image.public_id}/>
                               </div> 
                            :  <FaUserCircle className='h-[133px] w-[133px] text-neutral-800'/>
                        )
                }
            </div>
                
                <div className='absolute h-[133px] w-[133px] mt-[-84px] ml-[12px] px-[32px]'>
                    <label for="user-image">
                        <div className='w-[42px] h-[42px] hover:cursor-pointer hover:bg-neutral-800/50 rounded-full flex items-center justify-center'>
                            <AiOutlineCamera
                            className='w-[22px] h-[22px] hover:cursor-pointer'/>
                        </div>
                    </label>
                </div>
            </div>
            <Formik
            initialValues={{}}
            enableReinitialize
            onSubmit={async(values, actions)=>{
                await updateUser(user._id,values)
                navigate(0)
            }}
            >
                {({isSubmitting, handleSubmit, setFieldValue}) => (
                <Form 
                className='w-full px-[32px]'
                onSubmit={handleSubmit}
                >
                    <Field
                    name='user'
                    component="textarea"
                    className='w-[95%] bg-black min-h-[56px] border border-neutral-800 rounded rounded-lg my-[16px] p-[6px]
                    placeholder:text-[15px] placeholder:text-neutral-500 placeholder:p-[8px]
                    focus:outline-none resize-none box-border'
                    placeholder='  Nombre'
                    data-autoresize
                    rows="2"
                    onChange={(e)=>{
                        setFieldValue('user',e.target.value)
                    }}

                    />
                    <Field
                    name='description'
                    component="textarea"
                    className='w-[95%] bg-black min-h-[56px] border border-neutral-800 rounded rounded-lg p-[6px]
                    my-[16px] placeholder:text-[15px] placeholder:text-neutral-500 focus:outline-none resize-none box-border'
                    placeholder='  Descripción'
                    data-autoresize
                    rows="2"
                    onChange={(e)=>{
                        setFieldValue('description',e.target.value)
                    }}
                    />
                    <input 
                    type="file" 
                    id="user-image"
                    name="image" 
                    className='absolute invisible'
                    onChange={e => {
                        readFile(e.target.files[0])
                        setUserState(true)
                        setFieldValue('image', e.target.files[0])
                    }}
                    />
                    <input 
                    type="file" 
                    id="user-cover"
                    name="cover" 
                    className='absolute invisible'
                    onChange={e => {
                        readCover(e.target.files[0])
                        setCoverState(true)
                        setFieldValue('cover', e.target.files[0])
                    }}
                    />
                    <div className='w-[95%] flex justify-end'>
                        <button
                        type='submit' 
                        className='text-center text-black font-semibold font-[arial] bg-white rounded-3xl h-[35px] w-[95px] disabled:bg-neutral-700'
                        >
                            {isSubmitting ? (
                                <AiOutlineLoading3Quarters className='animate-spin h-5 w5'/>
                                ) : 'Guardar'}
                        </button>
                    </div>
                </Form>
                )}
            </Formik>
        </div>
    );
};

export default EditProfile;