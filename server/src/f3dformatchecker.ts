import { TextDocument } from 'vscode-languageserver-textdocument'

interface singleLineErrorType {
	name: String
	pattern: String
	// newpattern: RegExp
}

interface checkError {
	line:Number
	name:String
}

var singleLineErrorTypes:Array<singleLineErrorType> = [
	{name: '圆角空格符', pattern: '　'},
	{name: '多个连续空格', pattern: '  +'},
	{name: '行末多余Tab', pattern: '\t$'},
	{name: '行末多余空格', pattern: ' $'},
	{name: ')前多余空格', pattern: ' %)'},
	{name: '(后多余空格', pattern: '%( '},
	{name: '}前多余空格', pattern: ' %}'},
	{name: '{后多余空格', pattern: '%{ '},
	{name: ']前多余空格', pattern: ' %]'},
	{name: '[后多余空格', pattern: '%[ '},
	{name: ',后缺少空格', pattern: ',[^ \t]'},
	{name: '=前缺少空格', pattern: '[^ ~=><]='},
	{name: '=后缺少空格', pattern: '=[^ =]'},
	{name: '+前缺少空格', pattern: '[^ ]%+'},
	{name: '+后缺少空格', pattern: '%+[^ ]'},
	{name: '-前缺少空格', pattern: '[%)%a%d]%- [%(%a%d]'},
	// -- 暂时不对 -后缺少空格 的格式错误进行判断，因为没有办法区分 'number -1' 和 'or -1'
	// -- {name = '-后缺少空格', pattern = '[%)%a%d] %-[%(%a%d]'},
	{name: '-前后缺少空格', pattern: '[%)%a%d]%-[%(%a%d]'},
	{name: '*前缺少空格', pattern: '[^ ]%*'},
	{name: '*后缺少空格', pattern: '%*[^ ]'},
	{name: '/前缺少空格', pattern: '[^ ]/'},
	{name: '/后缺少空格', pattern: '/[^ ]'},
	{name: '>前缺少空格', pattern: '[^ ]>'},
	{name: '>后缺少空格', pattern: '>[^ =]'},
	{name: '<前缺少空格', pattern: '[^ ]<'},
	{name: '<后缺少空格', pattern: '<[^ =]'},
	{name: '~=前缺少空格', pattern: '[^ ]~='},
	{name: '..前后缺少空格', pattern: '[^ %.]%.%.[^ %.]'},
	{name: 'Tab空格错误使用', pattern: '\t '},
	{name: 'Tab错误使用', pattern: '[^\t]\t'},
	{name: ';错误使用', pattern: ';'},
	{name: ',前多余空格', pattern: ' ,'},
]

var multiLineErrorTypes:Array<singleLineErrorType> = [
	{name: '多个连续空行', pattern: '%*line%d+%*%*line(%d+)%*%*line%d+%*'}
]

class f3dFormatChecker{
	// private formatErrors:Array<string>
	// private ignoreFile:Array<string>
	// private ignoreFolder:Array<string>

	constructor() {
		// this.formatErrors = []
		// this.ignoreFile = []
		// this.ignoreFolder = []
		// this.connect = connect
	}

	addIgnoreName(){}
	checkIgnoreFile(){}
	checkIgnoreFolder(){}

	private singleLineErrorTypes:Array<singleLineErrorType> = singleLineErrorTypes
	private multiLineErrorTypes:Array<singleLineErrorType> = multiLineErrorTypes

	checkFormatErrorInLines(lines:Array<String>){
		var errors:Array<checkError> = []
		lines.forEach((line, index, a) => {
			this.singleLineErrorTypes.forEach((errortype) => {
				let es = line.search(/errortype.newpattern/g)
				// es.
				// table.insert(errors, {line = tonumber(line), name = v.name})
			})
		})
		return errors
	}
	checkFormatErrorInString(str:String){
		var errors:Array<checkError> = []
		let l = 0
		// str = string.gsub(str, '\n', function()
		// 	l = l + 1
		// 	return '*line' .. l .. '*'
		// end)
		this.multiLineErrorTypes.forEach((errortype) => {
			let es = str.search(/errortype.newpattern/g)
			// table.insert(errors, {line = tonumber(line), name = v.name})
		})
		return errors
	}
	checkFormatError(str:String){
		let multiLineErrors = this.checkFormatErrorInString(str)
		let singleLineErrors = this.checkFormatErrorInLines(str.split('\n'))
		var lineErrors = []
		let i = 1, j = 1
		while (multiLineErrors[i] || singleLineErrors[j]) {
			if ((!multiLineErrors[i] && singleLineErrors[j]) ||
				(multiLineErrors[i] && singleLineErrors[j] && multiLineErrors[i].line >= singleLineErrors[j].line)) {
					lineErrors.push(singleLineErrors[j])
					j = j + 1
			} else if (multiLineErrors[i] && !singleLineErrors[j] ||
				(multiLineErrors[i] && singleLineErrors[j] && multiLineErrors[i].line < singleLineErrors[j].line)) {
					lineErrors.push(multiLineErrors[i])
					i = i + 1
			}
		}
	
		return lineErrors
	}
	checkFormatErrorByFile(document: TextDocument){
		// if self:checkIgnoreFile(_sys:getFileName(filename)) then return end
		// if self:checkIgnoreFolder(filename) then return end
	
		let text = document.getText()
	
		// -- 将'\r\n'转换为'\n'，不然后续匹配\n的时候会出错。
		// text, time = string.gsub(text, '\r\n', '\n')
		text = text.replace(/\r\n/g, '\n')

		// -- 将'\\'转换为''，为后续转换'\''和'\"'做准备。
		// text = string.gsub(text, "\\\\", '')
		text = text.replace(/\\\\/g, '')

		// -- 将'\''转换为''，为后续转换引号内的内容为''做准备。
		// text = string.gsub(text, "\\\'", '')
		text = text.replace(/\\\'/g, '')

		// -- 将'\"'转换为''，为后续转换引号内的内容为""做准备。
		// text = string.gsub(text, '\\\"', '')
		text = text.replace(/\\\"/g, '')

		// -- 将''内的内容转换为空，不检查字符串中的代码格式。
		// text = string.gsub(text, '\'[^\']*\'', '\'\'')
		text = text.replace(/\'[^\']*\'/g, '\'\'')

		// -- 将""内的内容转换为空，不检查字符串中的代码格式。
		// text = string.gsub(text, "\"[^\"]*\"", "\"\"")
		text = text.replace(/\"[^\"]*\"/g, '\"\"')
	
		// -- 将[[]]内的内容转换为空，不检查字符串中的代码格式。
		// -- 内容转换为空，但换行不能去掉，否则会出现行数错误。
		text = text.replace(/\[\[(.-)\]\]"/g, '\"\"')

		// str = string.gsub(str, "%[%[(.-)%]%]", function(s)
		// 	let r = "%[%["
	
		// 	for _ in string.gmatch(s, '\n') do
		// 		// -- 防止出现多个空行的错误。
		// 		r = r .. '1\n'
		// 	end
		// 	r = r .. "%]%]"
	
		// 	return r
		// end)

		// -- 将--后的注释内容转换为空，不检查注释中的代码格式。
		// str = string.gsub(str, '%-%-[^\n]+\n', '--\n')
		text = text.replace(/\-\-[^\n]+\n/g, '--\n')
	
		var errors = this.checkFormatError(text)
		// table.insert(self.formatErrors, {filename = filename, errors = errors})
	}
	checkFormatErrorByPath(){}
	output(){}
}

export default f3dFormatChecker