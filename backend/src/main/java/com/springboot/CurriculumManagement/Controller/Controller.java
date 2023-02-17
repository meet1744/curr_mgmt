package com.springboot.CurriculumManagement.Controller;

import com.springboot.CurriculumManagement.Auth.AuthenticationResponse;
import com.springboot.CurriculumManagement.Auth.JWTAuthRequest;
import com.springboot.CurriculumManagement.Auth.JWTAuthResponse;
import com.springboot.CurriculumManagement.Auth.JwtUtil;
import com.springboot.CurriculumManagement.Entities.HOD;
import com.springboot.CurriculumManagement.Repository.HODRepository;
import com.springboot.CurriculumManagement.Services.HODService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;


@RestController
@CrossOrigin("http://localhost:3000")
public class Controller {
    @Autowired
    private HODService hodService;
    @Autowired
    private AuthenticationManager authenticationManager;
//
    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserDetailsService userDetailsService;
//
    @Autowired
    private HODRepository HODRepository;

    @PostMapping("/HODPage")
    public ResponseEntity<JWTAuthResponse> loginHOD(@RequestBody JWTAuthRequest hod) throws Exception {
        this.authenticate(hod.getId(), hod.getPassword());
        final UserDetails userDetails = this.userDetailsService.loadUserByUsername(hod.getId());
        final String jwt = jwtUtil.generateToken(userDetails);
        JWTAuthResponse response = new JWTAuthResponse();
        response.setToken(jwt);
        return new ResponseEntity<JWTAuthResponse>(response,HttpStatus.OK);
    }

//    @PostMapping("/FacultyPage")
//    public ResponseEntity<?> loginFaculty(@RequestBody LoginForm loginRequest) throws Exception {
//        authenticate(loginRequest.getUsername(), loginRequest.getPassword());
//
//        final UserDetails userDetails = userDetailsService.loadUserByUsername(loginRequest.getUsername());
//
//        final String jwt = jwtUtil.generateToken(userDetails);
//
//        return ResponseEntity.ok(new AuthenticationResponse(jwt));
//    }
//
//    @PostMapping("/PCPage")
//    public ResponseEntity<?> loginPC(@RequestBody LoginForm loginRequest) throws Exception {
//        authenticate(loginRequest.getUsername(), loginRequest.getPassword());
//
//        final UserDetails userDetails = userDetailsService.loadUserByUsername(loginRequest.getUsername());
//
//        final String jwt = jwtUtil.generateToken(userDetails);
//
//        return ResponseEntity.ok(new AuthenticationResponse(jwt));
//    }

    private void authenticate(String username, String password) throws Exception {
        try {
            this.authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
        } catch (DisabledException e) {
            throw new Exception("USER_DISABLED", e);
        } catch (BadCredentialsException e) {
            throw new Exception("INVALID_CREDENTIALS", e);
        }
    }
}
