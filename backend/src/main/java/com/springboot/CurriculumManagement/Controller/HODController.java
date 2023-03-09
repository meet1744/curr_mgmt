package com.springboot.CurriculumManagement.Controller;

import com.springboot.CurriculumManagement.Entities.Faculty;
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
            System.out.println("delete");
            this.hodService.deleteFaculty(facultyId);
            return new ResponseEntity<>(HttpStatus.OK);
        }
        catch (Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

//    @PostMapping("/appointpc")
//    public void appointProgramCoordinator(@RequestBody Faculty newPc){
//        System.out.println(newPc);
//        hodService.appointProgramCoordinator(newPc);
//        //returns error if already exists using custom http status code
//    }

    @GetMapping("/getfacultybyid/{facultyid}")
    public Faculty getFacultyById(@PathVariable(value = "facultyid") String id) {
        Faculty faculty = hodService.getFacultyById(id);
        return faculty;
    }
@GetMapping("/appointpc/{newPcId}")
public void appointProgramCoordinator(@PathVariable String newPcId){
    System.out.println(newPcId);
    Faculty newPc=getFacultyById(newPcId);
    hodService.appointProgramCoordinator(newPc);
    //returns error if already exists using custom http status code
}
    
    // @GetMapping("/programcoordinator")
    // public void appointProgramCoordinator(){
    //     hodService.appointProgramCoordinator();
    // }






}
