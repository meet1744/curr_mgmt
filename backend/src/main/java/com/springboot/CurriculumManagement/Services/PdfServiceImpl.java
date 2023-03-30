package com.springboot.CurriculumManagement.Services;

import com.lowagie.text.*;
import com.lowagie.text.pdf.PdfPCell;
import com.lowagie.text.pdf.PdfPTable;
import com.lowagie.text.pdf.PdfWriter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.util.ArrayList;
import java.util.List;


@Service
public class PdfServiceImpl implements PdfService {

    private List<String> list=new ArrayList<>();

    private Logger logger= LoggerFactory.getLogger(PdfService.class);
    public ByteArrayInputStream createPdf(){

        logger.info("Creating pdf!!!!!!!!!!!!!!!!!");

        Document doc=new Document();
        ByteArrayOutputStream out=new ByteArrayOutputStream();
        PdfWriter.getInstance(doc,out);

        doc.open();

        createStartPage(doc);




//        Font font2= FontFactory.getFont(FontFactory.HELVETICA,20);
//        Paragraph para2=new Paragraph(content,font2);
//        para2.add(new Chunk("Chunk para"));
//        doc.add(para2);


//        PdfPTable table= new PdfPTable(5);
//        table.setWidthPercentage(100);
//
//        PdfPCell cell=new PdfPCell();
//        cell.setPhrase(new Phrase("User Id"));
//        table.addCell(cell);
//
//        PdfPCell cell2=new PdfPCell();
//        cell2.setPhrase(new Phrase("User Id"));
//        table.addCell(cell2);
//
//        PdfPCell cell3=new PdfPCell();
//        cell3.setPhrase(new Phrase("User Id"));
//        table.addCell(cell3);
//
//        PdfPCell cell4=new PdfPCell();
//        cell4.setPhrase(new Phrase("User Id"));
//        table.addCell(cell4);
//
//        PdfPCell cell5=new PdfPCell();
//        cell5.setPhrase(new Phrase("User Id"));
//        table.addCell(cell5);
//
//        addData(table);
//
//        doc.add(table);

        doc.close();
//        byte [] pdfBytes=out.toByteArray();

        return new ByteArrayInputStream(out.toByteArray());
//        return pdfBytes;
    }

    private void createStartPage(Document doc) {

//        String title="Dharmsinh Desai University";
//        String content="Details";

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
