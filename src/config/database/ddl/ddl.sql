create table permission
(
    id              int auto_increment
        primary key,
    permission_name enum ('CAN_SEE_CODE', 'CAN_SEE_DESCRIPTION') not null,
    constraint permission_name
        unique (permission_name)
);

create table user_info
(
    id         int auto_increment
        primary key,
    first_name varchar(64)                                              not null,
    last_name  varchar(64)                                              not null,
    email      varchar(64)                                              not null,
    status     enum ('ACTIVE', 'INACTIVE', 'CREATED') default 'CREATED' null,
    constraint email
        unique (email)
);

create table user
(
    id           int auto_increment
        primary key,
    username     varchar(64)  not null,
    id_user_info int          null,
    password     varchar(255) not null,
    constraint username
        unique (username),
    constraint user_ibfk_1
        foreign key (id_user_info) references user_info (id)
);

create index id_user_info
    on user (id_user_info);

create table user_permissions_permission
(
    userId       int not null,
    permissionId int not null,
    primary key (userId, permissionId)
);

create index IDX_5b72d197d92b8bafbe7906782e
    on user_permissions_permission (userId);

create index IDX_c43a6a56e3ef281cbfba9a7745
    on user_permissions_permission (permissionId);

