package com.example.FastOutBackEnd.exceptions;

import java.util.Date;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class ErrorsPayloadWithList {
	
	private String message;
	private Date timestamp;
	private List<String> errorsList;

}
