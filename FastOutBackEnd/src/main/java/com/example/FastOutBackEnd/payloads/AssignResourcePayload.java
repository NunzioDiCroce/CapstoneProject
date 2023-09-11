package com.example.FastOutBackEnd.payloads;

import java.util.UUID;

import com.example.FastOutBackEnd.enums.ResourceStatus;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class AssignResourcePayload {
	
	private ResourceStatus resourceStatus;
	private UUID platformId;

}
