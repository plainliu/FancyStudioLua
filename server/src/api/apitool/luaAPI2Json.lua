--[[
	将lua形式的API说明转化为json数据
	以便插件读取API信息
]]

local JSON = _dofile("json.lua")
assert(JSON)

local luaApiFolder = [[D:\develop\fancy-3d\Description]]
local targetApiTag = 'default'

assert(_sys:folderExist(luaApiFolder), '文件夹不存在')

-- function io.writefile(path, content, mode)
-- 	mode = mode or "w+b"
-- 	local file = io.open(path, mode)
-- 	if file then
-- 		if file:write(content) == nil then return false end
-- 		io.close(file)
-- 		return true
-- 	else
-- 		return false
-- 	end
-- end

-- local api = dofile('Ftest.lua')
-- io.writefile('_Class.json', JSON.encode(api))

_File.writeString = function(name, str, format)
	local file = _File.new()
	file:create(name, format)
	file:write(str)
	file:close()
end

local apis = {}

_sys:enumFile(luaApiFolder, true, function(f)
	if _sys:getExtention(f) ~= 'lua' then return end

	local api = _dofile(luaApiFolder .. '\\' .. f)
	if api == nil then return end

	if api and api.class then
		api.class.classname = _sys:getFileName(f, false, false)
	end
	table.insert(apis, api)
	-- apis[_sys:getFileName(f, false, false)] = api
end)

local jsontxt = JSON.encode(apis)
_File.writeString('client.json', jsontxt)