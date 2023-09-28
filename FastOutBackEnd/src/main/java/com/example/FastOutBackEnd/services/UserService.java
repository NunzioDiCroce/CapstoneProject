package com.example.FastOutBackEnd.services;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.example.FastOutBackEnd.entities.User;
import com.example.FastOutBackEnd.exceptions.BadRequestException;
import com.example.FastOutBackEnd.exceptions.NotFoundException;
import com.example.FastOutBackEnd.payloads.UserRequestPayload;
import com.example.FastOutBackEnd.repositories.UserRepository;

@Service
public class UserService {
	
	private final UserRepository userRepository;
	
	@Autowired
	public UserService(UserRepository userRepository) {
		this.userRepository = userRepository;
	}
	
	
	// create User
	public User create(UserRequestPayload body) {
		userRepository.findByEmail(body.getEmail()).ifPresent(user -> {
			throw new BadRequestException("The email has already been used.");
		});
		User newUser = new User(body.getName(), body.getSurname(), body.getEmail(), body.getPassword());
		return userRepository.save(newUser);
	}
	
	
	// find all Users pagination
	public Page<User> find(int page, int size, String sort) {
		Pageable pageable = PageRequest.of(page, size, Sort.by(sort));	
		return userRepository.findAll(pageable);
	}
	
	
	// get by id User
	public User findById(UUID id) throws NotFoundException {
		return userRepository.findById(id).orElseThrow(() -> new NotFoundException(id));
	}
	
	
	// update by id User
	public User findByIdAndUpdate(UUID id, UserRequestPayload body) throws NotFoundException {
		User found = this.findById(id);
		found.setEmail(body.getEmail());
		found.setName(body.getName());
		found.setSurname(body.getSurname());
		return userRepository.save(found);
	}
	
	
	// delete by id User
	public void findByIdAndDelete(UUID id) throws NotFoundException {
		User found = this.findById(id);
		userRepository.delete(found);
	}
	
	
	// get by email User
	public User findByEmail(String email) {
		return userRepository.findByEmail(email).orElseThrow(() -> new NotFoundException("User with email " + email + " not found."));
	}

}
