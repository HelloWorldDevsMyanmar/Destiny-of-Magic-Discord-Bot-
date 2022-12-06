const all_land='SELECT * FROM land'
const insert_land='INSERT INTO land (land_name, world_id) VALUES (?,?)'
const select_land_world='SELECT * FROM land where world_id= ?'

const all_resource='SELECT * FROM resources'
const insert_resource='INSERT INTO resources (world_id, resource_name, resource_quantity, fixed_amount) VALUES (?, ?, ?, ?)'

const all_terrain='SELECT * FROM terrain'
const insert_terrain='INSERT INTO terrain (terrain_name) VALUES (?)'

const all_world='SELECT * FROM world'
const select_world_name='SELECT * FROM world WHERE world_name LIKE ?'
const insert_world='INSERT INTO world (world_name) VALUES (?)'

const insert_channel='INSERT INTO channels (server_id,channel_name,channel_id,terrain_id,land_id,world_id) VALUES (?,?,?,?,?,?)'

const insert_terrain_land='INSERT INTO terrain_in_land (terrain_id,land_id) VALUES (?,?)';
module.exports = { 
    all_land, 
    select_world_name,
    insert_land,
    all_resource,
    insert_resource ,
    all_terrain,
    insert_terrain,
    all_world,
    insert_world,
    insert_channel,
    insert_terrain_land,
    select_land_world

}