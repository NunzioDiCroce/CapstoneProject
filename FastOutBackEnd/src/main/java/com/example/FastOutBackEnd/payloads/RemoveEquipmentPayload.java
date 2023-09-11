package com.example.FastOutBackEnd.payloads;

import com.example.FastOutBackEnd.enums.EquipmentStatus;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RemoveEquipmentPayload {
	
	private EquipmentStatus equipmentStatus;

}
