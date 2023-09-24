package com.example.FastOutBackEnd.controllers;

import java.util.List;
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
import com.example.FastOutBackEnd.entities.Platform;
import com.example.FastOutBackEnd.entities.Resource;
import com.example.FastOutBackEnd.payloads.UpdatePlatformPayload;
import com.example.FastOutBackEnd.services.PlatformService;

@RestController
@RequestMapping("/platforms")
public class PlatformController {
	
	@Autowired
	private PlatformService platformService;
	
	// create Platform
	@PostMapping
	//@PreAuthorize("hasAuthority('AMMINISTRATORE')")
	@ResponseStatus(HttpStatus.CREATED)
	public Platform createPlatform(@RequestBody Platform platform) {
		return platformService.createPlatformSrv(platform);
	}
	
	
	// find all Platforms without pagination
	// NOTE: this method is used only to loadAvailablePlatforms for
	// assign/removeResourceToPlatform frontEnd functionality
	// assign/removeEquipmentToPlatform frontEnd functionality
	@GetMapping("/all")
	public List<Platform> getAvailablePlatforms() {
	    return platformService.getAllPlatforms();
	}

	
	// find all Platforms pagination
	@GetMapping
	public Page<Platform> getPlatforms(@RequestParam(defaultValue = "0") int page,
			@RequestParam(defaultValue = "10") int size, @RequestParam(defaultValue = "id") String sortBy) {
		return platformService.find(page, size, sortBy);
	}
	
	
	// get by id Platform
	@GetMapping("/{id}")
	public Platform getPlatformById(@PathVariable UUID id) {
		return platformService.getPlatformByID(id);
	}

	
	// update by id Platform
	@PutMapping("/{id}")
	//@PreAuthorize("hasAuthority('AMMINISTRATORE')")
	public Platform updatePlatform(@PathVariable UUID id, @RequestBody UpdatePlatformPayload updatePlatform) {
		return platformService.updatePlatform(id, updatePlatform);
	}
	
	
	// delete by id Platform
	@DeleteMapping("/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	//@PreAuthorize("hasAuthority('AMMINISTRATORE')")
	public void deletePlatform(@PathVariable UUID id) {
		platformService.deletePlatform(id);
	}
	
	
	// get resources associated with the platform
	@GetMapping("/{platformId}/resources")
	public List<Resource> getResourcesForPlatform(@PathVariable UUID platformId) {    
	    Platform platform = platformService.getPlatformByID(platformId);
	    return platform.getResources();
	}
	
	
	// get equipments associated with the platform
	@GetMapping("/{platformId}/equipments")
	public List<Equipment> getEquipmentsForPlatform(@PathVariable UUID platformId) {
		Platform platform = platformService.getPlatformByID(platformId);
		return platform.getEquipments();
	}


}
