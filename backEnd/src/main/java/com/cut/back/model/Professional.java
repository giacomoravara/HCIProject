package com.cut.back.model;
import java.util.Set;

import javax.persistence.*;

@Entity
@Table(name = "professionals")
public class Professional{
    
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;

	@Column(name = "name")
	private String name;

	@Column(name = "phone")
	private String phone;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "serviceType_id")	
    private Set<ServiceType> services;

    @Column(name = "location")
	private String location;

    @Column(name = "category")
	private String category;

    @Column(name = "password")
	private String password;

    @Column(name = "email")
	private String email;

	public Professional() {

	}

    public long getId() {
        return this.id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPhone() {
        return this.phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public Set<ServiceType> getServices() {
        return this.services;
    }

    public void setServices(Set<ServiceType> services) {
        this.services = services;
    }

    public String getLocation() {
        return this.location;
    }

    public void setLocation(String location) {
        this.location = location;
    }


    public String getCategory() {
        return this.category;
    }

    public void setCategory(String category) {
        this.category = category;
    }


    public String getPassword() {
        return this.password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return this.email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    


}