package com.cut.back.controller;

import java.util.HashMap;

import java.util.List;
import java.util.Map;

import javax.validation.Valid;

import com.cut.back.repository.ServiceTypeRepository;
import com.cut.back.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cut.back.exception.DoesNotExistException;
import com.cut.back.model.ServiceType;

@CrossOrigin("http://localhost:8100")
@RestController
@RequestMapping("/api/v1")
public class ServiceTypeController {
    
	@Autowired
	private ServiceTypeRepository serviceRepository;

	@GetMapping("/services/category/{category}")
	public List<ServiceType> getCategoryServiceTypeList(@PathVariable(value = "category") String category) throws DoesNotExistException  {
		return serviceRepository.findDistinctByCategory(category);
	}

	@GetMapping("/services/duration/{duration}")
	public List<ServiceType> getDurationServiceTypeList(@PathVariable(value = "duration") Integer duration) throws DoesNotExistException  {
		return serviceRepository.findByDuration(duration);
	}

	@GetMapping("/services")
	public List<ServiceType> getServiceTypeList() {
		return serviceRepository.findAll();
	}

	@PostMapping("/services")
	public ServiceType createServiceType(@Valid @RequestBody ServiceType serviceType) {
		return serviceRepository.save(serviceType);
	}
    
}
