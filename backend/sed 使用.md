# 正规式、sed 的使用

## 正规式

| RegularExpression 字符 | 意义及示例                                                   |
| ---------------------- | ------------------------------------------------------------ |
| ^word                  | word 位于行首                                                |
| word$                  | word 位于行尾                                                |
| .                      | 必有一个任意字符。如a.c代表 abc，acc 等，不能为 ac           |
| \                      | 转义字符                                                     |
| *                      | 重复零到多个 \* 前的 RE 字符。若任意则可 .\*                 |
| [list]                 | [] 中间的任一待搜索字符集合                                  |
| [n1-n2]                | 含有任一范围内字符的。如`grep -n '[A-Z]' regular_express.txt` |
| [^list]                | 排除集合内字符  <br />`grep -n 'oo[^t]' regular_express.txt`可以是 ood，oos等，不能是 oot |
| \\{n, m\\}             | 连续 n 到 m 个的前个RE字符。\\{n\\}连续 n 个；\\{n, \\}连续一个以上：<br />`grep -n 'go\{2,3\}g' regular_express.txt`可以是 goog，gooog |



## sed

```
sed [-nefr] [动作]
```

-n：安静模式

-e：直接在指令模式上进行 sed 动作编辑

-f \<filename>：直接写入文档

-r ：扩展正规式语法

-i ：直接修改所读取的文档内容，而不是在 stdout 输出

动作：[n1 [, n2]]function

- n1、n2 可选，是执行动作的目标行数。例如在 10 ～ 20 行执行，则 `10, 20[行为]`

- function：

  - a ：新增，在当前的下一行新增

    ```bash
    $ nl /etc/passwd | sed '2a drink tea'
         1  root:x:0:0:root:/root:/bin/bash
         2  bin:x:1:1:bin:/bin:/sbin/nologin
    drink tea
         3  daemon:x:2:2:daemon:/sbin:/sbin/nologin
    ```

  - c ：取代，替换目标行范围内的内容

    ```bash
    $ nl /etc/passwd | sed '2,5c No 2-5 number'
         1  root:x:0:0:root:/root:/bin/bash
    No 2-5 number
         6  sync:x:5:0:sync:/sbin:/bin/sync
    ```

  - d ：删除

  - i ：插入，被插入内容放在原来目标行的位置，原有内容都往下挪一行

  - p ：打印内容

  - s ：替换，如 `1, 20s/old/new/g`

  - p ：只列出要的行

    ```bash
    $ nl /etc/passwd | sed -n '5,7p'
         5  lp:x:4:7:lp:/var/spool/lpd:/sbin/nologin
         6  sync:x:5:0:sync:/sbin:/bin/sync
         7  shutdown:x:6:0:shutdown:/sbin:/sbin/shutdown
    ```

    



### 命令实例：

搜索替换：`sed 's/要被取代的字串/新的字串/g'`

```bash
$ /sbin/ifconfig eth0
eth0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet 192.168.1.100  netmask 255.255.255.0  broadcast 192.168.1.255
        inet6 fe80::5054:ff:fedf:e174  prefixlen 64  scopeid 0x20<link>
        ether 52:54:00:df:e1:74  txqueuelen 1000  (Ethernet)
.....

# 取出含 inet 的行
$ /sbin/ifconfig eth0 | grep 'inet '
        inet 192.168.1.100  netmask 255.255.255.0  broadcast 192.168.1.255

# 删 ip 前面的内容
[dmtsai@study ~]$ /sbin/ifconfig eth0 | grep 'inet ' | sed 's/^.*inet //g'
192.168.1.100  netmask 255.255.255.0  broadcast 192.168.1.255
# 仔細與上個步驟比較一下，前面的部分不見了！接下來則是刪除後續的部分，亦即：
192.168.1.100  netmask 255.255.255.0  broadcast 192.168.1.255
# 此時所需的正規表示法為：『 ' *netmask.*$ 』就是啦！

# 删后面的
[dmtsai@study ~]$ /sbin/ifconfig eth0 | grep 'inet ' | sed 's/^.*inet //g' \
>   | sed 's/ *netmask.*$//g'
192.168.1.100
```

