package com.ResuMate.Repositories;

import com.ResuMate.Models.ProjectModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectRepository extends JpaRepository<ProjectModel, Long> {
}
