package com.springboot.CurriculumManagement.Services;

import com.lowagie.text.*;
import com.lowagie.text.pdf.PdfPTable;
import com.lowagie.text.pdf.PdfWriter;
import com.springboot.CurriculumManagement.Repository.SubjectFileRepository;
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

    private List<String> list=new ArrayList<>();

    private Logger logger= LoggerFactory.getLogger(PdfService.class);
    public ByteArrayInputStream createPdf(){

        logger.info("Creating pdf!!!!!!!!!!!!!!!!!");

        Document doc=new Document();
        ByteArrayOutputStream out=new ByteArrayOutputStream();
        PdfWriter.getInstance(doc,out);

        doc.open();

        createStartPage(doc);


        doc.close();
//        byte [] pdfBytes=out.toByteArray();

        return new ByteArrayInputStream(out.toByteArray());
//        return pdfBytes;
    }

    @Override
    public ByteArrayInputStream mergePdfs(String subjectDduCode) throws IOException {

        byte[] subjectFileFromDB = subjectFileDao.getById(subjectDduCode).getSubjectFileData();
        byte[] generatedPdf=createPdf().readAllBytes();

        PDDocument document1 = PDDocument.load(subjectFileFromDB);
        PDDocument document2 = PDDocument.load(generatedPdf);

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

    public void addData(PdfPTable table){
        for(String data:list){
            table.addCell(String.valueOf(data));
        }
    }
}
