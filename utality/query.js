const all_land='SELECT * FROM land'
const insert_land='INSERT INTO land (land_name, world_id) VALUES (?,?)'

const all_resource='SELECT * FROM resources'
const insert_resource='INSERT INTO resources (world_id, resource_name, resource_quantity, fixed_amount) VALUES (?, ?, ?, ?)'

const all_terrain='SELECT * FROM terrain'
const insert_terrain='INSERT INTO terrain (terrain_name) VALUES (?)'

const all_world='SELECT * FROM world'
const select_world_name='SELECT * FROM world WHERE world_name LIKE ?'
const insert_world='INSERT INTO world (world_name) VALUES (?)'

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

}