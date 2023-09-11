package com.example.FastOutBackEnd.payloads;

import java.util.UUID;

import com.example.FastOutBackEnd.enums.EquipmentStatus;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class AssignEquipmentPayload {
	
	private EquipmentStatus equipmentStatus;
	private UUID platformId;

}
