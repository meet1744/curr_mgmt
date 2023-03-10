package com.springboot.CurriculumManagement.Services;

import com.springboot.CurriculumManagement.Entities.Department;
import com.springboot.CurriculumManagement.Entities.Faculty;
import com.springboot.CurriculumManagement.Entities.HOD;
import com.springboot.CurriculumManagement.Entities.ProgramCoordinator;
import com.springboot.CurriculumManagement.Exceptions.ResourceNotFoundException;
import com.springboot.CurriculumManagement.Payloads.HODDto;
import com.springboot.CurriculumManagement.Repository.FacultyRepository;
import com.springboot.CurriculumManagement.Repository.HODRepository;
import com.springboot.CurriculumManagement.Repository.PCRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
public class HODServiceImpl implements HODService{

	@Autowired
    private FacultyRepository facultyDao;

    @Autowired
    private PCRepository pcDao;
    @Autowired
    private HODRepository HODRepo;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public HODDto getHODById(String HODId) {
        HOD hod=this.HODRepo.findById(HODId).orElseThrow(()->new ResourceNotFoundException("HOD","Id",HODId));
        return this.HODToDto(hod);
    }

//    @PreAuthorize("hasAuthority('ROLE_ANONYMOUS')")
    @Override
    @PreAuthorize("isAuthenticated()")
    public Faculty addNewFaculty(Faculty faculty) {
        facultyDao.save(faculty);
        return faculty;
    }

    @Override
    public List<Faculty> getAllFaculty(Department dept) {

        return facultyDao.findAllByDeptId(dept);
//        return facultyDao.findAll();
    }

    @Override
    public void deleteFaculty(String facultyId) {
        Faculty facultyToDelete=facultyDao.getById(facultyId);
        facultyDao.delete(facultyToDelete);

    }




    @Override
    public void appointProgramCoordinator(Faculty newPc) {

        ProgramCoordinator pcToAdd=new ProgramCoordinator(newPc.getFacultyId(), newPc.getFacultyName(), newPc.getPassword(), newPc.getEmailId(), newPc.getDept());
        pcDao.save(pcToAdd);
    }

    @Override
    public Optional<Faculty> getFacultyById(String id) {
        return facultyDao.findByFacultyId(id);
    }


    public HOD DtoToHOD(HODDto dto){
        HOD hod=this.modelMapper.map(dto,HOD.class);
        return hod;
    }
    public HODDto HODToDto(HOD hod){
        HODDto dto=this.modelMapper.map(hod,HODDto.class);
        return dto;
    }
	
	

    public HODServiceImpl() {
    }


}
