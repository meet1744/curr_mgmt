package com.springboot.CurriculumManagement.Services;

import com.springboot.CurriculumManagement.Entities.*;
import com.springboot.CurriculumManagement.Payloads.HODDto;
import com.springboot.CurriculumManagement.Payloads.PCDto;
import com.springboot.CurriculumManagement.Repository.FacultyRepository;
import com.springboot.CurriculumManagement.Repository.PCRepository;
import com.springboot.CurriculumManagement.Repository.SubjectsRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.relational.core.sql.In;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.List;

@Service
public class PCServiceImpl implements PCService{

    @Autowired
    private SubjectsRepository subjectsDao;

    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private FacultyRepository facultyDao;

    final private List<Integer> subSequenceLimit= Arrays.asList(new Integer[] { 1, 2, 3, 4, 5,6 });
    @Override
    public Subjects addNewSubject(Subjects newSubject) {
        subjectsDao.save(newSubject);
        return newSubject;
    }

    @Override
    public List<Faculty> getAllFaculty(Department deptId) {

        return facultyDao.findAllByDeptId(deptId);
//        return facultyDao.findAll();
    }

    @Override
    public List<Integer> getRemainingSubSequence(int semesterSelected) {

        List<Integer> existingSubSequence= subjectsDao.findExistingSubSequence(semesterSelected);
        List<Integer> remainingSubSequence= new ArrayList<>(subSequenceLimit);
        remainingSubSequence.removeAll(existingSubSequence);
        System.out.println("seq "+remainingSubSequence);
        return remainingSubSequence;
    }

    public PCDto PcToDto(ProgramCoordinator pc){
        PCDto dto=this.modelMapper.map(pc,PCDto.class);
        return dto;
    }
}
