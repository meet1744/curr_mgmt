package com.springboot.CurriculumManagement.Repository;

import com.springboot.CurriculumManagement.Entities.Department;
import com.springboot.CurriculumManagement.Entities.Faculty;
import com.springboot.CurriculumManagement.Entities.Subjects;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface SubjectsRepository extends JpaRepository<Subjects,String> {

//    Optional<Subjects> findBySubjectsId(String id);
    @Query(value = "select subSequence from Subjects where semester=?1")
    List<Integer> findExistingSubSequence(int semesterSelected);

    @Query(value = "select s from Subjects s where s.dept=?1 order by s.semester")
    List<Subjects> findAllByDeptId(Department deptId);

    @Query(value = "select s from Subjects s where s.facultyId=?1 order by s.semester")
    List<Subjects> findAllByFacultyId(String facultyId);

    @Query(value = "select s from Subjects s where year (s.effectiveDate)<=?1 and year (s.removedDate)>=?2 and  s.dept=?3 and s.semester=?4 order by s.subSequence")
    List<Subjects> findAllByAdmissionYear(int admissionYear,int graduationYear,Department dept,int semester);
}



//logic of getting subjects list
//
//        Department dept=departmentDao.findByName(deptname);
//        int graduationYear=admissionYear+4;
//        List<Subjects> subjectsList=new ArrayList<>();
//
//        for (int semester=1;semester<9;semester++) {
//        List<Subjects> subjectsToAdd = subjectsDao.findAllByAdmissionYear(admissionYear, graduationYear, dept,semester);
//        subjectsList.addAll(subjectsToAdd);
//        }
