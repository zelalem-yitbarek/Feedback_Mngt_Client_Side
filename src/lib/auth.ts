import {api} from "@/lib/axios"

export const authApi = {
    login:(data:{phoneNumber: String; password: String})=>api.post("/auth/login",data),
    register:(formData:FormData)=>api.post('/auth/register',formData,{headers:{'Content-Type':'multipart/form-data'}}),
    logout:()=>api.post("/auth/logout"),
    me:()=>api.get("/user/profile"),
    // OTP verification endpoints
    verifyOTP:(userId:string,data:{code:string})=>api.post(`/auth/verify-otp/${userId}`,data),
    resendOTP:(userId:string)=>api.get(`/auth/resend-otp/${userId}`),
}
