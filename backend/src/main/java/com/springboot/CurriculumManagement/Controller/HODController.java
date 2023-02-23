package com.springboot.CurriculumManagement.Controller;

import com.springboot.CurriculumManagement.Entities.Department;
import com.springboot.CurriculumManagement.Entities.Faculty;
import com.springboot.CurriculumManagement.Services.HODService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping(value = "/HOD/")
public class HODController {

    @Autowired
    private HODService hodService;

    @Autowired
    private PasswordEncoder passwordEncoder;



    @PostMapping("/addfaculty")
    public Faculty addNewFaculty(@RequestBody Faculty faculty){
        faculty.setPassword(this.passwordEncoder.encode(faculty.getPassword()));
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
    }






}
