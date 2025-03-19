package com.ResuMate.Controllers;

import com.ResuMate.Models.UserModel;
import com.ResuMate.Services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import org.springframework.http.HttpStatus;

import java.io.IOException;
import java.util.Date;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/TestAPI")
    public String testApi() throws Exception {

        return "All Good :)";
    }

    @GetMapping("/userData")
    public UserModel userData(@RequestParam("userId") Long userId) throws Exception {

        return userService.getUserData(userId);
    }

//    @GetMapping("/userData")
//    public ResponseEntity<UserModel> userData(@RequestParam("userId") Long userId) throws IOException {
//        HttpHeaders headers = new HttpHeaders();
//        headers.add("Content-Disposition", "inline; " +
//                "filename="+user.getFirstName().replace(" ", "_")+"_"
//                +user.getLastName().replace(" ", "_")+"_"+ currentYear +"_Resume.pdf");
//        headers.add("Content-Type", "application/pdf");
//
//        UserModel user = userService.getUserData(userId);
//
//        return new ResponseEntity<>(pdfBytes, headers, HttpStatus.OK);
//    }

    @GetMapping("/generate")
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