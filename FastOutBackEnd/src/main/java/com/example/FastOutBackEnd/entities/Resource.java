package com.example.FastOutBackEnd.entities;

import java.math.BigDecimal;
import java.util.UUID;

import com.example.FastOutBackEnd.enums.ResourceStatus;
import com.example.FastOutBackEnd.enums.ResourceType;

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
@Table(name="resources")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Resource {
	
	@Id
	@GeneratedValue
	private UUID id;
	
	@Enumerated(EnumType.STRING)
	private ResourceType resourceType; // input field
	
	private BigDecimal resourceCost;
	private BigDecimal hoursPerMonth;
	
	@Enumerated(EnumType.STRING)
	private ResourceStatus resourceStatus; // input field
	
	@ManyToOne
	private Platform platform;
	
	public Resource(ResourceType resourceType, BigDecimal resourceCost, BigDecimal hoursPerMonth, ResourceStatus resourceStatus) {
		this.resourceType = resourceType;
		this.resourceCost = resourceCost;
		this.hoursPerMonth = hoursPerMonth;
		this.resourceStatus = resourceStatus;
	}

}
