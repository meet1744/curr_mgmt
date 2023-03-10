package com.springboot.CurriculumManagement.Controller;

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
    @PostMapping("/addsubject")
    public Subjects addNewSubject(@RequestBody Subjects newSubject){

        return this.pcService.addNewSubject(newSubject);
    }

    @GetMapping("/getallfaculty")
    public List<Faculty> getAllFaculty(){
        return this.pcService.getAllFaculty();
    }
}
