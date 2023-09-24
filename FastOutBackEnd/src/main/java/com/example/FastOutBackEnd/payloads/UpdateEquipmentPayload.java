package com.example.FastOutBackEnd.payloads;

import java.math.BigDecimal;

import com.example.FastOutBackEnd.enums.EquipmentStatus;
import com.example.FastOutBackEnd.enums.EquipmentType;

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
public class UpdateEquipmentPayload {
	
	//@Enumerated(EnumType.STRING)
	//private EquipmentType equipmentType;
	
	//private BigDecimal equipmentCost;	
	//private String serialNumber;
	
	@Enumerated(EnumType.STRING)
	private EquipmentStatus equipmentStatus;

}
