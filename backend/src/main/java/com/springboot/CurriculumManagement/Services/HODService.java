package com.springboot.CurriculumManagement.Services;

import com.springboot.CurriculumManagement.Payloads.HODDto;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

@Service
public interface HODService extends UserDetailsService {
    public HODDto getHODById(String HODId);
}
