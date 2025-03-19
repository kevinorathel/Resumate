package com.ResuMate.Services;

import com.ResuMate.Models.UserModel;
import com.ResuMate.Repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.FileNotFoundException;

import static com.ResuMate.Util.ResumeUtil.generateResume;

@Service
public class UserServiceImpl implements UserService{

    @Autowired
    private UserRepository userRepository;

    public UserModel getUserData(Long userId){

        UserModel user = userRepository.getUserById(userId);
        return user;

    }

    public byte[] createResume(Long userId) {

        UserModel user = getUserData(userId);
        byte[] resume = new byte[0];
        try{
            resume = generateResume(user);
            return resume;
        }catch(Exception e){
            throw new RuntimeException(e);
        }

    }


}
