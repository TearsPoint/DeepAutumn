
create table IF NOT EXISTS test(
    ID BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT, 
    VALUE VARCHAR(50) NOT NULL, 
    PRIMARY KEY (ID));
--##
delete from test;
--##
INSERT INTO TEST(VALUE) VALUES("HELLO2")
--##
INSERT INTO TEST(VALUE) VALUES("HELLO2")
--##
INSERT INTO TEST(VALUE) VALUES("HELLO3")
--##
INSERT INTO TEST(VALUE) VALUES("HELLO4"\)
--##
select * from test;
--##
select * from chinesecharactercode limit 1;