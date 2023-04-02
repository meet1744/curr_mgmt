package com.springboot.CurriculumManagement.Services;

import java.io.ByteArrayInputStream;
import java.io.IOException;

public interface PdfService {
    public ByteArrayInputStream createPdf(int admissionYear,String deptname);

   public ByteArrayInputStream mergePdfs(int admissionYear,String deptname) throws IOException;
}
