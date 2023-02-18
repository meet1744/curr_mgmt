package com.springboot.CurriculumManagement.Entities;

import javax.persistence.*;

import java.util.List;

@Entity
@Table(name = "Department")
public class Department {
    @Id
    private String deptId;
    @Column(unique = true,nullable = false)
    private String deptName;

    @Column(nullable = false)
    private int startYear;

    @Column
    private int endYear;

    @OneToOne(mappedBy = "dept")
    private ProgramCoordinator programCoordinator;

    @OneToOne(mappedBy = "dept")
    private HOD hod;

    @OneToOne(mappedBy = "dept")
    private Faculty faculty;

    @OneToMany(mappedBy = "dept")
    private List<Subjects> subjectsList;

    public String getDeptId() {
        return deptId;
    }

    public void setDeptId(String deptId) {
        this.deptId = deptId;
    }

    public String getDeptName() {
        return deptName;
    }

    public void setDeptName(String deptName) {
        this.deptName = deptName;
    }

    public Department() {
        super();
    }
}
