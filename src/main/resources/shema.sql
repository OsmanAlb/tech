create table status
(
    created_at        timestamp(6) with time zone,
    point_id          bigint not null,
    description       varchar(255),
    point_coordinates varchar(255),
    status            varchar(255),
    primary key (point_id)
)