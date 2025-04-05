package com.ResuMate.Controllers;

import com.ResuMate.DTO.JobDescriptionDTO;
import com.ResuMate.DTO.SignupDTO;
import com.ResuMate.Models.UserModel;
import com.ResuMate.Services.UserService;
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
    private UserService userService;

    @GetMapping("/TestAPI")
    public String testApi() throws Exception {

        return "All Good :)";
    }

    @GetMapping("/login")
    public Boolean login(@RequestParam("email") String email, @RequestParam("password") String password) throws Exception {

        return userService.userLogin(email, password);
    }

    @PostMapping("/signup")
    public Boolean signup(@RequestBody SignupDTO signupDTO){

        return userService.userSignUp(signupDTO);
    }

    @GetMapping("/getContent")
    public String getContent(@RequestParam("prompt") String prompt) throws Exception {

        return userService.getAIGeneratedContent(prompt);
    }

    @GetMapping("/userData")
    public UserModel userData(@RequestParam("userId") Long userId) throws Exception {

        return userService.getUserData(userId);
    }

    @PostMapping("/getCoverLetterContent")
    public String userData(@RequestBody JobDescriptionDTO jobRequest) throws Exception {
        return userService.getCoverLetterContent(jobRequest);
    }

    @PostMapping("/generateCoverLetter")
    public ResponseEntity<byte[]> createCoverLetter(@RequestBody JobDescriptionDTO jobRequest) throws Exception {

        byte[] pdfBytes = userService.createCoverLetter(jobRequest);
        UserModel user = userService.getUserData(jobRequest.getUserId());

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Disposition", "inline; " +
                "filename="+user.getFirstName().replace(" ", "_")+"_"
                +user.getLastName().replace(" ", "_")+"_" + "_CoverLetter_" +
                jobRequest.getCompanyName().replace(" ", "_") + ".pdf");
        headers.add("Content-Type", "application/pdf");

        return new ResponseEntity<>(pdfBytes, headers, HttpStatus.OK);

    }

    @GetMapping("/generateResume")
    public ResponseEntity<byte[]> createResume(@RequestParam("userId") Long userId) throws IOException {
        byte[] pdfBytes = userService.createResume(userId);
        UserModel user = userService.getUserData(userId);
        int currentYear = java.time.Year.now().getValue();

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Disposition", "inline; " +
                "filename="+user.getFirstName().replace(" ", "_")+"_"
                +user.getLastName().replace(" ", "_")+"_"+ currentYear +"_Resume.pdf");
        headers.add("Content-Type", "application/pdf");

        return new ResponseEntity<>(pdfBytes, headers, HttpStatus.OK);
    }

}