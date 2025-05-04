package com.ResuMate.Controllers;

import com.ResuMate.DTO.*;
import com.ResuMate.Models.ExperienceModel;
import com.ResuMate.Models.UserModel;
import com.ResuMate.Repositories.UserRepository;
import com.ResuMate.Services.UserService;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import org.springframework.http.HttpStatus;

import java.io.IOException;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserService userService;

    @GetMapping("/TestAPI")
    public ResponseEntity<String> testApi() throws Exception {

        return new ResponseEntity<>("All Good :)", HttpStatus.OK);
    }

    @GetMapping("/getResumeData")
    public ResponseEntity<ResumeDTO> getResumeData(@RequestParam("userId") Long userId) throws Exception {

        return new ResponseEntity<>(userService.getResumeData(userId), HttpStatus.OK);
    }

    @PostMapping("/optimizeDescription")
    public ResponseEntity<String> getResumeData(@RequestBody OptimizeDTO optimizeDTO) throws Exception {

        JSONObject response = userService.optimizeResumeBulletPoints(optimizeDTO);
        return new ResponseEntity<>(response.toString(), HttpStatus.OK);
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginDTO loginDTO) throws Exception {

        return new ResponseEntity<>(userService.userLogin(loginDTO), HttpStatus.OK);
    }

    @PostMapping("/signup")
    public ResponseEntity<Boolean> signup(@RequestBody SignupDTO signupDTO){

        return new ResponseEntity<>(userService.userSignUp(signupDTO), HttpStatus.OK);
    }

    @PostMapping("/saveResumeData")
    public ResponseEntity<String> saveResumeData(@RequestBody SaveResumeDTO resumeDTO){

        JSONObject response = userService.saveResumeData(resumeDTO);
        return new ResponseEntity<>(response.toString(), HttpStatus.OK);
    }

    @PostMapping("/getContent")
    public ResponseEntity<String> getContent(@RequestBody String prompt) throws Exception {

        return new ResponseEntity<>(userService.getAIGeneratedContent(prompt), HttpStatus.OK);
    }

    @GetMapping("/userData")
    public ResponseEntity<UserDataDTO> userData(@RequestParam("userId") Long userId) throws Exception {

        return new ResponseEntity<>(userService.getUserData(userId), HttpStatus.OK);
    }

    @PostMapping("/getCoverLetterContent")
    public ResponseEntity<String> userData(@RequestBody JobDescriptionDTO jobRequest) throws Exception {
        return new ResponseEntity<>(userService.getCoverLetterContent(jobRequest), HttpStatus.OK);
    }

    @PostMapping("/generateCoverLetter")
    public ResponseEntity<byte[]> createCoverLetter(@RequestBody JobDescriptionDTO jobRequest) throws Exception {

        byte[] pdfBytes = userService.createCoverLetter(jobRequest);
        UserModel user = userRepository.getUserById(jobRequest.getUserId());

        String fileName = user.getFirstName().replace(" ", "_") + "_"
                + user.getLastName().replace(" ", "_") + "_Cover_Letter_"
                + jobRequest.getCompanyName().replace(" ", "_") + ".pdf";

        HttpHeaders headers = new HttpHeaders();
        headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + fileName + "\"");
        headers.add(HttpHeaders.CONTENT_TYPE, "application/pdf");
        headers.add("Access-Control-Expose-Headers", "Content-Disposition");

        return new ResponseEntity<>(pdfBytes, headers, HttpStatus.OK);
    }

    @GetMapping("/generateResume")
    public ResponseEntity<byte[]> createResume(@RequestParam("userId") Long userId) throws IOException {
        byte[] pdfBytes = userService.createResume(userId);
        UserModel user = userRepository.getUserById(userId);
        int currentYear = java.time.Year.now().getValue();

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Disposition", "inline; " +
                "filename="+user.getFirstName().replace(" ", "_")+"_"
                +user.getLastName().replace(" ", "_")+"_"+ currentYear +"_Resume.pdf");
        headers.add("Content-Type", "application/pdf");

        return new ResponseEntity<>(pdfBytes, headers, HttpStatus.OK);
    }

}