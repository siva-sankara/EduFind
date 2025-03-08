const endPoints ={
     login : '/user/login',
     register: "/user/signup",
     updateBasicInfo:"/user/upadte/basicInfo",
     updateSocailmediaLinks:"/user/upadte/socialmedia",
     updateProfile :"/update",
     UserDetails:"/user",
     postProfilePicture :"/user/media/upload-profile-picture",
     postVideo:"/user/media/video",
     postImage:"/user/media/image",
     uploadAUserQuery:"/questions/post-a-question",
     getAllQuestions:"/questions/get-all-question",
     getCareerDetials:"user/getAllGuidances",
     postAnswerToQuestion:"/answer/post",
     upVoteAQuestion : "/questions/upvote",
     downVoteAQuestion : "/questions/downvote",

}

export default endPoints;