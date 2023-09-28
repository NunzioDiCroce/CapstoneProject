package com.example.FastOutBackEnd.entities;

import java.math.BigDecimal;
import java.util.UUID;

import com.example.FastOutBackEnd.enums.EquipmentStatus;
import com.example.FastOutBackEnd.enums.EquipmentType;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name="equipments")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Equipment {
	
	@Id
	@GeneratedValue
	private UUID id;
	
	@Enumerated(EnumType.STRING)
	private EquipmentType equipmentType; // Input field
	
	private BigDecimal equipmentCost;
	private String serialNumber; 
	
	@Enumerated(EnumType.STRING)
	private EquipmentStatus equipmentStatus; // Input field
	
	@ManyToOne
	private Platform platform;
	
	public Equipment(EquipmentType equipmentType, BigDecimal equipmentCost, String serialNumber, EquipmentStatus equipmentStatus) {
		this.equipmentType = equipmentType;
		this.equipmentCost = equipmentCost;
		this.serialNumber = serialNumber;
		this.equipmentStatus = equipmentStatus;
	}

}
