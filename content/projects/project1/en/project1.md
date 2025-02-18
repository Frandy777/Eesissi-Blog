---
title: "Large Language Models + Graph Neural Networks"
description: "A method for predicting congressional voting results based on large language models and hypergraphs, combining GNN and LLM technologies for behavior prediction and information propagation analysis in social networks."
order: 1
---

# 1. Large Language Models + Graph Neural Networks

<img src="/images/projects/pj_1.jpg" />

<center>Figure 1: Overall Framework of U.S. Congressional Senator Voting Model</center>

**Project Description**: Voting is the foundation of democratic politics and the main mechanism for expressing public opinion and formulating policies. In the U.S. Congress, members participate in the decision-making process by drafting and co-sponsoring proposals and voting on various bills. These votes not only reflect the personal positions of the members but also reflect party interests and policy priorities. In today's globalized world, U.S. Congressional decisions often have international influence. To understand the voting tendencies and behavior patterns of members in the decision-making process, we propose a method for predicting congressional voting results based on large language models and hypergraphs, as shown in Figure 1:

1. First, based on information about senators co-sponsoring proposals, we use hypergraphs to construct senator features, improving upon the GCN model's limitation of only being able to model point-to-point relationships between members;
2. Next, we introduce a large language model, incorporating bill text information and voting prediction tasks into prompts, while using a simple and efficient solution to map graph data to the large language model space, enabling LLM to understand hypergraph representations;
3. Combining prompts with senators' graph embeddings as input to a pre-trained LLM (such as LLaMA), we obtain new feature representations rooted in the LLM's existing knowledge, not only improving the LLM's understanding of the associations between senators and bills but also exploring the potential of existing large language models in voting prediction problems.

This technology can be used for predicting behavior in social networks, assessing important information propagation, predicting harmful messages, and more.