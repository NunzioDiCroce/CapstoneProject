package com.example.FastOutBackEnd.entities;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;
import java.util.UUID;

import com.example.FastOutBackEnd.enums.CustomerType;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name="platforms")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Platform {
	
	@Id
	@GeneratedValue
	private UUID id;
	
	private String location; // input field
	
	@Enumerated(EnumType.STRING)
	private CustomerType customerType; // input field
	
	private BigDecimal parcelsPerMonth; // input field
	private BigDecimal parcelRate; // input field
	private BigDecimal revenuesPerMonth;
	
	private BigDecimal totalCostsPerMonth;
	private BigDecimal hoursPerMonth;
	
	private BigDecimal marginPerMonth;
	private BigDecimal productivity;
	
	@OneToMany(mappedBy = "platform")
	@JsonIgnore // To avoid reference loops during serialization in 'assign Resource'
	private List<Resource> resources;
	
	@OneToMany(mappedBy = "platform")
	@JsonIgnore // To avoid reference loops during serialization in 'assign Equipment'
	private List<Equipment> equipments;
	
	
	// * * * * * * * * * * Platform hoursPerMonth updating
	public void updatePlatformHoursPerMonth() {		
		if (resources != null) {
			BigDecimal totalHours = BigDecimal.ZERO;
			for (Resource resource : resources) {
				if (resource.getHoursPerMonth() != null) {
					totalHours = totalHours.add(resource.getHoursPerMonth());
				}
			}
			this.hoursPerMonth = totalHours;
		} else {
			this.hoursPerMonth = BigDecimal.ZERO;
		}
	}
	
	// * * * * * * * * * * Platform productivity updating
	public void updateProductivity() {
	    if (hoursPerMonth != null && hoursPerMonth.compareTo(BigDecimal.ZERO) > 0) {
	        productivity = parcelsPerMonth.divide(hoursPerMonth, 2, RoundingMode.HALF_UP);
	    } else {
	        productivity = BigDecimal.ZERO;
	    }
	}
	
	// * * * * * * * * * * Platform totalCostsPerMonth updating
	public void updateTotalCostsPerMonth() {
		BigDecimal totalCosts = BigDecimal.ZERO;
		
		if (resources != null) {
			for (Resource resource : resources) {
				if (resource.getResourceCost() != null) {
					totalCosts = totalCosts.add(resource.getResourceCost());
				}
			}
		}
		
		if (equipments != null) {
			for (Equipment equipment : equipments) {
				if(equipment.getEquipmentCost() != null) {
					totalCosts = totalCosts.add(equipment.getEquipmentCost());
				}
			}
		}
		
		this.totalCostsPerMonth = totalCosts;
	}
	
}
