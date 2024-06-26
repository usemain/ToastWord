cd `dirname $0`

# 判断是否安装了 Node
if ! type node >/dev/null 2>&1; then
	echo "未检测到NodeJs环境,尝试使用Homebrew安装..."
	# 检测homebrew是否存在
	if ! type brew >/dev/null 2>&1; then
		echo "当前电脑暂未安装Homebrew,请手动安装后重试"
		exit
	else
		brew install node
	fi
fi

cd ..
echo "开始安装依赖..."
yarn install --registry=https://registry.npm.taobao.org

# 更新IOS本地库
cd ios
pod install
if [ $? -ne 0 ]; then
	echo "pod install执行失败，请尝试cd进入ios手动安装依赖"
	exit
fi

cd ..

echo "启动程序..."

# 本地开启服务
yarn start

# 返回原始目录并退出
cd `dirname $0`
exit
