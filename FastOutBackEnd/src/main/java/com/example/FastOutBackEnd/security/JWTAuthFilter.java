package com.example.FastOutBackEnd.security;

import java.io.IOException;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.util.AntPathMatcher;
import org.springframework.web.filter.OncePerRequestFilter;

import com.example.FastOutBackEnd.entities.User;
import com.example.FastOutBackEnd.exceptions.UnauthorizedException;
import com.example.FastOutBackEnd.services.UserService;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JWTAuthFilter extends OncePerRequestFilter {
	
	@Autowired
	JWTTools jwtTools;
	
	@Autowired
	UserService userService;
	
	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		
		String authHeader = request.getHeader("Authorization");
		
		if (authHeader == null || !authHeader.startsWith("Bearer "))
			throw new UnauthorizedException("Please pass the token in the authorization header.");
		String token = authHeader.substring(7);
		System.out.println("TOKEN -------> " + token);

		
		jwtTools.verifyToken(token);


		String id = jwtTools.extractSubject(token);
		User currentUser = userService.findById(UUID.fromString(id));
		
		UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(currentUser, null,
				currentUser.getAuthorities());

		SecurityContextHolder.getContext().setAuthentication(authToken);

		filterChain.doFilter(request, response);

	}

	@Override
	protected boolean shouldNotFilter(HttpServletRequest request) {
		
		System.out.println(request.getServletPath());

		return new AntPathMatcher().match("/auth/**", request.getServletPath());
	}

}
