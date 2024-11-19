import { motion } from "framer-motion";
import { useForm } from 'react-hook-form'
import { useState,useEffect} from "react";
import axios from "axios";
import { LoadingCircle } from "../../components";
import toast, { Toaster } from 'react-hot-toast';

const Contact = ({toast}) => {

    const {register,handleSubmit ,formState : {errors},clearErrors,setValue} = useForm({});

    const [isLoading,setIsLoading] = useState(false)

    const onSubmit = (data) => {

        setIsLoading(true)
        let formData = {
            service_id: 'vht_email_service',
            template_id: 'vht_email_template',
            user_id: 'f-DG52v75hbL8OvgS',
            template_params: {
                from_email : data.email,
                to_name : 'Võ Huy Thành',
                message : data.message,
                reply_to : 'vohuythanh2003@gmail.com'
            }
        }

        axios.post('https://api.emailjs.com/api/v1.0/email/send',formData)
            .then(response =>{
                toast.success((t) => (
                    <div className="flex gap-3 items-center justify-center h-full">
                        <span>Sending contact success</span>
                        <motion.button onClick={() => toast.dismiss(t.id)}
                            whileHover={{color: '#ff006e'}}
                            className=" font-mono text-[#a7a7a7] text-[25px] leading-[25px]">x</motion.button>
                    </div>
                ))
            })
            .catch(err =>{
                toast.error(() => (
                    <div className="flex gap-3 items-center justify-center h-full">
                        <span>Sending contact fail</span>
                    </div>
                ))
            })
            .finally(() =>{
                setIsLoading(false)
                setValue('email','')
                setValue('message','')
            })

    }
    useEffect(() => {
        let timeoutId =  setTimeout(() => {
            clearErrors()
        },400)
        return () => {
            clearTimeout(timeoutId)
        }
    },[errors.email])

  return (
    <div className="flex flex-col items-center justify-center my-[40px]">
        <div className="relative w-[85%] md:w-[70%]  rounded-[35px] shadow-[25px_25px_1px_rgba(0,0,0,0.5)]  md:shadow-[30px_30px_1px_rgba(0,0,0,0.5)]   bg-[rgba(255,255,255,0.21)] py-[30px] flex flex-col items-center ">
            <div className="text-yellow text-[36px] font-bold leading-[36px]  mb-[30px] lg:mb-[40px]  ">Contact Form</div>
            <form className="flex flex-col items-center w-full text-[20px]" onSubmit={handleSubmit(onSubmit)} noValidate>
                <motion.input 
                        type="email" 
                        className={`outline-none ${errors.email ? 'shake' : ''}  py-[10px]  px-[25px] rounded-[40px] font-sans mb-[30px] w-[50%] md:w-[40%] lg:w-[35%]`} 
                        placeholder="Enter your email..."
                        whileFocus={{boxShadow: "10px 10px 2px rgba(0, 0, 0, 0.5)",scale: 1.1}}
                        transition={{
                            duration: 0.2
                        }}
                        {...register("email",{required : true,
                        pattern : {value : /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,message : 'Invalid email address'}})}
                />
                <motion.textarea  
                    maxLength={100}  rows={5} 
                    className="outline-none w-[80%] py-[20px] px-[40px] rounded-[40px] font-sans resize-none" 
                    placeholder="Enter your message..."
                    whileFocus={{boxShadow: "15px 15px 2px rgba(0, 0, 0, 0.5)",scale: 1.1}}
                    transition={{
                        duration: 0.2
                    }}
                    {...register("message")}
                />
                <motion.button className={`mt-[30px] py-[5px] px-[40px] rounded-[30px] ${isLoading ? 'bg-blue-500' : 'bg-redHover'}  font-bold text-white text-[24px] cursor-pointer`}
                    style={{textShadow: "0 0 4px rgb(0,0,0)"}}
                    whileHover={{boxShadow: "7px 10px 2px rgba(0, 0, 0, 0.5)",scale: 1.1}}
                    type="submit"
                >{isLoading ? <LoadingCircle/> : 'Send'}</motion.button>
            </form>
        </div>
    </div>
  )
};
export default Contact;