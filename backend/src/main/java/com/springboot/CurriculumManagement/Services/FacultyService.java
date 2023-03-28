package com.springboot.CurriculumManagement.Services;

import com.springboot.CurriculumManagement.Entities.Department;
import com.springboot.CurriculumManagement.Entities.Subjects;

import java.util.List;

public interface FacultyService {
    List<Subjects> getAllSubjects(Department dept);

    List<Integer> getRemainingSubSequence(String semesterSelected);

    List<Department> getAllDept();
}
