package com.ural.tech;

import com.ural.tech.config.FileUploadConfiguration;
import com.ural.tech.store.Points;
import com.ural.tech.store.PointsRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class TechApplication {

    public static void main(String[] args) {
        SpringApplication.run(TechApplication.class, args);
    }

    @Bean
    public CommandLineRunner start(FileUploadConfiguration fileUploadConfiguration) {
        return (args) -> {
            fileUploadConfiguration.run();
        };
    }


//    @Bean
//    public CommandLineRunner demo(PointsRepository repository) {
//        return (args) -> {
//            // save a few customers
//            repository.save(new Points("Chloe", "O'Brian","description"));
//            repository.save(new Points("Kim", "Bauer","description"));
//            repository.save(new Points("David", "Palmer","description"));
//            repository.save(new Points("Michelle", "Dessler","description"));
//
//        };
//    }
}
