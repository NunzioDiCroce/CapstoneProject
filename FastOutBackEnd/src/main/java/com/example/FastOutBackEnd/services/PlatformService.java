package com.example.FastOutBackEnd.services;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.example.FastOutBackEnd.entities.Platform;
import com.example.FastOutBackEnd.exceptions.NotFoundException;
import com.example.FastOutBackEnd.payloads.UpdatePlatformPayload;
import com.example.FastOutBackEnd.repositories.PlatformRepository;

@Service
public class PlatformService {
	
	@Autowired
	private PlatformRepository platformRepository;

		
	// save Platform
	public Platform savePlatform(Platform platform) {
		return platformRepository.save(platform);
	}
	
	
	// * * * * * * * * * * create Platform with business logic
	public Platform createPlatformSrv(Platform platform) {
		
        // check if platformName is not null and doesn't already exist
        if (platform.getPlatformName() == null || platformRepository.findByPlatformName(platform.getPlatformName()).isPresent()) {
            throw new IllegalArgumentException("Platform name must be unique and not null.");
        }
		
		// set totalCostsPerMonth and hoursPerMonth at 0 (zero)
        if (platform.getTotalCostsPerMonth() == null) {
            platform.setTotalCostsPerMonth(BigDecimal.ZERO);
        }
        if (platform.getHoursPerMonth() == null) {
            platform.setHoursPerMonth(BigDecimal.ZERO);
        }
		
		// revenuesPerMonth calculation
		BigDecimal parcelsPerMonth = platform.getParcelsPerMonth();
		BigDecimal parcelRate = platform.getParcelRate();
		BigDecimal revenuesPerMonth = parcelsPerMonth.multiply(parcelRate);
		
		// marginPerMonth calculation
        BigDecimal totalCostsPerMonth = platform.getTotalCostsPerMonth();
        BigDecimal marginPerMonth = revenuesPerMonth.subtract(totalCostsPerMonth);
        
        // productivity calculation
        BigDecimal hoursPerMonth = platform.getHoursPerMonth();
        BigDecimal productivity = BigDecimal.ZERO;
        if (hoursPerMonth != null && hoursPerMonth.compareTo(BigDecimal.ZERO) != 0) {
            productivity = parcelsPerMonth.divide(hoursPerMonth, 2, RoundingMode.HALF_UP);
        }
        
		// settings
		platform.setRevenuesPerMonth(revenuesPerMonth);
		platform.setMarginPerMonth(marginPerMonth);
		platform.setProductivity(productivity);
		
		return platformRepository.save(platform);
	}
	
	
	// find all Platforms
	public List<Platform> getAllPlatforms() {
		return platformRepository.findAll();
	}
	
	// find all Platforms pagination
	public Page<Platform> find(int page, int size, String sort) {
		Pageable pag = PageRequest.of(page, size, Sort.by(sort));
		
		return platformRepository.findAll(pag);
	}
	
	// get by id Platform
	public Platform getPlatformByID(UUID id) {
		Optional<Platform> found = platformRepository.findById(id);
		
		return found.orElseThrow(() -> new NotFoundException("Platform with " + id + "not found."));
	}
	
	
	// update by id Platform (see 'update by id Platform with business logic')
//	public Platform updatePlatform(UUID id, UpdatePlatformPayload body) {
//		Platform found = getPlatformByID(id);
//		
//		found.setLocation(body.getLocation());
//		found.setCustomerType(body.getCustomerType());
//		found.setParcelsPerMonth(body.getParcelsPerMonth());
//		found.setParcelRate(body.getParcelRate());
//
//		return platformRepository.save(found);
//	
//	}
	
	// * * * * * * * * * * update by id Platform with business logic
	public Platform updatePlatform(UUID id, UpdatePlatformPayload body) {
		Platform found = getPlatformByID(id);
		
		// check if platformName is not null and doesn't already exist
	    if (body.getPlatformName() != null && !body.getPlatformName().equals(found.getPlatformName()) &&
	        platformRepository.findByPlatformName(body.getPlatformName()).isPresent()) {
	        throw new IllegalArgumentException("Platform name must be unique and not null.");
	    }
		
		found.setLocation(body.getLocation());
		found.setCustomerType(body.getCustomerType());
		found.setParcelsPerMonth(body.getParcelsPerMonth());
		found.setParcelRate(body.getParcelRate());
		
		// check if platformName is not null
	    if (body.getPlatformName() != null) {
	        found.setPlatformName(body.getPlatformName());
	    }
		
		// revenuesPerMonth calculation
		BigDecimal parcelsPerMonth = body.getParcelsPerMonth();
		BigDecimal parcelRate = body.getParcelRate();
		BigDecimal revenuesPerMonth = parcelsPerMonth.multiply(parcelRate);
		
		// setRevenuesPerMonth
		found.setRevenuesPerMonth(revenuesPerMonth);
		
		// updateTotalCostsPerMonth
		found.updateTotalCostsPerMonth();
		
		// updateMarginPerMonth
		found.updateMarginPerMonth();

		return platformRepository.save(found);
	}
	
	
	// delete by id Platform
	public void deletePlatform(UUID id) {
		Platform found = getPlatformByID(id);
		platformRepository.delete(found);
	}
	

}
