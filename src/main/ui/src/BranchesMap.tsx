import React, {useState} from "react";
import {YMaps, Map, Placemark} from "@pbe/react-yandex-maps";

const BranchesMap = () => {
    let branches =
        {id: 1, description: "Отделение 1", coordinates: "55.76, 37.64"}

    type PointsData = {
        id: number;
        description: string;
        coordinates: string;
    };

    const userLocation = [60.497874, 56.926760];
    type UserLocationData = number[];
    const [user, setUser] = useState<UserLocationData | null>(userLocation);
    const [points, setPoints] = useState<PointsData | null>(branches);
    //TODO сделать что бы поинт можно было перемещать
    //TODO строительства маршрута к оптимальному отделению сразу же

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

        const data = await response.json();

        setPoints(data)
    };
    //todo убрать
    const handleFindUser = async () => {

        setUser(userLocation);

    };

    // if (point) {
    //     console.log(point)
    //     console.log(point.coordinates.slice(1, point.coordinates.length - 1).split(",").map(Number).reverse())
    // }
    return (
        <YMaps>
            <Map
                defaultState={{center: userLocation, zoom: 10}}
                width="100%"
                height="400px"
            >
                {/* Отображение местоположения пользователя */}
                <Placemark
                    geometry={userLocation.reverse()} // перевернул координаты !
                    properties={{hintContent: "Вы здесь"}}
                    options={{preset: "islands#blueCircleIcon"}}
                />

                {/*/!* Отображение отделений *!/*/}
                {/*{branches.map((branch) => (*/}
                {/*    <Placemark*/}
                {/*        key={branch.id}*/}
                {/*        geometry={branch.coordinates}*/}
                {/*        properties={{hintContent: branch.name}}*/}
                {/*    />*/}
                {/*))}*/}

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
    );
};

export default BranchesMap;
