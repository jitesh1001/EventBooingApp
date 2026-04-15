import { createContext,useState,useEffect} from "react";

import api from "../Utils/axios"

export const AuthContext = createContext();


export const AuthProvider = ({children}) => {
    const [user,setUser] = useState(null);
    const [loading, setLoading] = useState(true);
  
  
    const [otpemail,setotpemail] = useState("");
     useEffect(() => {
     const fetchUser = async () => {
      try {
      const res = await api.get("/auth/me");
      setUser(res.data);
       } catch (err) {
        console.log(err);
        setUser(null);
    }finally{
        setLoading(false);
    }
  };

  fetchUser();
}, []);



     const register = async(form) => {
         const { name, email, password } = form;
        try{
            
            await api.post("/auth/register",{
                name ,
                email,
                password
            });

            
            setotpemail(email);
            return {success:true,message: "OTP sent to your email"}
        } catch(err) {
    console.log(err.response?.data); // ✅ see exact error message
    console.log(err.response?.data?.message);
    return { success: false, message: err.response?.data?.message };
  }
    }


    const verifyOtp = async(otp) => {
        if(!otpemail){
            return {success : false,message : "session experied"};
        }
        try{
         
            const res =  await api.post("/auth/otpverify",{
              email : otpemail,
              otp
            });

           setUser(res.data.user);
           console.log(res.data.user);
           
           setotpemail("");
          return {success: true};
    }catch(err){
        console.log(err.message);
        return {success:false}
    }

    }

    const login  = async(form) => {
       const  {email,password} = form;
       console.log("Sending:", email, password);
        try{
            
            const res = await api.post("/auth/login",{
                email,
                password,
            });
            setUser(res.data.user);
            return {success:true};
        }catch(err) {
    console.log(err.response?.data); 
    console.log(err.response?.data?.message);
    return { success: false, message: err.response?.data?.message };
  }

    };


    const logout = async () => {
        try{
        await api.post("/auth/logout");
        setUser(null);
        }catch(err){
            return {success:false};
        }
    }




    return (
        <AuthContext.Provider value = {{user,otpemail,login,logout,register,verifyOtp}}>
        {children}
        </AuthContext.Provider>
    );
}



