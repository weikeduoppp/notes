## Docker学习路径

- Docker概述
- 安装
- 命令
  - 镜像命令
  - 容器命令
  - 操作命令
  - ...
- Docker镜像
- 容器数据卷
- DockerFile
- Docker网络原理
- Docker Compose
- Docker Swarm (简化K8s)
- CI\CD jenkins

## 概述

### 为什么出现?

开发 上线问题  本地电脑可以. 线上环境不行?

传统: 打包.环境配置由运维来配置 (麻烦, 可能出错)

docker: 打包项目带上环境(镜像) --- docker仓库 --- 下载发布的镜像 --- 即可运行



Docker思想来自集装箱! 

隔离: 每个箱子都是互相隔离的

Docker镜像的设计，使得Docker得以打破过去「程序即应用」的观念。通过Docker镜像 ( images ) 将 应用程序所需要的系统环境，由下而上打包，达到应用程序跨平台间的无缝接轨运作。

### 历史

2010年，几个搞IT的年轻人，在美国旧金山成立了一家名叫“dotCloud”的公司。

 这家公司主要提供基于PaaS的云计算技术服务。具体来说，是和LXC有关的容器技术。

 后来，dotCloud公司将自己的容器技术进行了简化和标准化，并命名为——Docker。 

Docker技术诞生之后，并没有引起行业的关注。

而dotCloud公司，作为一家小型创业企业，在激烈的竞 争之下，也步履维艰。 正当他们快要坚持不下去的时候，脑子里蹦出了“开源”的想法。 

什么是“开源”？开源，就是开放源代码。也就是将原来内部保密的程序源代码开放给所有人，然后让大 家一起参与进来，贡献代码和意见。 有的软件是一开始就开源的。

也有的软件，是混不下去，创造者又不想放弃，所以选择开源。自己养不 活，就吃“百家饭”嘛。 

2013年3月，dotCloud公司的创始人之一，Docker之父，28岁的Solomon Hykes正式决定，将 Docker项目开源。 不开则已，一开惊人。 

越来越多的IT工程师发现了Docker的优点，然后蜂拥而至，加入Docker开源社区。

 Docker的人气迅速攀升，速度之快，令人瞠目结舌。 开源当月，Docker 0.1 版本发布。

此后的每一个月，Docker都会发布一个版本。

到2014年6月9日， Docker 1.0 版本正式发布。

 此时的Docker，已经成为行业里人气最火爆的开源技术，没有之一。甚至像Google、微软、Amazon、 VMware这样的巨头，都对它青睐有加，表示将全力支持。 

Docker和容器技术为什么会这么火爆？说白了，就是因为它“轻”。 在容器技术之前，业界的网红是虚拟机。虚拟机技术的代表，是VMWare和OpenStack。

相信很多人都用过虚拟机。虚拟机，就是在你的操作系统里面，装一个软件，然后通过这个软件，再模 拟一台甚至多台“子电脑”出来。

 在“子电脑”里，你可以和正常电脑一样运行程序，例如开QQ。如果你愿意，你可以变出好几个“子电 脑”，里面都开上QQ。

“子电脑”和“子电脑”之间，是相互隔离的，互不影响。

 虚拟机属于虚拟化技术。而Docker这样的容器技术，也是虚拟化技术，属于轻量级的虚拟化。

 虚拟机虽然可以隔离出很多“子电脑”，但占用空间更大，启动更慢，虚拟机软件可能还要花钱（例如 VMWare）。

 而容器技术恰好没有这些缺点。它不需要虚拟出整个操作系统，只需要虚拟一个小规模的环境（类似“沙 箱”）。它启动时间很快，几秒钟就能完成。而且，它对资源的利用率很高（一台主机可以同时运行几千个 Docker容器）。此外，它占的空间很小，虚拟机一般要几GB到几十GB的空间，而容器只需要MB级甚至 KB级。 正因为如此，容器技术受到了热烈的欢迎和追捧，发展迅速。

### Docker能干嘛

官网: https://www.docker.com/

文档: https://docs.docker.com/get-docker/

仓库: https://hub.docker.com/ 

> 之前的虚拟机技术

虚拟机（virtual machine）就是带环境安装的一种解决方案。

它可以在一种操作系统里面运行另一种操作系统，比如在Windows 系统里面运行Linux 系统。应用程序 对此毫无感知，因为虚拟机看上去跟真实系统一模一样，而对于底层系统来说，虚拟机就是一个普通文 件，不需要了就删掉，对其他部分毫无影响。这类虚拟机完美的运行了另一套系统，能够使应用程序， 操作系统和硬件三者之间的逻辑不变。

![image-20220526164952172](https://images.yewq.top/image-20220526164952172.png)

**虚拟机的缺点：** 

1、资源占用多 

2、冗余步骤多 

3 、启动慢

> 容器化技术

不是完整的操作系统.

 **由于前面虚拟机存在这些缺点，Linux 发展出了另一种虚拟化技术：Linux 容器（Linux Containers，缩 写为 LXC）**。

Linux 容器不是模拟一个完整的操作系统，而是对进程进行隔离。有了容器，就可以将软件运行所需的 所有资源打包到一个隔离的容器中。容器与虚拟机不同，不需要捆绑一整套操作系统，只需要软件工作 所需的库资源和设置。系统因此而变得高效轻量并保证部署在任何环境中的软件都能始终如一地运行。

![image-20220526170330535](https://images.yewq.top/image-20220526170330535.png)

比较了 Docker 和传统虚拟化方式的不同之处：

- 传统虚拟机技术是虚拟出一套硬件后，在其上运行一个完整操作系统，在该系统上再运行所需应用 进程；
- 而容器内的应用进程直接运行于宿主的内核，容器内没有自己的内核，而且也没有进行硬件虚拟。 因此容器要比传统虚拟机更为轻便。
- 每个容器之间互相隔离，每个容器有自己的文件系统 ，容器之间进程不会相互影响，能区分计算资 源。

> DevOps (开发, 运维)

**更快速的应用交付和部署：**

传统的应用开发完成后，需要提供一堆安装程序和配置说明文档，安装部署后需根据配置文档进行繁杂 的配置才能正常运行。Docker化之后只需要交付少量容器镜像文件，在正式生产环境加载镜像并运行即 可，应用安装配置在镜像里已经内置好，大大节省部署配置和测试验证时间。

**更便捷的升级和扩缩容：**

随着微服务架构和Docker的发展，大量的应用会通过微服务方式架构，应用的开发构建将变成搭乐高积 木一样，每个Docker容器将变成一块“积木”，应用的升级将变得非常容易。当现有的容器不足以支撑业 务处理时，可通过镜像运行新的容器进行快速扩容，使应用系统的扩容从原先的天级变成分钟级甚至秒 级。

**更简单的系统运维：**

应用容器化运行后，生产环境运行的应用可与开发、测试环境的应用高度一致，容器会将应用程序相关 的环境和状态完全封装起来，不会因为底层基础架构和操作系统的不一致性给应用带来影响，产生新的 BUG。当出现程序异常时，也可以通过测试环境的相同容器进行快速定位和修复。

**更高效的计算资源利用：**

Docker是内核级虚拟化，其不像传统的虚拟化技术一样需要额外的Hypervisor [管理程序] 支持，所以在 一台物理机上可以运行很多个容器实例，可大大提升物理服务器的CPU和内存的利用率。

## Docker安装

### Docker基本构成

![Docker 架构详解- 每天5分钟玩转容器技术（7） - 铁匠运维网](https://images.yewq.top/20181225023639114.jpg)

**镜像 (image)** :

Docker 镜像（Image）就是一个只读的模板。镜像可以用来创建 Docker 容器，一个镜像可以创建很 多容器。

**容器 (container)** : 

Docker 利用容器（Container）独立运行的一个或一组应用。容器是用镜像创建的运行实例。

它可以被启动、开始、停止、删除。基本命令

可以把容器看做是一个简易版的 Linux 环境

容器的定义和镜像几乎一模一样，也是一堆层的统一视角，唯一区别在于容器的最上面那一层是可读可写 的。

**仓库 (repository)** :

是集中存放镜像文件的场所。

分为公开仓库（Public）和私有仓库（Private）两种形式。

最大公开仓库 Docker Hub (默认国外)

国内的公开仓库包括阿里云 等.(配置镜像加速)

### Docker安装

个人服务器系统内核: ubuntu 14.04 

参考: 

https://juejin.cn/post/6844903993387253768

https://blog.csdn.net/u011722133/article/details/79865957

https://developer.aliyun.com/article/110806

安装指定版本

```shell
sudo apt-get install docker-ce=<VERSION_STRING>
```

启动: 

```shell
docker run hello-world
```



![image-20220526192939657](https://images.yewq.top/image-20220526192939657.png)

镜像查看: 

```shell
docker images
```

Uninstall Docker

```shell
 sudo apt-get purge docker-ce docker-ce-cli containerd.io docker-compose-plugin

# images
 sudo rm -rf /var/lib/docker
 sudo rm -rf /var/lib/containerd
```



### 阿里云镜像加速

登录阿里云. 控制台

![image-20220526201815251](https://images.yewq.top/uPic/image-20220526201815251.png)

```shell
sudo mkdir -p /etc/docker

sudo tee /etc/docker/daemon.json <<-'EOF'
{
  "registry-mirrors": ["https://lc74ajnt.mirror.aliyuncs.com"]
}
EOF
# ubuntu 14.04 没有systemctl  sudo service docker start
sudo systemctl daemon-reload

sudo systemctl restart docker
```

### run 的流程

![image-20220526202947410](https://images.yewq.top/uPic/image-20220526202947410.png)

### 底层原理

Docker 是一个 Client - Server 结构的系统. Docker的守护进程运行在主机上. 通过Socket从客户端访问, 守护进程从客户端接受命令并管理运行在主机上的容器。 容器，是一个运行时环境，就是我们 前面说到的集装箱。

Server接受到Client的指令, 就会执行这个命令

![image-20220526203553450](https://images.yewq.top/uPic/image-20220526203553450.png)

**Docker为什么比VM快?**

1. docker有着比虚拟机更少的抽象层, 由亍docker不需要Hypervisor实现硬件资源虚拟化,运行在 docker容器上的程序直接使用的都是实际物理机的硬件资源。因此在CPU、内存利用率上docker将会在 效率上有明显优势。

![image-20220526204313915](https://images.yewq.top/uPic/image-20220526204313915.png)

2. docker利用的是宿主机的内核,而不需要Guest OS。因此,当新建一个容器时,docker不需要和虚拟机 一样重新加载一个操作系统内核。仍而避免引寻、加载操作系统内核返个比较费时费资源的过程,当新建 一个虚拟机时,虚拟机软件需要加载Guest OS,返个新建过程是分钟级别的。而docker由于直接利用宿主 机的操作系统,则省略了返个过程,因此新建一个docker容器只需要几秒钟。

![image-20220526204332810](https://images.yewq.top/uPic/image-20220526204332810.png)

## Docker命令

帮助命令

```shell
docker 命令 --help # 帮助
docker info
docker version
```

文档: https://docs.docker.com/reference/

### 镜像命令

#### **docker images**

 查看主机所有镜像

```shell
root@iZm5e8kvgejp2ifut80lwyZ:~#  docker images
REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
hello-world         latest              feb5d9fea6a5        8 months ago        13.3kB

root@iZm5e8kvgejp2ifut80lwyZ:~# docker images -aq # 查询所有镜像id

# 解释
REPOSITORY 镜像的仓库源
TAG        镜像的标签
IMAGE ID   镜像的ID
CREATED    镜像创建时间
SIZE       镜像大小

# 同一个仓库源可以有多个 TAG，代表这个仓库源的不同版本，我们使用REPOSITORY：TAG 定义不同的镜像，如果你不定义镜像的标签版本，docker将默认使用 lastest 镜像！

# 可选项
-a：         列出本地所有镜像
-q：         只显示镜像id
--digests：  显示镜像的摘要信息
```

#### **docker search **

搜索镜像

```shell
docker search mysql

# 可选项
--filter=STARS=3000    列出收藏数不小于指定值的镜像。

docker search mysql --filter=stars=3000
```

![image-20220526205931657](https://images.yewq.top/uPic/image-20220526205931657.png)

仓库搜索: https://hub.docker.com/search?q=mysql

#### **docker pull **

镜像下载

```shell
 # docker pull 镜像名[:tag]
root@iZm5e8kvgejp2ifut80lwyZ:~# docker pull mysql
Using default tag: latest  							# 不写tag 默认最新
latest: Pulling from library/mysql    
72a69066d2fe: Pull complete             # 分层下载 联合文件系统
93619dbc5b36: Pull complete 
99da31dd6142: Pull complete 
626033c43d70: Pull complete 
37d5d7efb64e: Pull complete 
ac563158d721: Pull complete 
d2ba16033dad: Pull complete 
688ba7d5c01a: Pull complete 
00e060b6d11d: Pull complete 
1c04857f594f: Pull complete 
4d7cfa90e6ea: Pull complete 
e0431212d27d: Pull complete 
Digest: sha256:e9027fe4d91c0153429607251656806cc784e914937271037f7738bd5b8e7709 # 签名
Status: Downloaded newer image for mysql:latest
docker.io/library/mysql:lastest # 真实地址

# 等价
docker pull mysql
docker pull docker.io/library/mysql:lastest

root@iZm5e8kvgejp2ifut80lwyZ:~# docker pull mysql:5.7
5.7: Pulling from library/mysql
72a69066d2fe: Already exists   # 已存在
93619dbc5b36: Already exists 
99da31dd6142: Already exists 
626033c43d70: Already exists 
37d5d7efb64e: Already exists 
ac563158d721: Already exists 
d2ba16033dad: Already exists 
0ceb82207cd7: Pull complete 
37f2405cae96: Pull complete 
e2482e017e53: Pull complete 
70deed891d42: Pull complete 
Digest: sha256:f2ad209efe9c67104167fc609cca6973c8422939491c9345270175a300419f94
Status: Downloaded newer image for mysql:5.7
      
```

#### docker rmi

删除镜像

```shell
root@iZm5e8kvgejp2ifut80lwyZ:~# docker rmi -f 镜像id  # 删除指定镜像
root@iZm5e8kvgejp2ifut80lwyZ:~# docker rmi -f 镜像id 镜像id 镜像id # 删除指定多个镜像
root@iZm5e8kvgejp2ifut80lwyZ:~# docker rmi -f $(docker images -aq) # 删除全部镜像
```

### 容器命令

 有了镜像 可以创建容器了,  下载一个 centos 镜像来测试学习

```shell
docker pull centos
```

#### docker run 

新建容器并启动

```shell
docker run [可选项] image [COMMAND][ARG...]

# 常用参数说明
--name="Name" # 给容器指定一个名字
-d # 后台方式运行容器，并返回容器的id！
-i # 以交互模式运行容器，通过和 -t 一起使用
-t # 给容器重新分配一个终端，通常和 -i 一起使用
-p # 指定端口映射（小结），一般可以有四种写法
		ip:主机端口:容器端口
		主机端口:容器端口(常用)
		容器端口
		ip:容器端口	
-P # 随机端口映射（大写）
-e # 环境配置

# 测试 # 使用centos进行用交互模式启动容器，在容器内执行/bin/bash命令！
root@iZm5e8kvgejp2ifut80lwyZ:~# docker run -it centos /bin/bash 
[root@7576e6e9a346 /]# ls  # 容器内部
bin  dev  etc  home  lib  lib64  lost+found  media  mnt  opt  proc  root  run  sbin  srv  sys  tmp  usr  var
[root@7576e6e9a346 /]# 
# 退出并停止容器
[root@7576e6e9a346 /]# exit
exit
root@iZm5e8kvgejp2ifut80lwyZ:~# 

```

#### docker ps

列出所有运行的容器

```shell
docker ps [option]

# 常用参数说明
-a   # 列出当前所有正在运行的容器 + 历史运行过的容器
-l   # 显示最近创建的容器
-n=? # 显示最近n个创建的容器
-q   # 静默模式，只显示容器编号。

root@iZm5e8kvgejp2ifut80lwyZ:~# docker ps
CONTAINER ID        IMAGE               COMMAND             CREATED             STATUS              PORTS               NAMES
root@iZm5e8kvgejp2ifut80lwyZ:~# docker ps -a
CONTAINER ID        IMAGE               COMMAND             CREATED             STATUS                          PORTS               NAMES
7576e6e9a346        centos              "/bin/bash"         3 minutes ago       Exited (0) About a minute ago                       romantic_curie
1d2e204f5eea        feb5d9fea6a5        "/hello"   
root@iZm5e8kvgejp2ifut80lwyZ:~# docker ps -an=1  # 最近1条运行的容器
CONTAINER ID        IMAGE               COMMAND             CREATED             STATUS                     PORTS               NAMES
7576e6e9a346        centos              "/bin/bash"         6 minutes ago       Exited (0) 4 minutes ago                       romantic_curie
```

退出容器

```shell
exit # 退出并停止容器

ctrl + P + Q # 容器不停止退出
```

#### docker rm

删除容器

```shell
# docker rm 容器id
root@iZm5e8kvgejp2ifut80lwyZ:~# docker rm 0aa3f0332b02  # 删除容器, 不能删除正在运行的容器, 强制 -f
0aa3f0332b02
root@iZm5e8kvgejp2ifut80lwyZ:~# docker rm -f $(docker ps -aq)    # 删除所有容器
root@iZm5e8kvgejp2ifut80lwyZ:~# docker ps -aq|xargs docker rm -f # 删除所有容器
```

#### 启动或停止容器

```shell
docker start 容器id       # 启动容器
docker stop 容器id				# 停止容器
docker restart 容器id			# 重启
docker kill 容器id 				# 强制关闭
```

### 常用其他命令

#### 后台启动容器

```shell
# 命令 docker run -d 镜像
docker run -d centos # 以后台的方式

root@iZm5e8kvgejp2ifut80lwyZ:~# docker run -d centos /bin/bash
91675b3500ab9826f8d9776267cf3b2f356c11390485cf94e008ae5ce286b8cc
root@iZm5e8kvgejp2ifut80lwyZ:~# docker ps
CONTAINER ID        IMAGE               COMMAND             CREATED             STATUS              PORTS               NAMES

# 问题： 使用docker ps 查看，发现容器已经退出了！
# 解释：Docker容器后台运行，就必须有一个前台进程，容器运行的命令如果不是那些一直挂起的命令，就会自动退出。
# 比如，你运行了nginx服务，但是docker前台没有运行应用，这种情况下，容器启动后，会立即自杀，因为他觉得没有程序了，所以最好的情况是，将你的应用使用前台进程的方式运行启动。
```

#### 查看日志

```shell
# docker logs
docker logs [OPTIONS] CONTAINER

# 选项
-f              # 打印最新的日志
 --tail 数字  # 最近日志的多少条
-t  						# 时间戳

# 例子：我们启动 centos，并编写一段脚本来测试玩玩！最后查看日志
docker run -d centos /bin/sh -c "while true;do echo yewq;sleep 2;done"

root@iZm5e8kvgejp2ifut80lwyZ:~# docker run -d centos /bin/sh -c "while true;do echo yewq;sleep 2;done"
8e244fbd1471a3d7b77cf87c691fe4304538010bbc88914df703d6bcd6969791
root@iZm5e8kvgejp2ifut80lwyZ:~# docker ps
CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS               NAMES
8e244fbd1471        centos              "/bin/sh -c 'while t…"   6 seconds ago       Up 5 seconds                            cranky_dubinsky

root@iZm5e8kvgejp2ifut80lwyZ:~# docker logs -tf 8e244fbd1471 # 查看容器日志
root@iZm5e8kvgejp2ifut80lwyZ:~# docker logs -tf --tail 10 8e244fbd1471  # 查看容器近10条日志 
```

#### 查看容器中运行的进程信息

```shell
# docker top 容器id
root@iZm5e8kvgejp2ifut80lwyZ:~# docker top  8e244fbd1471
UID                 PID                 PPID                C                   STIME               TTY                 
root                6257                6235                0                   16:36               ?                   
root                7739                6257                0                   16:40               ?                  
```

#### 查看容器/镜像的元数据

```shell
# docker inspect 容器id
root@iZm5e8kvgejp2ifut80lwyZ:~# docker inspect 8e244fbd1471
[
    {
        "Id": "8e244fbd1471a3d7b77cf87c691fe4304538010bbc88914df703d6bcd6969791",
        "Created": "2022-05-27T08:36:04.531354457Z",
        "Path": "/bin/sh",
        "Args": [
            "-c",
            "while true;do echo yewq;sleep 2;done"
        ],
        "State": {
            "Status": "running",
            "Running": true,
            "Paused": false,
            "Restarting": false,
            "OOMKilled": false,
            "Dead": false,
            "Pid": 6257,
            "ExitCode": 0,
            "Error": "",
            "StartedAt": "2022-05-27T08:36:04.872140204Z",
            "FinishedAt": "0001-01-01T00:00:00Z"
        },
        "Image": "sha256:5d0da3dc976460b72c77d94c8a1ad043720b0416bfc16c52c45d4847e53fadb6",
        "ResolvConfPath": "/var/lib/docker/containers/8e244fbd1471a3d7b77cf87c691fe4304538010bbc88914df703d6bcd6969791/resolv.conf",
        "HostnamePath": "/var/lib/docker/containers/8e244fbd1471a3d7b77cf87c691fe4304538010bbc88914df703d6bcd6969791/hostname",
        "HostsPath": "/var/lib/docker/containers/8e244fbd1471a3d7b77cf87c691fe4304538010bbc88914df703d6bcd6969791/hosts",
        "LogPath": "/var/lib/docker/containers/8e244fbd1471a3d7b77cf87c691fe4304538010bbc88914df703d6bcd6969791/8e244fbd1471a3d7b77cf87c691fe4304538010bbc88914df703d6bcd6969791-json.log",
        "Name": "/cranky_dubinsky",
        "RestartCount": 0,
        "Driver": "overlay2",
        "Platform": "linux",
        "MountLabel": "",
        "ProcessLabel": "",
        "AppArmorProfile": "docker-default",
        "ExecIDs": null,
        "HostConfig": {
            "Binds": null,
            "ContainerIDFile": "",
            "LogConfig": {
                "Type": "json-file",
                "Config": {}
            },
            "NetworkMode": "default",
            "PortBindings": {},
            "RestartPolicy": {
                "Name": "no",
                "MaximumRetryCount": 0
            },
            "AutoRemove": false,
            "VolumeDriver": "",
            "VolumesFrom": null,
            "CapAdd": null,
            "CapDrop": null,
            "Dns": [],
            "DnsOptions": [],
            "DnsSearch": [],
            "ExtraHosts": null,
            "GroupAdd": null,
            "IpcMode": "shareable",
            "Cgroup": "",
            "Links": null,
            "OomScoreAdj": 0,
            "PidMode": "",
            "Privileged": false,
            "PublishAllPorts": false,
            "ReadonlyRootfs": false,
            "SecurityOpt": null,
            "UTSMode": "",
            "UsernsMode": "",
            "ShmSize": 67108864,
            "Runtime": "runc",
            "ConsoleSize": [
                0,
                0
            ],
            "Isolation": "",
            "CpuShares": 0,
            "Memory": 0,
            "NanoCpus": 0,
            "CgroupParent": "",
            "BlkioWeight": 0,
            "BlkioWeightDevice": [],
            "BlkioDeviceReadBps": null,
            "BlkioDeviceWriteBps": null,
            "BlkioDeviceReadIOps": null,
            "BlkioDeviceWriteIOps": null,
            "CpuPeriod": 0,
            "CpuQuota": 0,
            "CpuRealtimePeriod": 0,
            "CpuRealtimeRuntime": 0,
            "CpusetCpus": "",
            "CpusetMems": "",
            "Devices": [],
            "DeviceCgroupRules": null,
            "DiskQuota": 0,
            "KernelMemory": 0,
            "MemoryReservation": 0,
            "MemorySwap": 0,
            "MemorySwappiness": null,
            "OomKillDisable": false,
            "PidsLimit": 0,
            "Ulimits": null,
            "CpuCount": 0,
            "CpuPercent": 0,
            "IOMaximumIOps": 0,
            "IOMaximumBandwidth": 0
        },
        "GraphDriver": {
            "Data": {
                "LowerDir": "/var/lib/docker/overlay2/d6267d6962bd0f231b3d174380af9ff358032f601849eb44c98c7f73e3548616-init/diff:/var/lib/docker/overlay2/972b6f724c9f091b3cd900ba1b04cadb4eaae0afcd9200a3aa25d5848a873fac/diff",
                "MergedDir": "/var/lib/docker/overlay2/d6267d6962bd0f231b3d174380af9ff358032f601849eb44c98c7f73e3548616/merged",
                "UpperDir": "/var/lib/docker/overlay2/d6267d6962bd0f231b3d174380af9ff358032f601849eb44c98c7f73e3548616/diff",
                "WorkDir": "/var/lib/docker/overlay2/d6267d6962bd0f231b3d174380af9ff358032f601849eb44c98c7f73e3548616/work"
            },
            "Name": "overlay2"
        },
        "Mounts": [],
        "Config": {
            "Hostname": "8e244fbd1471",
            "Domainname": "",
            "User": "",
            "AttachStdin": false,
            "AttachStdout": false,
            "AttachStderr": false,
            "Tty": false,
            "OpenStdin": false,
            "StdinOnce": false,
            "Env": [
                "PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin"
            ],
            "Cmd": [
                "/bin/sh",
                "-c",
                "while true;do echo yewq;sleep 2;done"
            ],
            "Image": "centos",
            "Volumes": null,
            "WorkingDir": "",
            "Entrypoint": null,
            "OnBuild": null,
            "Labels": {
                "org.label-schema.build-date": "20210915",
                "org.label-schema.license": "GPLv2",
                "org.label-schema.name": "CentOS Base Image",
                "org.label-schema.schema-version": "1.0",
                "org.label-schema.vendor": "CentOS"
            }
        },
        "NetworkSettings": {
            "Bridge": "",
            "SandboxID": "17b1fcf0f4d7b8e65dc8f1854e382399368799a15ef8d734b9f854dfbf85698c",
            "HairpinMode": false,
            "LinkLocalIPv6Address": "",
            "LinkLocalIPv6PrefixLen": 0,
            "Ports": {},
            "SandboxKey": "/var/run/docker/netns/17b1fcf0f4d7",
            "SecondaryIPAddresses": null,
            "SecondaryIPv6Addresses": null,
            "EndpointID": "8c7ea8aba87401e3c317eacaa5b688b682a10481754ae229598e8e02b1bd9120",
            "Gateway": "172.17.0.1",
            "GlobalIPv6Address": "",
            "GlobalIPv6PrefixLen": 0,
            "IPAddress": "172.17.0.2",
            "IPPrefixLen": 16,
            "IPv6Gateway": "",
            "MacAddress": "02:42:ac:11:00:02",
            "Networks": {
                "bridge": {
                    "IPAMConfig": null,
                    "Links": null,
                    "Aliases": null,
                    "NetworkID": "7f26d5a9d1f3e285e762e2b8497b1f512f4b03950cbf96d7241d564167a0cbd2",
                    "EndpointID": "8c7ea8aba87401e3c317eacaa5b688b682a10481754ae229598e8e02b1bd9120",
                    "Gateway": "172.17.0.1",
                    "IPAddress": "172.17.0.2",
                    "IPPrefixLen": 16,
                    "IPv6Gateway": "",
                    "GlobalIPv6Address": "",
                    "GlobalIPv6PrefixLen": 0,
                    "MacAddress": "02:42:ac:11:00:02",
                    "DriverOpts": null
                }
            }
        }
    }
]
# 查看镜像
root@iZm5e8kvgejp2ifut80lwyZ:~# docker inspect 镜像名
```

#### 进入正在运行的容器 !!!

```shell
# 1. docker exec -it 容器id bashShell

root@iZm5e8kvgejp2ifut80lwyZ:~# docker ps
CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS               NAMES
8e244fbd1471        centos              "/bin/sh -c 'while t…"   About an hour ago   Up About an hour                        cranky_dubinsky
root@iZm5e8kvgejp2ifut80lwyZ:~# docker exec -it 8e244fbd1471 /bin/bash # 进入容器并开启新终端
[root@8e244fbd1471 /]# ls
bin  etc   lib	  lost+found  mnt  proc  run   srv  tmp  var
dev  home  lib64  media       opt  root  sbin  sys  usr

# 2. docker attach 容器id

# 区别
# exec 是在容器中打开新的终端，并且可以启动新的进程
# attach 直接进入容器启动命令的终端，不会启动新的进程
```

#### 从容器内拷贝文件到主机上

```shell
# docker cp 容器id:文件路径 主机路径

# 容器创建文件
root@iZm5e8kvgejp2ifut80lwyZ:~# docker exec -it 8e244fbd1471 /bin/bash
[root@8e244fbd1471 /]# ls
bin  etc   lib	  lost+found  mnt  proc  run   srv  tmp  var
dev  home  lib64  media       opt  root  sbin  sys  usr
[root@8e244fbd1471 /]# cd home/
[root@8e244fbd1471 home]# ls
[root@8e244fbd1471 home]# touch yewq.js 
[root@8e244fbd1471 home]# ls
yewq.js
[root@8e244fbd1471 home]# read escape sequence
root@iZm5e8kvgejp2ifut80lwyZ:~# ls
root@iZm5e8kvgejp2ifut80lwyZ:~# ls
root@iZm5e8kvgejp2ifut80lwyZ:~# ls
root@iZm5e8kvgejp2ifut80lwyZ:~# docker ps
CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS               NAMES
8e244fbd1471        centos              "/bin/sh -c 'while t…"   2 hours ago         Up 2 hours                              cranky_dubinsky
root@iZm5e8kvgejp2ifut80lwyZ:~# docker cp 8e244fbd1471:/home/yewq.js /home  # 主机拷贝容器内容
root@iZm5e8kvgejp2ifut80lwyZ:~# ls
root@iZm5e8kvgejp2ifut80lwyZ:~# cd /home
root@iZm5e8kvgejp2ifut80lwyZ:/home# ls
manager  temp  yewq.js
```

#### 小结

![image-20220527182515255](https://images.yewq.top/uPic/image-20220527182515255.png)

```shell
attach 			Attach to a running container 							# 当前 shell 下attach 连接指定运行镜像
build 			Build an image from a Dockerfile 						# 通过 Dockerfile 定制镜像
commit 			Create a new image from a container changes # 提交当前容器为新的镜像
cp					Copy files/folders from the containers filesystem to the host path # 从容器中拷贝指定文件或者目录到宿主机中
create 			Create a new container											 # 创建一个新的容器，同run，但不启动容器
diff 				Inspect changes on a container's filesystem  # 查看 docker 容器变化
events			Get real time events from the server 				 # 从 docker 服务获取容器实时事件
exec 				Run a command in an existing container 			 # 在已存在的容器上运行命令
export 			Stream the contents of a container as a tar archive # 导出容器的内容流作为一个 tar 归档文件[对应 import ]
history 		Show the history of an image 								 # 展示一个镜像形成历史
images 			List images 																 # 列出系统当前镜像
import      Create a new filesystem image from the contents of a tarball            # 从tar包中的内容创建一个新的文件系统映像[对应export]
info        Display system-wide information                                         # 显示系统相关信息
inspect     Return low-level information on a container                             # 查看容器详细信息
kill        Kill a running container                                                # kill 指定 docker 容器
load        Load an image from a tar archive                                        # 从一个 tar 包中加载一个镜像[对应 save]
login       Register or Login to the docker registry server                         # 注册或者登陆一个 docker 源服务器
logout      Log out from a Docker registry server                                   # 从当前 Dockerregistry 退出
logs        Fetch the logs of a container                                           # 输出当前容器日志信息
port        Lookup the public-facing port which is NAT-ed to PRIVATE_PORT           # 查看映射端口对应的容器内部源端口
pause       Pause all processes within a container                                  # 暂停容器
ps          List containers                                                         # 列出容器列表
pull        Pull an image or a repository from the docker registry server           # 从docker镜像源服务器拉取指定镜像或者库镜像
push        Push an image or a repository to the docker registry server             # 推送指定镜像或者库镜像至docker源服务器
restart     Restart a running container                                             # 重启运行的容器
rm          Remove one or more containers                                           # 移除一个或者多个容器
rmi         Remove one or more images                                               # 移除一个或多个镜像[无容器使用该镜像才可删除，否则需删除相关容器才可继续或 -f 强制删除]
run         Run a command in a new container                                        # 创建一个新的容器并运行一个命令
save        Save an image to a tar archive                                          # 保存一个镜像为一个tar 包[对应 load]
search      Search for an image on the Docker Hub                                   # 在 docker hub 中搜索镜像
start       Start a stopped containers                                              # 启动容器
stop        Stop a running containers                                               # 停止容器
tag         Tag an image into a repository                                          # 给源中镜像打标签
top         Lookup the running processes of a container                             # 查看容器中运行的进程信息
unpause     Unpause a paused container                                              # 取消暂停容器
version     Show the docker version information                                     # 查看 docker 版本号
wait        Block until a container stops, then print its exit code                 # 截取容器停止时的退出状态值
```

#### 练习

##### nginx 端口暴露的概念

```shell
# 拉取nginx
docker pull nginx

# 启动镜像 
root@iZm5e8kvgejp2ifut80lwyZ:~# docker run -d --name nginx1 -p 3500:80 nginx 
53632c1d786a6631f8c9b66b740aae86c747a209f274d45d10fb109705436dc7

# 本地防火墙记得开
root@iZm5e8kvgejp2ifut80lwyZ:~# curl localhost:3500
<!DOCTYPE html>
<html>
<head>
<title>Welcome to nginx!</title>

# docker0 网桥问题 https://blog.csdn.net/weixin_30919235/article/details/101665464

root@iZm5e8kvgejp2ifut80lwyZ:~# docker exec -it 18380fc6a045 /bin/bash
root@18380fc6a045:/# ls
bin   docker-entrypoint.d   home   media  proc	sbin  tmp
boot  docker-entrypoint.sh  lib    mnt	  root	srv   usr
dev   etc		    lib64  opt	  run	sys   var
root@18380fc6a045:/# whereis nginx
nginx: /usr/sbin/nginx /usr/lib/nginx /etc/nginx /usr/share/nginx
root@18380fc6a045:/# 
```

端口暴露的概念

![image-20220527213948945](https://images.yewq.top/uPic/image-20220527213948945.png)

##### tomcat 最小运行环境

```shell
# 官网 docker run -it --rm 测试常用 用完则删除
docker run -it --rm tomcat:9.0

# 下载镜像
docker pull tomcat

# 运行
root@iZm5e8kvgejp2ifut80lwyZ:~# docker run -d -p 3355:8080 --name tomcat1 tomcat

# 进入容器
root@iZm5e8kvgejp2ifut80lwyZ:~# docker exec -it tomcat1 /bin/bash
root@f0527fcc2025:/usr/local/tomcat# ls
BUILDING.txt  CONTRIBUTING.md  LICENSE	NOTICE	README.md  RELEASE-NOTES  RUNNING.txt  bin  conf  lib  logs  native-jni-lib  temp  webapps  webapps.dist  work


# 发现问题 
# 1. linux 指令少了. 2. webaspps空的  原因: 阿里云镜像默认最小的镜像, 不必要的呗剔除了 保证最小的运行环境


root@f0527fcc2025:/usr/local/tomcat# cd webapps
root@f0527fcc2025:/usr/local/tomcat/webapps# ls
root@f0527fcc2025:/usr/local/tomcat/webapps# 
root@f0527fcc2025:/usr/local/tomcat# cp -r webapps.dist/* webapps
root@f0527fcc2025:/usr/local/tomcat# cd webapps
root@f0527fcc2025:/usr/local/tomcat/webapps# ls
ROOT  docs  examples  host-manager  manager
root@f0527fcc2025:/usr/local/tomcat/webapps# ^C
root@f0527fcc2025:/usr/local/tomcat/webapps# exit
exit
root@iZm5e8kvgejp2ifut80lwyZ:~# docker ps
CONTAINER ID        IMAGE               COMMAND             CREATED             STATUS              PORTS                    NAMES
f0527fcc2025        tomcat              "catalina.sh run"   12 minutes ago      Up 12 minutes       0.0.0.0:3355->8080/tcp   tomcat1
root@iZm5e8kvgejp2ifut80lwyZ:~# curl localhost:3355



<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
....

```

思考问题: 我们以后要部署项目，还需要进入容器中，是不是十分麻烦，要是有一种技术，可以将容器 内和我们Linux进行映射挂载就好了？我们后面会将数据卷技术来进行挂载操作，也是一个核心内容，这 里大家先听听名词就好，我们很快就会讲到！

##### es + kibana  吃内存 + 增加内存限制

```shell
# docker stats 容器ID 查看容器 cpu内存 网络状态
docker stats 
CONTAINER ID        NAME                CPU %               MEM USAGE / LIMIT     MEM %               NET I/O             BLOCK I/O           PIDS
f0527fcc2025        tomcat1             0.12%               111.2MiB / 1.953GiB   5.56%               1.14kB / 12.8kB     12.2MB / 0B         20
^C

# 1. 启动es
docker run -d --name elasticsearch -p 9200:9200 -p 9300:9300 -e
"discovery.type=single-node" elasticsearch:7.6.2

# 2、启动之后很卡，使用 docker stats 容器id 查看下cpu状态 ，发现占用的很大
CONTAINER ID NAME CPU % MEM USAGE /
LIMIT MEM %
249ae46da625 elasticsearch 0.00% 1.036GiB /
1.716GiB 60.37%

# 3. 测试访问
root@iZm5e8kvgejp2ifut80lwyZ:~# curl localhost:9200
{
  "name" : "078167a214e5",
  "cluster_name" : "docker-cluster",
  "cluster_uuid" : "xQjo_VXjS0aSHemD62QZfg",
  "version" : {
    "number" : "7.6.2",
    "build_flavor" : "default",
    "build_type" : "docker",
    "build_hash" : "ef48eb35cf30adf4db14086e8aabd07ef6fb113f",
    "build_date" : "2020-03-26T06:34:37.794943Z",
    "build_snapshot" : false,
    "lucene_version" : "8.4.0",
    "minimum_wire_compatibility_version" : "6.8.0",
    "minimum_index_compatibility_version" : "6.0.0-beta1"
  },
  "tagline" : "You Know, for Search"
}

# 4. 增加内存限制
docker run -d --name elasticsearch -p 9200:9200 -p 9300:9300 -e "discovery.type=single-node" -e ES_JAVA_OPTS="-Xms64m -Xmx512m" elasticsearch:7.6.2


```

![image-20220529134958493](https://images.yewq.top/uPic/image-20220529134958493.png)

##### kibana

思考: 两容器怎么互相访问?

![image-20220529130855444](https://images.yewq.top/uPic/image-20220529130855444.png)

#### 可视化

##### portainer

```shell
docker run -d -p 8088:9000 --restart=always -v /var/run/docker.sock:/var/run/docker.sock --privileged=true portainer/portainer
```

1. 外网访问 ip:8088
2. 创建管理员
3. 选择本地

![image-20220529141604417](https://images.yewq.top/uPic/image-20220529141604417.png)



##### Rancher

 Rancher（CI/CD再用这个）

```shell
# 安装rancher-server
docker run --name rancher-server -p 8000:8080 -v /etc/localtime:/etc/localtime:ro  -d  rancher/server
# 安装agent
docker run --rm --privileged -v /var/run/docker.sock:/var/run/docker.sock -v /var/lib/rancher:/var/lib/rancher rancher/agent:v1.2.11 http://47.104.88.94:8000/v1/scripts/D3DBD43F263109BB881F:1577750400000:7M0yBzCw4XSxJklD7TpysYIpI
```

## Docker 镜像讲解

### 镜像是什么 

镜像是一种轻量级、可执行的独立软件包，用来打包软件运行环境和基于运行环境开发的软件，它包含 运行某个软件所需的所有内容，包括代码、运行时、库、环境变量和配置文件。

### Docker镜像加载原理

> UnionFS 联合文件系统

UnionFS（联合文件系统）：Union文件系统（UnionFS）是一种分层、轻量级并且高性能的文件系统， 它支持对文件系统的修改作为一次提交来一层层的叠加，同时可以将不同目录挂载到同一个虚拟文件系 统下(unite several directories into a single virtual filesystem)。Union 文件系统是 Docker 镜像的基 础。镜像可以通过分层来进行继承，基于基础镜像（没有父镜像），可以制作各种具体的应用镜像。 

特性：一次同时加载多个文件系统，但从外面看起来，只能看到一个文件系统，联合加载会把各层文件 系统叠加起来，这样最终的文件系统会包含所有底层的文件和目录

> Docker镜像加载原理

docker的镜像实际上由一层一层的文件系统组成，这种层级的文件系统UnionFS。

**bootfs(boot file system)**主要包含bootloader和kernel, bootloader主要是引导加载kernel, Linux刚启 动时会加载bootfs文件系统，在Docker镜像的最底层是bootfs。这一层与我们典型的Linux/Unix系统是 一样的，包含boot加载器和内核。当boot加载完成之后整个内核就都在内存中了，此时内存的使用权已 由bootfs转交给内核，此时系统也会卸载bootfs。 

**rootfs (root file system)** ，在bootfs之上。包含的就是典型 Linux 系统中的 /dev, /proc, /bin, /etc 等标 准目录和文件。rootfs就是各种不同的操作系统发行版，比如Ubuntu，Centos等等。

![image-20220529150956566](https://images.yewq.top/uPic/image-20220529150956566.png)

平时我们安装进虚拟机的CentOS都是好几个G，为什么Docker这里才200M？

![image-20220529151025271](https://images.yewq.top/uPic/image-20220529151025271.png)

对于一个精简的OS，rootfs 可以很小，只需要包含最基本的命令，工具和程序库就可以了，因为**底层直 接用Host的kernel**，自己**只需要提供rootfs**就可以了。由此可见对于不同的linux发行版, bootfs基本是一 致的, rootfs会有差别, 因此不同的发行版可以公用bootfs。

### 分层理解

> 分层的镜像

我们可以去下载一个镜像，注意观察下载的日志输出，可以看到是一层一层的在下载！

![image-20220529154341095](/Users/mac/Library/Application Support/typora-user-images/image-20220529154341095.png)

思考：为什么Docker镜像要采用这种分层的结构呢？ 

最大的好处，我觉得莫过于是资源共享了！比如有多个镜像都从相同的Base镜像构建而来，那么宿主机 只需在磁盘上保留一份base镜像，同时内存中也只需要加载一份base镜像，这样就可以为所有的容器服务了，而且镜像的每一层都可以被共享。

 查看镜像分层的方式可以通过 docker  inspect 命令！

```shell
root@iZm5e8kvgejp2ifut80lwyZ:~# docker inspect mysql
...
"RootFS": {
            "Type": "layers",
            "Layers": [
                "sha256:ad6b69b549193f81b039a1d478bc896f6e460c77c1849a4374ab95f9a3d2cea2",
                "sha256:fba7b131c5c350d828ebea6ce6d52cdc751219c6287c4a7f13a51435b35eac06",
                "sha256:0798f2528e8383f031ebd3c6d351f7d9f7731b3fd12007e5f2fdcdc4e1efc31a",
                "sha256:a0c2a050fee24f87fde784c197a8b3eb66a3881b96ea261165ac1a01807ffb80",
                "sha256:d7a777f6c3a4ded4667f61398eb1f9b380db07bf48876f64d93bf30fb1393f96",
                "sha256:0d17fee8db40d61d9ca0d85bff8b32ef04bbd09d77e02cc67c454c8f84edb3d8",
                "sha256:aad27784b7621a3e58bd03e5d798e505fb80b081a5070d7c822e41606b90a5c0",
                "sha256:1d1f48e448f9b8abb9a2aad1e76d4746b69957882d1ddb9c11115302d45fcbbd",
                "sha256:c654c2afcbba8c359565df63f6ecee333c9cc6abaeaa39838b05b4465a82758b",
                "sha256:118fee5d988ac2057ab66d87bbebd1f18b865fb02a03ba0e23762af5b55b0bd5",
                "sha256:fc8a043a3c7556d9abb4fad3aefa3ab6a5e1c02abda5f924f036c696687d094e",
                "sha256:d67a9f3f65691979bc9e2b5ee0afcd4549c994f13e1a384ecf3e11f83d82d3f2"
            ]
        },
```



理解： 

所有的 Docker 镜像都起始于一个基础镜像层，当进行修改或增加新的内容时，就会在当前镜像层之 上，创建新的镜像层。

 举一个简单的例子，

假如基于 Ubuntu Linux 16.04 创建一个新的镜像，这就是新镜像的第一层；如果 在该镜像中添加 Python包，就会在基础镜像层之上创建第二个镜像层；如果继续添加一个安全补丁，就 会创建第三个镜像层。 

该镜像当前已经包含 3 个镜像层，如下图所示（这只是一个用于演示的很简单的例子）。

![image-20220529154723095](https://images.yewq.top/uPic/image-20220529154723095.png)

在添加额外的镜像层的同时，镜像始终保持是当前所有镜像的组合，理解这一点非常重要。

下图中举了 一个简单的例子，每个镜像层包含 3 个文件，而镜像包含了来自两个镜像层的 6 个文件。eg: app版本v1

![image-20220529154854425](https://images.yewq.top/uPic/image-20220529154854425.png)

下图中展示了一个稍微复杂的三层镜像，在外部看来整个镜像只有 6 个文件，这是因为最上层中的文件 7 是文件 5 的一个更新版本。 eg: app_v2

![image-20220529155019216](https://images.yewq.top/uPic/image-20220529155019216.png)

这种情况下，上层镜像层中的文件覆盖了底层镜像层中的文件。这样就使得文件的更新版本作为一个新 镜像层添加到镜像当中。

**Docker 通过存储引擎（新版本采用快照机制）的方式来实现镜像层堆栈，并保证多镜像层对外展示为统 一的文件系统。** 

Linux 上可用的存储引擎有 AUFS、Overlay2、Device Mapper、Btrfs 以及 ZFS。顾名思义，每种存储 引擎都基于 Linux 中对应的文件系统或者块设备技术，并且每种存储引擎都有其独有的性能特点。

 Docker 在 Windows 上仅支持 windowsfilter 一种存储引擎，该引擎基于 NTFS 文件系统之上实现了分 层和 CoW[1]。

 下图展示了与系统显示相同的三层镜像。**所有镜像层堆叠并合并，对外提供统一的视图**。

![image-20220529155219144](https://images.yewq.top/uPic/image-20220529155219144.png)

> 特点

Docker镜像都是只读的，当容器启动时，一个新的可写层被加载到镜像的顶部！

 这一层就是我们通常说的容器层，容器之下的都叫镜像层！

![image-20220529154141008](https://images.yewq.top/uPic/image-20220529154141008.png)

### 镜像Commit

docker commit 从容器创建一个新的镜像。

``` shell
# 语法
docker commit -m="提交的描述信息" -a="作者" 容器id 要创建的目标镜像名:[标签名]

# 1.生成我们的镜像
# 注意：commit的时候，容器的名字不能有大写，否则报错：invalid reference format
# docker commit -a 作者 -m 信息 容器id 镜像名:TAG
root@iZm5e8kvgejp2ifut80lwyZ:~# docker commit -a="yewq" -m="create app" f0527fcc2025 tomcat_yewq:1.0
sha256:4c3f26293807272881721e76bb381028e5ec7944bc5150da4c03846347bbbe7b
root@iZm5e8kvgejp2ifut80lwyZ:~# docker images # 查看到我们的镜像
REPOSITORY            TAG                 IMAGE ID            CREATED             SIZE
tomcat_yewq           1.0                 4c3f26293807        9 seconds ago       684MB
nginx                 latest              605c77e624dd        5 months ago        141MB
tomcat                9.0                 b8e65a4d736d        5 months ago        680MB
tomcat                latest              fb5657adc892        5 months ago        680MB
node                  latest              a283f62cb84b        5 months ago        993MB
mysql                 latest              3218b38490ce        5 months ago        516MB
centos                latest              5d0da3dc9764        8 months ago        231MB
portainer/portainer   latest              580c0e4e98b0        14 months ago       79.1MB
rancher/server        latest              98d8bb571885        2 years ago         1.08GB
elasticsearch         7.6.2               f29a1ee41030        2 years ago         791MB
rancher/agent         v1.2.11             1cc7591af4f5        3 years ago         243MB
# 2. 使用我们的镜像
root@iZm5e8kvgejp2ifut80lwyZ:~# docker run -d -p 3355:8080 tomcat_yewq:1.0
9d8fddce0e848b53e88db970211fce64d1fb5b25667438b5d1db1c65edd027bc
root@iZm5e8kvgejp2ifut80lwyZ:~# docker ps
CONTAINER ID        IMAGE                 COMMAND                  CREATED             STATUS              PORTS                              NAMES
9d8fddce0e84        tomcat_yewq:1.0       "catalina.sh run"        4 seconds ago       Up 4 seconds        0.0.0.0:3355->8080/tcp             confident_volhard
701fe7845de4        rancher/server        "/usr/bin/entry /usr…"   2 hours ago         Up 2 hours          3306/tcp, 0.0.0.0:8000->8080/tcp   rancher-server
bd390c60926c        portainer/portainer   "/portainer"             2 hours ago         Up 2 hours          0.0.0.0:8088->9000/tcp             focused_ardinghelli
root@iZm5e8kvgejp2ifut80lwyZ:~# docker exec -it 9d8fddce0e84 /bin/bash
root@9d8fddce0e84:/usr/local/tomcat# ls
BUILDING.txt	 NOTICE		RUNNING.txt  lib	     temp	   work
CONTRIBUTING.md  README.md	bin	     logs	     webapps
LICENSE		 RELEASE-NOTES	conf	     native-jni-lib  webapps.dist
root@9d8fddce0e84:/usr/local/tomcat# cd webapps  # 看到我们的容器层
root@9d8fddce0e84:/usr/local/tomcat/webapps# ls
ROOT  docs  examples  host-manager  manager
```

## 容器数据卷

### 什么是容器数据卷

**docker的理念回顾：**

将应用和运行的环境打包镜像形成容器运行，运行可以伴随着容器，但是我们对于数据的要求，是希望能够 持久化的！

 就好比，你安装一个MySQL，结果你把容器删了，就相当于删库跑路了，这TM也太扯了吧！

 所以我们希望容器之间有可能可以共享数据，Docker容器产生的数据，如果不通过docker commit 生成 新的镜像，使得数据作为镜像的一部分保存下来，那么当容器删除后，数据自然也就没有了！这样是行 不通的！ 

为了能保存数据在Docker中我们就可以使用卷！让数据挂载到我们本地！这样数据就不会因为容器删除 而丢失了！

**作用：** 

卷就是目录或者文件，存在一个或者多个容器中，由docker挂载到容器，但不属于联合文件系统，因此 能够绕过 Union File System ， 提供一些用于持续存储或共享数据的特性：

 **卷的设计目的就是数据的持久化，完全独立于容器的生存周期，因此Docker不会在容器删除时删除其挂 载的数据卷.**

特点：

 1、数据卷可在容器之间共享或重用数据 

2、卷中的更改可以直接生效 

3、数据卷中的更改不会包含在镜像的更新中 

4、数据卷的生命周期一直持续到没有容器使用它为止 

所以：总结一句话： 就是容器的持久化，以及容器间的继承和数据共享！

### 使用数据卷

> 方式一: 容器中直接使用命令来添加

挂载

```shell
# 命令 -v 主机目录:容器目录
docker run -it -v 主机目录:容器目录 镜像名

# 测试 双向绑定
root@iZm5e8kvgejp2ifut80lwyZ:~/volume# docker run -it -v ~/volume:/home centos /bin/bash
[root@04a31b052167 /]# ls
bin  dev  etc  home  lib  lib64  lost+found  media  mnt  opt  proc  root  run  sbin  srv  sys  tmp  usr  var
[root@04a31b052167 /]# cd /home/
[root@04a31b052167 home]# ls
[root@04a31b052167 home]# touch test.java

# 查看数据卷是否挂载成功 docker inspect 容器id

# 容器内
root@iZm5e8kvgejp2ifut80lwyZ:~# docker attach 04a31b052167
[root@04a31b052167 home]# ls
test.java
[root@04a31b052167 home]# cat test.java 
# 输入 # 容器停止 主机修改也会同步到容器
[root@04a31b052167 home]# 

# 宿主机内
root@iZm5e8kvgejp2ifut80lwyZ:~# cd volume/
root@iZm5e8kvgejp2ifut80lwyZ:~/volume# ls
test.java
root@iZm5e8kvgejp2ifut80lwyZ:~/volume# vi test.java 
root@iZm5e8kvgejp2ifut80lwyZ:~/volume# 
```

![image-20220529231615416](https://images.yewq.top/uPic/image-20220529231615416.png)

### 实战: 安装mysql 数据持久化

查看官方启动建议 https://hub.docker.com/_/mysql

```shell
# 可以挂载多个 -e 配置
root@iZm5e8kvgejp2ifut80lwyZ:/home# docker run -d -p 3310:3306 -v /home/mysql/conf:/etc/mysql/conf.d -v /home/mysql/data:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=123456 mysql:5.7

# 挂载成功
root@iZm5e8kvgejp2ifut80lwyZ:/home# ls
manager  mysql  temp  yewq.js
root@iZm5e8kvgejp2ifut80lwyZ:/home# cd mysql/
root@iZm5e8kvgejp2ifut80lwyZ:/home/mysql# ls
conf  data
root@iZm5e8kvgejp2ifut80lwyZ:/home/mysql# cd data
root@iZm5e8kvgejp2ifut80lwyZ:/home/mysql/data# ls
auto.cnf    ca.pem           client-key.pem  ibdata1      ib_logfile1  mysql               private_key.pem  server-cert.pem  sys
ca-key.pem  client-cert.pem  ib_buffer_pool  ib_logfile0  ibtmp1       performance_schema  public_key.pem   server-key.pem

# 测试连接 3310

# 创建数据库后 本地数据库存在
root@iZm5e8kvgejp2ifut80lwyZ:/home/mysql/data# ls
auto.cnf    ca.pem           client-key.pem  ibdata1      ib_logfile1  mysql               private_key.pem  server-cert.pem  sys
ca-key.pem  client-cert.pem  ib_buffer_pool  ib_logfile0  ibtmp1       performance_schema  public_key.pem   server-key.pem   test

# 删除容器 数据还在
root@iZm5e8kvgejp2ifut80lwyZ:/home/mysql/data# ls
auto.cnf    ca.pem           client-key.pem  ibdata1      ib_logfile1  mysql               private_key.pem  server-cert.pem  sys
ca-key.pem  client-cert.pem  ib_buffer_pool  ib_logfile0  ibtmp1       performance_schema  public_key.pem   server-key.pem   test

```

实现了mysql 数据持久化

### 具名和匿名挂载

```shell
# 匿名挂载 -v 容器路径
root@iZm5e8kvgejp2ifut80lwyZ:~# docker run -d -P --name nginx1 -v /etc/nginx nginx
6180fe7f611bcd8bc3f5fbe8fd1786affa21b63a35c5e3ad18245776d9912271

# 使用docker volume ls 来维护
root@iZm5e8kvgejp2ifut80lwyZ:~# docker volume --help
Commands:
  create      Create a volume
  inspect     Display detailed information on one or more volumes
  ls          List volumes
  prune       Remove all unused volumes
  rm          Remove one or more volumes
root@iZm5e8kvgejp2ifut80lwyZ:~# docker volume ls
DRIVER              VOLUME NAME
local               0488f3f27ba43a525b8832ecf66ba41b42207291c8b88e1270ef1185da6a5a51
...

# 具名挂载 -v 具名:容器路径
root@iZm5e8kvgejp2ifut80lwyZ:~# docker run -d -P --name nginx2 -v juming_nginx:/etc/nginx nginx
root@iZm5e8kvgejp2ifut80lwyZ:~# docker volume ls
DRIVER              VOLUME NAME
local               juming_nginx

# 查看 volume 的 元数据
root@iZm5e8kvgejp2ifut80lwyZ:~# docker volume inspect juming_nginx
[
    {
        "CreatedAt": "2022-05-30T17:02:21+08:00",
        "Driver": "local",
        "Labels": null,
        "Mountpoint": "/var/lib/docker/volumes/juming_nginx/_data",
        "Name": "juming_nginx",
        "Options": {},
        "Scope": "local"
    }
]

root@iZm5e8kvgejp2ifut80lwyZ:~# cd /var/lib/docker
root@iZm5e8kvgejp2ifut80lwyZ:/var/lib/docker# ls
builder  containerd  containers  image  network  overlay2  plugins  runtimes  swarm  tmp  trust  volumes
root@iZm5e8kvgejp2ifut80lwyZ:/var/lib/docker# cd volumes/
root@iZm5e8kvgejp2ifut80lwyZ:/var/lib/docker/volumes# ls
0488f3f27ba43a525b8832ecf66ba41b42207291c8b88e1270ef1185da6a5a51  a8ecc1fb33def318ce46e528ffebbf5b4b3f087d4be0ca295f719670ea3d4f87  metadata.db
51de574d4b8f5cabfded80bd9dd5bb12f0ba6736d3b4e1e6c158a0a16641c288  f34eef21093f0ec0e0c706ccbcf9d3cb6524998cfc184954dc5307f13261e5e3
68477c2c8218874e829ab86da4d4ae298a6c5d2572fbddb857f76692fee7acdc  juming_nginx
```

发下挂载的volume 路径是  `/var/lib/docker/volumes/xxxx/_data` 

大多数是具名挂载, 方便我们找到相对应的 volume

**怎么判断挂载的是卷名而不是本机目录名？**

```shell
-v 容器路径				# 匿名挂载
-v 具名:容器路径	 # 具名挂载 不带 /
-v /xx:容器路径		# 指定路径挂载
```

拓展: 

```shell
# 通过 -v 容器路径:ro/rw 改变读写权限
ro readonly  # 只读
rw readwrite # 可读可写

# 设置, 代表了对容器挂载的内容有的限定
docker run -d -P --name nginx2 -v juming_nginx:/etc/nginx:ro nginx
docker run -d -P --name nginx2 -v juming_nginx:/etc/nginx:rw nginx

# ro 代表挂载路径只能宿主机来操作, 容器只读 
# 测试
root@iZm5e8kvgejp2ifut80lwyZ:/var/lib/docker/volumes# docker run -d -P --name nginx3 -v juming_nginx_ro:/etc/nginx:ro nginx
4a2d4eac10771db64f839b608f9a4b726b32a4ad2ef99d99234c40d68c7c5dbd

root@iZm5e8kvgejp2ifut80lwyZ:/var/lib/docker/volumes# cd juming_nginx_ro/
root@iZm5e8kvgejp2ifut80lwyZ:/var/lib/docker/volumes/juming_nginx_ro# cd _data/
root@iZm5e8kvgejp2ifut80lwyZ:/var/lib/docker/volumes/juming_nginx_ro/_data# ls
conf.d  fastcgi_params  mime.types  modules  nginx.conf  scgi_params  uwsgi_params
root@iZm5e8kvgejp2ifut80lwyZ:/var/lib/docker/volumes/juming_nginx_ro/_data# touch test.text
root@iZm5e8kvgejp2ifut80lwyZ:/var/lib/docker/volumes/juming_nginx_ro/_data# ls
conf.d  fastcgi_params  mime.types  modules  nginx.conf  scgi_params  test.text  uwsgi_params
root@iZm5e8kvgejp2ifut80lwyZ:/var/lib/docker/volumes/juming_nginx_ro/_data# docker exec -it nginx3 /bin/bash

root@4a2d4eac1077:/# cd /etc/nginx/
root@4a2d4eac1077:/etc/nginx# ls
conf.d		mime.types  nginx.conf	 test.text
fastcgi_params	modules     scgi_params  uwsgi_params
root@4a2d4eac1077:/etc/nginx# touch container.text
touch: cannot touch 'container.text': Read-only file system
root@4a2d4eac1077:/etc/nginx# 
```

> 方法二: Dockerfile VOLUME 指定

DockerFile 是用来构建Docker镜像的构建文件，是由一些列命令和参数构成的脚本

### 初识DockerFile 

### docker build

```shell
# 1. 在我们宿主机 /home 下 新建docker-test-volume文件夹
root@iZm5e8kvgejp2ifut80lwyZ:~# cd /home
root@iZm5e8kvgejp2ifut80lwyZ:/home# ls
manager  mysql  temp  yewq.js
root@iZm5e8kvgejp2ifut80lwyZ:/home# mdkir docker-test-volume
No command 'mdkir' found, did you mean:
 Command 'mkdir' from package 'coreutils' (main)
 Command 'mdir' from package 'mtools' (main)
mdkir: command not found
root@iZm5e8kvgejp2ifut80lwyZ:/home# mkdir docker-test-volume
root@iZm5e8kvgejp2ifut80lwyZ:/home# ls
docker-test-volume  manager  mysql  temp  yewq.js
root@iZm5e8kvgejp2ifut80lwyZ:/home# vim dockerfile
# 2. 创建编写dockerfile文件
root@iZm5e8kvgejp2ifut80lwyZ:/home# cat dockerfile 
FROM centos
VOLUME ["container1", "container2"]
CMD echo "--------end--------"
CMD /bin/bash
# 3. docker build 生成镜像  
# -f dockerfile路径
# -t 生成镜像名 
# !!注意  最后有点 需要在dockerfile目录下
root@iZm5e8kvgejp2ifut80lwyZ:/home/docker-test-volume# docker build -f /home/docker-test-volume/dockerfile -t yewq/centos:1.0 .
Sending build context to Docker daemon  2.048kB
Step 1/4 : FROM centos  # 一层一层写入
 ---> 5d0da3dc9764
Step 2/4 : VOLUME ["container1", "container2"]
 ---> Running in 13dcbd407471
Removing intermediate container 13dcbd407471
 ---> 32491c3fee54
Step 3/4 : CMD echo "--------end--------"
 ---> Running in 924a5b532fd8
Removing intermediate container 924a5b532fd8
 ---> 536a12ca5087
Step 4/4 : CMD /bin/bash
 ---> Running in b749b3cb36c8
Removing intermediate container b749b3cb36c8
 ---> f3580f50b2b3
Successfully built f3580f50b2b3
Successfully tagged yewq/centos:latest
root@iZm5e8kvgejp2ifut80lwyZ:/home/docker-test-volume# docker images
REPOSITORY            TAG                 IMAGE ID            CREATED             SIZE
yewq/centos           latest              f3580f50b2b3        12 seconds ago      231MB

# 4. 启动容器
root@iZm5e8kvgejp2ifut80lwyZ:/home/docker-test-volume# docker run -it f3580f50b2b3 /bin/bash
[root@ecf99b5d9eb2 /]# ls
# 数据卷 container1  container2 
bin  container1  container2  dev  etc  home  lib  lib64  lost+found  media  mnt  opt  proc  root  run  sbin  srv  sys  tmp  usr  var

# 5. 数据卷内新建文件
[root@ecf99b5d9eb2 /]# cd container1
[root@ecf99b5d9eb2 container1]# touch test.txt 

# 6. 查看宿主机 数据卷默认位置上
root@iZm5e8kvgejp2ifut80lwyZ:/var/lib/docker/volumes/ad33a0aa9a4abe2c01fbe7d71f7645345e6ea571cb84c07c11e61f01dcd8197f/_data# ls
test.txt
```

![image-20220530225128604](https://images.yewq.top/uPic/image-20220530225128604.png)

这方法常使用. 常常构建我们的镜像

假设构建镜像时没挂载卷, 要手动挂载 -v 卷名:容器内路径

### 数据卷容器

命名的容器挂载数据卷，其他容器通过挂载这个（父容器）实现数据共享，挂载数据卷的容器，称之为 数据卷容器。

![image-20220531000400056](https://images.yewq.top/uPic/image-20220531000400056.png)

以 yewq/centos 为模板，运行容器 docker01 , docker01作为父容器,  docker02，docker03，--volume-from docker01  他们都会具有容器卷



命令: `-volumes-from` 容器名

```shell
# 1. 启动docker01 在数据卷内新增文件
root@iZm5e8kvgejp2ifut80lwyZ:~# docker run -it --name docker01 yewq/centos:1.0 /bin/bash
[root@80d78b3fa394 /]# cd container1
[root@80d78b3fa394 container1]# touch dockder01.txt 
# ctrl+p+a 退出
# 2. 创建 docker02, ~03 继承 docker01 --volumes-from 容器名
root@iZm5e8kvgejp2ifut80lwyZ:~# docker run -it --name docker02 --volumes-from docker01 yewq/centos:1.0 /bin/bash
[root@a1ec2d97ec4e /]# cd container1
[root@a1ec2d97ec4e container1]# touch docker02.txt
[root@a1ec2d97ec4e container1]# ls
dockder01.txt  docker02.txt
# 退出
root@iZm5e8kvgejp2ifut80lwyZ:~# docker run -it --name docker03 --volumes-from docker01 yewq/centos:1.0 /bin/bash
[root@612fd7cb3acc /]# cd container1
[root@612fd7cb3acc container1]# touch docker03.txt
[root@612fd7cb3acc container1]# ls
dockder01.txt  docker02.txt  docker03.txt

# 3. 删除docker01 看docker02, 更新后, 03是否能访问
root@iZm5e8kvgejp2ifut80lwyZ:~# docker rm -f docker01
docker01
root@iZm5e8kvgejp2ifut80lwyZ:~# docker attach docker02
[root@a1ec2d97ec4e container1]# ls 
dockder01.txt  docker02.txt  docker03.txt
[root@a1ec2d97ec4e container1]# touch docker02.update.tx
# 退出
root@iZm5e8kvgejp2ifut80lwyZ:~# docker attach docker03
[root@612fd7cb3acc container1]# ls
dockder01.txt  docker02.txt  docker02.update.tx  docker03.txt


```

**得出结论： 容器之间配置信息的传递，数据卷的生命周期一直持续到没有容器使用它为止。 存储在本机的文件则会一直保留！**

实现 多个mysql 数据共享!

```shell
docker run -d -p 3310:3306 -v /etc/mysql/conf.d -v /var/lib/mysql --name mysql01 -e MYSQL_ROOT_PASSWORD=123456 mysql:5.7

docker run -d -p 3310:3306 --name mysql02 --volumes-from mysql01 -e MYSQL_ROOT_PASSWORD=123456 mysql:5.7
```



![image-20220530233630530](https://images.yewq.top/uPic/image-20220530233630530.png)

## DockerFile

大家想想，Nginx，tomcat，mysql 这些镜像都是哪里来的？官方能写，我们不能写吗？ 

我们要研究自己如何做一个镜像，而且我们写的微服务项目以及springboot打包上云部署，Docker就是 最方便的。

 微服务打包成镜像，任何装了Docker的地方，都可以下载使用，极其的方便。 

流程：开发应用=>DockerFile=>打包为镜像=>上传到仓库（私有仓库，公有仓库）=> 下载镜像 => 启动 运行。 

还可以方便移植！

### DockerFile介绍

Dockerfile是用来构建Docker镜像的构建文件. 是一系列命令和参数组成的脚本

构建步骤: 

1. 编写DockerFile文件
2. Docker build 构建一个镜像
3. docker run 运行镜像
4. docker push 发布镜像(dockerHub, 阿里云镜像仓库)

官网镜像 版本点击去是dockerfile

![image-20220531190211072](https://images.yewq.top/uPic/image-20220531190211072.png)

![image-20220531190951920](https://images.yewq.top/uPic/image-20220531190951920.png)

### DockerFile构建流程

**基础知识:** 

1. 每个指令大写 且需要至少一个参数
2. 指令从上到下, 顺序执行
3. 表示注释#
4. 每个指令都会生出一个镜像层, 并对镜像进行提交

![image-20220531192007635](https://images.yewq.top/uPic/image-20220531192007635.png)

Dockerfile面向开发，Docker镜像成为交付标准，Docker容器则涉及部署与运维，三者缺一不可！

**步骤:**

- DockerFile: 构建文件, 源代码
- DockerImages:  通过dockerfile生出的镜像, 最终发布和运行的产品
- Docker容器: 容器是镜像运行的状态

### DockerFile指令

![image-20220531190446446](https://images.yewq.top/uPic/image-20220531190446446.png)

```dockerfile
FROM       # 基础镜像 一切从这里开始
MAINTAINER # 镜像是谁写的，姓名+邮箱
RUN    		 # 镜像构建的时候需要运行的命令
ADD    		 # 步骤：tomcat 镜像，这个tomcat压缩包  tar.gz  自动解压
WORKDIR		 # 镜像的工作目录
VOLUME     # 挂载的目录
EXPOSE 		 # 保留端口配置
CMD        # 指定这个容器启动的hi后要运行的命令(只有最后一个会生效，可被替代)
ENTRYPOINT # 指定这个容器启动的时候要运行的命令(可追加命令)
ONBUILD    # 当构建被继承 DockerFIle 这个时候就会运行
COPY       # 类似ADD,将文件拷贝到镜像中
ENV        # 构建的时候设置环境变量
```

### 实战测试

#### 自定义 centos

![image-20220531203737672](https://images.yewq.top/uPic/image-20220531203737672.png)

目的：使我们自己的镜像具备如下：登陆后的默认路径、vim编辑器、查看网络配置ifconfig支持 

准备编写DockerFlie文件

```shell
# 1. 编写  yum停止 : https://stackoverflow.com/questions/70963985/error-failed-to-download-metadata-for-repo-appstream-cannot-prepare-internal
root@iZm5e8kvgejp2ifut80lwyZ:/home/dockerfile# cat centos-dockerfile 
FROM centos
MAINTAINER kuangshen<24736743@qq.com>
ENV MYPATH /usr/local
WORKDIR $MYPATH

RUN cd /etc/yum.repos.d/
RUN sed -i 's/mirrorlist/#mirrorlist/g' /etc/yum.repos.d/CentOS-*
RUN sed -i 's|#baseurl=http://mirror.centos.org|baseurl=http://vault.centos.org|g' /etc/yum.repos.d/CentOS-*

RUN yum -y install vim
RUN yum -y install net-tools

EXPOSE 80
CMD echo $MYPATH
CMD echo "----------end--------"
CMD /bin/bash

# 2. 构建
root@iZm5e8kvgejp2ifut80lwyZ:/home/dockerfile# docker build -f /home/dockerfile/centos-dockerfile -t mycentos:1.0 .

...
Successfully built c70dd45d8ffa
Successfully tagged mycentos:1.0

# 3. 运行
root@iZm5e8kvgejp2ifut80lwyZ:/home/dockerfile# docker run -it mycentos:1.0
[root@d2c57639eb61 local]# pwd
/usr/local
[root@d2c57639eb61 local]# vim
[root@d2c57639eb61 local]# ifconfig
eth0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet 172.17.0.9  netmask 255.255.0.0  broadcast 172.17.255.255
        ether 02:42:ac:11:00:09  txqueuelen 0  (Ethernet)
        RX packets 0  bytes 0 (0.0 B)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 0  bytes 0 (0.0 B)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0

lo: flags=73<UP,LOOPBACK,RUNNING>  mtu 65536
        inet 127.0.0.1  netmask 255.0.0.0
        loop  txqueuelen 1  (Local Loopback)
        RX packets 0  bytes 0 (0.0 B)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 0  bytes 0 (0.0 B)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0

# 4. 列出镜像地的变更历史
root@iZm5e8kvgejp2ifut80lwyZ:/home/dockerfile# docker history c70dd45d8ffa
IMAGE               CREATED             CREATED BY                                      SIZE                COMMENT
c70dd45d8ffa        5 minutes ago       /bin/sh -c #(nop)  CMD ["/bin/sh" "-c" "/bin…   0B                  
6ac4297d5d11        5 minutes ago       /bin/sh -c #(nop)  CMD ["/bin/sh" "-c" "echo…   0B                  
ee79dc9bef36        5 minutes ago       /bin/sh -c #(nop)  CMD ["/bin/sh" "-c" "echo…   0B                  
b1697ae171ff        5 minutes ago       /bin/sh -c #(nop)  EXPOSE 80                    0B                  
7cb3405ecbff        5 minutes ago       /bin/sh -c yum -y install net-tools             28.4MB              
255cf66f12a8        5 minutes ago       /bin/sh -c yum -y install vim                   66.3MB              
fa47d3c5d277        5 minutes ago       /bin/sh -c sed -i 's|#baseurl=http://mirror.…   8.8kB               
63c0f56b6255        5 minutes ago       /bin/sh -c sed -i 's/mirrorlist/#mirrorlist/…   8.82kB              
4cb1e376b671        5 minutes ago       /bin/sh -c cd /etc/yum.repos.d/                 0B                  
27e30567dfce        8 minutes ago       /bin/sh -c #(nop) WORKDIR /usr/local            0B                  
5753ee2db1f9        8 minutes ago       /bin/sh -c #(nop)  ENV MYPATH=/usr/local        0B                  
31c10a83f533        8 minutes ago       /bin/sh -c #(nop)  MAINTAINER kuangshen<2473…   0B                  
5d0da3dc9764        8 months ago        /bin/sh -c #(nop)  CMD ["/bin/bash"]            0B                  
<missing>           8 months ago        /bin/sh -c #(nop)  LABEL org.label-schema.sc…   0B                  
<missing>           8 months ago        /bin/sh -c #(nop) ADD file:805cb5e15fb6e0bb0…   231MB      
```

#### CMD和ENTRYPOINT的区别

我们之前说过，两个命令都是指定一个容器启动时要运行的命令.

CMD : Dockerfile 中可以有多个CMD 指令, 如果是CMD是启动时要运行的命令,  在run时追加命令的话, CMD最后一个命令会被替换.

ENTRYPOINT:  docker run 之后的参数会被当做参数传递给 ENTRYPOINT，之后形成新的命令组合！可以直接追加参数

测试:

```shell
# CMD 测试
root@iZm5e8kvgejp2ifut80lwyZ:/home/dockerfile# vim cmd-dockefile
root@iZm5e8kvgejp2ifut80lwyZ:/home/dockerfile# cat cmd-dockefile 
FROM centos

CMD ["ls", "-a"]

root@iZm5e8kvgejp2ifut80lwyZ:/home/dockerfile# docker build -f cmd-dockefile cmd-test:1.0 .
"docker build" requires exactly 1 argument.
See 'docker build --help'.

Usage:  docker build [OPTIONS] PATH | URL | - [flags]

Build an image from a Dockerfile
root@iZm5e8kvgejp2ifut80lwyZ:/home/dockerfile# docker build -f cmd-dockefile -t cmd-test:1.0 .
Sending build context to Docker daemon  3.072kB
Step 1/2 : FROM centos
 ---> 5d0da3dc9764
Step 2/2 : CMD ["ls", "-a"]
 ---> Running in 3cf2eb9668bf
Removing intermediate container 3cf2eb9668bf
 ---> 26c52b4c5e25
Successfully built 26c52b4c5e25
Successfully tagged cmd-test:1.0
root@iZm5e8kvgejp2ifut80lwyZ:/home/dockerfile# docker run cmd-test:1.0
.
..
.dockerenv
bin
dev
etc
home
lib
lib64
lost+found
media
mnt
opt
proc
root
run
sbin
srv
sys
tmp
usr
var

# 直接追加报错
root@iZm5e8kvgejp2ifut80lwyZ:/home/dockerfile# docker run cmd-test:1.0 -l
docker: Error response from daemon: OCI runtime create failed: container_linux.go:348: starting container process caused "exec: \"-l\": executable file not found in $PATH": unknown.
# 替换
root@iZm5e8kvgejp2ifut80lwyZ:/home/dockerfile# docker run cmd-test:1.0 ls -l -a
total 56
drwxr-xr-x   1 root root 4096 Jun  1 02:52 .

```



```shell
# ENTRYPOINT
root@iZm5e8kvgejp2ifut80lwyZ:/home/dockerfile# docker build -f cmd-entrypoint-dockerfile -t cmd-entrypoint-test:1.0 .
Sending build context to Docker daemon  4.096kB
Step 1/2 : FROM centos
 ---> 5d0da3dc9764
Step 2/2 : ENTRYPOINT ["ls", "-a"]
 ---> Running in 802459dd3749
Removing intermediate container 802459dd3749
 ---> 8205823287d5
Successfully built 8205823287d5
Successfully tagged cmd-entrypoint-test:1.0

root@iZm5e8kvgejp2ifut80lwyZ:/home/dockerfile# docker run cmd-entrypoint-test:1.0
.
..
.dockerenv
bin
dev
etc
home
lib
lib64
lost+found
media
mnt
opt
proc
root
run
sbin
srv
sys
tmp
usr
var
root@iZm5e8kvgejp2ifut80lwyZ:/home/dockerfile# docker run cmd-entrypoint-test:1.0 -l
total 56
drwxr-xr-x   1 root root 4096 Jun  1 03:05 .
drwxr-xr-x   1 root root 4096 Jun  1 03:05 ..
-rwxr-xr-x   1 root root    0 Jun  1 03:05 .dockerenv
lrwxrwxrwx   1 root root    7 Nov  3  2020 bin -> usr/bin
```

#### 安装nvm 配置node

https://segmentfault.com/a/1190000021524481

```shell
export NVM_NODEJS_ORG_MIRROR=https://registry.npm.taobao.org/
```

https://blog.csdn.net/weixin_39559071/article/details/110106683	

安装 nvm 出现nvm:  commad not found

https://stackoverflow.com/questions/25899912/how-to-install-nvm-in-docker

https://stackoverflow.com/questions/42079122/how-to-install-nvm-in-a-dockerfile

```dockerfile
FROM centos
MAINTAINER yewq<yewq1995@gmail.com>

RUN cd /etc/yum.repos.d/
RUN sed -i 's/mirrorlist/#mirrorlist/g' /etc/yum.repos.d/CentOS-*
RUN sed -i 's|#baseurl=http://mirror.centos.org|baseurl=http://vault.centos.org|g' /etc/yum.repos.d/CentOS-*

RUN yum -y install vim
RUN yum -y install net-tools
RUN yum -y install wget && mkdir /usr/node && cd /usr/node && wget https://nodejs.org/download/release/v12.16.3/node-v12.16.3-linux-x64.tar.gz && tar -xzvf node-v12.16.3-linux-x64.tar.gz

ENV PATH=/usr/node/node-v12.16.3-linux-x64/bin:$PATH
RUN npm config set registry=https://registry.npm.taobao.org && npm install -g yarn && npm install -g pm2

EXPOSE 3305

CMD echo "-----end-----"
```

```dockerfile
FROM centos
MAINTAINER yewq<yewq1995@gmail.com>

RUN cd /etc/yum.repos.d/
RUN sed -i 's/mirrorlist/#mirrorlist/g' /etc/yum.repos.d/CentOS-*
RUN sed -i 's|#baseurl=http://mirror.centos.org|baseurl=http://vault.centos.org|g' /etc/yum.repos.d/CentOS-*

RUN yum -y install vim
RUN yum -y install net-tools

RUN mkdir /usr/local/nvm
ENV NVM_DIR /usr/local/nvm 
# ENV NVM_NODEJS_ORG_MIRROR https://registry.npm.taobao.org/

USER $USERNAME
# RUN Dockerfile 中的每一个都在不同的容器中执行。因此，如果您在容器中获取文件，则其内容在下一个容器中将不可用。
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash && . $NVM_DIR/nvm.sh && nvm install 12.16.3 && npm install -g yarn pm2 --registry=https://registry.npm.taobao.org

EXPOSE 3305

CMD echo "-----end-----"
```



#### 自定义镜像 tomcat

1. 创建tomcat目录
2. 将 JDK 和 tomcat 安装的压缩包拷贝进上一步目录
3. Dockerfile

```dockerfile
FROM centos
MAINTAINER yewq<yewq1995@gmail.com>

RUN cd /etc/yum.repos.d/
RUN sed -i 's/mirrorlist/#mirrorlist/g' /etc/yum.repos.d/CentOS-*
RUN sed -i 's|#baseurl=http://mirror.centos.org|baseurl=http://vault.centos.org|g' /etc/yum.repos.d/CentOS-*
RUN yum -y install vim

# 将java和tomcat 添加到容器 自动解压
ADD jdk-8u202-linux-x64.tar.gz /usr/local 
ADD apache-tomcat-9.0.63.tar.gz /usr/local

# 配置工作目录, 并做登录点
ENV MYPATH /usr/local
WORKDIR $MYPATH

# 配置java与tomcat环境变量
ENV JAVA_HOME /usr/local/jdk1.8.0_202
ENV CLASSPATH $JAVA_HOME/lib/dt.jar:$JAVA_HOME/lib/tools.jar
ENV CATALINA_HOME /usr/local/apache-tomcat-9.0.63
ENV CATALINA_BASE /usr/local/apache-tomcat-9.0.63
ENV PATH $PATH:$JAVA_HOME/bin:$CATALINA_HOME/lib:$CATALINA_HOME/bin

EXPOSE 8080

# 启动时运行tomcat
CMD /usr/local/apache-tomcat-9.0.63/bin/startup.sh && tail -F /usr/local/apache-tomcat-9.0.63/bin/logs/catalina.out
```

4. 构建镜像

```shell
root@iZm5e8kvgejp2ifut80lwyZ:/home/dockerfile/tomcat# vim Dockerfile 
root@iZm5e8kvgejp2ifut80lwyZ:/home/dockerfile/tomcat# docker build -t diytomcat:1.0 .
...
Successfully built 7b0320ead9e0
Successfully tagged diytomcat:1.0
root@iZm5e8kvgejp2ifut80lwyZ:/home/dockerfile/tomcat# docker images
REPOSITORY            TAG                 IMAGE ID            CREATED             SIZE
diytomcat             1.0                 7b0320ead9e0        12 seconds ago      716MB
```

5. 启动容器

```shell
# 挂载输出 和 logs 在宿主机更新项目 备注：Docker挂载主机目录Docker访问出现cannot open directory .: Permission denied 解决办法：在挂载目录后多加一个--privileged=true参数即可
root@iZm5e8kvgejp2ifut80lwyZ:/home/dockerfile/tomcat# docker run -d -p 9090:8080 --name diytomcat -v /home/dockerfile/tomcat/test:/usr/local/apache-tomcat-9.0.63/webapps/test -v /home/dockerfile/tomcat/tomcat9logs:/usr/local/apache-tomcat-9.0.63/logs diytomcat:1.0
```

6. 验证测试访问！ curl localhost:9090 对外访问 开启iptables对应的端口. 安全组同理

7. 发布测试web

http://47.104.88.94:9090/test/a.jsp

web.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
xmlns="http://java.sun.com/xml/ns/javaee"
xsi:schemaLocation="http://java.sun.com/xml/ns/javaee
http://java.sun.com/xml/ns/javaee/web-app_2_5.xsd"
id="WebApp_ID" version="2.5">
<display-name>test</display-name>
</web-app>
```

a.jsp

```jsp
<%@ page language="java" contentType="text/html; charset=UTF-8"
pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
"http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>hello，kuangshen</title>
</head>
<body>
-----------welcome------------
<%=" my docker tomcat，kuangshen666 "%>
<br>
<br>
<% System.out.println("-------my docker tomcat-------");%>
</body>
</html>
```



### 发布镜像

#### docker hub 

1. 注册账号
2. 登录hub 账号
3. docker push 账号/镜像名:版本号

```shell
root@iZm5e8kvgejp2ifut80lwyZ:~# docker login -u yewq1995
Password: 
Login Succeeded

# 提交失败的情况
root@iZm5e8kvgejp2ifut80lwyZ:~# docker push yewq1995/nvm-test:1.0
The push refers to repository [docker.io/yewq1995/nvm-test]
An image does not exist locally with the tag: yewq1995/nvm-test
root@iZm5e8kvgejp2ifut80lwyZ:~# docker push --help

Usage:	docker push [OPTIONS] NAME[:TAG]

Push an image or a repository to a registry

Options:
      --disable-content-trust   Skip image signing (default true)
root@iZm5e8kvgejp2ifut80lwyZ:~# docker push nvm-test:1.0
The push refers to repository [docker.io/library/nvm-test]
14f9c7f19d0f: Preparing 
9e1248254831: Preparing 
ce959391544f: Preparing 
fd2808809fd1: Preparing 
ac517390d671: Preparing 
e173d1cf2f4c: Waiting 
74ddd0ec08fa: Waiting 
denied: requested access to the resource is denied # 被拒绝

# 解决方法. 重新书写TAG 带上账号
root@iZm5e8kvgejp2ifut80lwyZ:~# docker tag 704eff73191c yewq1995/nvm-test:1.0
root@iZm5e8kvgejp2ifut80lwyZ:~# docker images
REPOSITORY            TAG                 IMAGE ID            CREATED             SIZE
yewq1995/nvm-test     1.0                 704eff73191c        4 days ago          450MB

root@iZm5e8kvgejp2ifut80lwyZ:~# docker push yewq1995/nvm-test:1.0
The push refers to repository [docker.io/yewq1995/nvm-test]
14f9c7f19d0f: Pushing [>                                                  ]  2.147MB/124.1MB
9e1248254831: Pushed 
ce959391544f: Pushing [=====>                                             ]  3.239MB/28.36MB

# 退出账号
root@iZm5e8kvgejp2ifut80lwyZ:~# docker logout
Removing login credentials for https://index.docker.io/v1/
```

#### 阿里云镜像

https://cr.console.aliyun.com/cn-hangzhou/instance/repositories

阿里云账号, 个人空间

1. 创建命名空间
2. 创建镜像仓库
3. ![image-20220606155322659](https://images.yewq.top/uPic/image-20220606155322659.png)



### 小结

![Docker小结（一）docker架构及常用命令– A box of chocolate](https://images.yewq.top/uPic/docker.png)

docker中宿主机与容器（container）互相拷贝传递文件

```shell
# 宿主机运行
docker cp

# 从宿主机拷贝到容器
root@iZm5e8kvgejp2ifut80lwyZ:/home/dockerfile# docker cp cp.txt nvm1.0:/usr/local/

# 从容器里拷贝到宿主机
root@iZm5e8kvgejp2ifut80lwyZ:/home/dockerfile# docker cp nvm1.0:/usr/local/cp.txt .
```

## Docker网络

### 理解docker0

\# 问题：Docker 是如何处理容器网络访问的？



```shell
# 服务器ip
root@iZm5e8kvgejp2ifut80lwyZ:~# ip addr  
# 本机回环地址
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet 127.0.0.1/8 scope host lo
       valid_lft forever preferred_lft forever
# 阿里云私有ip
2: eth0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc pfifo_fast state UP group default qlen 1000
    link/ether 00:16:3e:0a:37:8c brd ff:ff:ff:ff:ff:ff
    inet 172.31.1.90/20 brd 172.31.15.255 scope global eth0
       valid_lft forever preferred_lft forever
# docker网桥
3: docker0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue state UP group default 
    link/ether 02:42:fc:95:d6:f2 brd ff:ff:ff:ff:ff:ff
    inet 172.17.0.1/16 brd 172.17.255.255 scope global docker0
       valid_lft forever preferred_lft forever
       
# 每启动一个容器，linux主机就会多了一个虚拟网卡。
# 容器1
17: vethcfb585b@if16: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue master docker0 state UP group default 
    link/ether 7e:e7:97:31:05:ee brd ff:ff:ff:ff:ff:ff
# 容器2
19: vethfbbbeaf@if18: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue master docker0 state UP group default 
    link/ether 46:42:dd:59:b4:bf brd ff:ff:ff:ff:ff:ff
    
# 容器1 16:eth0@if17
root@iZm5e8kvgejp2ifut80lwyZ:~# docker exec -it diytomcat ip addr  
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet 127.0.0.1/8 scope host lo
       valid_lft forever preferred_lft forever
16: eth0@if17: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue state UP group default 
    link/ether 02:42:ac:11:00:02 brd ff:ff:ff:ff:ff:ff link-netnsid 0
    inet 172.17.0.2/16 brd 172.17.255.255 scope global eth0
       valid_lft forever preferred_lft forever
```

docker会给每个容器都分配一个ip，且容器和容器之间是可以互相访问的。

我们可以测试下容器之间能不能ping通过：

```shell
# 思考，我们的linux服务器是否可以ping通容器内的tomcat ？  可以
root@iZm5e8kvgejp2ifut80lwyZ:~# ping 172.17.0.2
PING 172.17.0.2 (172.17.0.2) 56(84) bytes of data.
64 bytes from 172.17.0.2: icmp_seq=1 ttl=64 time=0.071 ms
64 bytes from 172.17.0.2: icmp_seq=2 ttl=64 time=0.074 ms
# 容器2 18: eth0@if19
root@iZm5e8kvgejp2ifut80lwyZ:~# docker exec -it nvm1.0 ip addr
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet 127.0.0.1/8 scope host lo
       valid_lft forever preferred_lft forever
18: eth0@if19: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue state UP group default 
    link/ether 02:42:ac:11:00:03 brd ff:ff:ff:ff:ff:ff link-netnsid 0
    inet 172.17.0.3/16 brd 172.17.255.255 scope global eth0
       valid_lft forever preferred_lft forever

```



> 原理

1、每一个安装了Docker的linux主机都有一个docker0的虚拟网卡。这是个桥接网卡，使用了veth-pair 技术！

2、每启动一个容器，linux主机就会多了一个虚拟网卡. 

![image-20220606190043708](https://images.yewq.top/uPic/image-20220606190043708.png)

 3、我们来测试下tomcat01和tomcat02容器间是否可以互相ping通  测试是可以的

```shell
root@iZm5e8kvgejp2ifut80lwyZ:~# docker exec -it nvm1.0 ping 172.17.0.2
PING 172.17.0.2 (172.17.0.2) 56(84) bytes of data.
64 bytes from 172.17.0.2: icmp_seq=1 ttl=64 time=0.117 ms
64 bytes from 172.17.0.2: icmp_seq=2 ttl=64 time=0.089 ms
64 bytes from 172.17.0.2: icmp_seq=3 ttl=64 time=0.099 ms
^C
--- 172.17.0.2 ping statistics ---
3 packets transmitted, 3 received, 0% packet loss, time 1999ms
rtt min/avg/max/mdev = 0.089/0.101/0.117/0.016 ms
root@iZm5e8kvgejp2ifut80lwyZ:~# docker exec -it nvm1.0 ip addr 
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet 127.0.0.1/8 scope host lo
       valid_lft forever preferred_lft forever
18: eth0@if19: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue state UP group default 
    link/ether 02:42:ac:11:00:03 brd ff:ff:ff:ff:ff:ff link-netnsid 0
    inet 172.17.0.3/16 brd 172.17.255.255 scope global eth0
       valid_lft forever preferred_lft forever
```

网络模型图

![image-20220606171012203](https://images.yewq.top/uPic/image-20220606171012203.png)

> 小结

Docker使用Linux桥接，在宿主机虚拟一个Docker容器网桥(docker0)，Docker启动一个容器时会根据 Docker网桥的网段分配给容器一个IP地址，称为Container-IP，同时Docker网桥是每个容器的默认网 关。因为在同一宿主机内的容器都接入同一个网桥，这样容器之间就能够通过容器的Container-IP直接 通信。

![image-20220606190531637](https://images.yewq.top/uPic/image-20220606190531637.png)



Docker容器网络就很好的利用了Linux虚拟网络技术，在本地主机和容器内分别创建一个虚拟接口，并 让他们彼此联通（这样一对接口叫**veth pair**）；

 Docker中的网络接口默认都是虚拟的接口。虚拟接口的优势就是转发效率极高（因为Linux是在内核中 进行数据的复制来实现虚拟接口之间的数据转发，无需通过外部的网络设备交换），对于本地系统和容 器系统来说，虚拟接口跟一个正常的以太网卡相比并没有区别，只是他的速度快很多。

