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


import com.cut.back.exception.ResourceNotFoundException;
import com.cut.back.model.Appointment;
import com.cut.back.repository.AppointmentRepository;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1")
class AppointmentController {
  
    @Autowired
	private AppointmentRepository appointmentRepository;
    
	
@GetMapping("/appointments")
public List<Appointment> getAllAppointments() {
	return appointmentRepository.findAll();
}

@GetMapping("/appointments/{id}")
public ResponseEntity<Appointment> getAppointmentById(@PathVariable(value = "id") Long appointmentId)
		throws ResourceNotFoundException {
	Appointment appointment = appointmentRepository.findById(appointmentId)
			.orElseThrow(() -> new ResourceNotFoundException("Appointment not found for this id :: " + appointmentId));
	return ResponseEntity.ok().body(appointment);
}

@PostMapping("/appointments")
public Appointment createAppointment(@Valid @RequestBody Appointment appointment) {
	return appointmentRepository.save(appointment);
}

@PutMapping("/appointments/{id}")
public ResponseEntity<Appointment> updateAppointment(@PathVariable(value = "id") Long appointmentId,
		@Valid @RequestBody Appointment appointmentDetails) throws ResourceNotFoundException {
	Appointment appointment = appointmentRepository.findById(appointmentId)
			.orElseThrow(() -> new ResourceNotFoundException("Appointment not found for this id :: " + appointmentId));

	appointment.setUser(appointmentDetails.getUser());
	appointment.setProfessional(appointmentDetails.getProfessional());
	appointment.setNotes(appointmentDetails.getNotes());
	appointment.setStart(appointmentDetails.getStart());
	appointment.setFinish(appointmentDetails.getFinish());
	appointment.setServices(appointmentDetails.getServices());

	final Appointment updatedAppointment = appointmentRepository.save(appointment);
	return ResponseEntity.ok(updatedAppointment);
}

@DeleteMapping("/appointments/{id}")
public Map<String, Boolean> deleteAppointment(@PathVariable(value = "id") Long appointmentId)
		throws ResourceNotFoundException {
	Appointment appointment = appointmentRepository.findById(appointmentId)
			.orElseThrow(() -> new ResourceNotFoundException("Appointment not found for this id :: " + appointmentId));

	appointmentRepository.delete(appointment);
	Map<String, Boolean> response = new HashMap<>();
	response.put("deleted", Boolean.TRUE);
	return response;
}
    

@GetMapping(value="/appointmentsinrange")
	public List<Appointment> getAppointmentsInRange(@RequestParam(value = "start", required = true) String start, 
						@RequestParam(value = "end", required = true) String end) {
	Date startDate = null;
	Date endDate = null;
	SimpleDateFormat inputDateFormat=new SimpleDateFormat("yyyy-MM-dd");

	try {
		startDate = inputDateFormat.parse(start);
	} catch (ParseException e) {
		throw new BadDateFormatException("bad start date: " + start);
	}

	try {
		endDate = inputDateFormat.parse(end);
	} catch (ParseException e) {
		throw new BadDateFormatException("bad end date: " + end);
	}

	LocalDateTime startDateTime = LocalDateTime.ofInstant(startDate.toInstant(),
	ZoneId.systemDefault());

	LocalDateTime finishDateTime = LocalDateTime.ofInstant(endDate.toInstant(),
	ZoneId.systemDefault());

	return appointmentRepository.findByStartGreaterThanEqualAndFinishLessThanEqual(startDateTime, finishDateTime);
}

@ResponseStatus(HttpStatus.BAD_REQUEST)
class BadDateFormatException extends RuntimeException {
  private static final long serialVersionUID = 1L;

	public BadDateFormatException(String dateString) {
        super(dateString);
    }
}



	

}
