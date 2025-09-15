package com.aaEatery.Aaeatery.Service;

import com.aaEatery.Aaeatery.Entity.Product;
import com.aaEatery.Aaeatery.Repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productrepo;

    public ProductService(ProductRepository productrepo) {
        this.productrepo = productrepo;
    }

    public Product saveProduct(Product product){
        return productrepo.save(product);
    }

    public List<Product> getAllProducts(){
        return productrepo.findAll();
    }

    public Product getProductById(Long id){
        return productrepo.findById(id).orElse(null);
    }

    public void deleteProduct(Long id){
        productrepo.deleteById(id);
    }

    // Update product logic
    public Product updateProduct(Long id, Product updatedProduct) {
        return productrepo.findById(id).map(existingProduct -> {
            existingProduct.setName(updatedProduct.getName());
            existingProduct.setDescription(updatedProduct.getDescription());
            existingProduct.setPrice(updatedProduct.getPrice());
            existingProduct.setCategory(updatedProduct.getCategory());
            existingProduct.setImageUrl(updatedProduct.getImageUrl());
            existingProduct.setStock(updatedProduct.getStock());
            return productrepo.save(existingProduct);
        }).orElse(null);
    }
}
