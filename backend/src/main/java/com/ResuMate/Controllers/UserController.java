package com.ResuMate.Controllers;

import com.ResuMate.DTO.JobDescriptionDTO;
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

    @GetMapping("/getContent")
    public String getContent(@RequestParam("prompt") String prompt) throws Exception {

        return userService.getContent(prompt);
    }

    @GetMapping("/userData")
    public UserModel userData(@RequestParam("userId") Long userId) throws Exception {

        return userService.getUserData(userId);
    }

    @PostMapping("/generateCoverLetterContent")
    public String userData(@RequestBody JobDescriptionDTO jobRequest) throws Exception {
        return userService.getCoverLetter(jobRequest);
    }

    @PostMapping("/generateCoverLetter")
    public ResponseEntity<byte[]> createCoverLetter(@RequestBody JobDescriptionDTO jobRequest) throws Exception {

        //return userService.getCoverLetter(jobRequest);

        byte[] pdfBytes = userService.createCoverLetter(jobRequest);
        UserModel user = userService.getUserData(jobRequest.getUserId());
        int currentYear = java.time.Year.now().getValue();

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Disposition", "inline; " +
                "filename="+user.getFirstName().replace(" ", "_")+"_"
                +user.getLastName().replace(" ", "_")+"_"+ currentYear +"_Cover_Letter.pdf");
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