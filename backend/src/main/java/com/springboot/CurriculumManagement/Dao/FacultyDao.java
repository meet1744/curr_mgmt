package com.springboot.CurriculumManagement.Dao;

import com.springboot.CurriculumManagement.Entities.Faculty;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FacultyDao extends JpaRepository<Faculty,String> {

}
