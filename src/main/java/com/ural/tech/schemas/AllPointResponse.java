package com.ural.tech.schemas;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Schema(description = "Список всех обращений") //TODO ограничение .. в радиусе таком то от переданных координат
public class AllPointResponse {
    private List<PointResponse> points;
    private Integer limit;
    private Integer offset;
}
