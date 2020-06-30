interface ErrorPattern {
	name: string
	luapattern: string
	pattern: RegExp
}

interface F3dDiagnostic {
	line:number
	col:number
	err:string
}

var singleLineErrors:Array<ErrorPattern> = [
	{name: '圆角空格符', luapattern: '　', pattern: /　/g},
	{name: '多个连续空格', luapattern: '  +', pattern: /  +/g},
	{name: '行末多余Tab', luapattern: '\t$', pattern: /\t$/g},
	{name: '行末多余空格', luapattern: ' $', pattern: / $/g},
	{name: ')前多余空格', luapattern: ' %)', pattern: / \)/g},
	{name: '(后多余空格', luapattern: '%( ', pattern: /\( /g},
	{name: '}前多余空格', luapattern: ' %}', pattern: / \}/g},
	{name: '{后多余空格', luapattern: '%{ ', pattern: /\{ /g},
	{name: ']前多余空格', luapattern: ' %]', pattern: / \]/g},
	{name: '[后多余空格', luapattern: '%[ ', pattern: /\[ /g},
	{name: ',后缺少空格', luapattern: ',[^ \t]', pattern: /\,[^ \t]/g},
	{name: '=前缺少空格', luapattern: '[^ ~=><]=', pattern: /[^ ~=><]\=/g},
	{name: '=后缺少空格', luapattern: '=[^ =]', pattern: /=[^ =]/g},
	{name: '+前缺少空格', luapattern: '[^ ]%+', pattern: /[^ ]\+/g},
	{name: '+后缺少空格', luapattern: '%+[^ ]', pattern: /\+[^ ]/g},
	{name: '-前缺少空格', luapattern: '[%)%a%d]%- [%(%a%d]', pattern: /[\)\w]\- [\(\w]/g},
	// -- 暂时不对 -后缺少空格 的格式错误进行判断，因为没有办法区分 'number -1' 和 'or -1'
	// -- {name = '-后缺少空格', luapattern = '[%)%a%d] %-[%(%a%d]'},
	{name: '-前后缺少空格', luapattern: '[%)%a%d]%-[%(%a%d]', pattern: /[\)\w]\-[\(\w]/g},
	{name: '*前缺少空格', luapattern: '[^ ]%*', pattern: /[^ ]\*/g},
	{name: '*后缺少空格', luapattern: '%*[^ ]', pattern: /\*[^ ]/g},
	{name: '/前缺少空格', luapattern: '[^ ]/', pattern: /[^ ]\//g},
	{name: '/后缺少空格', luapattern: '/[^ ]', pattern: /[^ ]\//g},
	{name: '>前缺少空格', luapattern: '[^ ]>', pattern: /[^ ]\>/g},
	{name: '>后缺少空格', luapattern: '>[^ =]', pattern: /\>[^ =]/g},
	{name: '<前缺少空格', luapattern: '[^ ]<', pattern: /[^ ]</g},
	{name: '<后缺少空格', luapattern: '<[^ =]', pattern: /<[^ =]/g},
	{name: '~=前缺少空格', luapattern: '[^ ]~=', pattern: /[^ ]~=/g},
	{name: '..前缺少空格', luapattern: '[^ %.]%.%.[^%.]', pattern: /[^ \.]\.\.[^\.]/g},
	{name: '..后缺少空格', luapattern: '[^%.]%.%.[^ %.]', pattern: /[^\.]\.\.[^ \.]/g},
	{name: 'Tab空格错误使用', luapattern: '\t ', pattern: /\t /g},
	{name: 'Tab错误使用', luapattern: '[^\t]\t', pattern: /[^\t]\t/g},
	{name: ';错误使用', luapattern: ';', pattern: /;/g},
	{name: ',前多余空格', luapattern: ' ,', pattern: / ,/g},
]

var multiLineErrors:Array<ErrorPattern> = [
	{name: '多个连续空行', luapattern: '%*line%d+%*%*line(%d+)%*%*line%d+%*', pattern: /(\*line(\d+)\*){3,}/g}
]

class F3dFormatChecker{
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

	private singleLineErrors:Array<ErrorPattern> = singleLineErrors
	private multiLineErrors:Array<ErrorPattern> = multiLineErrors

	checkFormatErrorInLines(lines:Array<string>){
		var errors:Array<F3dDiagnostic> = []
		lines.forEach((line, lineindex) => {
			this.singleLineErrors.forEach((errortype) => {
				let m: RegExpExecArray | null;
				while(m = errortype.pattern.exec(line)) {
					errors.push({
						line: lineindex,
						col: m.index,
						err: errortype.name,
					})
				}
			})
		})
		return errors
	}
	checkFormatErrorInString(str:String){
		var errors:Array<F3dDiagnostic> = []
		let l = 0
		str = str.replace(/\n/g, () => {
			l = l + 1
			return '*line' + l + '*'
		})
		this.multiLineErrors.forEach((errortype) => {
			var s = str.toString()
			let m: RegExpExecArray | null;
			while(m = errortype.pattern.exec(s)) {
				let r = m[0].match(/\*line(\d+)\*/)
				errors.push({
					line: Number((r && r[1]) || 0),
					col: 0,
					err: errortype.name,
				})
			}
		})
		return errors
	}
	checkFormatError(str:String){
		let multiLineErrors = this.checkFormatErrorInString(str)
		let singleLineErrors = this.checkFormatErrorInLines(str.split('\n'))
		var lineErrors:Array<F3dDiagnostic> = singleLineErrors.concat(multiLineErrors)
		return lineErrors
	}
	checkFormatErrorByFile(text: String){
		// if self:checkIgnoreFile(_sys:getFileName(filename)) then return end
		// if self:checkIgnoreFolder(filename) then return end
	
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
		text = text.replace(/\'[^\']*\'/g, (str) => {
			console.log('substring""---', str, str.substring(1, str.length - 1))
			return "'" + str.substring(1, str.length - 1).replace(/./g, '1') + "'"
		})

		// -- 将""内的内容转换为空，不检查字符串中的代码格式。
		// text = string.gsub(text, "\"[^\"]*\"", "\"\"")
		text = text.replace(/\"[^\"]*\"/g, (str) => {
			console.log('substring2""---', str, str.substring(1, str.length - 1))
			return '"' + str.substring(1, str.length - 1).replace(/./g, '1') + '"'
		})

		// -- 将[[]]内的内容转换为空，不检查字符串中的代码格式。
		// -- 内容转换为空，但换行不能去掉，否则会出现行数错误。
		text = text.replace(/\[\[[\s\S]+?\]\]/g, (str) => {
			return '[[' + str.substring(2, str.length - 2).replace(/./gm, '1') + ']]'
		})

		// -- 将--后的注释内容转换为空，不检查注释中的代码格式。
		// str = string.gsub(str, '%-%-[^\n]+\n', '--\n')
		text = text.replace(/\-\-(.+)(\n|$)/g, '--\n')

		return this.checkFormatError(text)
	}
	checkFormatErrorByPath(){}
	output(){}
}

export default F3dFormatChecker