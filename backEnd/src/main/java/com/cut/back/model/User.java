package com.cut.back.model;
import java.util.Set;

import javax.persistence.*;

@Entity
@Table(name = "users")
public class User {

    @Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;

	@Column(name = "firstName")
	private String firstName;

	@Column(name = "lastName")
	private String lastName;

    @Column(name = "user")
	private String user;

    @Column(name = "password")
	private String password;

    @Column(name = "phone")
	private String phone;

    @Column(name = "email")
	private String email;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "professional_id")
	private Set<Professional> favorites;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "appointment_id")
    private Set<Appointment> appointments;



	public User() {

	}


    public long getId() {
        return this.id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getFirstName() {
        return this.firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return this.lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getUser() {
        return this.user;
    }

    public void setUser(String user) {
        this.user = user;
    }

    public String getPassword() {
        return this.password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getPhone() {
        return this.phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return this.email;
    }

    public void setEmail(String emailId) {
        this.email = emailId;
    }

    public Set<Professional> getFavorites() {
        return this.favorites;
    }

    public void setFavorites(Set<Professional> favorites) {
        this.favorites = favorites;
    }

    public Set<Appointment> getAppointments() {
        return this.appointments;
    }

    public void setAppointments(Set<Appointment> appointments) {
        this.appointments = appointments;
    }

    
}
