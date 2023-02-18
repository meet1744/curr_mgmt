package com.springboot.CurriculumManagement.Services;

import com.springboot.CurriculumManagement.Entities.HOD;
import com.springboot.CurriculumManagement.Exceptions.ResourceNotFoundException;
import com.springboot.CurriculumManagement.Payloads.HODDto;
import com.springboot.CurriculumManagement.Repository.HODRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.config.ConfigDataResourceNotFoundException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;


@Service
public class HODServiceImpl implements HODService{

    @Autowired
    private HODRepository HODRepo;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public HODDto getHODById(String HODId) {
        HOD hod=this.HODRepo.findById(HODId).orElseThrow(()->new ResourceNotFoundException("HOD","Id",HODId));
        return this.HODToDto(hod);
    }

    public HOD DtoToHOD(HODDto dto){
        HOD hod=this.modelMapper.map(dto,HOD.class);
        return hod;
    }
    public HODDto HODToDto(HOD hod){
        HODDto dto=this.modelMapper.map(hod,HODDto.class);
        return dto;
    }
}
