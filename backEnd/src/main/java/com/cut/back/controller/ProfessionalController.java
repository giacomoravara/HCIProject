package com.cut.back.controller;



import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;
import java.util.HashMap;

import java.util.List;
import java.util.Map;

import javax.validation.Valid;

import com.cut.back.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.http.HttpStatus;

import com.cut.back.exception.DoesNotExistException;
import com.cut.back.exception.ResourceNotFoundException;
import com.cut.back.model.Appointment;
import com.cut.back.model.Professional;
import com.cut.back.repository.ProfessionalRepository;
import org.springframework.http.MediaType;

@CrossOrigin("http://localhost:8100")
@RestController
@RequestMapping(value ="/api/v1", produces = MediaType.APPLICATION_JSON_VALUE)
class ProfessionalController {
  
    @Autowired
	private ProfessionalRepository professionalRepository;

@GetMapping("/professionals")
public List<Professional> getProfessionalsList() {
	return professionalRepository.findAll();
}

@GetMapping("/professionals/{id}")
public Professional getProfessional(@PathVariable(value = "id") long id) throws ResourceNotFoundException {
	return professionalRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Professional not found for this id :: " + id));

}


@GetMapping(path = "/professionals/category/{category}")
public List<Professional> getProfessionalsByCategoryList(@PathVariable(required = true, value = "category") String category) throws DoesNotExistException {
	return professionalRepository.findByCategory(category);
}


@PostMapping("/professionals")
	public Professional createProfessional(@Valid @RequestBody Professional prof) {
		return professionalRepository.save(prof);
	}
    
}
