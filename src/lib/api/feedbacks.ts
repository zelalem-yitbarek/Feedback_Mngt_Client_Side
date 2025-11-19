import {api} from '../axios'

export const feedbackAPI={
    getFeedbacks:()=>api.get("/feedbacks"),
    createFeedbacks:(data:any)=>api.post("/feedbacks",data),
    updateFeedbacks:(id:string,data:any)=>api.put(`/feedbacks/${id}`,data),
    deleteFeedacks:(id:string,data:any)=>api.put(`/feedbacks/${id}`)
}