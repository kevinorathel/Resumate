package com.ResuMate.Repositories;

import com.ResuMate.Models.EducationModel;
import com.ResuMate.Models.ProjectModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface EducationRepository extends JpaRepository<EducationModel, Long> {

    @Query(value = "select * from education where id = ?1", nativeQuery = true)
    EducationModel getEducationById(Long educationId);
}
