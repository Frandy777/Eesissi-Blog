---
title: "大数据分析"
description: "探索大数据处理和分析的核心技术，包括数据挖掘、统计分析和可视化等方法。"
period: "2021-2023"
---

# 2020/2021 春季学期：高级编程：项目设计与实现

## 高级编程期末作业

**课题名称**：4G 手机辐射源数据分析

**课题背景**：

辐射源识别一直是研究的热点，移动智能手机在日常生活中是最为广泛使用的一种无线通信 设备，我们的所有操作几乎都可以且需要在手机上完成，因此，对于智能手机的正确识别与身份 认证是具有重要的研究意义的，而且我国人口众多，智能手机应用数量大，建立一套完整有效的 识别认证系统是必要的。智能手机的工作是依赖于电子元器件的正常运作，而每个电子元器件的 参数绝大不可能完全相同，这样对于手机的射频信号的影响就会不同，这里的影响会体现在手机 发射的射频上，我们称之为手机信号的“指纹”信息，我们认为手机信号是存在可识别的信息的， 这种信息就和人类的指纹类似，具有可区分性和科研学术界对此问题的定义为射频识别 RAI(Radiometric identification)或者是特殊发射器识别 SEI(Special emitter identification)，因此这就 为正确识别认证智能手机提供了可能性。

**课题任务**：

课题将提供同学面向真实无线通信场景的接收信号数据，希望同学们设计和利用数学或者 深度学习模型对接收到的信号训练和检测(即分类识别)，实现通过一定的数据预处理方法(如： 滤除杂波，信噪比(SNR)筛选，FFT，STFT，小波变换以及其他等等的方法)和结合深度学习模型， 学习每一辐射源的电磁指纹特征，对手机信号指纹数据库进行有效提取，正确认识与定位指纹信 息，以此来区分不同辐射源的指纹特征。该课题主要考察的是对辐射源的分类识别正确率。

**详细的数据说明文件请下载文件**：[高级编程数据说明(6.21日更新，添加了考核标准说明)](https://gitee.com/eesissi123/data/raw/master/%E8%AF%BE%E7%A8%8B%E4%BD%9C%E4%B8%9A.pdf)，请仔细阅读该文件！！！

为了方便大家提交结果，我们将使用kaggle的评分系统，对大家的预测结果进行打分，每个队伍每天最多可以提交20次结果，期末成绩将参考最后的评分，请仔细阅读操作说明：[评分系统使用说明](https://gitee.com/eesissi123/data/raw/master/%E8%AF%BE%E7%A8%8B%E4%BD%9C%E4%B8%9A%20(1).pdf)

**数据文件说明**：

- train 训练集
- val 验证集
- test 测试集
- label and phone.csv  真实手机类别和数据标签的对应关系文件

数据大小1.5G

**数据下载**：

- 下载方式1：[百度网盘下载](https://pan.baidu.com/s/1oI2Nufvd3py4_N0UXBtz8w)    密码: wja6
- 下载方式2：[Google Drive](https://drive.google.com/file/d/1Xv3x_7pIwTCetEd1MFiCcc433eEWmwOh/view?usp=sharing)    ps: 需要连接国外网络，但下载速度快

**结果提交说明**：

利用所给的测试集数据，生成与所给测试集数据预测得到的标签值，预测标签值为一个矩阵， 需要和生成数据的排列顺序一一对应。 例：输入 test_sample_number\*8192，返回：test_sample_number\*1 test_sample_number 为测试集样本数量，例如输入 100 个测试样本，需要返回 100 个测试样 本的预测标签值。

> 注：1.所提交的测试集标签预测结果格式为 csv 文件或者 npy 文件均可； 2.该手机数据具有版权信息，具有私密性，未经许可，不可擅自外泄。

**结果提交方式**：

评分系统是为了模拟真实的比赛环境，同时也方便大家可以查看自己的模型训练效果，下面介绍下评分系统的使用说明，减轻大家的学习负担：
说明：大家在使用评分系统前，先为自己的小组创建一个战队名，如：eesissi，战队名不能和其他小组的战队名重复，提交必须使用这个战队名提交。
**第一步**：访问 https:www.kaggle.com/创建一个kaggle账号，账号名设置为自己的战队名
<br>
**第二步**：创建好账号后，请大家点击链接 https://www.kaggle.com/t/46b3e3c55cb2488f9798805b3ed75548
<br>
**第三步**：点击右上角的join competition加入比赛
<br>
**第五步**：提交结果
<br>
提交说明：

- 每人最多每天可以提交结果20次

- 提交的结果必须是csv文件，csv文件中必须有两个columns，其中一个columns的名字为Id，另一个名字为Category

下面是提交代码的范例：

```python
import pandas as pd
import numpy as np

# solution 是你自己模型的预测结果，我这里随机生成的一个预测结果
solution = np.random.randint(10, size=23403)

# 下面代码会生成提交的文件，将numpy文件转换成csv文件
pd.DataFrame({'Id': range(len(solution)), 'Category': solution}).to_csv('solution.csv', index=False)

# 查看预测结果，检查提交格式是否正确
pd.read_csv('solution.csv')
```



**考核标准**:

1. 最终成绩的40%以提交测试集数据的预测标签的准确率为标准。最高准确率的小组得到满分40分，其它小组按照归一化之后的比例得分。
2. 最终成绩的60%由程序说明文档为准。能够说明程序思路，简明扼要，逻辑清晰的文档可以得到满分60分。
3. 一份程序说明报告，介绍基本思路和程序结构。要求简单清晰，字数不限（请不要特意增加篇幅，以简单清晰为主）。请在报告的后面附上小组成员分工。
3. 每个小组只提交一份结果，包括标签文件、原始程序和程序说明报告（PDF 和 WORD 都需要）分三部分。请把文件打包命名为“姓名_队伍名称_小组编号.zip”，例如张三李四王五_北京五道口_32.zip。

4. 请在指定时间内将结果提交至 xxwu.eesissi@szu.edu.cn

5. Deadline: 2021 年 7 月 2 号 11.59 am

## 课件下载

### 第一, 二周

content:

- Data cleaning.pdf
- emsenble learning.pdf
- catboost.pdf
- classfication code
- data cleaning code

链接: https://pan.baidu.com/s/11T1Pqk4qBNI4WKCW_5rSoQ  密码: p58d

### 第三周

content:

- uber data processing.pdf    链接: https://pan.baidu.com/s/10GB0B5I0miej5rGYXnYoJg  密码: gi2d

- uber program   链接: https://pan.baidu.com/s/1ETcU7vmUBkRUyO-Req5b2w  密码: 7wot

### 第四周

content:

- SIR.pdf      链接: https://pan.baidu.com/s/1Kqqk1aStrGUBxHBqa9iGkQ  密码: c3b4
