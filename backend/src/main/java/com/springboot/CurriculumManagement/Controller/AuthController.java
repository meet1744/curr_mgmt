package com.springboot.CurriculumManagement.Controller;

import com.springboot.CurriculumManagement.Auth.JWTAuthRequest;
import com.springboot.CurriculumManagement.Auth.JWTAuthResponse;
import com.springboot.CurriculumManagement.Auth.JWTTokenHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth/")
public class AuthController {

    @Autowired
    private JWTTokenHelper jwtTokenHelper;
    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @PostMapping("/login")
    public ResponseEntity<JWTAuthResponse> createToken(@RequestBody JWTAuthRequest request) throws Exception {
        System.out.println(request.getId()+"     "+request.getPassword());
        this.authenticate(request.getId(),request.getPassword());
        UserDetails userDetails=this.userDetailsService.loadUserByUsername(request.getId());
        System.out.println("Hello");
        String token=this.jwtTokenHelper.generateToken(userDetails);
        JWTAuthResponse response=new JWTAuthResponse();
        response.setToken(token);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    private void authenticate(String id,String pass) throws Exception {
        UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken=new UsernamePasswordAuthenticationToken(id,pass);
        try{
            this.authenticationManager.authenticate(usernamePasswordAuthenticationToken);
        }catch(BadCredentialsException e){
            System.out.println("Invalid Details!!");
            throw new Exception("Invalid Id or Password");
        }

    }
}
