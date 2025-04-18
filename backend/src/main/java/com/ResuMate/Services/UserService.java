package com.ResuMate.Services;


import com.ResuMate.DTO.JobDescriptionDTO;
import com.ResuMate.DTO.LoginDTO;
import com.ResuMate.DTO.SignupDTO;
import com.ResuMate.Models.UserModel;
import org.json.JSONObject;

public interface UserService {

    public UserModel getUserData(Long userId);
    public String userLogin(LoginDTO loginDto);
    public Boolean userSignUp(SignupDTO signupDTO);
    public String getAIGeneratedContent(String prompt) throws Exception;
    public String getCoverLetterContent(JobDescriptionDTO jobDescription) throws Exception;
    public byte[] createCoverLetter(JobDescriptionDTO jobDescription);
    public byte[] createResume(Long userId);


}
