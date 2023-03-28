package com.springboot.CurriculumManagement.Repository;

import com.springboot.CurriculumManagement.Entities.Department;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DepartmentRepository extends JpaRepository<Department,String> {
}
