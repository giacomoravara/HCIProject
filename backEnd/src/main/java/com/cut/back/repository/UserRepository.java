package com.cut.back.repository;
import java.util.List;

import com.cut.back.model.Professional;
import com.cut.back.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
   // List<Professional[]> findFavoritesById(long id);
}
