package com.ResuMate.Services;


import com.ResuMate.Models.UserModel;

public interface UserService {

    public UserModel getUserData(Long userId);
    public String getContent(String prompt) throws Exception;
    public String getCoverLetter(Long userId, String jobDescription) throws Exception;
    public byte[] createResume(Long userId);

}
