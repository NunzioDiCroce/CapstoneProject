package com.example.FastOutBackEnd.payloads;

import java.math.BigDecimal;

import com.example.FastOutBackEnd.enums.ResourceStatus;
import com.example.FastOutBackEnd.enums.ResourceType;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UpdateResourcePayload {
	
	@Enumerated(EnumType.STRING)
	private ResourceType resourceType;
	
	private BigDecimal resourceCost;
	
	@Enumerated(EnumType.STRING)
	private ResourceStatus resourceStatus;

}
