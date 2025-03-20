package com.ResuMate.Services;


import com.ResuMate.Models.UserModel;

public interface UserService {

    public UserModel getUserData(Long userId);
    public String getContent() throws Exception;
    public byte[] createResume(Long userId);

}
