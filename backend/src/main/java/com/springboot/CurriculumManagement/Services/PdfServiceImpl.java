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

        for(int i=0;i<5;i++){
            list.add("Manushi");
        }



        logger.info("Creating pdf!!!!!!!!!!!!!!!!!");

        String title="Subject Details";
        String content="Details";

        ByteArrayOutputStream out=new ByteArrayOutputStream();
        Document doc=new Document();

        PdfWriter.getInstance(doc,out);

        doc.open();

        Font font= FontFactory.getFont(FontFactory.HELVETICA_BOLD,30);
        Paragraph para=new Paragraph(title,font);
        para.setAlignment(Element.ALIGN_CENTER);
        doc.add(para);


        Font font2= FontFactory.getFont(FontFactory.HELVETICA,20);
        Paragraph para2=new Paragraph(content,font);
        para2.add(new Chunk("Chunk para"));
        doc.add(para2);


        PdfPTable table= new PdfPTable(5);
        table.setWidthPercentage(100);

        PdfPCell cell=new PdfPCell();
        cell.setPhrase(new Phrase("User Id"));
        table.addCell(cell);

        PdfPCell cell2=new PdfPCell();
        cell2.setPhrase(new Phrase("User Id"));
        table.addCell(cell2);

        PdfPCell cell3=new PdfPCell();
        cell3.setPhrase(new Phrase("User Id"));
        table.addCell(cell3);

        PdfPCell cell4=new PdfPCell();
        cell4.setPhrase(new Phrase("User Id"));
        table.addCell(cell4);

        PdfPCell cell5=new PdfPCell();
        cell5.setPhrase(new Phrase("User Id"));
        table.addCell(cell5);

        addData(table);

        doc.add(table);

        doc.close();
//        byte [] pdfBytes=out.toByteArray();

        return new ByteArrayInputStream(out.toByteArray());
//        return pdfBytes;
    }

    public void addData(PdfPTable table){
        for(String data:list){
            table.addCell(String.valueOf(data));
        }
    }
}
