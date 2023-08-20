package com.springboot.CurriculumManagement.Services;



import com.springboot.CurriculumManagement.Entities.SubjectFile;
import com.springboot.CurriculumManagement.Entities.Subjects;
import com.springboot.CurriculumManagement.Exceptions.FileNotFoundException;
import com.springboot.CurriculumManagement.Exceptions.FileStorageException;
import com.springboot.CurriculumManagement.Repository.SubjectFileRepository;
import com.springboot.CurriculumManagement.Repository.SubjectsRepository;
import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
public class SubjectFileServiceImpl implements SubjectFileService{

    @Autowired
    private SubjectFileRepository subjectFileDao;

    public SubjectFile storeFile(MultipartFile file, String dduCode) {
        try {
            byte[] fileBytes= IOUtils.toByteArray(file.getInputStream());
            return subjectFileDao.save(new SubjectFile(fileBytes,dduCode));
        } catch (IOException ex) {
            throw new FileStorageException("Could not store file. Please try again!", ex);
        }
    }

    public SubjectFile getFile(String fileId) {
        return subjectFileDao.findById(fileId)
                .orElseThrow(()-> new FileNotFoundException("File not found with id " + fileId));
    }




}
