package com.example.FastOutBackEnd.exceptions;

import java.util.Date;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import lombok.extern.slf4j.Slf4j;

@RestControllerAdvice
@Slf4j
public class ExceptionsHandler {

	@ExceptionHandler(MethodArgumentNotValidException.class)
	@ResponseStatus(HttpStatus.BAD_REQUEST)
	public ErrorsPayloadWithList handleValidationErrors(MethodArgumentNotValidException e) {
		List<String> errors = e.getBindingResult().getFieldErrors().stream().map(error -> error.getDefaultMessage())
				.toList();
		return new ErrorsPayloadWithList("There are errors in the payload.", new Date(), errors);
	}

	@ExceptionHandler(BadRequestException.class)
	@ResponseStatus(HttpStatus.BAD_REQUEST)
	public ErrorsPayload handleBadRequest(BadRequestException e) {
		return new ErrorsPayload(e.getMessage(), new Date());
	}
	
	// to manage IllegalArgumentException for platformName not null and/or not unique
	@ExceptionHandler(IllegalArgumentException.class)
	@ResponseStatus(HttpStatus.BAD_REQUEST)
	public ErrorsPayload handleIllegalArgumentException(IllegalArgumentException e) {
	    return new ErrorsPayload(e.getMessage(), new Date());
	}
	
	@ExceptionHandler(UnauthorizedException.class)
	@ResponseStatus(HttpStatus.UNAUTHORIZED)
	public ErrorsPayload handleUnauthorized(UnauthorizedException e) {
		return new ErrorsPayload(e.getMessage(), new Date());
	}

	@ExceptionHandler(AccessDeniedException.class)
	@ResponseStatus(HttpStatus.FORBIDDEN)
	public ErrorsPayload handleForbidden(AccessDeniedException e) {
		return new ErrorsPayload("You do not have access to this endpoint.", new Date());
	}

	@ExceptionHandler(NotFoundException.class)
	@ResponseStatus(HttpStatus.NOT_FOUND)
	public ErrorsPayload handleNotFound(NotFoundException e) {
		return new ErrorsPayload(e.getMessage(), new Date());
	}

	@ExceptionHandler(Exception.class)
	@ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
	public ErrorsPayload handleGeneric(Exception e) {
		log.error(e.getMessage());
		e.printStackTrace();
		return new ErrorsPayload("Generic error, we will resolve it as soon as possible.", new Date());
	}
	
}
