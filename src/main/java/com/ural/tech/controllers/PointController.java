package com.ural.tech.controllers;


import com.ural.tech.schemas.AllPointResponse;
import com.ural.tech.schemas.PointRequest;
import com.ural.tech.schemas.PointResponse;
import com.ural.tech.service.PointService;
import com.ural.tech.utils.EndPoint;
import com.ural.tech.utils.Status;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@Tag(name = "Создание и обработка заявок.(изменение)")
@RestController
@RequestMapping(EndPoint.api)
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class PointController {

    PointService pointService;

    public PointController(PointService pointService) {
        this.pointService = pointService;
    }

    @Operation(
            summary = "Создание обращение",
            description = "Получение данных для создание заявки\n" +
                    "Отдает создали или нет"

    )
    @PostMapping(value = EndPoint.creatPoint)
    @CrossOrigin(allowCredentials = "true", originPatterns = "*")
    public PointResponse creatPoint(
            @Parameter(schema = @Schema(implementation = PointRequest.class))
            @RequestBody() PointRequest request) {
        //todo проверка координат
        Status status = Status.GREAT;
        Boolean isSave = pointService.save(status, request);

        return new PointResponse(status.toString(), request.getPointCoordinates(), request.getDescription());
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