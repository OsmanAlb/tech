import React, {useState, useEffect} from "react";
import {YMaps, Map, Placemark} from "@pbe/react-yandex-maps";

import {useContextMap} from "./PointReducer";

const BranchesMap = () => {
        const {point, points, originalPoints, setPoints, setOriginalPoints, setDataLoaded} = useContextMap();
        let branches = [
            {id: 1, status: "Great", description: "Отделение 1", coordinates: [56.926760, 60.71]}]

        type PointsData = {
            id: number;
            status: string;
            description: string;
            coordinates: number[];
        };


        const userLocation = [60.497874, 56.926761];
        type UserLocationData = number[];
        const [user, setUser] = useState<UserLocationData | null>(userLocation);
        const [places, setPlaces] = useState<PointsData[] | null>(branches);
//TODO сделать что бы поинт можно было перемещать
//TODO строительства маршрута к оптимальному отделению сразу же
        useEffect(() => {
            console.log(`Я слежу за points`);
            // @ts-ignore
            setPlaces(points)
        }, [points]);
        const handleFindAllBranch = async () => {

            const response = await fetch("http://localhost:8080/api/all?coordinates=60.497874,56.926760", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "http://localhost:8080/api/all",
                    "Access-Control-Allow-Credentials": "true",
                    "Access-Control-Allow-Methods": "GET",
                }

            });
//todo убрать лишнее limit and ofset
            const data = await response.json();

            console.log(useContextMap)
            console.log(setPoints)

            console.log("handleFindAllBranch")
            if (setPoints) {
                setPoints(data.points)
            }


            // @ts-ignore
            setPlaces(points)

        };
//todo убрать
        const handleFindUser = async () => {

            setUser(userLocation);

        };


        return (
            <div>
                <YMaps
                    query={{
                        apikey: `03a21dbf-0bd0-4788-901d-53dabb409285`
                    }}>

                    <Map
                        modules={["templateLayoutFactory", "layout.ImageWithContent"]}
                        state={{
                            center: userLocation, zoom: 10,
                            // включаем модули, отвечающие за всплывающие окна над геообъектами
                            // @ts-ignore
                            modules:  ['geoObject.addon.balloon', 'geoObject.addon.hint']
                        }}
                        width="400px"
                        height="400px"
                        draggable={true}
                        onDrag={() => {
                            console.log("onDrag");
                        }}
                    >
                        {/* Отображение местоположения пользователя */}
                        <Placemark
                            draggable={true}
                            geometry={userLocation.reverse()} // перевернул координаты !
                            properties={{hintContent: "Вы здесь"}}
                            options={{preset: "islands#blueCircleIcon"}}
                            onClick={() => {
                                console.log(userLocation.reverse());
                            }}
                            onMouseEnter={() => {

                                console.log(userLocation);
                            }}
                            onMouseLeave={() => {
                                console.log(Placemark);
                            }}
                            onDrag={() => {
                                console.log("onDrag");
                            }}
                            onDragLeave={() => {
                                console.log("onDragLeave");
                            }}

                        />

                        {/* Отображение отделений */}
                        {points && points.map((i) => (


                            <Placemark
                                key={i.id}
                                geometry={i.coordinates}
                                properties={{
                                    hintContent: i.description,
                                    balloonContent: `Белое всплывающие окошко с описанием которое почему то не отображаеться если есть ниже следующие`,
                                    balloonContentHeader: `<strong>Какой то заголовок</strong>`,
                                    balloonContentBody: `Содержимое <em>балуна</em>`,
                                    balloonContentFooter: `<p><strong>Веб-сайт:</strong> <a rel="nofollow" href="#" target="_blank">перейти</a></p>`
                                }}

                                onClick={() => {
                                    console.log(i.description);
                                }}
                                // onMouseEnter={() => {
                                //     console.log(i.coordinates);
                                // }}
                                // onMouseLeave={() => {
                                //     console.log(i.id);
                                // }}
                            />
                        ))}

                        {/*/!* Отображение оптимального отделения *!/*/}
                        {/*{point && (*/}
                        {/*    <Placemark*/}
                        {/*        geometry={point.coordinates.slice(1, point.coordinates.length - 1).split(",").map(Number).reverse()}*/}
                        {/*        properties={{hintContent: `Загрузка: ${point.description}%`}}*/}
                        {/*        options={{preset: "islands#redDotIcon"}}*/}
                        {/*    />*/}
                        {/*)}*/}
                    </Map>
                    <button onClick={handleFindUser}>
                        Найти себя
                    </button>
                    <button onClick={handleFindAllBranch}>
                        Найти все точки
                    </button>

                </YMaps>

                <div> Всего
                    поинтов {points ? points.length + "  " + points[0].id + points[0].description + points[0].coordinates : 0} </div>
                <div> Всего
                    places {places ? places.length + "  " + places[0].id + places[0].description + places[0].coordinates : 0} </div>
            </div>
        )
            ;
    }
;

export default BranchesMap;
