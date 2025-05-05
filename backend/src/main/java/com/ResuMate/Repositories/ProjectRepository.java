package com.ResuMate.Repositories;

import com.ResuMate.Models.ExperienceModel;
import com.ResuMate.Models.ProjectModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ProjectRepository extends JpaRepository<ProjectModel, Long> {

    @Query(value = "select * from project where id = ?1", nativeQuery = true)
    ProjectModel getProjectById(Long projectId);
}
