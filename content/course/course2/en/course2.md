---
title: "Advanced Programming: Project Design and Implementation"
description: "This course focuses on the design and implementation of projects using advanced programming techniques."
period: "2020-2021"
---

# 2020/2021 Spring Term: Advanced Programming: Project Design and Implementation

## Final Project for Advanced Programming

**Project Title**: Data Analysis of 4G Mobile Phone Radiation Sources

**Project Background**:

Radiometric identification has always been a hot topic in research. Mobile smartphones are the most widely used wireless communication devices in daily life. Almost all of our operations can and need to be done on mobile phones. Therefore, the correct identification and authentication of smartphones is of great research significance. Moreover, China has a large population and a large number of smartphone applications, making it necessary to establish a complete and effective identification and authentication system. The operation of a smartphone relies on the normal functioning of electronic components, and the parameters of each electronic component are unlikely to be exactly the same. This will have different effects on the radio frequency (RF) signals of the phone. These effects are reflected in the RF signals emitted by the phone, which we call the "fingerprint" information of the mobile phone signal. We believe that the mobile phone signal contains identifiable information, which is similar to human fingerprints, and is distinguishable. The academic community defines this as Radiometric Identification (RAI) or Special Emitter Identification (SEI). Therefore, this provides the possibility for correct identification and authentication of smartphones.

**Project Task**:

The project will provide students with received signal data from real wireless communication scenarios. Students are expected to design and use mathematical or deep learning models to train and detect (i.e., classify and identify) the received signals. This is achieved through certain data preprocessing methods (such as filtering out clutter, signal-to-noise ratio (SNR) screening, FFT, STFT, wavelet transform, and other methods) combined with deep learning models. The goal is to learn the electromagnetic fingerprint characteristics of each radiation source, effectively extract the fingerprint database of mobile phone signals, correctly understand and locate the fingerprint information, and thereby distinguish the fingerprint characteristics of different radiation sources. The main evaluation criterion of this project is the accuracy of classification and identification of radiation sources.

**For detailed data description, please download the file**: [Advanced Programming Data Description (Updated on June 21, added assessment criteria description)](https://gitee.com/eesissi123/data/raw/master/%E8%AF%BE%E7%A8%8B%E4%BD%9C%E4%B8%9A.pdf). Please read this document carefully!!!

To facilitate the submission of results, we will use the Kaggle scoring system to score your prediction results. Each team can submit results up to 20 times a day. The final grade will refer to the final score. Please read the instructions carefully: [Instructions for using the scoring system](https://gitee.com/eesissi123/data/raw/master/%E8%AF%BE%E7%A8%8B%E4%BD%9C%E4%B8%9A%20(1).pdf)

**Data File Description**:

- train: Training set
- val: Validation set
- test: Test set
- label and phone.csv: Correspondence between real phone categories and data labels

Data size: 1.5G

**Data Download**:

- Method 1: [Baidu Netdisk Download](https://pan.baidu.com/s/1oI2Nufvd3py4_N0UXBtz8w) Password: wja6
- Method 2: [Google Drive](https://drive.google.com/file/d/1Xv3x_7pIwTCetEd1MFiCcc433eEWmwOh/view?usp=sharing) ps: Requires connection to an overseas network, but the download speed is fast

**Result Submission Instructions**:

Use the provided test set data to generate predicted label values corresponding to the test set data. The predicted label value is a matrix, which needs to correspond to the order of data generation. Example: Input test_sample_number\*8192, return: test_sample_number\*1. test_sample_number is the number of samples in the test set. For example, if you input 100 test samples, you need to return the predicted label values of 100 test samples.

> Note: 1. The submitted test set label prediction results can be in CSV or npy file format; 2. The mobile phone data has copyright information and is private. Without permission, it cannot be disclosed.

**Result Submission Method**:

The scoring system is designed to simulate a real competition environment and also to facilitate you to check the training effect of your model. The following describes how to use the scoring system to reduce your learning burden:
Note: Before using the scoring system, create a team name for your group, such as: eesissi. The team name cannot be repeated with other groups' team names. Submissions must use this team name.
**Step 1**: Visit https:www.kaggle.com/ and create a Kaggle account. Set the account name to your team name.
<br>
**Step 2**: After creating your account, please click on the link https://www.kaggle.com/t/46b3e3c55cb2488f9798805b3ed75548
<br>
**Step 3**: Click "Join Competition" in the upper right corner to join the competition.
<br>
**Step 5**: Submit results
<br>
Submission Instructions:

- Each person can submit results up to 20 times a day.

- The submitted results must be in a CSV file. The CSV file must have two columns, one named "Id" and the other named "Category".

The following is an example of submission code:

```python
import pandas as pd
import numpy as np

# 'solution' is the prediction result of your own model. Here I randomly generate a prediction result.
solution = np.random.randint(10, size=23403)

# The following code will generate the submission file, converting the numpy file to a CSV file.
pd.DataFrame({'Id': range(len(solution)), 'Category': solution}).to_csv('solution.csv', index=False)

# View the prediction results and check if the submission format is correct.
pd.read_csv('solution.csv')
```

**Assessment Criteria**:

1. 40% of the final grade is based on the accuracy of the predicted labels for the submitted test set data. The team with the highest accuracy will receive a full score of 40 points, and other teams will be scored proportionally after normalization.
2. 60% of the final grade is based on the program description document. A document that can explain the program's ideas concisely, clearly, and logically can receive a full score of 60 points.
3. A program description report should be provided, introducing the basic ideas and program structure. It is required to be simple and clear, with no word limit (please do not deliberately increase the length, focus on simplicity and clarity). Please attach the division of labor among team members at the end of the report.
4. Each group only submits one set of results, including the label file, the original program, and the program description report (both PDF and WORD are required) in three parts. Please package the files and name them as "Name_TeamName_GroupID.zip", for example, ZhangSanLiSiWangWu_BeijingWudaokou_32.zip.

5. Please submit the results to xxwu.eesissi@szu.edu.cn within the specified time.

6. Deadline: July 2, 2021, 11:59 am

## Course Material Downloads

### Weeks 1 & 2

Content:

- Data cleaning.pdf
- Ensemble learning.pdf
- Catboost.pdf
- Classification code
- Data cleaning code

Link: https://pan.baidu.com/s/11T1Pqk4qBNI4WKCW_5rSoQ Password: p58d

### Week 3

Content:

- Uber data processing.pdf Link: https://pan.baidu.com/s/10GB0B5I0miej5rGYXnYoJg Password: gi2d

- Uber program Link: https://pan.baidu.com/s/1ETcU7vmUBkRUyO-Req5b2w Password: 7wot

### Week 4

Content:

- SIR.pdf Link: https://pan.baidu.com/s/1Kqqk1aStrGUBxHBqa9iGkQ Password: c3b4
