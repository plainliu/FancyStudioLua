return {
	['Codec'] = {
		type = [[Common API]],
		brief = [[数据编解码系统；只支持lua。]],
	},
	['Event'] = {
		type = [[Common API]],
		brief = [[事件系统，包括定义事件和动作，触发事件等；只支持lua。]],
	},
	['Luajit'] = {
		type = [[Common API]],
		brief = [[服务端和客户端均支持lua脚本，采用LuaJIT引擎。去掉了os库，不支持tail call，客户端还去掉了io、file、package库。增加了少量基础功能。]],
	},
	['Mysql（server）'] = {
		type = [[Common API]],
		brief = [[Mysql 5.0以上 数据库接口。]],
	},
	['Network'] = {
		type = [[Common API]],
		brief = [[网络系统，包括监听、连接、收发数据等；只支持lua。 可以使用地址*代替0.0.0.0和本机ip，linux服务端不能直接解析机器名。]],
	},
	['Queue'] = {
		type = [[Common API]],
		brief = [[定时与队列系统；只支持lua。]],
	},
	['Remote'] = {
		type = [[Common API]],
		brief = [[远程事件系统；只支持lua。]],
	},
	['Server（server）'] = {
		type = [[Common API]],
		brief = [[服务端系统功能。]],
	},
	['Sql'] = {
		type = [[Common API]],
		brief = [[Postgresql 9.0以上 数据库接口。]],
	},
	['Zip'] = {
		type = [[Common API]],
		brief = [[zip压缩解压缩。]],
	},
	['_Archive'] = {
		type = [[Client API]],
		brief = [[文档类。用于生成或处理foa文件。]],
	},
	['_Blender'] = {
		type = [[Client API]],
		brief = [[颜色混合器，功能包括混色、高亮、加色和灰化等。]],
	},
	['_Camera'] = {
		type = [[Client API]],
		brief = [[摄像机，功能包括摄像机的创建、设置、旋转等。]],
	},
	['_Clipper'] = {
		type = [[Client API]],
		brief = [[裁剪面。此裁剪面为一个垂直于z轴的平面。]],
	},
	['_Color'] = {
		type = [[Client API]],
		brief = [[颜色类，包括导出的各种默认的颜色值，以及颜色的加色，乘色和线性插值。]],
	},
	['_Console'] = {
		type = [[Client API]],
		brief = [[控制台，功能包括控制台的创建和设置。]],
	},
	['_DrawBoard'] = {
		type = [[Client API]],
		brief = [[画板类，功能包括图像的创建、渲染等相关操作。_DrawBoard类是一种特殊的_Image类。]],
	},
	['_File'] = {
		type = [[Client API]],
		brief = [[文件类。用来执行读写文件的一些操作。]],
	},
	['_Fog'] = {
		type = [[Client API]],
		brief = [[雾。保存有雾的距离和颜色等数据。]],
	},
	['_Font'] = {
		type = [[Client API]],
		brief = [[字体类，功能包括字体的创建、设置，以及在该字体下字符串的相关操作。]],
	},
	['_GraphicsData'] = {
		type = [[Client API]],
		brief = [[与图形渲染相关的数据，包括marker，摄像机，光，雾和轨迹等。]],
	},
	['_GraphicsEvent'] = {
		type = [[Client API]],
		brief = [[图形渲染相关的事件]],
	},
	['_Grass'] = {
		type = [[Client API]],
		brief = [[草的类]],
	},
	['_Image'] = {
		type = [[Client API]],
		brief = [[图像类，功能包括图像的创建、渲染等相关操作。]],
	},
	['_Indicator'] = {
		type = [[Client API]],
		brief = [[用来描述一个场景指示器。它绑定在一个transform上，可以通过鼠标拖动改变该transform。]],
	},
	['_Loader'] = {
		type = [[Client API]],
		brief = [[用来管理文件下载。]],
	},
	['_Mask'] = {
		type = [[Client API]],
		brief = [[通过更改模板缓冲，来实现遮掩的效果。]],
	},
	['_Material'] = {
		type = [[Client API]],
		brief = [[材质类。]],
	},
	['_Matrix2D'] = {
		type = [[Client API]],
		brief = [[2D矩阵类，功能包括矩阵的创建、设置、位移、旋转、缩放等相关操作。]],
	},
	['_Matrix3D'] = {
		type = [[Client API]],
		brief = [[3D矩阵类，功能包括矩阵的创建、设置、位移、旋转、缩放等相关操作。]],
	},
	['_Mesh'] = {
		type = [[Client API]],
		brief = [[用于mesh相关的操作，包括创建、修改和渲染等。可以为mesh添加骨骼和动画。]],
	},
	['_ModelFactory'] = {
		type = [[Client API]],
		brief = [[模型的工厂类，功能包括几何模型的创建、模型相关数据的读取与保存、粒子的读取与保存等相关操作。该类是一个单例，在程序开始已经创建的了名称为_mf的对象。]],
	},
	['_Movie'] = {
		type = [[Client API]],
		brief = [[电影类]],
	},
	['_MovieAction'] = {
		type = [[Client API]],
		brief = [[movie中的action，用于播放电影中的action]],
	},
	['_MovieStep'] = {
		type = [[Client API]],
		brief = [[action中step]],
	},
	['_Orbit'] = {
		type = [[Client API]],
		brief = [[轨迹模块，表示若干点组成的一条轨迹，提供方法获得轨迹上的任意点。]],
	},
	['_Particle'] = {
		type = [[Client API]],
		brief = [[粒子类，功能包括粒子的创建、设置、更新、渲染等相关操作。]],
	},
	['_ParticleEmitter'] = {
		type = [[Client API]],
		brief = [[粒子发射器。]],
	},
	['_ParticleGravity'] = {
		type = [[Client API]],
		brief = [[粒子发射器。]],
	},
	['_ParticleParam'] = {
		type = [[Client API]],
		brief = [[播放粒子参数集。]],
	},
	['_ParticlePlayer'] = {
		type = [[Client API]],
		brief = [[用于直接播放pfx文件]],
	},
	['_PathBuilder'] = {
		type = [[Client API]],
		brief = [[寻路算法。]],
	},
	['_PathFinder'] = {
		type = [[Client API]],
		brief = [[寻路算法。]],
	},
	['_PointLight'] = {
		type = [[Client API]],
		brief = [[点光类，功能包括点光的创建、设置等相关操作。]],
	},
	['_Rect'] = {
		type = [[Client API]],
		brief = [[矩形模块，表示平面上的一个矩形区域，边与坐标轴平行，坐标可以为浮点数。]],
	},
	['_RenderDevice'] = {
		type = [[Client API]],
		brief = [[渲染设备类，功能包括渲染相关的大部分操作。]],
	},
	['_SWFManager'] = {
		type = [[Client API]],
		brief = [[用来管理swf文件。]],
	},
	['_Scene'] = {
		type = [[Client API]],
		brief = [[场景类。]],
	},
	['_SceneNode'] = {
		type = [[Client API]],
		brief = [[场景结点类，用来保存场景结点的相关数据。]],
	},
	['_Skeleton'] = {
		type = [[Client API]],
		brief = [[用于骨骼相关的操作，包括创建、修改和渲染等。可以为骨骼添加动画。]],
	},
	['_SkyDome'] = {
		type = [[Client API]],
		brief = [[天空盒类。]],
	},
	['_SkyLight'] = {
		type = [[Client API]],
		brief = [[天光类，功能包括天光的创建、设置等相关操作。]],
	},
	['_Socket'] = {
		type = [[Client API]],
		brief = [[套接字类。]],
	},
	['_SoundDevice'] = {
		type = [[Client API]],
		brief = [[声音设备类，主要用来管理所有SoundGroup。]],
	},
	['_SoundGroup'] = {
		type = [[Client API]],
		brief = [[声音组类，用来播放声音文件。主要功能包括声音的播放、停止、音量的调整、静音等功能。]],
	},
	['_String'] = {
		type = [[Client API]],
		brief = [[字符串类。lua库中的string相关函数不能正确处理unicode编码的字串。用此类来代替，处理一些unicode编码的字串。]],
	},
	['_System'] = {
		type = [[Client API]],
		brief = [[主要功能包括系统相关的设置，文件与目录的相关操作，加密，获取光标位置，剪切板的相关操作，资源缓存的设置等。]],
	},
	['_Terrain'] = {
		type = [[Client API]],
		brief = [[场景中的地形。]],
	},
	['_Timer'] = {
		type = [[Client API]],
		brief = [[计时器类。]],
	},
	['_Vector2'] = {
		type = [[Client API]],
		brief = [[用于表示二维向量或点。它还包含了一些向量的基本运算功能。]],
	},
	['_Animation'] = {
		type = [[Client API]],
		brief = [[用于动画相关的操作，包括创建、播放、停止和更新等。]],
	},
	['_Filter'] = {
		type = [[Client API]],
		brief = [[文本过滤器。用来屏蔽关键词，敏感词。]],
	},
	['_Application'] = {
		type = [[Client API]],
		brief = [[应用程序类，用来设置程序相关的消息回调。]],
	},
	['_Vector3'] = {
		type = [[Client API]],
		brief = [[用于表示三维向量或点。它还包含了一些向量的基本运算功能。]],
	},
	['_Collision'] = {
		type = [[Client API]],
		brief = [[碰撞检测模块，提供多种基本几何形状的碰撞检测。]],
	},
	['_SWFComponent'] = {
		type = [[Client API]],
		brief = [[_SWFComponent控件]],
	},
	['_AmbientLight'] = {
		type = [[Client API]],
		brief = [[环境光类，功能包括环境光的创建、设置等相关操作。]],
	},
	['_Water'] = {
		type = [[Client API]],
		brief = [[用来实现水的渲染效果]],
	},
	['Slider'] = {
		type = [[Component]],
		brief = [[Slider控件]],
	},
	['StatusIndicator'] = {
		type = [[Component]],
		brief = [[StatusIndicator控件]],
	},
	['NumericStepper'] = {
		type = [[Component]],
		brief = [[NumericStepper控件]],
	},
	['OptionStepper'] = {
		type = [[Component]],
		brief = [[OptionStepper控件]],
	},
	['TextArea'] = {
		type = [[Component]],
		brief = [[TextArea控件]],
	},
	['TextInput'] = {
		type = [[Component]],
		brief = [[TextInput控件]],
	},
	['ProgressBar'] = {
		type = [[Component]],
		brief = [[ProgressBar控件]],
	},
	['RadioButton'] = {
		type = [[Component]],
		brief = [[RadioButton控件]],
	},
	['Button'] = {
		type = [[Component]],
		brief = [[Button控件]],
	},
	['TileList'] = {
		type = [[Component]],
		brief = [[TileList控件]],
	},
	['ButtonBar'] = {
		type = [[Component]],
		brief = [[ButtonBar控件]],
	},
	['ButtonGroup'] = {
		type = [[Component]],
		brief = [[ButtonGroup控件]],
	},
	['UILoader'] = {
		type = [[Component]],
		brief = [[UILoader控件]],
	},
	['CheckBox'] = {
		type = [[Component]],
		brief = [[CheckBox控件]],
	},
	['DropdownMenu'] = {
		type = [[Component]],
		brief = [[DropdownMenu控件]],
	},
	['Label'] = {
		type = [[Component]],
		brief = [[Label控件]],
	},
	['ListItemRenderer'] = {
		type = [[Component]],
		brief = [[ListItemRenderer控件]],
	},
	['_GDI（客户端Loader）'] = {
		type = [[Loader]],
		brief = [[负责loader的渲染显示。]],
	},
	['ScrollBar'] = {
		type = [[Component]],
		brief = [[ScrollBar控件]],
	},
	['ScrollIndicator'] = {
		type = [[Component]],
		brief = [[ScrollIndicator控件]],
	},
	['ScrollingList'] = {
		type = [[Component]],
		brief = [[ScrollingList控件]],
	},
	['Client Global（client）'] = {
		type = [[Common API]],
		brief = [[客户端全局函数]],
	},
	['3ds Max plug-in'] = {
		type = [[Fancy Tool]],
		brief = [[3ds Max模型输出说明文档。]],
	},
	['_Debug'] = {
		type = [[Client API]],
		brief = [[调试相关功能]],
	},
	['_SoundRecord'] = {
		type = [[Client API]],
		brief = [[声音录制类]],
	},
	['_SpotLight'] = {
		type = [[Client API]],
		brief = [[这是一个聚光灯的类，可以使用这个类创建一个聚光灯，并添加到场景中去使用]],
	},
	['_RenderMethod'] = {
		type = [[Client API]],
		brief = [[引擎中自动使用的渲染方法]],
	},
	['_Video'] = {
		type = [[Client API]],
		brief = [[视频播放类(移动平台可用)]],
	},
	['_Notification'] = {
		type = [[Client API]],
		brief = [[移动平台推送消息]],
	},
	['_Cache'] = {
		type = [[Client API]],
		brief = [[创建缓存，加载资源的时候使用，减少IO使用次数]],
	},
	['_Area'] = {
		type = [[Client API]],
		brief = [[区域类，功能包括区域的创建、设置等]],
	},
	['_Database'] = {
		type = [[Client API]],
		brief = [[引擎客户端访问数据库]],
	},
	['_Barcode'] = {
		type = [[Client API]],
		brief = [[二维码相关功能]],
	},
	['_Curve'] = {
		type = [[Client API]],
		brief = [[曲线类，用于构造曲线、画线]],
	},
	['_InAppPurchase'] = {
		type = [[Client API]],
		brief = [[Google和Apple内购功能]],
	},
}
