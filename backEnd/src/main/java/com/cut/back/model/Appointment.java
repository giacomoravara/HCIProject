package com.cut.back.model;
import java.time.LocalDateTime;
import java.util.Set;

import javax.persistence.*;

@Entity
@Table(name = "appointments")
public class Appointment {
    
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;

    @ManyToOne
    private User user;

    @ManyToOne
	private Professional professional;

	@OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "serviceType_id")
	private Set<ServiceType> services;

    @Column(name = "start")
	private LocalDateTime start;

    @Column(name = "finish")
	private LocalDateTime finish;

    @Column(name = "notes")
    private String notes;

	public Appointment() {

	}


    public long getId() {
        return this.id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Set<ServiceType> getServices() {
        return this.services;
    }

    public void setServices(Set<ServiceType> services) {
        this.services = services;
    }
    

    public LocalDateTime getStart() {
        return this.start;
    }

    public void setStart(LocalDateTime start) {
        this.start = start;
    }

    public LocalDateTime getFinish() {
        return this.finish;
    }

    public void setFinish(LocalDateTime finish) {
        this.finish = finish;
    }
    

    public String getNotes() {
        return this.notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }


    public User getUser() {
        return this.user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Professional getProfessional() {
        return this.professional;
    }

    public void setProfessional(Professional professional) {
        this.professional = professional;
    }




}