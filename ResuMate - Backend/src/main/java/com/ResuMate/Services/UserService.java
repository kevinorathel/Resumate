package com.ResuMate.Services;


import com.ResuMate.Models.UserModel;

public interface UserService {

    public UserModel getUserData(Long userId);

    public byte[] createResume(Long userId);

}
