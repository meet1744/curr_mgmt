package com.springboot.CurriculumManagement.Controller;

import com.springboot.CurriculumManagement.Entities.Department;
import com.springboot.CurriculumManagement.Entities.Subjects;
import com.springboot.CurriculumManagement.Services.FacultyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping(value = "/Faculty/")
public class FacultyController {

    @Autowired
    private FacultyService facultyService;

    @PostMapping("/getallsubjects")
    public List<Subjects> getAllSubjects(@RequestBody Department dept){

        return this.facultyService.getAllSubjects(dept);
    }

    @GetMapping("/getremainingsubsequence/{semesterSelected}")
    public List<Integer> getremainingsubsequence(@PathVariable String semesterSelected){

        System.out.println("In controller");
        return this.facultyService.getRemainingSubSequence(semesterSelected);
    }

    @GetMapping("/getalldept")
    public List<Department> getAllDepartments(){

        return this.facultyService.getAllDept();
    }
}
