package com.ResuMate.DTO;

import com.ResuMate.Models.EducationModel;
import com.ResuMate.Models.ExperienceModel;
import com.ResuMate.Models.ProjectModel;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.CascadeType;
import jakarta.persistence.FetchType;
import jakarta.persistence.OneToMany;

import java.util.List;

public class UserDataDTO {
    private String firstName;
    private String middleName;
    private String lastName;
    private String summary;
    private String email;
    private String linkedIn;
    private String website;
    private String phone;
    private String location;
    @JsonManagedReference
    private List<ExperienceModel> experiences;
    @JsonManagedReference
    private List<EducationModel> education;
    @JsonManagedReference
    private List<ProjectModel> projects;

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getMiddleName() {
        return middleName;
    }

    public void setMiddleName(String middleName) {
        this.middleName = middleName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getSummary() {
        return summary;
    }

    public void setSummary(String summary) {
        this.summary = summary;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getLinkedIn() {
        return linkedIn;
    }

    public void setLinkedIn(String linkedIn) {
        this.linkedIn = linkedIn;
    }

    public String getWebsite() {
        return website;
    }

    public void setWebsite(String website) {
        this.website = website;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public List<ExperienceModel> getExperiences() {
        return experiences;
    }

    public void setExperiences(List<ExperienceModel> experiences) {
        this.experiences = experiences;
    }

    public List<EducationModel> getEducation() {
        return education;
    }

    public void setEducation(List<EducationModel> education) {
        this.education = education;
    }

    public List<ProjectModel> getProjects() {
        return projects;
    }

    public void setProjects(List<ProjectModel> projects) {
        this.projects = projects;
    }
}
