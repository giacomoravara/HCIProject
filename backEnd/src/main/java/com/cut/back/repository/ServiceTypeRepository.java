package com.cut.back.repository;
import com.cut.back.model.ServiceType;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ServiceTypeRepository extends JpaRepository<ServiceType, Long>{
    List<ServiceType> findByDuration(Integer duration);
    List<ServiceType> findByCategory(String category);
    List<ServiceType> findDistinctByCategory(String category);
    List<ServiceType> findAll();
}
