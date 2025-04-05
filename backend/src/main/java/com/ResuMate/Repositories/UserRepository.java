package com.ResuMate.Repositories;

import com.ResuMate.Models.UserModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

public interface UserRepository extends JpaRepository<UserModel, Long> {

    @Query(value = "select * from user where id = ?1", nativeQuery = true)
    UserModel getUserById(Long userId);

    @Query(value = "select * from user where email like %?1%", nativeQuery = true)
    UserModel getUserByEmail(String email);
}
