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

import com.example.FastOutBackEnd.entities.Resource;
import com.example.FastOutBackEnd.exceptions.NotFoundException;
import com.example.FastOutBackEnd.payloads.UpdateResourcePayload;
import com.example.FastOutBackEnd.repositories.ResourceRepository;

@Service
public class ResourceService {
	
	@Autowired
	private ResourceRepository resourceRepository;
	
	// save Resource
	public Resource saveResource(Resource resource) {
		return resourceRepository.save(resource);
	}
	
	// find all Resources
	public List<Resource> getAllResources() {
		return resourceRepository.findAll();
	}
	
	// find all Resources pagination
	public Page<Resource> find(int page, int size, String sort) {
		Pageable pag = PageRequest.of(page, size, Sort.by(sort));
		
		return resourceRepository.findAll(pag);
	}
	
	// get by id Resource
	public Resource getResourceByID(UUID id) {
		Optional<Resource> found = resourceRepository.findById(id);
		
		return found.orElseThrow(() -> new NotFoundException("Resource with " + id + "not found."));
	}
	
	// update by id Resource
	public Resource updateResource(UUID id, UpdateResourcePayload body) {
		Resource found = getResourceByID(id);
			
		found.setResourceType(body.getResourceType());
		found.setResourceCost(body.getResourceCost());
		found.setResourceStatus(body.getResourceStatus());

		return resourceRepository.save(found);
	
	}
	
	// delete by id Resource
	public void deleteResource(UUID id) {
		Resource found = getResourceByID(id);
		resourceRepository.delete(found);
	}

}
