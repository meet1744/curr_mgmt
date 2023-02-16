package com.springboot.CurriculumManagement.Entities;

import jakarta.persistence.*;

import java.util.List;
import java.util.Set;

@Entity
@Table(name = "subjects")
public class Subjects {
    @Column(nullable = false)
    private String effectiveDate;
    private String removedDate;
    @Column(nullable = false)
    private int semester;

    //What is sub seq?

    private int subSequence;
    @Column(unique = true,nullable = false)
    private String AICTEcode;

    @Id
    private String DDUcode;
    @Column(nullable = false)
    private String subjectName;

    //optional
    @Column(nullable = false)
    private String parentDept;

    private String extraInfo;
    @Column(nullable = false)
    private String subjectType;

    @Column(nullable = false)
    private String subjectTypeExplanation;
    @Column(nullable = false)
    private int theoryMarks;
    @Column(nullable = false)
    private int sessionalMarks;
    @Column(nullable = false)
    private int termworkMarks;
    @Column(nullable = false)
    private int practicalMarks;
    @Column(nullable = false)
    private int totalMarks;
    @Column(nullable = false)
    private int LectureHours;
    @Column(nullable = false)
    private int tutorial;
    @Column(nullable = false)
    private int PracticalHours;
    @Column(nullable = false)
    private int totalHours;
    @Column(nullable = false)
    private int lectureAndTheoryCredit;
    @Column(nullable = false)
    private int practicalCredit;
    @Column(nullable = false)
    private int totalCredit;

    @ManyToOne
    @JoinColumn(name = "deptId",nullable = false)
    private Department dept;

    @ManyToMany
    private List<Faculty> facultyList;

    public Subjects() {
        super();
    }

    public String getEffectiveDate() {
        return effectiveDate;
    }

    public void setEffectiveDate(String effectiveDate) {
        this.effectiveDate = effectiveDate;
    }

    public String getRemovedDate() {
        return removedDate;
    }

    public void setRemovedDate(String removedDate) {
        this.removedDate = removedDate;
    }

    public int getSemester() {
        return semester;
    }

    public void setSemester(int semester) {
        this.semester = semester;
    }

    public int getSubSequence() {
        return subSequence;
    }

    public void setSubSequence(int subSequence) {
        this.subSequence = subSequence;
    }

    public String getAICTEcode() {
        return AICTEcode;
    }

    public void setAICTEcode(String AICTEcode) {
        this.AICTEcode = AICTEcode;
    }

    public String getDDUcode() {
        return DDUcode;
    }

    public void setDDUcode(String DDUcode) {
        this.DDUcode = DDUcode;
    }

    public String getSubjectName() {
        return subjectName;
    }

    public void setSubjectName(String subjectName) {
        this.subjectName = subjectName;
    }

    public String getParentDept() {
        return parentDept;
    }

    public void setParentDept(String parentDept) {
        this.parentDept = parentDept;
    }

    public String getExtraInfo() {
        return extraInfo;
    }

    public void setExtraInfo(String extraInfo) {
        this.extraInfo = extraInfo;
    }

    public String getSubjectType() {
        return subjectType;
    }

    public void setSubjectType(String subjectType) {
        this.subjectType = subjectType;
    }

    public String getSubjectTypeExplanation() {
        return subjectTypeExplanation;
    }

    public void setSubjectTypeExplanation(String subjectTypeExplanation) {
        this.subjectTypeExplanation = subjectTypeExplanation;
    }

    public int getTheoryMarks() {
        return theoryMarks;
    }

    public void setTheoryMarks(int theoryMarks) {
        this.theoryMarks = theoryMarks;
    }

    public int getSessionalMarks() {
        return sessionalMarks;
    }

    public void setSessionalMarks(int sessionalMarks) {
        this.sessionalMarks = sessionalMarks;
    }

    public int getTermworkMarks() {
        return termworkMarks;
    }

    public void setTermworkMarks(int termworkMarks) {
        this.termworkMarks = termworkMarks;
    }

    public int getPracticalMarks() {
        return practicalMarks;
    }

    public void setPracticalMarks(int practicalMarks) {
        this.practicalMarks = practicalMarks;
    }

    public int getTotalMarks() {
        return totalMarks;
    }

    public void setTotalMarks(int totalMarks) {
        this.totalMarks = totalMarks;
    }

    public int getLectureHours() {
        return LectureHours;
    }

    public void setLectureHours(int lectureHours) {
        LectureHours = lectureHours;
    }

    public int getTutorial() {
        return tutorial;
    }

    public void setTutorial(int tutorial) {
        this.tutorial = tutorial;
    }

    public int getPracticalHours() {
        return PracticalHours;
    }

    public void setPracticalHours(int practicalHours) {
        PracticalHours = practicalHours;
    }

    public int getTotalHours() {
        return totalHours;
    }

    public void setTotalHours(int totalHours) {
        this.totalHours = totalHours;
    }

    public int getLectureAndTheoryCredit() {
        return lectureAndTheoryCredit;
    }

    public void setLectureAndTheoryCredit(int lectureAndTheoryCredit) {
        this.lectureAndTheoryCredit = lectureAndTheoryCredit;
    }

    public int getPracticalCredit() {
        return practicalCredit;
    }

    public void setPracticalCredit(int practicalCredit) {
        this.practicalCredit = practicalCredit;
    }

    public int getTotalCredit() {
        return totalCredit;
    }

    public void setTotalCredit(int totalCredit) {
        this.totalCredit = totalCredit;
    }
}
