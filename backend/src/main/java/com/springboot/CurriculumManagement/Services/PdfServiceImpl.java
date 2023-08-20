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
import java.util.Calendar;
import java.util.List;


@Service
public class PdfServiceImpl implements PdfService {

    @Autowired
    private SubjectFileRepository subjectFileDao;

    @Autowired
    private DepartmentRepository departmentDao;

    @Autowired
    private SubjectsRepository subjectsDao;



    private Logger logger= LoggerFactory.getLogger(PdfService.class);
    public ByteArrayInputStream createPdf(int admissionYear,String deptName,List<Subjects> subjectsList){

        logger.info("Creating pdf!!!!!!!!!!!!!!!!!");

        Document doc=new Document();
        ByteArrayOutputStream out=new ByteArrayOutputStream();
        PdfWriter.getInstance(doc,out);

        doc.open();

        createStartPage(doc);


        //logic of getting subjects list

        Department dept=departmentDao.findByName(deptName);
        int graduationYear=admissionYear+4;


        for (int semester=1;semester<9;semester++) {
        List<Subjects> subjectsToAdd = subjectsDao.findAllByAdmissionYear(dept,semester,admissionYear, graduationYear);
        subjectsList.addAll(subjectsToAdd);
        createTable(doc,subjectsToAdd,semester);
        }
        System.out.println("subjects list in create pdf "+subjectsList.size());

        doc.close();

        return new ByteArrayInputStream(out.toByteArray());
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
    public ByteArrayInputStream getMergedPdfsFromDB(List<Subjects> subjectsList) throws IOException {
        List<String> dduCodesOfSubjectsFileToBeAdded=new ArrayList<>(subjectsList.size());
        for(int i=0;i<subjectsList.size();i++){
            dduCodesOfSubjectsFileToBeAdded.add(subjectsList.get(i).getdduCode());
        }
        System.out.println("number of list "+subjectsList.size());
        System.out.println("number of "+dduCodesOfSubjectsFileToBeAdded.size());

        List<byte[]>subjectFiles=new ArrayList<>(dduCodesOfSubjectsFileToBeAdded.size());

        for(int i=0;i<dduCodesOfSubjectsFileToBeAdded.size();i++){
              subjectFiles.add(subjectFileDao.getById(dduCodesOfSubjectsFileToBeAdded.get(i)).getSubjectFileData());
        }
        System.out.println("before merge pdf db");
        return addSubjectFileToDoc(subjectFiles);
    }




    @Override
    public ByteArrayInputStream mergePdfs(int admissionYear,String deptName) throws IOException {
        List<Subjects> subjectsList=new ArrayList<>();

        ByteArrayInputStream bais=createPdf(admissionYear,deptName,subjectsList);
        byte[] buffer = new byte[1024];
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        int bytesRead = 0;
        while ((bytesRead = bais.read(buffer)) != -1) {
            baos.write(buffer, 0, bytesRead);
        }
        byte[] generatedPdf = baos.toByteArray();



        System.out.println("subjects list "+subjectsList.isEmpty());
        ByteArrayInputStream baisForDBFile=getMergedPdfsFromDB(subjectsList);
        byte[] buffer2 = new byte[1024];
        ByteArrayOutputStream baosForDBFile = new ByteArrayOutputStream();
        int bytesRead2 = 0;
        while ((bytesRead2 = baisForDBFile.read(buffer2)) != -1) {
            baosForDBFile.write(buffer2, 0, bytesRead2);
        }
        byte[] subjectFileFromDB = baosForDBFile.toByteArray();


        System.out.println("before pdd load");
        PDDocument document1 = PDDocument.load(generatedPdf);
        System.out.println("after one load");
        PDDocument document2 = PDDocument.load(subjectFileFromDB);
        System.out.println("after pdd load");

        PDDocument mergedDoc=new PDDocument();

        for (PDPage page : document1.getPages()) {
            mergedDoc.addPage(page);
        }
        System.out.println("after merge doc 1");

        // add the pages from the second document
        for (PDPage page : document2.getPages()) {
            mergedDoc.addPage(page);
        }
        System.out.println("after merge doc 2");

        ByteArrayOutputStream out = new ByteArrayOutputStream();
        mergedDoc.save(out);

        // close the documents
        baos.close();
        bais.close();
        baosForDBFile.close();
        baisForDBFile.close();
        document1.close();
        document2.close();
        mergedDoc.close();

        return new ByteArrayInputStream(out.toByteArray());
    }

    @Override
    public List<Integer> getListOfAdmissionYearByDeptname(String deptName) {
        int startYearOfDepartment=departmentDao.findStartYearByDepartmentName(deptName);
        List<Integer> yearList=getYearList(startYearOfDepartment);
        return yearList;
    }

    @Override
    public List<Integer> getListOfAllAdmissionYears() {
        int startYearOfFirstDepartment= departmentDao.findStartYearOfFirstDepartment();
        List<Integer> yearList=getYearList(startYearOfFirstDepartment);
        return yearList;
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

        font.setSize(40);
        title.add(new Paragraph("Detailed Syllabus Book",font));

        title.setAlignment(Element.ALIGN_CENTER);
        doc.add(title);


    }

    public List<Integer> getYearList(int startYear){
        List<Integer> yearList = new ArrayList<>();
        int currentYear = Calendar.getInstance().get(Calendar.YEAR);
        for (int year = startYear; year <= currentYear; year++) {
            yearList.add(year);
        }
        return yearList;
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

    private ByteArrayInputStream addSubjectFileToDoc(List<byte[]> subjectFiles) throws IOException {

        ByteArrayOutputStream out = new ByteArrayOutputStream();
        PDDocument mergedDoc = new PDDocument();
        PDDocument document2=new PDDocument();
        for (int i=0;i<subjectFiles.size();i++) {

            document2 = PDDocument.load(subjectFiles.get(i));
            for (PDPage page : document2.getPages()) {
                mergedDoc.addPage(page);
            }
        }

        mergedDoc.save(out);
        document2.close();
        mergedDoc.close();
        System.out.println("before addsubject file db");
        return new ByteArrayInputStream(out.toByteArray());
    }

}
