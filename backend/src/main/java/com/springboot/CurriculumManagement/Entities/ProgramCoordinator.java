package com.springboot.CurriculumManagement.Entities;

import jakarta.persistence.*;

@Entity
@Table(name = "program_coordinator")
public class ProgramCoordinator {
    @Id
    private String programCoordinatorId;

    @Column(nullable = false)
    private String ProgramCoordinatorName;
    @Column(nullable = false)
    private String password;
//    @Column(nullable = false)
//    private String departmentId;
    @Column(unique = true, nullable = false)
    private String emailId;

    @OneToOne
    @JoinColumn(name = "deptId", nullable = false)
    private Department dept;

    public ProgramCoordinator() {
        super();
    }

    public String getProgramCoordinatorId() {
        return programCoordinatorId;
    }

    public void setProgramCoordinatorId(String programCoordinatorId) {
        this.programCoordinatorId = programCoordinatorId;
    }

    public String getProgramCoordinatorName() {
        return ProgramCoordinatorName;
    }

    public void setProgramCoordinatorName(String programCoordinatorName) {
        ProgramCoordinatorName = programCoordinatorName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmailId() {
        return emailId;
    }

    public void setEmailId(String emailId) {
        this.emailId = emailId;
    }

    public Department getDept() {
        return dept;
    }

    public void setDept(Department dept) {
        this.dept = dept;
    }
}
