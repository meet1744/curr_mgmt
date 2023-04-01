package com.springboot.CurriculumManagement.Controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.springboot.CurriculumManagement.Entities.Department;
import com.springboot.CurriculumManagement.Entities.SubjectFile;
import com.springboot.CurriculumManagement.Entities.Subjects;
import com.springboot.CurriculumManagement.Payloads.Response;
import com.springboot.CurriculumManagement.Repository.SubjectFileRepository;
import com.springboot.CurriculumManagement.Repository.SubjectsRepository;
import com.springboot.CurriculumManagement.Services.FacultyService;
import com.springboot.CurriculumManagement.Services.SubjectFileService;
import com.springboot.CurriculumManagement.Services.SubjectFileServiceImpl;
import org.apache.commons.io.FileUtils;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.commons.CommonsMultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Map;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping(value = "/Faculty/")
public class FacultyController {

    @Autowired
    private SubjectFileService subjectFileService;

    @Autowired
    private SubjectFileRepository subjectFileDao;

    @Autowired
    private FacultyService facultyService;
    @Autowired
    private SubjectsRepository subjectsDao;

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


    @PostMapping("/savesubjectdetails")
    public ResponseEntity<HttpStatus> saveSubjectDetails(@RequestBody Subjects subjectDetails) {
        try {
            this.facultyService.saveSubjectDetails(subjectDetails);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    @PostMapping("uploadsubjectfile")
    public ResponseEntity<String> uploadPdf(@RequestParam("file") MultipartFile file,@RequestParam("dduCode") String dduCode){
        try {
            SubjectFile subjectFile = new SubjectFile(file.getBytes(),dduCode);
            subjectFileDao.save(subjectFile);
            return new ResponseEntity<>("PDF uploaded successfully", HttpStatus.OK);
        } catch (IOException e) {
            return new ResponseEntity<>("Error uploading PDF: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("getPdf/{subjectDduCode}")
    public ResponseEntity<byte[]> getPdf(@PathVariable String subjectDduCode){
        System.out.println(subjectDduCode);
        SubjectFile subjectFile = subjectFileDao.getById(subjectDduCode);
        return new ResponseEntity<>(subjectFile.getSubjectFileData(),HttpStatus.OK);
    }

}
