package com.springboot.CurriculumManagement.Controller;

import com.springboot.CurriculumManagement.Auth.JWTAuthRequest;
import com.springboot.CurriculumManagement.Auth.JWTAuthResponse;
import com.springboot.CurriculumManagement.Auth.JWTTokenHelper;
import com.springboot.CurriculumManagement.Entities.Faculty;
import com.springboot.CurriculumManagement.Entities.HOD;
import com.springboot.CurriculumManagement.Entities.ProgramCoordinator;
import com.springboot.CurriculumManagement.Payloads.FacultyDto;
import com.springboot.CurriculumManagement.Payloads.PCDto;
import com.springboot.CurriculumManagement.Services.HODServiceImpl;
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
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;

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
    private HODServiceImpl hodService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @PostMapping("/login")
    public ResponseEntity<JWTAuthResponse> getToken(@RequestBody JWTAuthRequest request) {
        System.out.println(request.getId()+"     "+request.getPassword());
        UserDetails userDetails;
        String token;
        JWTAuthResponse response;
        if("hod".equals(request.getRole())){
            HOD hod=new HOD();
            this.authenticate(request.getId(),request.getPassword(),hod.getAuthorities());
            hod=this.hodUserDetailsService.loadUserByUsername(request.getId());
            System.out.println(hod.getDept());
            token=this.jwtTokenHelper.generateToken(hod);
            response=new JWTAuthResponse();
            response.setToken(token);
            response.setHodDto(hodService.HODToDto(hod));
        }
        else if("faculty".equals(request.getRole())){
            Faculty faculty=new Faculty();
            this.authenticate(request.getId(),request.getPassword(),faculty.getAuthorities());
            faculty=this.facultyUserDetailService.loadUserByUsername(request.getId());
            token=this.jwtTokenHelper.generateToken(faculty);
            response=new JWTAuthResponse();
            response.setToken(token);
        }
        else{
            ProgramCoordinator programCoordinator=new ProgramCoordinator();
            this.authenticate(request.getId(),request.getPassword(),programCoordinator.getAuthorities());
            programCoordinator=this.pcUserDetailService.loadUserByUsername(request.getId());
            token=this.jwtTokenHelper.generateToken(programCoordinator);
            response=new JWTAuthResponse();
            response.setToken(token);
        }
        System.out.println("Hello");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    private void authenticate(String id, String pass, Collection<? extends GrantedAuthority> authorities) {
        UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(id, pass, authorities);
        try {
            System.out.println(usernamePasswordAuthenticationToken);
            Authentication authenticate = null;
            if (!usernamePasswordAuthenticationToken.isAuthenticated()) {
                authenticate = authenticationManager.authenticate(usernamePasswordAuthenticationToken);
                if (authenticate.isAuthenticated()) {
                    SecurityContextHolder.getContext().setAuthentication(authenticate);
                }
            }
        } catch (BadCredentialsException e) {
            System.out.println("Invalid Details!!");
            throw new RuntimeException("Invalid Id or Password");
        }
    }
}
