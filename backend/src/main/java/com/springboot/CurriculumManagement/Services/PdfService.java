package com.springboot.CurriculumManagement.Services;

import java.io.ByteArrayInputStream;
import java.io.IOException;

public interface PdfService {
    public ByteArrayInputStream createPdf();

   public ByteArrayInputStream mergePdfs(String dduCode) throws IOException;
}
