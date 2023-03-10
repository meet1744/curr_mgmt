package com.springboot.CurriculumManagement.Controller;

import com.springboot.CurriculumManagement.Entities.Department;
import com.springboot.CurriculumManagement.Entities.Faculty;
import com.springboot.CurriculumManagement.Entities.Subjects;
import com.springboot.CurriculumManagement.Services.PCService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping(value = "/PC/")
public class PCController {

    @Autowired
    private PCService pcService;
    @PostMapping("/addnewsubject")
    public Subjects addNewSubject(@RequestBody Subjects newSubject){

        return this.pcService.addNewSubject(newSubject);
    }

    @PostMapping("/getallfaculty")
    public List<Faculty> getAllFaculty(@RequestBody Department deptId){

        return this.pcService.getAllFaculty(deptId);
    }

    @GetMapping("/getremainingsubsequence/{semesterSelected}")
    public List<Integer> getremainingsubsequence(@PathVariable int semesterSelected){

        System.out.println("In controller");
        return this.pcService.getRemainingSubSequence(semesterSelected);
    }
}
