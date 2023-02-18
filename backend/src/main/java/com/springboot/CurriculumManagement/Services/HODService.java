package com.springboot.CurriculumManagement.Services;

import com.springboot.CurriculumManagement.Payloads.HODDto;
import org.springframework.stereotype.Service;

@Service
public interface HODService {
    public HODDto getHODById(String HODId);
}
