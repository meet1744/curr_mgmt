package com.springboot.CurriculumManagement.Controller;

import com.springboot.CurriculumManagement.Entities.Department;
import com.springboot.CurriculumManagement.Entities.Subjects;
import com.springboot.CurriculumManagement.Services.FacultyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping(value = "/Faculty/")
public class FacultyController {

    @Autowired
    private FacultyService facultyService;

    @GetMapping("/isFaculty")
    public ResponseEntity<String> checkFaculty() {
        return new ResponseEntity<String>("Faculty", HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ROLE_FACULTY')")
    @PostMapping("/getallsubjects")
    public List<Subjects> getAllSubjects(@RequestBody Department dept){

        return this.facultyService.getAllSubjects(dept);
    }

    @PreAuthorize("hasRole('ROLE_FACULTY')")
    @GetMapping("/getremainingsubsequence/{semesterSelected}")
    public List<Integer> getremainingsubsequence(@PathVariable String semesterSelected){

        System.out.println("In controller");
        return this.facultyService.getRemainingSubSequence(semesterSelected);
    }

    @PreAuthorize("hasRole('ROLE_FACULTY')")
    @GetMapping("/getalldept")
    public List<Department> getAllDepartments(){

        return this.facultyService.getAllDept();
    }
}
