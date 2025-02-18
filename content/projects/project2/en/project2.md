---
title: "Research and Application of Image Privacy Protection Framework Based on Flow Model"
description: "This project proposes two image privacy protection schemes to address the security issues in data transmission and the balance between privacy and usability, and verifies their practicality in embedded systems."
order: 2
---

# 2. Research and Application of Image Privacy Protection Framework Based on Flow Model

<img src="/images/projects/pj_2.jpg" />

<center>Figure 2: Left: User-side process, Right: Embedded platform setup</center >

**Project Description:** This project proposes two image privacy protection schemes to address the security issues in data transmission and the balance between privacy and usability, and verifies their practicality in embedded systems. The first scheme is a flow-based face privacy protection method, which uses a flow generation model as an encoder, combines an improved rotation encryption algorithm to encrypt feature data, and uses the reversible characteristics of the flow model to achieve decryption. Experiments show that this method can effectively protect face privacy without affecting the execution effect of downstream tasks. The second scheme is a three-party privacy protection method for cloud service scenarios, covering trusted third parties, user-side embedded systems, and cloud service providers. The user side uses the FlowGMM model and rotation encryption algorithm to encrypt data, and the cloud provides analysis and processing and model retraining services. Experiments have verified the good balance between privacy and usability of this scheme. To address the challenge of insufficient computing power of embedded systems, this project conducts experiments on the NVIDIA Jetson hardware platform, optimizes the rotation encryption algorithm and deep learning model, realizes image privacy protection in real-world scenarios, and verifies the feasibility of the scheme through encryption speed and power consumption tests. These solutions provide new ideas for solving the problem of image privacy protection, taking into account privacy, security, and usability.