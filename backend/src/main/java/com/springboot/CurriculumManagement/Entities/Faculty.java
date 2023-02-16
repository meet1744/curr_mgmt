package com.springboot.CurriculumManagement.Entities;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "faculty")
public class Faculty {
    @Id
    private String facultyId;

    @Column(nullable = false)
    private String facultyName;
    @Column(nullable = false)
    private String password;
//    @Column(nullable = false)
//    private String departmentName;
    @Column(unique = true, nullable = false)
    private String emailId;

    @OneToOne
    @JoinColumn(name = "deptId", nullable = false)
    private Department dept;
@ManyToMany(cascade = {
        CascadeType.ALL
    })
    @JoinTable(
        name = "teaches",
        joinColumns = {
            @JoinColumn(name = "faculty_id")
        },
        inverseJoinColumns = {
            @JoinColumn(name = "subject_id")
        }
    )
    private List<Subjects> subjectsList;

    public Faculty() {
        super();
    }

    public String getFacultyId() {
        return facultyId;
    }

    public void setFacultyId(String facultyId) {
        this.facultyId = facultyId;
    }

    public String getFacultyName() {
        return facultyName;
    }

    public void setFacultyName(String facultyName) {
        this.facultyName = facultyName;
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
}
