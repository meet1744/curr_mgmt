package com.springboot.CurriculumManagement.Services;

import com.springboot.CurriculumManagement.Entities.Faculty;
import com.springboot.CurriculumManagement.Payloads.HODDto;

import java.util.List;
import java.util.Optional;


public interface HODService {
    public HODDto getHODById(String HODId);
	Faculty addNewFaculty(Faculty faculty);

    List<Faculty> getAllFaculty();

    void deleteFaculty(String facultyId);

//    void appointProgramCoordinator();
void appointProgramCoordinator(Faculty newPc);

    Optional<Faculty> getFacultyById(String id);
}
