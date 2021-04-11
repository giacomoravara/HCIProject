package com.cut.back.model;
import javax.persistence.*;

@Entity
@Table(name = "services")
public class ServiceType {

    @Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;

	@Column(name = "name")
	private String name;

	@Column(name = "price")
	private Integer price;

	@Column(name = "duration")
	private Integer duration;

    @Column(name = "category")
    private String category;

    public ServiceType(){}

    public ServiceType(String name, Integer price, Integer duration, String category){
        this.name = name;
        this.price = price;
        this.duration = duration;
        this.category = category;
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

    public Integer getPrice() {
        return this.price;
    }

    public void setPrice(Integer price) {
        this.price = price;
    }

    public Integer getDuration() {
        return this.duration;
    }

    public void setDuration(Integer duration) {
        this.duration = duration;
    }

    public String getCategory() {
        return this.category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    
}
