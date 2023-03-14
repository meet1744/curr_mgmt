package com.springboot.CurriculumManagement.Controller;

import com.springboot.CurriculumManagement.Entities.Department;
import com.springboot.CurriculumManagement.Entities.Faculty;
import com.springboot.CurriculumManagement.Entities.Subjects;
import com.springboot.CurriculumManagement.Services.PCService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping(value = "/PC/")
public class PCController {

    @Autowired
    private PCService pcService;
    @PostMapping("/addnewsubject")
    public ResponseEntity<HttpStatus> addNewSubject(@RequestBody Subjects newSubject){
        try{
            this.pcService.addNewSubject(newSubject);
            return new ResponseEntity<>(HttpStatus.OK);
        }
        catch (Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }


    }

    @PostMapping("/getallfaculty")
    public List<Faculty> getAllFaculty(@RequestBody Department deptId){

        return this.pcService.getAllFaculty(deptId);
    }

    @GetMapping("/getremainingsubsequence/{semesterSelected}")
    public List<Integer> getremainingsubsequence(@PathVariable String semesterSelected){

        System.out.println("In controller");
        return this.pcService.getRemainingSubSequence(semesterSelected);
    }


    @PostMapping("/getallsubjects")
    public List<Subjects> getAllSubjects(@RequestBody Department dept){

        return this.pcService.getAllSubjects(dept);
    }

    @DeleteMapping("/deletesubject/{dduCode}")
    public ResponseEntity<HttpStatus> deleteSubject(@PathVariable String dduCode){
        try {
            System.out.println("delete");
            this.pcService.deleteSubject(dduCode);
            return new ResponseEntity<>(HttpStatus.OK);
        }
        catch (Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
