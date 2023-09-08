package com.example.FastOutBackEnd.entities;

import java.util.UUID;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
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
	
	private String location;

}
