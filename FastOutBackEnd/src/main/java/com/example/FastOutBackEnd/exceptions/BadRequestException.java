package com.example.FastOutBackEnd.exceptions;

public class BadRequestException extends RuntimeException {
	
	public BadRequestException(String message) {
		super(message);
	}

}
