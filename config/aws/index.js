//terrafrom version ^3.*.*
const ec2  = require("./aws_instance");
const vpc  = require("./aws_vpc");
const aws_internet_gateway  = require("./aws_internet_gateway");
const aws_route_table  = require("./aws_route_table");
const aws_route_table_association  = require("./aws_route_table_association");
const aws_subnet  = require("./aws_subnet");
const default_acl_security  = require("./default_acl_security");
const ebs  = require("./aws_ebs_volume");
module.exports = {ec2,vpc,ebs,aws_internet_gateway,aws_route_table,aws_route_table_association,aws_subnet,default_acl_security}