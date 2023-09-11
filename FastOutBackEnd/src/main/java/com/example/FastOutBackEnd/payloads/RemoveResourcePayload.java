package com.example.FastOutBackEnd.payloads;

import com.example.FastOutBackEnd.enums.ResourceStatus;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RemoveResourcePayload {

	private ResourceStatus resourceStatus;
	
}
