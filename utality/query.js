const all_land='SELECT * FROM land ln JOIN `world` w ON ln.world_id = w.id'
const select_land='SELECT * FROM land WHERE land_name LIKE ?'
const insert_land='INSERT INTO land (land_name, world_id) VALUES (?,?)'
const select_land_world='SELECT * FROM land ln JOIN `world` w ON ln.world_id = w.id where world_id= ?'
const all_select_land='SELECT * FROM land where world_id = ?'

const all_resource='SELECT * FROM resources rs JOIN `world` w ON rs.world_id = w.id'
const insert_resource='INSERT INTO resources (world_id, resource_name, resource_quantity, fixed_amount) VALUES (?, ?, ?, ?)'

const all_terrain='SELECT * FROM terrain'
const select_terrain='SELECT * FROM terrain WHERE terrain_name LIKE ?'
const insert_terrain='INSERT INTO terrain (terrain_name) VALUES (?)'

const all_world='SELECT * FROM world'
const select_world_name='SELECT * FROM world WHERE world_name LIKE ?'
const insert_world='INSERT INTO world (world_name) VALUES (?)'

const insert_channel='INSERT INTO channels (server_id,channel_name,channel_id,terrain_id,land_id,world_id) VALUES (?,?,?,?,?,?)'
const count_channel='SELECT count(*) from channels'

const select_terrainland_linked='SELECT * FROM terrain_in_land til JOIN `terrain` t ON til.terrain_id=t.id JOIN `land` l ON l.id = til.land_id JOIN `world` w ON l.world_id = w.id ORDER BY t.terrain_name ASC'
const insert_terrain_land='INSERT INTO terrain_in_land (terrain_id,land_id) VALUES (?,?)';
const insert_exclude_terrain_in_land='INSERT INTO exclude_terrain_in_land (terrain_id,land_id) VALUES (?,?)';

const select_terrain_event='SELECT * FROM terrain_event where terrain_in_land_id = ?'

const select_all_channel='SELECT * FROM channels cha JOIN `terrain` t ON cha.terrain_id=t.id JOIN `land` l ON l.id = cha.land_id JOIN `world` w ON cha.world_id = w.id ORDER BY t.terrain_name ASC'
const select_terrain_channel = 'SELECT * FROM channels cha JOIN `terrain` t ON cha.terrain_id=t.id JOIN `land` l ON l.id = cha.land_id JOIN `world` w ON cha.world_id = w.id where cha.terrain_id= ?'
const select_land_channel='SELECT * FROM channels cha JOIN `terrain` t ON cha.terrain_id=t.id JOIN `land` l ON l.id = cha.land_id JOIN `world` w ON cha.world_id = w.id where cha.land_id= ?'
const select_world_channel='SELECT * FROM channels cha JOIN `terrain` t ON cha.terrain_id=t.id JOIN `land` l ON l.id = cha.land_id JOIN `world` w ON cha.world_id = w.id where cha.world_id= ?'
const select_channel_id='SELECT * FROM channels cha JOIN `terrain` t ON cha.terrain_id=t.id JOIN `land` l ON l.id = cha.land_id JOIN `world` w ON cha.world_id = w.id where cha.channel_id= ?'
const select_channel_ter_lan='SELECT * FROM channels WHERE server_id=? AND terrain_id=? AND land_id=?'
const select_resource_in_terrain_land='SELECT * FROM resource_in_terrain_land ritl JOIN terrain_in_land tl ON ritl.terrain_in_land_id = tl.id JOIN resources rs ON ritl.resource_id = rs.id JOIN terrain t ON tl.terrain_id = t.id JOIN land lt ON tl.land_id = lt.id JOIN world w ON w.id = rs.world_id'
const select_resource_in_terrain_land_with_channel='SELECT * FROM resource_in_terrain_land ritl JOIN terrain_in_land tl ON ritl.terrain_in_land_id = tl.id JOIN resources rs ON ritl.resource_id = rs.id JOIN terrain t ON tl.terrain_id = t.id JOIN land lt ON tl.land_id = lt.id JOIN world w ON w.id = rs.world_id JOIN channels ch ON ch.land_id = lt.id AND w.id=ch.world_id AND t.id=ch.terrain_id'
const search_resource_in_terrain_land_with_channelID='SELECT * FROM resource_in_terrain_land ritl JOIN terrain_in_land tl ON ritl.terrain_in_land_id = tl.id JOIN resources rs ON ritl.resource_id = rs.id JOIN terrain t ON tl.terrain_id = t.id JOIN land lt ON tl.land_id = lt.id JOIN world w ON w.id = rs.world_id JOIN channels ch ON ch.land_id = lt.id AND w.id=ch.world_id AND t.id=ch.terrain_id where channel_id = ?'
const delete_channel='DELETE FROM channels where channel_id= ? '

const insert_exclude='INSERT INTO exclude_terrain_in_land (terrain_id, land_id) VALUES (?,?)'
const check_exclude='SELECT EXISTS(SELECT * FROM exclude_terrain_in_land WHERE terrain_id= ? AND land_id = ?) AS DATABOOL'
const select_all_exclude='SELECT * FROM exclude_terrain_in_land'
const all_item = 'SELECT * FROM item'
const insert_item = 'INSERT INTO item (item_name,item_cost,item_description,item_stats) VALUES (?, ?, ?, ?)'
// const insert_item = 'INSERT INTO item (item_name) VALUES (?)'
const select_owner='SELECT * FROM owner where server_id = ? AND discord_user_id = ?'
const select_count_owner='SELECT count(*) as count FROM owner where server_id = ? AND discord_user_id = ?'

const insert_owner ='INSERT INTO owner (server_id,server_name,discord_user_id) VALUES (?,?,?)'

const capital_city_id="SELECT * FROM channels cha JOIN `terrain` t ON cha.terrain_id=t.id JOIN `land` l ON l.id = cha.land_id JOIN `world` w ON cha.world_id = w.id where cha.channel_id= ?"
const insert_shop ='INSERT INTO shop (shop_name,terrain_in_land_id) VALUES (?,?)'

module.exports = { 
    all_land, 
    select_world_name,
    insert_land,
    all_resource,
    insert_resource ,
    all_terrain,
    select_terrain,
    insert_terrain,
    all_world,
    insert_world,
    insert_channel,
    insert_terrain_land,
    insert_exclude_terrain_in_land,
    select_land,
    select_land_world,
    select_terrainland_linked,
    select_terrain_event,
    select_all_channel,
    select_terrain_channel,
    select_land_channel,
    select_world_channel,
    select_channel_id,
    select_resource_in_terrain_land,
    select_resource_in_terrain_land_with_channel,
    search_resource_in_terrain_land_with_channelID,
    insert_exclude,
    check_exclude,
    count_channel,
    all_item,
    insert_item,
    select_owner,
    insert_owner,
    select_count_owner,
    capital_city_id,
    insert_shop,
    select_all_exclude,
    select_channel_ter_lan,
    all_select_land,
    delete_channel,

}