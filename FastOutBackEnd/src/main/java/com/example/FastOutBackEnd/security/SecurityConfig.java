package com.example.FastOutBackEnd.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity // to manage access to endpoints based on user roles
public class SecurityConfig {
	
	@Autowired
	JWTAuthFilter jwtFilter;
	
	@Autowired
	CorsFilter corsFilter;
	
	@Bean
	SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		
		// http.cors(c -> c.disable());
		
		http.csrf(c -> c.disable());
		
		// Disable sessions to use JWT 
		http.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
		
		http.authorizeHttpRequests(auth -> auth.requestMatchers("/platforms/**").authenticated());
		http.authorizeHttpRequests(auth -> auth.requestMatchers("/resources/**").authenticated());
		http.authorizeHttpRequests(auth -> auth.requestMatchers("/equipments/**").authenticated());

		http.authorizeHttpRequests(auth -> auth.requestMatchers("/users/**").authenticated());
		http.authorizeHttpRequests(auth -> auth.requestMatchers("/auth/**").permitAll());

		http.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);
		http.addFilterBefore(corsFilter, JWTAuthFilter.class);

		return http.build();
	}
	
	@Bean
	PasswordEncoder encoder() {
		return new BCryptPasswordEncoder(11);
	}

}
