package com.cut.back.repository;
import com.cut.back.model.Appointment;
import java.time.LocalDateTime;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    public List<Appointment> findByStartGreaterThanEqualAndFinishLessThanEqual(LocalDateTime start, LocalDateTime finish);
    /* This one uses an @Query */
	@Query("select b from Appointment b where b.start >= ?1 and b.finish <= ?2")
	public List<Appointment> findByDateBetween(LocalDateTime start, LocalDateTime finish);
}


