
--组织
drop table if exists organ;

create table if not exists organ 
(
    id bigint(20) not null auto_increment,
    organ_name varchar(200) null,   --组织名称
    organ_code varchar(100) null,   --组织编码
    organ_desc varchar(2000) null,  --组织描述
    primary key (ID)
);

alter table organ add build_on date null;


insert into organ (organ_name,organ_code,organ_desc,build_on )
values ('1778','1778','一起出发','13-05-01');



select * from organ;