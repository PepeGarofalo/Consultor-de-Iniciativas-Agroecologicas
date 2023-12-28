import { useState } from "react"

export const useForm = (initData)=>{
  const [formData , setFormData]  = useState(initData)
  const handleChange = (e) =>{
       const {name,value} = e .target
      setFormData({...formData,[name]:value})
  }
  return {formData,handleChange,setFormData}
}