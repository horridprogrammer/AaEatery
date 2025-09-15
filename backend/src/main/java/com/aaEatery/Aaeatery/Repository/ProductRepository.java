package com.aaEatery.Aaeatery.Repository;

import com.aaEatery.Aaeatery.Entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product,Long> {

}
