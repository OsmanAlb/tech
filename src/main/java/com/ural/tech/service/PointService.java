package com.ural.tech.service;

import com.ural.tech.schemas.AllPointResponse;
import com.ural.tech.schemas.PointRequest;
import com.ural.tech.schemas.PointResponse;
import com.ural.tech.store.Points;
import com.ural.tech.store.PointsRepository;
import com.ural.tech.utils.Status;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service()
public class PointService {

    PointsRepository pointsRepository;

    public PointService(PointsRepository pointsRepository) {
        this.pointsRepository = pointsRepository;
    }

    public AllPointResponse getAllPointForResponse(String coordinates, Optional<Integer> limit, Optional<Integer> offset) {
        //todo где то надо сделать проверку и как отдавать сразу весь город или радиус от пользователя
        List<Points> pointEntities = pointsRepository.findAll();

        int realLimit = pointEntities.size();

        if (limit.isPresent()) {
            realLimit = limit.get();
            //todo пользовательские exception ?
            if (realLimit < 1) {
                System.out.println("Напиши exception");
                System.out.println("  throw new BadRequestException(\"The limit cannot be less than 1.\");");
                realLimit = pointEntities.size();
            }
            System.out.println("limit " + limit.get());
        }
        if (pointEntities.size() < realLimit) {
            realLimit = pointEntities.size();
        }

        int realOffset = 0;
        if (offset.isPresent()) {
            realOffset = offset.get();

            if (realOffset > pointEntities.size()) {
                realOffset = pointEntities.size() - 2;
            }
            if (realOffset <= 0) {
                System.out.println("The offset cannot be less than 0");
//                throw new BadRequestException("The offset cannot be less than 0.");
                realOffset = 0;
            }
        }


        List<PointResponse> pointResponses = new ArrayList<>();
        //TODO может из БД лимит и офсет тащить
        for (int i = realOffset; i < realLimit; i++) {
            Points point = pointEntities.get(i);

            PointResponse pointResponse = new PointResponse(point.getId(),point.getStatus(), point.getPointCoordinates(), point.getDescription());
            pointResponses.add(pointResponse);
        }

        AllPointResponse getCouriersResponse = new AllPointResponse(pointResponses, realLimit, realOffset);
        return getCouriersResponse;

    }


    public Points save(Status status, PointRequest request) {
        //todo ограчение на сохренния на координаты или на ?
        Points point = new Points(status.getStatus(), request.getPointCoordinates(), request.getDescription());

        return pointsRepository.save(point);
    }
}
