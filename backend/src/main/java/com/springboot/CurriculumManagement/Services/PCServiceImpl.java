package com.springboot.CurriculumManagement.Services;

import com.springboot.CurriculumManagement.Entities.Faculty;
import com.springboot.CurriculumManagement.Entities.HOD;
import com.springboot.CurriculumManagement.Entities.ProgramCoordinator;
import com.springboot.CurriculumManagement.Entities.Subjects;
import com.springboot.CurriculumManagement.Payloads.HODDto;
import com.springboot.CurriculumManagement.Payloads.PCDto;
import com.springboot.CurriculumManagement.Repository.FacultyRepository;
import com.springboot.CurriculumManagement.Repository.PCRepository;
import com.springboot.CurriculumManagement.Repository.SubjectsRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PCServiceImpl implements PCService{

    @Autowired
    private SubjectsRepository subjectsDao;

    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private FacultyRepository facultyDao;
    @Override
    public Subjects addNewSubject(Subjects newSubject) {
        subjectsDao.save(newSubject);
        return newSubject;
    }

    @Override
    public List<Faculty> getAllFaculty() {
        return facultyDao.findAll();
    }

    public PCDto PcToDto(ProgramCoordinator pc){
        PCDto dto=this.modelMapper.map(pc,PCDto.class);
        return dto;
    }
}
