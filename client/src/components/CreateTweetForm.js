import { useNavigate} from 'react-router-dom';
import React, {useState, useEffect} from 'react';
import {Formik, Form, Field} from 'formik'
import * as Yup from 'yup'
import {usePost} from '../context/PostContext'
import {useAuth} from '../context/AuthContext'

import {FaUserCircle, FaImage, FaListUl, FaRegSmile,FaRegCalendar} from 'react-icons/fa'
import {AiOutlineFileGif, AiOutlineLoading3Quarters} from 'react-icons/ai'
import {HiOutlineLocationMarker} from 'react-icons/hi'
import {ImEarth} from 'react-icons/im'
import { format } from 'fecha';



const CreateTweetForm = ({userComment, tweet, retweet, userRetweet}) => {

    const [value, setValue] = useState('')
    const {createTweet, commentary, citedRetweet} = usePost()

    const [state, setState] = useState(false)

    const user = useAuth().state.user

    const navigate = useNavigate()

    const readFile = (file)=>{
        const reader = new FileReader()
        reader.readAsDataURL(file)
        return reader.addEventListener("load", e=>{
            let newImg = `<img src='${e.currentTarget.result}' class='object-contain max-w-[466px]' alt="avatar"></img>`
            document.querySelector(".resultado").innerHTML+=newImg
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
        <div className='container text-white border-b rounded border-neutral-800 bg-black flex px-[16px]'>
            <div className='h-full flex pt-[8px] justify-center w-[70px] mr-[12px]'>
                {user?.image 
                ? <div><img className='object-cover h-12 w-12 rounded-full' src={user.image.url} alt={user.image.public_id}/></div> 
                :<FaUserCircle className='h-12 w-12 text-neutral-800'/>
                 }
            </div>
            <div className='container'>
                
            <div className='container h-[47px] flex items-center'>
                {
                    userComment
                        ?
                        <div
                        className='text-neutral-500 flex'
                        >
                            Respondiendo a <div className='text-sky-500 pl-[5px]'>@{userComment.username}</div>
                        </div>
                        :
                        <select 
                        id="select"
                        name="select" 
                        className='bg-black border border-sky-500 focus:outline-none p-1 text-sky-500 rounded-3xl'
                        defaultValue="all"
                        >
                            <option 
                            className='text-sky-500'
                            value="all" 
                            >
                                Todos
                            </option>
                            <option 
                            className='text-green-400'
                            value="close" 
                            >
                                Circulo de Twitter
                            </option>
                        </select>
                }
                </div>
                <Formik
                initialValues={{}}
                validationSchema={Yup.object({
                    content: Yup.string().required(),
                })}

                enableReinitialize
                onSubmit={async(values, actions)=>{
                    if (userComment){
                        await commentary(tweet._id, values)
                        navigate(0)
                    }
                    else if (retweet){
                        await citedRetweet(retweet._id, values)
                        navigate(0)
                    }
                    else{
                        await createTweet(values)
                        navigate(0)
                    }
                }}
                >
                    
                {({isSubmitting, handleSubmit, setFieldValue}) => (
                    <Form 
                    className='w-full'
                    onSubmit={handleSubmit}
                    >
                            <Field
                            name='content'
                            component="textarea"
                            className='w-[95%] bg-black min-h-[55px] placeholder:text-[22px] placeholder:text-neutral-500 focus:outline-none resize-none box-border'
                            placeholder={userComment ? 'Twittea tu respuesta' : '¿Qué está pasando?'}
                            data-autoresize
                            rows="2"
                            onChange={(e)=>{
                                setValue(e.target.value)
                                setFieldValue('content',e.target.value)
                            }}
                            />
                            <div>
                                {
                                    state && <div className='resultado'></div>
                                }
                            </div>
                            {
                                retweet && 
                                <div className='mb-[20px] pt-[10px] text-white border border-neutral-600 rounded-2xl'>
                                        <div>
                                            <div className='flex items-start justify-between px-[16px]'>
                                                <div className='min-w-[24px]'>
                                                    {userRetweet?.image 
                                                        ? <div className='' ><img className='object-cover h-[20px] w-[20px] rounded-full' src={userRetweet.image.url} alt={userRetweet.image.public_id}/></div> 
                                                        :<FaUserCircle className='h-[20px] w-[20px] text-neutral-800'/>
                                                    }
                                                </div>
                                                <p 
                                                className=' font-semibold font-[arial] hover:cursor-pointer'
                                                >
                                                    {userRetweet.username}
                                                </p>
                                                <div className="text-[15px] pl-[5px] text-neutral-600">
                                                        {userRetweet?.user ? `@${userRetweet.user}`: `@${userRetweet.username}` }
                                                </div>
                                                <div className="text-[15px] pl-[5px] text-neutral-600 container ">
                                                    {format(new Date(retweet.created_at), 'DD MMM, YYYY')}
                                                </div>
                                            </div>
                                            <p className=' px-[16px]'>{retweet.content}</p>
                                            {retweet.image && <img src={retweet.image.url} className='object-cover container max-h-[300px] rounded-t rounded-xl' alt={retweet.title}/> }
                                        </div>
                                </div>
                            }
                            {
                                !userComment &&
                                <button 
                                className='w-[95%] text-sky-500 h-[39px] border-b border-neutral-800 text-left'
                                onClick={(e)=> e.preventDefault()}
                                >
                                    <ImEarth className=' w-[15px] h-[15px] inline mr-[4px]'/> 
                                     Cualquier persona puede responder
                                </button>
                            }
                            
                            <nav className='container text-neutral-800 h-[51px] flex justify-between items-center'>
                                <div className='flex justify-between w-[50%] items-center'>
                                    <div className='w-[30px] h-[30px] hover:cursor-pointer hover:bg-[#0284c730] hover:text-[#0284c7] rounded-2xl flex items-center justify-center'>
                                        <input
                                        className='absolute invisible'
                                        id="file-1"
                                        type="file" 
                                        name="image" 
                                        onChange={e => {
                                            readFile(e.target.files[0])
                                            setState(true)
                                            console.log(e.target.files[0])
                                            setFieldValue('image', e.target.files[0])
                                        }}
                                        />
                                        <label for="file-1">
                                            <FaImage title='Add Image' className=' w-[18px] h-[18px] pointer hover:cursor-pointer text-sky-500'/>
                                        </label>
                                    </div>

                                    <AiOutlineFileGif title='Add GIF' className=' w-[18px] h-[18px] hover:cursor-pointer text-sky-500'/>

                                    <FaListUl title='Survey - Not enable enough' className=' w-[18px] h-[18px]'/>

                                    <FaRegSmile title='Emojis - Not enable enough' className='w-[18px] h-[18px]'/>

                                    <FaRegCalendar title='Date - Not enable enough' className='w-[18px] h-[18px]'/>

                                    <HiOutlineLocationMarker title='Location - Not enable enough' className=' w-[18px] h-[18px]'/>

                                </div>
                                <button
                                    type='submit' 
                                    className='text-center mr-[15px] text-white font-semibold font-[arial] bg-sky-500 rounded-3xl h-[35px] w-[95px] disabled:bg-neutral-700'
                                    disabled={!value}
                                    >
                                        {isSubmitting ? (
                                            <AiOutlineLoading3Quarters className='animate-spin h-5 w5'/>
                                            ) : userComment ? 'Responder' : 'Twittear'}
                                </button>
                            </nav>
                    </Form>
                )}
                    
                </Formik>

            </div>
        </div>
    );
};

export default CreateTweetForm;