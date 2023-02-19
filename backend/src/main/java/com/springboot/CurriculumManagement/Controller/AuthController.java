package com.springboot.CurriculumManagement.Controller;

import com.springboot.CurriculumManagement.Auth.JWTAuthRequest;
import com.springboot.CurriculumManagement.Auth.JWTAuthResponse;
import com.springboot.CurriculumManagement.Auth.JWTTokenHelper;
import com.springboot.CurriculumManagement.Entities.HOD;
import com.springboot.CurriculumManagement.Exceptions.ApiException;
import com.springboot.CurriculumManagement.Payloads.FacultyDto;
import com.springboot.CurriculumManagement.Payloads.HODDto;
import com.springboot.CurriculumManagement.Payloads.PCDto;
import com.springboot.CurriculumManagement.UserDetailService.FacultyUserDetailService;
import com.springboot.CurriculumManagement.UserDetailService.HODUserDetailService;
import com.springboot.CurriculumManagement.UserDetailService.PCUserDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping(value = "/api/v1/auth/")
public class AuthController {

    @Autowired
    private JWTTokenHelper jwtTokenHelper;
    @Autowired
    private HODUserDetailService hodUserDetailsService;
    @Autowired
    private FacultyUserDetailService facultyUserDetailService;
    @Autowired
    private PCUserDetailService pcUserDetailService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @PostMapping("/login")
    public ResponseEntity<JWTAuthResponse> getToken(@RequestBody JWTAuthRequest request) {
        System.out.println(request.getId()+"     "+request.getPassword());
        this.authenticate(request.getId(),request.getPassword());
        UserDetails userDetails;
        if("hod".equals(request.getRole())){
            userDetails=this.hodUserDetailsService.loadUserByUsername(request.getId());
        }
        else if("faculty".equals(request.getRole())){
            userDetails=this.facultyUserDetailService.loadUserByUsername(request.getId());
        }
        else{
            userDetails=this.pcUserDetailService.loadUserByUsername(request.getId());
        }
        System.out.println("Hello");
        String token=this.jwtTokenHelper.generateToken(userDetails);
        JWTAuthResponse response=new JWTAuthResponse();
        response.setToken(token);
        if("hod".equals(request.getRole())){
            response.setHodDto((HODDto) userDetails);
        }
        else if("faculty".equals(request.getRole())){
            response.setFacultyDto((FacultyDto) userDetails);
        }
        else{
            response.setPcDto((PCDto) userDetails);
        }
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    private void authenticate(String id, String pass) {
        UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(id, pass);
        try {
            this.authenticationManager.authenticate(usernamePasswordAuthenticationToken);
        } catch (BadCredentialsException e) {
            System.out.println("Invalid Details!!");
            throw new RuntimeException("Invalid Id or Password");
        }
    }
}
