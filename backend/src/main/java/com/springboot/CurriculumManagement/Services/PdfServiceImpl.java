package com.springboot.CurriculumManagement.Services;

import com.lowagie.text.*;
import com.lowagie.text.pdf.PdfWriter;
import com.springboot.CurriculumManagement.Entities.Department;
import com.springboot.CurriculumManagement.Entities.Subjects;
import com.springboot.CurriculumManagement.CustomClasses.PdfTable;
import com.springboot.CurriculumManagement.Repository.DepartmentRepository;
import com.springboot.CurriculumManagement.Repository.SubjectFileRepository;
import com.springboot.CurriculumManagement.Repository.SubjectsRepository;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;


@Service
public class PdfServiceImpl implements PdfService {

    @Autowired
    private SubjectFileRepository subjectFileDao;

    @Autowired
    private DepartmentRepository departmentDao;

    @Autowired
    private SubjectsRepository subjectsDao;

    private List<String> list=new ArrayList<>();

    private Logger logger= LoggerFactory.getLogger(PdfService.class);
    public ByteArrayInputStream createPdf(int admissionYear,String deptName){

        logger.info("Creating pdf!!!!!!!!!!!!!!!!!");

        Document doc=new Document();
        ByteArrayOutputStream out=new ByteArrayOutputStream();
        PdfWriter.getInstance(doc,out);

        doc.open();

        createStartPage(doc);


        //logic of getting subjects list

        Department dept=departmentDao.findByName(deptName);
        int graduationYear=admissionYear+4;
//        List<Subjects> subjectsList=new ArrayList<>();

        for (int semester=1;semester<9;semester++) {
        List<Subjects> subjectsToAdd = subjectsDao.findAllByAdmissionYear(dept,semester,admissionYear, graduationYear);
//        subjectsList.addAll(subjectsToAdd);
        createTable(doc,subjectsToAdd,semester);
        }


        doc.close();
//        byte [] pdfBytes=out.toByteArray();

        return new ByteArrayInputStream(out.toByteArray());
//        return pdfBytes;
    }

    private void createTable(Document doc, List<Subjects> subjectsList, int semester) {

        PdfTable pdfTable = new PdfTable();
        doc.newPage();

        String title="SEM-"+intToRoman(semester);
        Font font= FontFactory.getFont(FontFactory.HELVETICA_BOLD,15);
        Paragraph para=new Paragraph(title,font);
        para.setAlignment(Element.ALIGN_CENTER);
        doc.add(para);

        // Add the table cells
        pdfTable.addCell("Subject Code");
        pdfTable.addCell("Subject name");
        pdfTable.addCell("Lecture hours");
        pdfTable.addCell("Tutorials");
        pdfTable.addCell("Practical hours");
        pdfTable.addCell("Theory marks");
        pdfTable.addCell("Sessional marks");
        pdfTable.addCell("Practical marks");
        pdfTable.addCell("Termwork marks");

        for (Subjects subjects : subjectsList) {
//            System.out.println(item);
            pdfTable.addCell(subjects.getdduCode());
            pdfTable.addCell(subjects.getSubjectName());
            pdfTable.addCell(String.valueOf(subjects.getLectureHours()));
            pdfTable.addCell(String.valueOf(subjects.getTutorial()));
            pdfTable.addCell(String.valueOf(subjects.getPracticalHours()));
            pdfTable.addCell(String.valueOf(subjects.getTheoryMarks()));
            pdfTable.addCell(String.valueOf(subjects.getSessionalMarks()));
            pdfTable.addCell(String.valueOf(subjects.getPracticalMarks()));
            pdfTable.addCell(String.valueOf(subjects.getTermworkMarks()));
        }


        doc.add(pdfTable.getTable());
    }


    @Override
    public ByteArrayInputStream mergePdfs(int admissionYear,String deptName) throws IOException {

        byte[] subjectFileFromDB = subjectFileDao.getById("1").getSubjectFileData();
//        byte[] subjectFileFromDB = createPdf().readAllBytes();
//        byte[] generatedPdf=createPdf(admissionYear,deptName).readAllBytes();

        ByteArrayInputStream bais=createPdf(admissionYear,deptName);
        byte[] buffer = new byte[1024];
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        int bytesRead = 0;
        while ((bytesRead = bais.read(buffer)) != -1) {
            baos.write(buffer, 0, bytesRead);
        }
        byte[] generatedPdf = baos.toByteArray();



        PDDocument document1 = PDDocument.load(generatedPdf);
        PDDocument document2 = PDDocument.load(subjectFileFromDB);

        PDDocument mergedDoc=new PDDocument();

        for (PDPage page : document1.getPages()) {
            mergedDoc.addPage(page);
        }

        // add the pages from the second document
        for (PDPage page : document2.getPages()) {
            mergedDoc.addPage(page);
        }
//        ByteArrayOutputStream out=new ByteArrayOutputStream();
//        PdfWriter.getInstance(mergedDoc,out);

        ByteArrayOutputStream out = new ByteArrayOutputStream();
        mergedDoc.save(out);
//        byte[] mergedPDF = outputStream.toByteArray();

        // close the documents
        document1.close();
        document2.close();
        mergedDoc.close();

//        return mergedPDF;
        return new ByteArrayInputStream(out.toByteArray());
    }

    private void createStartPage(Document doc) {

        Font font= FontFactory.getFont(FontFactory.HELVETICA_BOLD);

        font.setSize(20);
        Paragraph title=new Paragraph("Dharmsinh Desai University", new Font(font));
        title.add(new Chunk("\n"));

        font.setSize(15);
        title.add(new Chunk("Faculty of Technology",font));
        title.add(new Chunk("\n"));
        title.add(new Chunk("\n"));

//        title.add(new Chunk("Department of "+""))  here received branch name would be added dynamically

        font.setSize(40);
        title.add(new Paragraph("Detailed Syllabus Book",font));

        title.setAlignment(Element.ALIGN_CENTER);
        doc.add(title);


    }

    public static String intToRoman(int num) {
        String[] romanSymbols = {"M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"};
        int[] romanValues = {1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1};
        StringBuilder romanNumeral = new StringBuilder();
        int i = 0;
        while (num > 0) {
            if (romanValues[i] <= num) {
                num -= romanValues[i];
                romanNumeral.append(romanSymbols[i]);
            } else {
                i++;
            }
        }
        return romanNumeral.toString();
    }

}
