package com.ResuMate.Repositories;

import com.ResuMate.Models.ExperienceModel;
import com.ResuMate.Models.UserModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ExperienceRepository extends JpaRepository<ExperienceModel, Long> {

    @Query(value = "select * from experience where id = ?1", nativeQuery = true)
    ExperienceModel getExperienceById(Long experienceId);
}
