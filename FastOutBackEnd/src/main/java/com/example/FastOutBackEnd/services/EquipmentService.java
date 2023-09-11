package com.example.FastOutBackEnd.services;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import com.example.FastOutBackEnd.entities.Equipment;
import com.example.FastOutBackEnd.entities.Platform;
import com.example.FastOutBackEnd.enums.EquipmentStatus;
import com.example.FastOutBackEnd.exceptions.NotFoundException;
import com.example.FastOutBackEnd.payloads.AssignEquipmentPayload;
import com.example.FastOutBackEnd.payloads.RemoveEquipmentPayload;
import com.example.FastOutBackEnd.payloads.UpdateEquipmentPayload;
import com.example.FastOutBackEnd.repositories.EquipmentRepository;

@Service
public class EquipmentService {
	
	@Autowired
	private EquipmentRepository equipmentRepository;
	
	@Autowired
	private PlatformService platformService;
	
	// save Equipment
	public Equipment saveEquipment(Equipment equipment) {
		return equipmentRepository.save(equipment);
	}
	
	// find all Equipments
	public List<Equipment> getAllEquipments() {
		return equipmentRepository.findAll();
	}
	
	// find all Equipments pagination
	public Page<Equipment> find(int page, int size, String sort) {
		Pageable pag = PageRequest.of(page, size, Sort.by(sort));
		
		return equipmentRepository.findAll(pag);
	}
	
	// get by id Equipment
	public Equipment getEquipmentByID(UUID id) {
		Optional<Equipment> found = equipmentRepository.findById(id);
		
		return found.orElseThrow(() -> new NotFoundException("Equipment with " + id + "not found."));
	}
	
	// update by id Equipment
	public Equipment updateEquipment(UUID id, UpdateEquipmentPayload body) {
		Equipment found = getEquipmentByID(id);
					
		found.setEquipmentType(body.getEquipmentType());
		found.setEquipmentCost(body.getEquipmentCost());
		found.setSerialNumber(body.getSerialNumber());
		found.setEquipmentStatus(body.getEquipmentStatus());

		return equipmentRepository.save(found);
	
	}
	
	// delete by id Equipment
	public void deleteEquipment(UUID id) {
		Equipment found = getEquipmentByID(id);
		equipmentRepository.delete(found);
	}
	
	// * * * * * * * * * * assign Equipment
	public Equipment assignEquipmentSrv(UUID equipmentId, AssignEquipmentPayload body)
			throws NotFoundException, IllegalStateException {
		Equipment equipment = this.getEquipmentByID(equipmentId);

		if (equipment.getPlatform() != null) {
			throw new IllegalStateException("The equipment is already assigned to a platform.");
		}

		if (equipment.getEquipmentStatus() != EquipmentStatus.AVAILABLE) {
			throw new IllegalStateException("The equipment is not available for assignment.");
		}

		Platform platform = platformService.getPlatformByID(body.getPlatformId());
		equipment.setPlatform(platform);
		equipment.setEquipmentStatus(EquipmentStatus.ASSIGNED);
		
		platform.getEquipments().add(equipment);
		
		// updateTotalCostsPerMonth
        platform.updateTotalCostsPerMonth();
        
        platformService.savePlatform(platform);

		return equipmentRepository.save(equipment);

	}
	
	// * * * * * * * * * * remove Equipment
	public Equipment removeEquipmentSrv(UUID equipmentId, RemoveEquipmentPayload body)
			throws NotFoundException, IllegalStateException {
		Equipment equipment = this.getEquipmentByID(equipmentId);

		if (equipment.getPlatform() == null) {
			throw new IllegalStateException("The equipment is not assigned to any platform.");
		}

		if (equipment.getEquipmentStatus() != EquipmentStatus.ASSIGNED) {
			throw new IllegalStateException("The equipment is not assigned to any platform.");
		}

		Platform platform = equipment.getPlatform();
		platform.getEquipments().remove(equipment);
		equipment.setPlatform(null);
		equipment.setEquipmentStatus(EquipmentStatus.AVAILABLE);
		
		// updateTotalCostsPerMonth
        platform.updateTotalCostsPerMonth();

		return equipmentRepository.save(equipment);

	}

}
