package com.ResuMate.DTO;

import com.ResuMate.Models.EducationModel;
import com.ResuMate.Models.ExperienceModel;
import com.ResuMate.Models.ProjectModel;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.CascadeType;
import jakarta.persistence.FetchType;
import jakarta.persistence.OneToMany;

import java.util.List;

public class ResumeDTO {

    private Long userId;

    @JsonManagedReference
    private List<ExperienceModel> experiences;

    @JsonManagedReference
    private List<EducationModel> education;

    @JsonManagedReference
    private List<ProjectModel> projects;

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
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
