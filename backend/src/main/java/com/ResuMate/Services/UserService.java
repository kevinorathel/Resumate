package com.ResuMate.Services;


import com.ResuMate.DTO.*;
import org.json.JSONObject;

public interface UserService {

    public UserDataDTO getUserData(Long userId);
    public ResumeDTO getResumeData(Long userId);
    public String userLogin(LoginDTO loginDto);
    public Boolean userSignUp(SignupDTO signupDTO);
    public JSONObject saveResumeData(SaveResumeDTO resumeDTO);
    public String getAIGeneratedContent(String prompt) throws Exception;
    public String getCoverLetterContent(JobDescriptionDTO jobDescription) throws Exception;
    public byte[] createCoverLetter(JobDescriptionDTO jobDescription);
    public byte[] createResume(Long userId);
    public JSONObject optimizeWorkExperienceBulletPoints(OptimizeWorkExperienceDTO optimizeWorkExperienceDTO) throws Exception;
    public JSONObject optimizeProjectBulletPoints(String projectDescription) throws Exception;


}
