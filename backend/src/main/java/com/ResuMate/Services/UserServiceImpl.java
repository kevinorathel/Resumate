package com.ResuMate.Services;

import com.ResuMate.DTO.JobDescriptionDTO;
import com.ResuMate.Models.UserModel;
import com.ResuMate.Repositories.UserRepository;
import com.ResuMate.Util.AESUtil;
import com.ResuMate.Util.ResumeUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class UserServiceImpl implements UserService{

    @Autowired
    private UserRepository userRepository;

    public UserModel getUserData(Long userId){

        UserModel user = userRepository.getUserById(userId);
        return user;

    }

    public Boolean userLogin(String email, String password){

        UserModel user = userRepository.getUserByEmail(email);

        if(user != null){

            String realPassword = AESUtil.decryptPassword(user.getPassword());
            return password.equals(realPassword);

        }else{

            return false;

        }
    }

    public String getAIGeneratedContent(String prompt) throws Exception {

        String content = ResumeUtil.generateContent(prompt);
        return content;

    }

    public String getCoverLetterContent(JobDescriptionDTO jobDescription) throws Exception {

        UserModel user = new UserModel();
        String response = "";
        if(jobDescription != null && jobDescription.getUserId() != null && jobDescription.getJobDescription() != null){
            user = getUserData(jobDescription.getUserId());
            response = ResumeUtil.getCoverLetterContent(user, jobDescription.getJobDescription());
        }
        return response;

    }

    public byte[] createCoverLetter(JobDescriptionDTO jobDescription) {

        UserModel user = getUserData(jobDescription.getUserId());
        byte[] coverLetter = new byte[0];
        try{
            coverLetter = ResumeUtil.generateCoverLetter(user, jobDescription.getJobDescription());
            return coverLetter;
        }catch(Exception e){
            throw new RuntimeException(e);
        }

    }

    public byte[] createResume(Long userId) {

        UserModel user = getUserData(userId);
        byte[] resume = new byte[0];
        try{
            resume = ResumeUtil.generateResume(user);
            return resume;
        }catch(Exception e){
            throw new RuntimeException(e);
        }

    }


}
