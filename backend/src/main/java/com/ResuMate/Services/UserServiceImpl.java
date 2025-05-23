package com.ResuMate.Services;

import com.ResuMate.DTO.*;
import com.ResuMate.Models.EducationModel;
import com.ResuMate.Models.ExperienceModel;
import com.ResuMate.Models.ProjectModel;
import com.ResuMate.Models.UserModel;
import com.ResuMate.Repositories.EducationRepository;
import com.ResuMate.Repositories.ExperienceRepository;
import com.ResuMate.Repositories.ProjectRepository;
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

    @Autowired
    private ExperienceRepository experienceRepository;

    @Autowired
    private EducationRepository educationRepository;

    @Autowired
    private ProjectRepository projectRepository;

    public UserDataDTO getUserData(Long userId){

        UserModel user = userRepository.getUserById(userId);
        UserDataDTO userDTO = new UserDataDTO();

        userDTO.setFirstName(user.getFirstName());
        userDTO.setMiddleName(user.getMiddleName());
        userDTO.setLastName(user.getLastName());
        userDTO.setEmail(user.getEmail());
        userDTO.setLocation(user.getLocation());

        userDTO.setPhone(user.getPhone());
        userDTO.setEducation(user.getEducation());
        userDTO.setExperiences(user.getExperiences());
        userDTO.setProjects(user.getProjects());

        userDTO.setSummary(user.getSummary());
        userDTO.setWebsite(user.getWebsite());
        userDTO.setLinkedIn(user.getLinkedIn());

        return userDTO;

    }

    public ResumeDTO getResumeData(Long userId){

        ResumeDTO resumeData = new ResumeDTO();

        UserModel user = userRepository.getUserById(userId);
        if(user != null){
            resumeData.setUserId(userId);
            if( !user.getSummary().isEmpty()){

                resumeData.setSummary(user.getSummary());
            }
            if( !user.getEducation().isEmpty() ){

                resumeData.setEducation(user.getEducation());
            }
            if( !user.getExperiences().isEmpty()){

                resumeData.setExperiences(user.getExperiences());
            }
            if( !user.getProjects().isEmpty()){

                resumeData.setProjects(user.getProjects());
            }
        }

        return resumeData;
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

    public JSONObject saveResumeData(SaveResumeDTO resumeDTO){

        JSONObject response = new JSONObject();
        response.put("status", "Failed");
        if(resumeDTO.getExperiences() != null){

            for(ExperienceModel experience : resumeDTO.getExperiences()){

                if(experience.getId() != null){
                    ExperienceModel existingExp = experienceRepository.getExperienceById(experience.getId());
                    existingExp.setCompany(experience.getCompany());
                    if(existingExp.getDescription() != null){
                        String cleanedDescription =  experience.getDescription().replace("\n", "")
                                                                                .replace("\n•", "•")
                                                                                .replace(".", ".\n");
                        existingExp.setDescription(cleanedDescription);
                    }

                    existingExp.setRole(experience.getRole());
                    existingExp.setStartDate(experience.getStartDate());
                    existingExp.setEndDate(experience.getEndDate());
                    experienceRepository.save(existingExp);
                }
                else{
                    UserModel user = userRepository.getUserById(resumeDTO.getUserId());
                    experience.setUser(user);
                    experienceRepository.save(experience);
                }
            }
            response.put("status", "Success");
        }

        if(resumeDTO.getEducation() != null){

            for(EducationModel education : resumeDTO.getEducation()){

                if(education.getId() != null){
                    EducationModel existingEdu = educationRepository.getEducationById(education.getId());
                    existingEdu.setDegree(education.getDegree());
                    existingEdu.setYear(education.getYear());
                    existingEdu.setInstitution(education.getInstitution());
                    educationRepository.save(existingEdu);
                }
                else{
                    UserModel user = userRepository.getUserById(resumeDTO.getUserId());
                    education.setUser(user);
                    educationRepository.save(education);
                }
            }
            response.put("status", "Success");
        }

        if(resumeDTO.getProjects() != null){

            for(ProjectModel project : resumeDTO.getProjects()){

                if(project.getId() != null){
                    ProjectModel existingProj = projectRepository.getProjectById(project.getId());
                    existingProj.setProjectDate(project.getProjectDate());
                    existingProj.setProjectName(project.getProjectName());
                    existingProj.setProjectDescription(project.getProjectDescription());
                    projectRepository.save(existingProj);
                }
                else{
                    UserModel user = userRepository.getUserById(resumeDTO.getUserId());
                    project.setUser(user);
                    projectRepository.save(project);
                }
            }
            response.put("status", "Success");
        }
        return response;

    }

    public String getAIGeneratedContent(String prompt) throws Exception {

        String content = ResumeUtil.generateContent(prompt);
        return content;

    }

    public String getCoverLetterContent(JobDescriptionDTO jobDescription) throws Exception {

        UserModel user = new UserModel();
        String response = "";
        if(jobDescription != null && jobDescription.getUserId() != null && jobDescription.getJobDescription() != null){
            user = userRepository.getUserById(jobDescription.getUserId());
            response = ResumeUtil.getCoverLetterContent(user, jobDescription.getJobDescription());
        }
        return response;

    }

    public byte[] createCoverLetter(JobDescriptionDTO jobDescription) {

        UserModel user = userRepository.getUserById(jobDescription.getUserId());
        byte[] coverLetter = new byte[0];
        try{
            coverLetter = ResumeUtil.generateCoverLetter(user, jobDescription.getJobDescription());
            return coverLetter;
        }catch(Exception e){
            throw new RuntimeException(e);
        }

    }

    public byte[] createResume(Long userId) {

        UserModel user = userRepository.getUserById(userId);
        byte[] resume = new byte[0];
        try{
            resume = ResumeUtil.generateResume(user);
            return resume;
        }catch(Exception e){
            throw new RuntimeException(e);
        }

    }

    public JSONObject optimizeWorkExperienceBulletPoints(OptimizeWorkExperienceDTO optimizeWorkExperienceDTO) throws Exception {

        JSONObject optimizedPoints = new JSONObject();

        if (optimizeWorkExperienceDTO != null) {
            if (optimizeWorkExperienceDTO.getJobRole() != null && optimizeWorkExperienceDTO.getDescription() != null) {

                String prompt = "I used to work as a" + optimizeWorkExperienceDTO.getJobRole() + ". Im going to give you a summary of what i did. " +
                        "Please don't give me any generic points (like using variables such as 'X' or 'Y'). Do not use any decimal points " +
                        "when showing quantities, only use whole numbers" +
                        "I want you to use the data which i have given below " +
                        "I want you to give me some points that are professional which i can use in my resume:  \n" +
                        "  \n" + optimizeWorkExperienceDTO.getDescription();

                String bulletContent = ResumeUtil.generateContent(prompt);

                String prompt2 = "I want you to take the most important points from the below text (which i want to add to my resume)." +
                        " The points taken should be a bit unique from each other. If it's better to merge two or more statements to make " +
                        " it seem less generic then do that (only if it is required)." +
                        " Give me only the points and nothing more than that: \n " + bulletContent;

                bulletContent = ResumeUtil.generateContent(prompt2);

                if (bulletContent == null || bulletContent.trim().isEmpty()) {
                    optimizedPoints.put("error", "Failed to refine content into bullet points.");
                    return optimizedPoints;
                }

                String cleanedResponse = bulletContent.replace("**", "").replace("*", "•");

                optimizedPoints.put("points", cleanedResponse);
                return optimizedPoints;

            }
        }

        optimizedPoints.put("error", "Unexpected error");
        return optimizedPoints;
    }

    public JSONObject optimizeProjectBulletPoints(String projectDescription) throws Exception {

        JSONObject optimizedPoints = new JSONObject();

        if (projectDescription != null) {

            String prompt = "I am going to give you a summary of a project that i had done. " +
                        "I want you to give me some bullet points from this description that i can add to my resume. \n" +
                        "Here is the description:   \n" +
                        "  \n" + projectDescription;

            String bulletContent = ResumeUtil.generateContent(prompt);

            String prompt2 = "I want you to take the most important points from the below text. " +
                    " The points taken should be a bit unique from each other. " +
                    " If it's better to merge two or more statements to make " +
                    " it seem less generic then do that (only if it is required)." +
                    " Give me only the points and nothing more than that: \n " + bulletContent;

            bulletContent = ResumeUtil.generateContent(prompt2);

            if (bulletContent == null || bulletContent.trim().isEmpty()) {
                optimizedPoints.put("error", "Failed to refine content into bullet points.");
                return optimizedPoints;
            }

            String cleanedResponse = bulletContent.replace("**", "").replace("*", "•");

            optimizedPoints.put("points", cleanedResponse);
            return optimizedPoints;

        }

        optimizedPoints.put("error", "Unexpected error");
        return optimizedPoints;
    }

}