package com.ural.tech.schemas;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "Входящий запрос с координатами точки + описание проблемы + фото")
public class PointRequest {
    //todo проверка на размеры и расширения фото
    @Schema(description = "координаты в формате 60.497874,56.926760 ")
    String pointCoordinates; //point: [56.800584, 60.675637]}
    @Schema(description = "Описание проблемы")
    String description ; // "яма на дороге"
    //todo  приоритет ? авария или не авария

}
