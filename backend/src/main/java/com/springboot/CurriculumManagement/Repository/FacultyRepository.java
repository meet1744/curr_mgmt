package com.springboot.CurriculumManagement.Repository;

import com.springboot.CurriculumManagement.Entities.Faculty;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


public interface FacultyRepository extends JpaRepository<Faculty,String> {
    Optional<Faculty> findByFacultyId(String id);
}
