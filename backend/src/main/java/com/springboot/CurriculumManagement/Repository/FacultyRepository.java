package com.springboot.CurriculumManagement.Repository;

import com.springboot.CurriculumManagement.Entities.Faculty;
import org.springframework.data.jpa.repository.JpaRepository;


public interface FacultyRepository extends JpaRepository<Faculty,String> {
    Faculty findByFacultyId(String id);
}
