package com.springboot.CurriculumManagement.Repository;

import com.springboot.CurriculumManagement.Entities.ProgramCoordinator;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PCRepository extends JpaRepository<ProgramCoordinator,String> {
    Optional<ProgramCoordinator> findByProgramCoordinatorId(String id);
}
