package com.springboot.CurriculumManagement.Services;

import com.springboot.CurriculumManagement.Entities.*;
import com.springboot.CurriculumManagement.Exceptions.ResourceNotFoundException;
import com.springboot.CurriculumManagement.Payloads.HODDto;
import com.springboot.CurriculumManagement.Payloads.PCDto;
import com.springboot.CurriculumManagement.Repository.FacultyRepository;
import com.springboot.CurriculumManagement.Repository.PCRepository;
import com.springboot.CurriculumManagement.Repository.SubjectsRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.data.relational.core.sql.In;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.List;

import static java.lang.Integer.parseInt;

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
    public void addNewSubject(Subjects newSubject) throws DuplicateKeyException {

        Subjects isPresent = null;
        try {
//
            isPresent = subjectsDao.findById(newSubject.getdduCode()).orElseThrow(() -> new ResourceNotFoundException("subjects", "id", newSubject.getdduCode()));
            System.out.println("preseent"+isPresent.getSubjectName());
            System.out.println("preseent"+isPresent.getdduCode());

                throw new DuplicateKeyException("Same id already exists");

        }
        catch (ResourceNotFoundException e){

            System.out.println("ddu code "+newSubject.getdduCode());
            subjectsDao.save(newSubject);
        }


    }

    @Override
    public List<Faculty> getAllFaculty(Department deptId) {

        return facultyDao.findAllByDeptId(deptId);
//        return facultyDao.findAll();
    }

    @Override
    public List<Integer> getRemainingSubSequence(String semesterSelected) {

        List<Integer> existingSubSequence= subjectsDao.findExistingSubSequence(parseInt(semesterSelected));
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
