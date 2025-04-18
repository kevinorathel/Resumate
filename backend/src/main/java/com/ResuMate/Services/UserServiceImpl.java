package com.ResuMate.Services;

import com.ResuMate.DTO.JobDescriptionDTO;
import com.ResuMate.DTO.LoginDTO;
import com.ResuMate.DTO.SignupDTO;
import com.ResuMate.Models.UserModel;
import com.ResuMate.Repositories.UserRepository;
import com.ResuMate.Util.AESUtil;
import com.ResuMate.Util.ResumeUtil;
import org.json.JSONObject;
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

    public Boolean userSignUp(SignupDTO signupDTO){

        UserModel newUser = new UserModel();
        if(signupDTO != null){

            newUser.setEmail(signupDTO.getEmail());
            newUser.setFirstName(signupDTO.getFirstName());
            newUser.setMiddleName(signupDTO.getMiddleName());
            newUser.setLastName(signupDTO.getLastName());
            String encryptedPassword = AESUtil.encryptPassword(signupDTO.getPassword());
            newUser.setPassword(encryptedPassword);
            userRepository.save(newUser);
            return true;
        }

        return false;
    }

    public String userLogin(LoginDTO loginDto){

        UserModel user = userRepository.getUserByEmail(loginDto.getEmail());
        JSONObject response = new JSONObject();

        if(user != null){

            String realPassword = AESUtil.decryptPassword(user.getPassword());
            if(loginDto.getPassword().equals(realPassword)){
                response.put("status", true);
                response.put("userId", user.getId());
            }
            else{
                response.put("status", false);
            }
            return response.toString();
        }else{
            response.put("status", false);
            return response.toString();
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
