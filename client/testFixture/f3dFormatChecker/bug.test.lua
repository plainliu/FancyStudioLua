-- 注释中有单个引号时导致字符串内容进行格式判断
-- e's
_sys:copyFile('Package_Tool/tools/foatool/fancy-foa-tool.exe', 'fancy-foa-tool.exe')
-- e"s
_sys:copyFile("Package_Tool/tools/foatool/fancy-foa-tool.exe, fancy-foa-tool.exe")

-- 字符串中有--
print('a --> ' )