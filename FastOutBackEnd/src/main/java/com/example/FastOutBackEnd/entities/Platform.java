package com.example.FastOutBackEnd.entities;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

import com.example.FastOutBackEnd.enums.CustomerType;

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
	
	private BigDecimal marginPerMonth;
	private BigDecimal productivity;
	private BigDecimal revenuesPerMonth;
	private BigDecimal parcelsPerMonth; // input field
	private BigDecimal parcelRate; // input field
	private BigDecimal totalCostsPerMonth;
	private BigDecimal hoursPerMonth;
	
	@OneToMany(mappedBy = "platform")
	private List<Resource> resources;
	
	@OneToMany(mappedBy = "platform")
	private List<Equipment> equipments;
	
}
