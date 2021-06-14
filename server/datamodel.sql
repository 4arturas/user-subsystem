create table clients
(
    client_id       serial    not null
        constraint clients_pk
            primary key,
    client_name     varchar   not null,
    client_add_date timestamp not null
);

alter table clients
    owner to postgres;

create unique index clients_client_id_uindex
    on clients (client_id);

create unique index clients_client_name_uindex
    on clients (client_name);

create table if not exists organizations
(
    org_id serial not null
    constraint organizations_pk
    primary key,
    org_name varchar not null,
    org_add_date timestamp not null
);

alter table organizations owner to postgres;

create unique index if not exists organizations_org_id_uindex
	on organizations (org_id);

create table if not exists users
(
    user_id serial not null
    constraint users_pk
    primary key,
    user_name varchar not null,
    first_name varchar,
    last_name varchar,
    user_add_date timestamp not null
);

alter table users owner to postgres;

create unique index if not exists users_user_id_uindex
	on users (user_id);

create unique index if not exists users_user_name_uindex
	on users (user_name);

create table if not exists roles
(
    role_id serial not null
    constraint roles_pk
    primary key,
    role_name varchar not null,
    role_add_date timestamp not null
);

alter table roles owner to postgres;

create unique index if not exists roles_role_id_uindex
	on roles (role_id);


create table clients_organizations
(
    client_id  integer   not null
        constraint clients_organizations_clients_client_id_fk
            references clients,
    org_id     integer   not null
        constraint clients_organizations_organizations_org_id_fk
            references organizations,
    start_date timestamp not null,
    end_date   timestamp
);

alter table clients_organizations
    owner to postgres;


create table organizations_users
(
    org_id   integer   not null
        constraint organizations_users_organizations_org_id_fk
            references organizations,
    user_id  integer   not null
        constraint organizations_users_users_user_id_fk
            references users,
    start_date timestamp not null,
    end_date timestamp
);

alter table organizations_users
    owner to postgres;

create table role_groups
(
    role_group_id       serial    not null
        constraint role_groups_pk
            primary key,
    role_group_name     varchar   not null,
    role_group_add_date timestamp not null
);

alter table role_groups
    owner to postgres;

create unique index role_groups_role_group_id_uindex
    on role_groups (role_group_id);

create unique index role_groups_role_group_name_uindex
    on role_groups (role_group_name);

create table users_roles
(
    user_id    integer   not null
        constraint users_roles_users_user_id_fk
            references users,
    role_id    integer   not null
        constraint users_roles_roles_role_id_fk
            references roles,
    start_date timestamp not null,
    end_date   timestamp
);

alter table users_roles
    owner to postgres;


commit;

