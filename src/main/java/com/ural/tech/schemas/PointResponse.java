package com.ural.tech.schemas;

import com.ural.tech.utils.Status;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Schema(description = "Ответ API включает себя статус обращения,координаты,описание проблемы")
public class PointResponse {
    @Schema(description = "статус обращения")
    String status;

    @Schema(description = "координаты в формате 60.497874,56.926760 ")
    String pointCoordinates; //point: [56.800584, 60.675637]}
    @Schema(description = "Описание проблемы")
    String description; // "яма на дороге"
//    @Schema(description = "Время создание обращение")
//    Date dateComplete; //
}