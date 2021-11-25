--[[
	将lua形式的API说明转化为json数据
	以便插件读取API信息
]]

local JSON = _dofile("json.lua")
assert(JSON)

local luaApiFolder = [[C:\Fancy\develop\fancy-3d\Description]]
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

local _APIParser = {}
_APIParser.getFunction = function(self, func)
	local paramlist = {}
	local maxid = 0
	print("start")
	for k, f in pairs(func.paramlist) do
		-- table.insert(paramlist, {
		-- 	type = k,
		-- 	brief = f.brief,
		-- 	detail = f.detail,
		-- })
		assert(f.id, "[ParamNoId] " .. k)
		print(f.id, k)
		paramlist[f.id] = {
			type = k,
			brief = f.brief,
			detail = f.detail,
		}
		maxid = maxid > f.id and maxid or f.id
	end
	-- for i, v in ipairs(paramlist) do
	-- 	print(i, v.type)
	-- end
	assert(maxid == #paramlist, func.apiname .. ": " .. maxid .. "!=" .. #paramlist)

	return {
		apiname = func.apiname,
		brief = func.brief,
		paramlist = paramlist
	}
end
_APIParser.getFunctions = function(self, luaapi)
	if luaapi == nil then return nil end

	local functions = {}

	-- staticfunc
	for f, funcs in pairs(luaapi.staticfunc or {}) do
		for id, func in pairs(funcs) do
			table.insert(functions, self:getFunction(func))
		end
	end

	-- memberfunc
	for f, funcs in pairs(luaapi.memberfunc or {}) do
		for id, func in pairs(funcs) do
			table.insert(functions, self:getFunction(func))
		end
	end
	return functions
end

_APIParser.getVars = function(self, luaapi)
	local vars = {}

	-- readonlyvar
	for k, var in pairs(luaapi.readonlyvar or {}) do
		var.apiname = k
		table.insert(vars, var)
	end
	-- constvar
	for k, var in pairs(luaapi.constvar or {}) do
		var.apiname = k
		table.insert(vars, var)
	end
	-- normalvar
	for k, var in pairs(luaapi.normalvar or {}) do
		var.apiname = k
		table.insert(vars, var)
	end

	return vars
end
_APIParser.getClassApi = function(self, luaapi, classname)
	local classapi = {}

	-- class
	classapi.class = luaapi.class
	classapi.class.classname = classname

	-- constructor

	-- singleton
	local singleton = luaapi.singleton
	if singleton then
		for k, v in pairs(singleton) do
			classapi.singleton = {
				apiname = k,
				brief = v.brief,
				detail = v.detail,
			}
		end
	end

	classapi.vars = self:getVars(luaapi)

	-- funcs
	classapi.funcs = self:getFunctions(luaapi)
	return classapi
end

local apis = {}
local function readClassDesc(f)
	if _sys:getExtention(f) ~= 'lua' then return end

	local api = _dofile(luaApiFolder .. '\\' .. f)
	if api == nil then return end

	local cls = _APIParser:getClassApi(api, _sys:getFileName(f, false, false))
	table.insert(apis, cls)
end
-- _sys:enumFile(luaApiFolder, true, function(f)
-- 	readClassDesc(f)
-- end)

local function enumCfg(classconfig, func)
	local classes = _dofile(classconfig)
	for i, class in ipairs(classes) do
		local classname = class:gsub("Fancy(.-)%.cpp", function(s)
			return "_" .. s
		end)
		print(classname)
		func(classname .. ".lua")
	end
end
enumCfg("config.lua", readClassDesc)

local jsontxt = JSON.encode(apis)
_File.writeString('client.json', jsontxt)