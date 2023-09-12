package com.example.FastOutBackEnd.exceptions;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class ErrorsPayload {
	
	private String message;
	private Date timestamp;

}
