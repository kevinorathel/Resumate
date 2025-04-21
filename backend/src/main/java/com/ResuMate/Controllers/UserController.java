package com.ResuMate.Controllers;

import com.ResuMate.DTO.JobDescriptionDTO;
import com.ResuMate.DTO.LoginDTO;
import com.ResuMate.DTO.SignupDTO;
import com.ResuMate.Models.UserModel;
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
    private UserService userService;

    @GetMapping("/TestAPI")
    public String testApi() throws Exception {

        return "All Good :)";
    }

    @PostMapping("/login")
    public String login(@RequestBody LoginDTO loginDTO) throws Exception {

        return userService.userLogin(loginDTO);
    }

    @PostMapping("/signup")
    public Boolean signup(@RequestBody SignupDTO signupDTO){

        return userService.userSignUp(signupDTO);
    }

    @PostMapping("/getContent")
    public String getContent(@RequestBody String prompt) throws Exception {

        return userService.getAIGeneratedContent(prompt);
    }

    @GetMapping("/userData")
    public UserModel userData(@RequestParam("userId") Long userId) throws Exception {

        return userService.getUserData(userId);
    }

    @PostMapping("/getCoverLetterContent")
    public ResponseEntity<String> userData(@RequestBody JobDescriptionDTO jobRequest) throws Exception {
        return new ResponseEntity<>(userService.getCoverLetterContent(jobRequest), HttpStatus.OK);
    }

    @PostMapping("/generateCoverLetter")
    public ResponseEntity<byte[]> createCoverLetter(@RequestBody JobDescriptionDTO jobRequest) throws Exception {

        byte[] pdfBytes = userService.createCoverLetter(jobRequest);
        UserModel user = userService.getUserData(jobRequest.getUserId());

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