package com.ResuMate.DTO;

import com.ResuMate.Models.EducationModel;
import com.ResuMate.Models.ExperienceModel;
import com.ResuMate.Models.ProjectModel;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import java.util.List;

public class SaveResumeDTO {

    private Long userId;
    private List<ExperienceModel> experiences;
    private List<EducationModel> education;
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
