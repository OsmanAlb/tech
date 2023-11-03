package com.ural.tech.config;

import com.ural.tech.service.FileStorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

/**
 * Очистка хранилища и
 * Инициализация хранилища
 */
@Component
public class FileUploadConfiguration implements CommandLineRunner {
    FileStorageService fileStorageService;

    public FileUploadConfiguration(FileStorageService fileStorageService) {
        this.fileStorageService = fileStorageService;
    }


    @Override
    public void run(String... args) throws Exception {
        fileStorageService.clear();
        fileStorageService.init();
    }

}