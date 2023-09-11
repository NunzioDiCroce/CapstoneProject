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

import com.example.FastOutBackEnd.entities.Resource;
import com.example.FastOutBackEnd.payloads.AssignResourcePayload;
import com.example.FastOutBackEnd.payloads.RemoveResourcePayload;
import com.example.FastOutBackEnd.payloads.UpdateResourcePayload;
import com.example.FastOutBackEnd.services.ResourceService;

@RestController
@RequestMapping("/resources")
public class ResourceController {
	
	@Autowired
	private ResourceService resourceService;
	
	// save Resource
	@PostMapping
	//@PreAuthorize("hasAuthority('AMMINISTRATORE')")
	@ResponseStatus(HttpStatus.CREATED)
	public Resource createResource(@RequestBody Resource resource) {
		return resourceService.saveResource(resource);
	}
	
	
	// find all Resources
	// refers to 'find all Resources pagination'
	
	
	// find all Resources pagination
	@GetMapping
	public Page<Resource> getResources(@RequestParam(defaultValue = "0") int page,
			@RequestParam(defaultValue = "10") int size, @RequestParam(defaultValue = "id") String sortBy) {
		return resourceService.find(page, size, sortBy);
	}
	
	
	// get by id Resource
	@GetMapping("/{id}")
	public Resource getResourceById(@PathVariable UUID id) {
		return resourceService.getResourceByID(id);
	}

	
	// update by id Resource
	@PutMapping("/{id}")
	//@PreAuthorize("hasAuthority('AMMINISTRATORE')")
	public Resource updateResource(@PathVariable UUID id, @RequestBody UpdateResourcePayload updateResource) {
		return resourceService.updateResource(id, updateResource);
	}
	
	
	// delete by id Resource
	@DeleteMapping("/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	//@PreAuthorize("hasAuthority('AMMINISTRATORE')")
	public void deleteResource(@PathVariable UUID id) {
		resourceService.deleteResource(id);
	}
	
	// * * * * * * * * * * assign Resource
	@PutMapping("/{resourceId}/assign")
	public Resource assignResource(@PathVariable UUID resourceId, @RequestBody AssignResourcePayload body) {
		return resourceService.assignResourceSrv(resourceId, body);
	}
	
	// * * * * * * * * * * remove Resource
	@PutMapping("/{resourceId}/remove")
	public Resource removeResource(@PathVariable UUID resourceId, @RequestBody RemoveResourcePayload body) {
		return resourceService.removeResourceSrv(resourceId, body);
	}

}
