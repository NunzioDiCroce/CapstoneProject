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
	
	//private String platformName; // commented to update only parcelsPerMonth and parcelRate
	//private String location; // commented to update only parcelsPerMonth and parcelRate
	
	//@Enumerated(EnumType.STRING) // commented to update only parcelsPerMonth and parcelRate
	//private CustomerType customerType; // commented to update only parcelsPerMonth and parcelRate
	
	private BigDecimal parcelsPerMonth;
	private BigDecimal parcelRate;
	
}
