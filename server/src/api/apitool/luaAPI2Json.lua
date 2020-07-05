-- local JSON = require("json4lua.json.json")
local JSON = require("json")

assert(JSON)

-- local luaApiFolder = [[]]
-- local targetApiTag = 'test1'

-- assert(_sys:folderExist(luaApiFolder))

function io.writefile(path, content, mode)
	mode = mode or "w+b"
	local file = io.open(path, mode)
	if file then
		if file:write(content) == nil then return false end
		io.close(file)
		return true
	else
		return false
	end
end

local api = dofile('Ftest.lua')
io.writefile('_Class.json', JSON.encode(api))

-- _sys:enumFile(luaApiFolder, true, function(f)
-- 	if _sys:getExtention(f) ~= 'lua' then return end

-- 	local api = _dofile(luaApiFolder .. '\\' .. f)
-- 	if api == nil then return end

-- 	local jsontxt = JSON.encode(api)
-- 	_File.write(_sys.curentFolder .. '\\..\\' .. f, jsontxt)
-- end)