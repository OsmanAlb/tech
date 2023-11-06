package com.ural.tech.controllers;


import com.ural.tech.schemas.AllPointResponse;
import com.ural.tech.schemas.PointRequest;
import com.ural.tech.schemas.PointResponse;
import com.ural.tech.service.FileStorageService;
import com.ural.tech.service.PointService;
import com.ural.tech.store.Points;
import com.ural.tech.utils.EndPoint;
import com.ural.tech.utils.Status;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.util.Optional;

@Tag(name = "Создание и обработка заявок.(изменение)")
@RestController
@RequestMapping(EndPoint.api)
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class PointController {

    PointService pointService;
    FileStorageService fileStorageService;

    public PointController(PointService pointService, FileStorageService fileStorageService) {
        this.pointService = pointService;
        this.fileStorageService = fileStorageService;
    }

    @Operation(
            summary = "Создание обращение",
            description = "Получение данных для создание заявки\n" +
                    "Отдает создали или нет"

    )

    @PostMapping(value = EndPoint.creatPoint)
    @CrossOrigin(allowCredentials = "true", originPatterns = "*")
    public PointResponse handleFileUpload2(@RequestParam("pointCoordinates") String pointCoordinates,
                                           @RequestParam("description") String description,
                                           @RequestParam(value = "file", required = false) MultipartFile file) {
        //todo проверка координат
        Status status = Status.GREAT;
        PointRequest request = new PointRequest(pointCoordinates, description);
        Points pointFromBD = pointService.save(status, request);
        if (file != null) fileStorageService.save(file);

        return new PointResponse(pointFromBD.getId(), status.toString(), request.getPointCoordinates(), request.getDescription());

    }

    @GetMapping(value = EndPoint.all)
    @CrossOrigin(allowCredentials = "true", originPatterns = "*")
    public AllPointResponse allPointResponse(@Parameter(schema = @Schema(implementation = AllPointResponse.class))
                                             @RequestParam(value = "coordinates", required = true) String coordinates,
                                             @RequestParam(value = "limit", required = false) Optional<Integer> limit,
                                             @RequestParam(value = "offset", required = false) Optional<Integer> offset) {

        return pointService.getAllPointForResponse(coordinates, limit, offset);
    }


}
