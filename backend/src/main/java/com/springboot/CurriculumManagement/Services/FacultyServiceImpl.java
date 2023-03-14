package com.springboot.CurriculumManagement.Services;

import com.springboot.CurriculumManagement.Entities.Department;
import com.springboot.CurriculumManagement.Entities.Faculty;
import com.springboot.CurriculumManagement.Entities.Subjects;
import com.springboot.CurriculumManagement.Payloads.FacultyDto;
import com.springboot.CurriculumManagement.Payloads.HODDto;
import com.springboot.CurriculumManagement.Repository.FacultyRepository;
import com.springboot.CurriculumManagement.Repository.SubjectsRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FacultyServiceImpl implements FacultyService{

    @Autowired
    private FacultyRepository facultyDao;
    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private SubjectsRepository subjectsDao;

    @Override
    public List<Subjects> getAllSubjects(Department dept) {

        return subjectsDao.findAllByDeptId(dept);
    }

    public FacultyDto FacultyToDto(Faculty faculty) {
        FacultyDto dto=this.modelMapper.map(faculty,FacultyDto.class);
        return dto;
    }
}
