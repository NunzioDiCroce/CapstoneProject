package com.example.FastOutBackEnd.payloads;

import java.math.BigDecimal;

import com.example.FastOutBackEnd.enums.CustomerType;

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
public class UpdatePlatformPayload {
	
	private String location;
	
	@Enumerated(EnumType.STRING)
	private CustomerType customerType;
	
	private BigDecimal parcelsPerMonth;
	private BigDecimal parcelRate;
	
}
