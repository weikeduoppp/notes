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
root@iZm5e8kvgejp2ifut80lwyZ:~# 
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

##### nginx

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

##### tomcat

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
