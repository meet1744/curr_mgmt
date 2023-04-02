package com.springboot.CurriculumManagement.Controller;

import com.springboot.CurriculumManagement.Services.PdfService;
import com.springboot.CurriculumManagement.Services.PdfServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.persistence.Access;
import java.awt.*;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/Pdf/")
public class PdfController {

    @Autowired
    private PdfService pdfService;

    @GetMapping("/createpdf")
    public ResponseEntity<InputStreamResource> createPdf() {
        //get entered branch name left for printing in pdf and pass in the createpdf method
        ByteArrayInputStream pdf = pdfService.createPdf(2020,"IT");

        HttpHeaders headers = new HttpHeaders();




        headers.add(HttpHeaders.CONTENT_DISPOSITION, "inline;file=filename.pdf");
        System.out.println("Just before return");
        return ResponseEntity.ok().headers(headers).contentType(MediaType.APPLICATION_PDF).body(new InputStreamResource(pdf));


    }

    @GetMapping("/getmergedpdf")
    public ResponseEntity<InputStreamResource> mergePdfs() throws IOException {

        ByteArrayInputStream pdf = pdfService.mergePdfs(2020,"IT");

        HttpHeaders headers = new HttpHeaders();
        headers.add(HttpHeaders.CONTENT_DISPOSITION, "inline;file=filename.pdf");
        System.out.println("Just before return in merge pdf");

        return ResponseEntity.ok().headers(headers).contentType(MediaType.APPLICATION_PDF).body(new InputStreamResource(pdf));
    }


}
