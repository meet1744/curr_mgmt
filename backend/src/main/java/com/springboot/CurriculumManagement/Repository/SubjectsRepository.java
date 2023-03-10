package com.springboot.CurriculumManagement.Repository;

import com.springboot.CurriculumManagement.Entities.Subjects;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SubjectsRepository extends JpaRepository<Subjects,String> {
}
