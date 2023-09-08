package com.example.FastOutBackEnd.controllers;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.example.FastOutBackEnd.entities.Equipment;
import com.example.FastOutBackEnd.payloads.UpdateEquipmentPayload;
import com.example.FastOutBackEnd.services.EquipmentService;

@RestController
@RequestMapping("/equipments")
public class EquipmentController {
	
	@Autowired
	private EquipmentService equipmentService;
	
	// save Equipment
	@PostMapping
	//@PreAuthorize("hasAuthority('AMMINISTRATORE')")
	@ResponseStatus(HttpStatus.CREATED)
	public Equipment createEquipment(@RequestBody Equipment equipment) {
		return equipmentService.saveEquipment(equipment);
	}
	
	
	// find all Equipments
	// refers to 'find all Equipments pagination'
	
	
	// find all Equipments pagination
	@GetMapping
	public Page<Equipment> getEquipments(@RequestParam(defaultValue = "0") int page,
			@RequestParam(defaultValue = "10") int size, @RequestParam(defaultValue = "id") String sortBy) {
		return equipmentService.find(page, size, sortBy);
	}
	
	
	// get by id Equipment
	@GetMapping("/{id}")
	public Equipment getEquipmentById(@PathVariable UUID id) {
		return equipmentService.getEquipmentByID(id);
	}

	
	// update by id Equipment
	@PutMapping("/{id}")
	//@PreAuthorize("hasAuthority('AMMINISTRATORE')")
	public Equipment updateEquipment(@PathVariable UUID id, @RequestBody UpdateEquipmentPayload updateEquipment) {
		return equipmentService.updateEquipment(id, updateEquipment);
	}
	
	
	// delete by id Equipment
	@DeleteMapping("/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	//@PreAuthorize("hasAuthority('AMMINISTRATORE')")
	public void deleteEquipment(@PathVariable UUID id) {
		equipmentService.deleteEquipment(id);
	}

}
