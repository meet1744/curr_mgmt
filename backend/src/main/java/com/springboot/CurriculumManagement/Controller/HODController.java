package com.springboot.CurriculumManagement.Controller;

import com.springboot.CurriculumManagement.Entities.Department;
import com.springboot.CurriculumManagement.Entities.Faculty;
import com.springboot.CurriculumManagement.Entities.Subjects;
import com.springboot.CurriculumManagement.Exceptions.ResourceNotFoundException;
import com.springboot.CurriculumManagement.Repository.FacultyRepository;
import com.springboot.CurriculumManagement.Services.HODService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping(value = "/HOD/")
public class HODController {

    @Autowired
    private HODService hodService;

    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private FacultyRepository facultyRepository;

    @PostMapping("/getallsubjects")
    public List<Subjects> getAllSubjects(@RequestBody Department dept){

        return this.hodService.getAllSubjects(dept);
    }

    @PostMapping("/addnewfaculty")
    public ResponseEntity<HttpStatus> addNewFaculty(@RequestBody Faculty newFaculty){
        try {
            newFaculty.setPassword(this.passwordEncoder.encode(newFaculty.getPassword()));
           this.hodService.addNewFaculty(newFaculty);
            return new ResponseEntity<>(HttpStatus.OK);
        }
        catch (Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }
    @PostMapping("/getallfaculty")
    public List<Faculty> getAllFaculty(@RequestBody Department dept){

        return this.hodService.getAllFaculty(dept);
    }

    @DeleteMapping("/deletefaculty/{facultyId}")
    public ResponseEntity<HttpStatus> deleteFaculty(@PathVariable String facultyId){
        try {
            System.out.println("delete");
            this.hodService.deleteFaculty(facultyId);
            return new ResponseEntity<>(HttpStatus.OK);
        }
        catch (Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @GetMapping("/getfacultybyid/{facultyid}")
    public Faculty getFacultyById(@PathVariable(value = "facultyid") String id) {
//        Optional<Faculty> faculty = hodService.getFacultyById(id);
//        return faculty;
        Faculty faculty=this.facultyRepository.findByFacultyId(id).orElseThrow(()->new ResourceNotFoundException("Faculty","id",id));
        return faculty;
    }
@GetMapping("/appointpc/{newPcId}")
public ResponseEntity<HttpStatus> appointProgramCoordinator(@PathVariable String newPcId){

    try {
        Faculty newPc=getFacultyById(newPcId);
        this.hodService.appointProgramCoordinator(newPc);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    catch (Exception e){
        System.out.println("in catch controller");
        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }


    //returns error if already exists using custom http status code
}







}
