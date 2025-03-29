package com.ResuMate.Services;


import com.ResuMate.DTO.JobDescriptionDTO;
import com.ResuMate.Models.UserModel;

public interface UserService {

    public UserModel getUserData(Long userId);
    public String getContent(String prompt) throws Exception;
    public String getCoverLetter(JobDescriptionDTO jobDescription) throws Exception;
    public byte[] createCoverLetter(JobDescriptionDTO jobDescription);
    public byte[] createResume(Long userId);


}
