package com.springboot.CurriculumManagement.Controller;

import com.springboot.CurriculumManagement.Entities.Department;
import com.springboot.CurriculumManagement.Entities.Faculty;
import com.springboot.CurriculumManagement.Services.HODService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping(value = "/HOD/")
public class HODController {

    @Autowired
    private HODService hodService;



    @PostMapping("/addfaculty")
    public Faculty addNewFaculty(@RequestBody Faculty faculty){
//        System.out.println(faculty.getFacultyId());
//        System.out.println(faculty.getFacultyName());
//        System.out.println(faculty.getPassword());
//        System.out.println(faculty.getEmailId());
//        System.out.println("This is fac dept :"+faculty.getDept());



        return this.hodService.addNewFaculty(faculty);
    }
    @GetMapping("/getallfaculty")
    public List<Faculty> getAllFaculty(){
        return this.hodService.getAllFaculty();
    }

    @DeleteMapping("/getfaculty/{facultyId}")
    public ResponseEntity<HttpStatus> deleteFaculty(@PathVariable String facultyId){
        try {
            this.hodService.deleteFaculty(facultyId);
            return new ResponseEntity<>(HttpStatus.OK);
        }
        catch (Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/programcoordinator")
    public void appointProgramCoordinator(){
        hodService.appointProgramCoordinator();
        //returns error if already exists using custom http status code
    }






}
