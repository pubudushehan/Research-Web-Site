# SEMANTIC-AWARE EMOTIONAL TEXT-TO-SPEECH FOR

# SINHALA:

# A SINGLE-SPEAKER DEEP LEARNING APPROACH

```
By
S.P.A.S. Jayasiri, K.A.P.S. Karunarathna, A.V.N.J. Pemarathna
```
```
Research Thesis
```
```
BICT Honours Degree 2026
```

```
ii
```
##### SEMANTIC-AWARE EMOTIONAL TEXT-TO-SPEECH FOR SINHALA:

##### A SINGLE-SPEAKER DEEP LEARNING APPROACH

**Research Students**

S.P.A.S. JayasiriSoftware Technology Stream (^)
Department of Information and Communication Technology
Faculty of Technology, University of Sri Jayewardenepura
Index No: ICT/21/
Email: ict21860@fot.sjp.ac.lk
K.A.P.S. Karunarathna
Software Technology Stream
Department of Information and Communication Technology
Faculty of Technology, University of Sri Jayewardenepura
Index No: ICT/21/867Email: ict21867@fot.sjp.ac.lk (^)
A.V.N.J. Pemarathna
Multimedia Technology Stream
Department of Information and Communication Technology
Faculty of Technology, University of Sri JayewardenepuraIndex No: ICT/21/
Email: ict21896@fot.sjp.ac.lk
**Main Supervisor**
Dr. Prabhani Liyanage
Senior Lecturer (Grade II)Faculty of Technology, University of Sri Jayewardenepura (^)
Email: prabani@sjp.ac.lk
**Co-Supervisor**
Akalanka Panapitiya
LecturerFaculty of Technology, University of Sri Jayewardenepura (^)
Email: akalankap@sjp.ac.lk
**Co-Supervisor**
Nirasha Kulasooriya
LecturerFaculty of Technology, University of Sri Jayewardenepura (^)
Email: nirashakulasooriya@sjp.ac.lk


```
iii
```
## Declaration

We hereby certify that this thesis does not incorporate, without acknowledgement, any
material previously submitted for a degree or diploma in any university and, to the best of
our knowledge and belief, it does not contain any material previously published or written
by another person except where due reference is made in the text.

Date: ...........................

```
Group Members S.P.A.S. Jayasiri
K.A.P.S. Karunarathna
A.V.N.J. Pemarathna
```
```
Supervisors Dr. Prabhani Liyanage
(Main Supervisor)
Akalanka Panapitiya
(Co-Supervisor)
Nirasha Kulasooriya
(Co-Supervisor)
```

```
iv
```
## Acknowledgement

This thesis represents a major academic milestone in the Bachelor of Information and
Communication Technology Honours degree programme offered by the Faculty of
Technology, University of Sri Jayewardenepura. The research journey demanded sustained
effort in literature review, dataset construction, semantic modelling, speech processing,
experimentation, and documentation.
The research team expresses sincere gratitude to the main supervisor, Dr. Prabhani
Liyanage **,** for continuous guidance, constructive feedback, and encouragement throughout
the project. Her insights helped refine the research problem, strengthen the methodology,
and maintain the academic quality of the work from proposal stage to final thesis.
Heartfelt thanks are also extended to Kulasooriya **,** co-supervisors of the project, for their technical feedback, practical Mr. Akalanka Panapitiya and Ms. Nirasha
suggestions, and critical observations during discussions on data collection, semantic
emotion analysis, model design, and presentation preparation. Their comments significantly
improved both the research direction and the implementation.
The authors are grateful to the and the Project Evaluation Panel (PEP)Project Administration and Evaluation Committee (PAEC) for providing a clear evaluation framework,
structured milestones, and timely feedback that helped keep the project aligned with
departmental expectations. Appreciation is also due to the Department of ICT and the
Faculty of Technology for providing the academic environment and facilities necessary to
carry out this research.
Special thanks are offered to the voice participant Mr. S Kavindu Rasanjana Senadheera
who contributed invaluable time and effort during multiple recording sessions, as well as to
all individuals who assisted with reviews, validation, and technical troubleshooting.
Finally, the authors thank their families and friends for their patience, understanding, and
continuous encouragement throughout the demanding phases of this research.


```
v
```
# Table of Contents

Declaration ............................................................................................................................ iii
Acknowledgement............................................................................................................. iv
List of Tables......................................................................................................................... ix
List of Abbreviations.......................................................................................................... x
Abstract ............................................................................................................................. xi

1. Introduction and Background ............................................................................................. 1
    1.1 Background of the Study .............................................................................................. 1
    1.2 Research Problem......................................................................................................... 2
    1.3 Main Objective and Specific Objectives ...................................................................... 3
    1.4 Scope and Delimitations .............................................................................................. 4
    1.5 Significance of the Research ........................................................................................ 4
    1.6 Thesis Organization ..................................................................................................... 5
2. Literature Review ............................................................................................................... 6
    2.1 Introduction .................................................................................................................. 6
    2.2 Neural TTS Architectures and Foundational Models .................................................. 6
    2.3 Emotional TTS and Prosody Control ........................................................................... 9
    2.4 Style-BERT-VITS2 and the Voice Generation Pipeline ............................................ 11
    2.5 Natural Language and Semantic Emotion Control in TTS ........................................ 14
    2.6 Retrieval-Augmented Generation and Synthetic Data Pipelines for Low- ................ 16
       2.6.1 Foundations of Retrieval-Augmented Generation .............................................. 16
       2.6.2 Few-Shot Synthetic Data Generation via Dynamic Prompting .......................... 17
       2.6.3 Domain-Specific RAG Data Generation at Scale ............................................... 18
       2.6.4 Self-Reflective Validation of Generated Outputs ............................................... 19


## vi



viii

      - 2.6.5 RAG-Based Synthetic Data Generation for Non-English Languages
      - 2.6.6 Automated Evaluation of RAG Pipelines
      - 2.6.7 Synthesis and Implications for the Present Study
   - 2.7 Low-Resource TTS Strategies and Transfer Learning
   - 2.8 Sinhala Text-to-Speech: Existing Work and Limitations
   - 2.9 Grapheme-to-Phoneme Conversion for Multilingual and Low-Resource Settings
   - 2.10 Sinhala Speech Corpora and Data Resources
   - 2.11 Emotion Recognition and Semantic Emotion Analysis
   - 2.12 Ontology-Based and Frame-Based Emotion Representation
   - 2.13 Research Gaps
- 3. Methodology
   - 3.1 Research Design Overview
   - 3.2 Text Data Collection
   - 3.3 Voice Recording and Corpus Construction
   - 3.4 Audio Preprocessing
   - 3.5 Semantic Emotion Analysis Framework
   - 3.5.1 Sinhala Emotion Ontology
   - 3.5.2 Context-Aware LaBSE Classification.....................................................................
   - 3.6 Emotional Speech Generation Model
   - 3.7 Evaluation Plan
   - 3.8 Ethical Considerations
- 4. Experimental Plan / System Design Overview
   - 4.1 High-Level Architecture
   - 4.2 Training Phase
   - 4.3 Inference Phase vii
   - 4.4 Component Integration...............................................................................................
   - 4.5 Implementation Environment and Tools
- 5. Results and Evaluation
   - 5.1 Completed Outputs
   - 5.2 Qualitative Findings
   - 5.3 Planned Quantitative Evaluation
- 6. Discussion
- 7. Conclusion
- 8. Limitations and Future Work
   - 8.1 Limitations
   - 8.2 Future Work
- 9. References
- 10. Appendices
- Figure 1 :Part of literature summery Table of Figures
- Figure 2 : Text data (SEED data)
- Figure 3 : RAG-based synthetic data generation architecture
- Figure 4 : Audio enhancement example using Adobe Audio Enhancer
- Figure 5 : Hybrid ontology-plus-LaBSE emotion detection workflow
- Figure 6 : Sinhala Emotion Ontology output example.........................................................
- Figure 7 : LaBSE-based emotion detection architecture......................................................
- Figure 8 : LaBSE-based emotion detection output example
- Figure 9 : Participant consent form
- Figure 10 : High level Architecture
- Figure 11 Result of Ontology
- Figure 12 : Result of Classification ML Model
- Figure 13 : MOS result for Style-bert-vits2 model


```
ix
```
## List of Tables

Table 1: Major components and tools used in the system design ........................................ 49


```
x
```
## List of Abbreviations

ERC – Ethics Review Committee
ETTS – Emotional Text-to-Speech
GPU – Graphics Processing Unit
LaBSE – Language-Agnostic BERT Sentence Embedding
MCD – Mel-Cepstral Distortion
MOS – Mean Opinion Score
NLP – Natural Language Processing
PCM – Pulse-Code Modulation
RAG – Retrieval-Augmented Generation
SEO – Sinhala Emotion Ontology
TTS – Text-to-Speech
WAV – Waveform Audio File Format


```
xi
```
## Abstract

Sinhala text-to-speech technology remains underdeveloped compared to speech technologies
for high-resource languages, especially in terms of emotional expressiveness. Existing
Sinhala TTS systems primarily focus on intelligibility and neutral prosody and do not
automatically interpret or express the emotional meaning embedded in text. This thesis
addresses that limitation by proposing a semantic-aware emotional text-to-speech system for
Sinhala using a single-speaker deep learning approach.

The central idea is to generate emotionally appropriate speech by deriving emotion from
semantic content rather than relying on manual emotion labels at inference time. The
proposed pipeline combines several components: emotionally oriented Sinhala text dataset
creation, single-speaker voice recording, audio preprocessing, a Sinhala Emotion Ontology
for rule-based semantic inference, a contextual deep learning classifier based on LaBSE
sentence embeddings, and an emotional speech synthesis stage currently implemented
through fine-tuning of Style-BERT-VITS2.

The text pipeline begins with a manually curated seed dataset and expands it via a RAG-
based workflow using large language models and a vector database for similarity control,
followed by human validation. The audio pipeline comprises controlled single-speaker
recording, noise reduction, normalization, and preparation of training metadata. Semantic
processing is handled by a hybrid framework that combines frame-based ontology rules and
embedding-based contextual classification.


```
xii
```
By the current stage of the project, the team has completed text data creation and
expansion, emotion-aware voice recording, preprocessing, ontology construction, and
preparation of the emotion-detection model, while final end-to-end synthesis experiments
and formal MOS-based evaluations are ongoing. The work aims to provide a culturally
relevant and technically practical foundation for emotionally expressive Sinhala speech
technology and to contribute to the broader field of low-resource emotional TTS.


## 1. Introduction and Background

**1.1 Background of the Study**

Text-to-Speech (TTS) technology acts as a bridge between digital text and human auditory
perception, supporting applications in education, accessibility, public information systems,
conversational agents, and assistive technologies for visually impaired users. Over the last
decade, TTS systems have transitioned from rule-based and concatenative techniques to
neural architectures capable of producing natural and fluent speech.

Despite this progress, many low-resource languages remain underrepresented in advanced
TTS research. Sinhala, spoken by millions of people in Sri Lanka, is one such language.
Available Sinhala TTS systems mainly target intelligibility and basic pronunciation and often
generate neutral, monotonic speech that lacks expressive prosody. This is a critical limitation
in scenarios where emotional nuance affects comprehension, engagement, or user
experience, such as audiobooks, educational content, and conversational interfaces.

Emotional speech synthesis aims to produce speech that reflects not only the lexical content
but also the intended affective state. Many existing emotional TTS systems rely on explicit
emotion labels or reference audio clips at inference time, which is impractical for dynamic,
real-world content where emotion is implicit in the text rather than annotated externally. This
research is motivated by the need for a Sinhala TTS system that can infer and express
emotional context directly from text semantics.


**1.2 Research Problem**

The fundamental research problem is the semantic–emotional disconnect in current Sinhala
TTS systems. Present systems largely operate as neutral phonetic converters: they transform
text into speech without modelling emotional intent, resulting in output that sounds flat and
emotionally uninformative. This can be decomposed into three main challenges:

1. **Automated Emotion Detection Gap**
    There is no widely adopted framework that automatically derives emotional context
    from Sinhala text without manual annotation. Available systems typically depend
    on pre-specified emotion labels or neutral-only speech.
2. **Culturally Appropriate Prosody Mapping**
    Sinhala-specific emotional prosody patterns - how pitch, duration, energy, and
    timing change under different emotions are not systematically modelled in existing
    architectures.
3. **Integration Architecture Limitations**
    There is no integrated end-to-end pipeline that seamlessly connects Sinhala text
    understanding, emotion inference, and emotional speech generation.

These deficiencies reduce the usefulness of Sinhala TTS in applications that rely on
expressive communication, including screen readers, educational platforms, and
conversational AI for Sinhala-speaking users.


**1.3 Main Objective and Specific Objectives**

**Main Objective**
To design, develop, and evaluate an intelligent single-speaker emotional text-to-speech
system for Sinhala that automatically generates contextually appropriate emotional prosody
based on semantic content analysis using advanced deep learning architectures.

**Specific Objectives**

1. To create and validate a specialised Sinhala emotional speech corpus containing high-
    quality single-speaker recordings and a semantically rich text dataset covering four
    primary emotions (happy, sad, angry, neutral).
2. To develop a Sinhala-specific semantic-emotion analysis framework that can
    automatically derive emotional context from text using semantic analysis, sentiment
    cues, and contextual inference without manual annotation.
3. To design and train an emotional acoustic modelling pipeline in which semantic-
    aware emotion embeddings condition prosody prediction and expression.
4. To implement a high-fidelity waveform synthesis or end-to-end model (Style-BERT-
    VITS2) that preserves emotional nuance and natural voice characteristics in
    synthesized Sinhala speech.
5. To evaluate the overall system using objective signal-based metrics and subjective
    human judgements (MOS and emotion appropriateness) focusing on intelligibility,
    naturalness, and semantic-prosody alignment.


**1.4 Scope and Delimitations**

The study focuses on a single professional Sinhala speaker in order to control vocal
characteristics and concentrate on emotional modelling, semantic analysis, and prosody
control without the complexity of multi-speaker adaptation. The emotional palette is limited
to four primary emotions - happy, sad, angry, and neutral which provides a tractable yet
meaningful set for both modelling and evaluation.

Several related areas are deliberately excluded: automatic speech recognition, dialogue
management, multilingual synthesis, and broad multi-speaker generalisation. The research
strictly focuses on the pipeline from Sinhala text input through semantic-emotion analysis to
emotional speech generation.

**1.5 Significance of the Research**

Practically, the research supports the development of more natural Sinhala speech interfaces,
with potential impact on digital inclusion, assistive technologies, and localised
conversational AI applications. Academically, it contributes to the growing body of work on
low-resource emotional speech synthesis by:

- Proposing a semantic-aware TTS framework tailored to Sinhala.
- Introducing a Sinhala emotional speech corpus.
- Demonstrating a hybrid ontology-plus-embedding approach to emotion detection.
- Integrating semantic analysis with modern expressive speech models.


The methodology and architectural decisions are also transferable to other underrepresented
languages that face similar challenges in emotional data availability and cultural modelling.

**1.6 Thesis Organization**

The thesis is organised as follows.

- **Chapter 1** presents the introduction, research problem, objectives, scope, and
    significance.
- **Chapter 2** reviews literature on emotional TTS, low-resource speech technology,
    semantic modelling, and ontology-based emotion representation.
- **Chapter 3** describes the research methodology, including dataset creation,
    preprocessing, semantic analysis, and model design.
- **Chapter 4** outlines the project timeline and major milestones.
- **Chapter 5** explains the system architecture and experimental/system design.
- **Chapter 6** discusses current outputs and the evaluation strategy.
- **Chapter 7** provides a broader discussion of the research contributions and challenges.
- **Chapter 8** concludes the thesis
- **Chapter 9** outlines limitations and future work.


## 2. Literature Review

**2.1 Introduction**
The development of a semantically-aware emotional text-to-speech (TTS) system for the Sinhala
language occupies the intersection of several active and rapidly evolving research areas. These
include neural speech synthesis, emotional prosody modelling, grapheme-to-phoneme conversion,
low-resource language adaptation, speech corpus construction, semantic emotion representation, and
retrieval-augmented synthetic data generation. Because this study is interdisciplinary, its literature
review must address not only the technical architectures underpinning modern TTS but also the
linguistic, semantic, and data-related challenges specific to Sinhala. This chapter organises the review
into ten thematic sections: neural TTS architectures and foundational vocoders; emotional TTS and
prosody control; Style-BERT-VITS2 and the voice generation pipeline; natural language-driven and
semantic emotion control; retrieval-augmented generation and synthetic data pipelines for low-
resource settings; low-resource TTS strategies and transfer learning; Sinhala TTS and the current
state of development; grapheme-to-phoneme conversion for multilingual settings; Sinhala speech
corpora and data resources; and emotion recognition from text and speech. The chapter concludes by
identifying the specific research gaps that the present study is designed to address.

**2.2 Neural TTS Architectures and Foundational Models**
Modern neural TTS has evolved through a succession of increasingly capable architectures, each
addressing limitations of its predecessors. An understanding of this progression is essential for
situating the design choices of the present system.
The foundational contribution to neural audio generation was made by van den Oord et al. (2016),
who introduced WaveNet, an autoregressive deep neural network based on dilated causal
convolutions and gated activation units capable of generating raw audio waveforms at over 16,


samples per second. WaveNet established unprecedented naturalness benchmarks and demonstrated
multi-speaker capability through global and local conditioning mechanisms, laying the groundwork
for all subsequent neural vocoding research. However, its sequential generation process made real-
time inference computationally prohibitive, a limitation that motivated subsequent parallel
approaches.
Building directly on WaveNet, Shen et al. (2018) proposed Tacotron 2, a two-component system in
which a recurrent sequence-to-sequence network with attention predicts mel-spectrograms from input
characters, followed by a modified WaveNet vocoder conditioned on those spectrograms. Tacotron
2 achieved a mean opinion score (MOS) of 4.526 compared to a human speech MOS of 4.582 on an
internal US English dataset, representing the first neural TTS system to approach human-level
naturalness. Despite this achievement, Shen et al. (2018) noted limitations including occasional
mispronunciations and unnatural prosody on long or out-of-domain inputs. These limitations
highlighted the need for non-autoregressive approaches that could offer both speed and robustness.
The non-autoregressive paradigm was significantly advanced by Ren et al. (2020), who proposed
FastSpeech 2. Unlike its predecessor, FastSpeech 2 eliminates the teacher-student distillation pipeline
and trains directly on ground-truth mel-spectrograms, introducing a variance adaptor that explicitly
predicts pitch using continuous wavelet transforms (CWT), energy, and duration using ground-truth
alignment from the Montreal Forced Aligner (MFA). On the LJSpeech dataset, FastSpeech 2 achieved
a MOS of 3.83, outperforming Tacotron 2 at 3.70, while providing a 47.8-fold inference speedup over
autoregressive Transformer TTS. Crucially for the present research, the explicit modelling of pitch
and energy in FastSpeech 2 makes it particularly amenable to emotional conditioning, since these
acoustic dimensions are the primary carriers of emotional expression in speech.
A complementary contribution was made by Kim et al. (2020), who introduced Glow-TTS, a flow-
based generative model that learns monotonic text-speech alignment internally through a dynamic
programming monotonic alignment search (MAS) algorithm, eliminating the dependency on external


alignment tools. Glow-TTS achieved a MOS of 4.01 and synthesised speech 15.7 times faster than
Tacotron 2, while also demonstrating robustness on utterances of up to 800 characters a practical
advantage for processing longer Sinhala sentences. The flow-based architecture additionally enables
controllable pitch and speaking rate, which are relevant properties for the emotional conditioning
envisioned in this study.
End-to-end TTS was brought to parity with two-stage systems by Kim, Kong, and Son (2021), who
proposed VITS (Variational Inference with adversarial learning for end-to-end TTS). VITS employs
a conditional variational autoencoder (VAE) with normalising flows and a stochastic duration
predictor, achieving a MOS of 4.05 on LJSpeech statistically comparable to the reference recording
MOS of 4.32 without any intermediate spectrogram representation. The stochastic duration predictor
in VITS models the natural one-to-many relationship between text and speech, producing diverse and
naturally varied rhythm. This property is particularly relevant to emotional synthesis, where the same
text may be delivered with markedly different timing depending on the intended emotion.
Furthermore, the VAE latent space in VITS provides a principled mechanism for uncertainty
modelling that has direct applicability to emotional intensity variation.
More recently, Li et al. (2023) proposed StyleTTS 2, which combines style diffusion with adversarial
training using large pre-trained speech language model (SLM) discriminators based on WavLM and
HuBERT representations. StyleTTS 2 became the first TTS system to surpass human recordings on
the LJSpeech benchmark (CMOS +0.28 relative to human speech) and achieved human parity on
VCTK (CMOS -0.02). Its style diffusion mechanism enables highly expressive synthesis and sets the
current state of the art for single and multi-speaker TTS quality.
On the vocoder side, Kong, Kim, and Bae (2020) demonstrated with HiFi-GAN that generative
adversarial networks (GANs) could match the quality of autoregressive and flow-based vocoders
while offering dramatic efficiency gains. HiFi-GAN employs a multi-period discriminator (MPD)
with periods {2, 3, 5, 7, 11} and a multi-scale discriminator (MSD) to model the periodic structure


inherent in speech audio. The full-quality HiFi-GAN V1 achieved a MOS of 4.36, compared to
WaveGlow at 3.81 and MelGAN at 3.79, at 167.9 times faster than real-time synthesis speed. A
compact variant with only 0.92 million parameters achieved a MOS of 4.05 while running at 13.44
times real-time on CPU, making on-device deployment feasible. HiFi-GAN is now the de facto
standard vocoder in most modern TTS pipelines, including the systems reviewed throughout this
chapter, and is incorporated as the vocoder component within the Style-BERT-VITS2 framework
used in the present study.
Collectively, these foundational architectures FastSpeech 2, VITS, VITS2, StyleTTS 2, and HiFi-
GAN represent the technical ecosystem within which the present Sinhala emotional TTS system is
designed.

### 2.3 Emotional TTS and Prosody Control

The addition of emotional expressiveness to TTS systems introduces significant complexity beyond
neutral speech synthesis, requiring models to capture and reproduce the acoustic dimensions that
communicate emotional state to a listener. This section reviews the primary approaches to emotional
TTS and their respective strengths and limitations.
A large body of research has established that pitch, energy, speaking rate, and spectral characteristics
are the primary acoustic correlates of emotional expression in speech (Sailunaz et al., 2018). Given
that FastSpeech 2 already models pitch and energy explicitly through its variance adaptor, several
researchers have extended this framework for emotional conditioning. Diatlova and Shutov (2023)
proposed EmoSpeech, a set of sequential modifications to FastSpeech 2 specifically designed for
emotional speech synthesis. EmoSpeech introduces three key components: an eGeMAPS acoustic
feature predictor that estimates parameters from the extended Geneva Minimalistic Acoustic
Parameter Set; a Conditional Layer Normalization (CLN) mechanism for speaker and emotion


conditioning; and a Conditional Cross-Attention (CCA) module that distributes emotional intensity
non-uniformly across phoneme sequences. This last contribution is particularly important: Diatlova
and Shutov (2023) observed that emotions are not distributed uniformly across an utterance, with
surprise-conditioned outputs emphasising sentence endings and sadness-conditioned outputs peaking
mid-sentence. EmoSpeech achieved a MOS of 4.37 and an emotion recognition accuracy of 83%,
significantly outperforming the baseline FastSpeech 2 MOS of 3.74. However, the study was limited
to English using the Emotional Speech Database (ESD) with 1,750 utterances from 10 speakers, and
its authors acknowledged that the test set of only 14 utterances introduces potential evaluation bias.
A different approach to continuous emotional control was explored by Cho et al. (2024), who
proposed EmoSphere-TTS. Rather than relying on discrete emotion category labels, EmoSphere-TTS
extracts arousal, valence, and dominance (AVD) pseudo-labels automatically from speech using a
wav2vec 2.0-based speech emotion recognition model, then transforms these into a spherical
coordinate representation where the radial distance encodes emotional intensity and the angular
coordinates encode emotional style. A dual conditional adversarial training strategy with emotion-
conditioned and speaker-conditioned discriminators further improves synthesis quality. EmoSphere-
TTS achieved an emotion recognition accuracy of 85% on synthesised speech and a MOS of 4.2,
comparable to the reference MOS of 4.3. Crucially, the spherical space enabled the modelling of eight
distinct emotional styles through octant quantisation, providing finer-grained control than discrete-
label systems. Cho et al. (2024) acknowledged, however, that the AVD pseudo-labels may contain
errors propagated from the underlying speech emotion recognition model, and that octant quantisation
still reduces the granularity of truly continuous emotional control.
Comparing these two approaches, EmoSpeech (Diatlova & Shutov, 2023) offers practically high
performance with discrete emotion labels and is computationally efficient by virtue of its FastSpeech
2 base, while EmoSphere-TTS (Cho et al., 2024) offers theoretically richer emotional modelling at
the cost of additional complexity and potential annotation error. For the present Sinhala system, which


derives emotional labels automatically from semantic text analysis, the discrete emotion label
interface of the present pipeline aligns more naturally with the style conditioning input mechanism
of Style-BERT-VITS2, as described in the following section.
Beyond prosody modelling, Wang et al. (2023) introduced VALL-E, which reframes TTS entirely as
a conditional language modelling task over discrete neural audio codec codes produced by EnCodec.
Trained on 60,000 hours of English speech from the LibriLight dataset, VALL-E demonstrated strong
zero-shot speaker adaptation and was observed to preserve the emotional tone and acoustic
environment of a three-second speaker reference prompt during synthesis. VALL-E achieved a
speaker similarity score of 0.93 relative to the YourTTS baseline on LibriSpeech. While VALL-E's
scale makes it unsuitable for direct application to Sinhala given current data constraints, its
demonstration that emotional characteristics can be preserved through discrete audio codec
representations has important implications for the design of expressive synthesis systems.

**2.4 Style-BERT-VITS2 and the Voice Generation Pipeline**
The voice generation component of the present system is built upon Style-BERT-VITS2, an open-
source multi-speaker TTS framework that integrates BERT-based semantic conditioning with an
improved VITS2 acoustic backbone (Litagin, 2023). Understanding this architecture requires
examining its three constituent foundations: the BERT language model that provides semantic text
representations, the VITS2 generative model that performs end-to-end speech synthesis, and the
Style-BERT-VITS2 integration that enables fine-grained style and emotion conditioning.
The semantic conditioning capability of Style-BERT-VITS2 depends critically on the text encoder
derived from BERT (Bidirectional Encoder Representations from Transformers), introduced by
Devlin et al. (2019). BERT employs a masked language modelling pre-training objective over
bidirectional transformer encoder stacks, enabling it to learn deep contextual representations of text


that encode semantic, syntactic, and pragmatic information simultaneously. Unlike unidirectional
language models that process text left-to-right, BERT's bidirectional attention allows each token's
representation to be conditioned on the entire surrounding context a property directly relevant to
emotion-aware TTS. In emotional speech synthesis, the emotional colouring of a given word is
frequently determined by its surrounding context rather than by its surface form alone, a property that
keyword-based emotion detection cannot capture but that BERT representations encode implicitly.
The integration of BERT-derived text embeddings into the TTS acoustic model therefore allows
prosodic predictions to reflect the semantic context of the entire utterance rather than individual words
in isolation. This property is directly exploited by the present system, where the emotion label derived
from ontology-based and centroid-vector semantic analysis is passed into the Style-BERT-VITS2
model alongside BERT-conditioned text representations, enabling the acoustic model to generate
prosody that is coherent with both the predicted emotion class and the full semantic content of the
input utterance.
The second foundational component is VITS2, proposed by Kong et al. (2023) as a direct
improvement over the original VITS architecture of Kim, Kong, and Son (2021). VITS2 retains the
conditional variational autoencoder (CVAE) with normalising flows that gave VITS its expressive
latent space, and the stochastic duration predictor that models natural variation in speech rhythm. The
key improvements introduced in VITS2 are a transformer block-based duration predictor, which
provides superior modelling of long-range durational dependencies relative to the dilated convolution
blocks used in original VITS, and an enhanced posterior encoder that uses windowed attention to
improve alignment between text and speech latent representations. These modifications improve the
naturalness of synthesised speech and reduce the tendency toward over-smoothed prosody that
characterised earlier parallel TTS architectures. For emotional TTS, the improved duration modelling
of VITS2 is particularly important: emotional speech is characterised not only by pitch and energy
variation but by systematic differences in phoneme-level timing elongated vowels in sadness,


compressed syllables in anger, strategic pauses in emphatic speech. The stochastic duration predictor
in VITS2 can represent these timing patterns more naturally than deterministic alternatives, and the
CVAE latent space provides a principled mechanism for uncertainty quantification in the mapping
from emotion label to acoustic realisation, acknowledging that a given emotion class may be realised
through multiple distinct prosodic strategies.
The Style-BERT-VITS2 framework (Litagin, 2023) combines these two components into a unified
multi-speaker TTS system by augmenting the VITS2 acoustic model with BERT-derived style
embeddings and an explicit style vector conditioning mechanism. The framework accepts as input
both the text to be synthesised and a style specification — which may be a reference audio segment,
a style embedding vector, or a discrete style label — and conditions the VITS2 decoder on this style
information through cross-attention layers that distribute the style signal non-uniformly across the
phoneme sequence. This non-uniform style conditioning is conceptually analogous to the Conditional
Cross-Attention mechanism described by Diatlova and Shutov (2023) in EmoSpeech, where
emotional intensity was found to peak at different positions within an utterance depending on the
target emotion class. In Style-BERT-VITS2, the cross-attention mechanism learns to distribute the
style conditioning signal at positions where it most affects the acoustic output, enabling fine-grained
prosodic control without requiring per-phoneme style annotations during training.
In the workflow of the present research, the complete pipeline operates as follows: an input Sinhala
text string is first processed by the semantic emotion detection module, which applies ontology-based
keyword matching to identify candidate emotions from a structured emotion ontology. For utterances
where keyword matching yields ambiguous or null results, LaBSE (Language-Agnostic BERT
Sentence Embeddings) representations of the input text are generated and compared against pre-
computed emotion class centroid vectors using cosine similarity, with the most similar centroid
determining the final emotion class label. This label is then passed to the fine-tuned Style-BERT-


VITS2 model as the style conditioning input alongside the Sinhala input text, and the model generates
a speech waveform whose prosody is conditioned on the predicted emotion class.
Style-BERT-VITS2 is fine-tuned on the Sinhala emotional speech corpus constructed as part of this
study, following the transfer learning strategy established by Tits, El Haddad, and Dutoit (2019) for
low-resource emotional TTS beginning from a pre-trained multilingual checkpoint rather than
random initialisation. This choice is empirically motivated by the significant performance gap
between pre-trained and randomly initialised models demonstrated across multiple low-resource TTS
studies (Tits et al., 2019; Amalas et al., 2024). This architecture directly addresses the emotion-
content cognitive challenge identified by Abilbekov et al. (2024) in their KazEmoTTS study, where
manually assigned emotion labels could conflict with the semantic content of the text being
synthesised. Because the emotion label in the present system is derived directly from the semantic
content of the input text rather than assigned externally, the style conditioning signal presented to
Style-BERT-VITS2 is inherently coherent with the utterance content, reducing the likelihood of
prosodically incongruent synthesis. The combination of LaBSE-based semantic emotion inference
with Style-BERT-VITS2's contextually distributed style conditioning thus provides a more coherent
end-to-end pipeline than the disjoint label-handover architectures characterised by Tits et al. (2019)
as a persistent limitation of the low-resource emotional TTS literature.

**2.5 Natural Language and Semantic Emotion Control in TTS**
A significant limitation shared by most emotional TTS systems reviewed above is their reliance on
manually specified, discrete emotion labels as input. In real-world applications, emotion labels are
rarely known in advance and must be inferred from the content of the text to be synthesised. This gap
between natural language understanding and speech generation is central to the motivation of the
present study, and a small but growing body of literature has begun to address it.


Bott, Lux, and Vu (2024) proposed a Conformer-based TTS system conditioned on emotionally rich
natural language prompts. Rather than requiring the user or system to specify a discrete emotion label,
the system accepts descriptive text prompts encoded using DistilRoBERTa embeddings and
integrated into the acoustic model through conditional layer normalisation and squeeze-and-
excitation blocks. The system was trained using a two-stage curriculum: an initial stage on merged
emotional and neutral datasets, followed by a focused stage on emotional data with random prompt
selection to promote generalisation. On the ESD, RAVDESS, and TESS corpora totalling 605.16
hours, the system achieved an emotion recognition Cramér's V of 0.80 compared to a ground truth of
0.85, a MOS of 3.37, and near-perfect speaker identity preservation at a similarity score of 0.953.
Emotional style transfer was rated between 4.19 and 4.27 out of 5.0 across different emotion
categories. Bott et al. (2024) demonstrated that natural language prompts can replace discrete emotion
labels without degrading either emotional expressiveness or speech naturalness, a finding that directly
supports the semantic approach taken in the present study.
Yang et al. (2025) extended this concept further with EmoVoice, which employs a large language
model backbone (Qwen2.5-0.5B) to accept freestyle natural language emotion descriptions as input.
EmoVoice's key innovation is a phoneme-boost design that predicts semantic audio tokens and
phoneme tokens in parallel, improving content consistency while enabling fine-grained emotional
control specified through open-ended text descriptions. The system was pre-trained on 2,500 hours
of synthetic speech and fine-tuned on EmoVoice-DB, a 40-hour English emotional speech dataset
synthesised using GPT-4o-audio with fine-grained emotion labels. EmoVoice achieved state-of-the-
art results on both the English EmoVoice-DB test set and the Chinese Secap benchmark,
demonstrating cross-lingual generalisation of the LLM-based approach. Importantly, Yang et al.
(2025) also conducted a systematic investigation of emotion evaluation metrics, finding that
emotion2vec has constrained resolution and that SBERT similarity is unreliable for fine-grained
emotion assessment, while multimodal LLMs such as GPT-4o-audio show better alignment with


human preferences. This methodological contribution has direct implications for the evaluation
framework of the present study.
Taken together, Bott et al. (2024) and Yang et al. (2025) demonstrate that semantic, text-driven
emotion control in TTS is not only feasible but achieves competitive or superior results compared to
discrete-label approaches. However, both systems were developed and evaluated exclusively on
English and Chinese data. The present study seeks to extend this semantic emotion control paradigm
to Sinhala, a language for which no equivalent system currently exists.

**2.6 Retrieval-Augmented Generation and Synthetic Data Pipelines for Low-**

**2.6.1 Foundations of Retrieval-Augmented Generation**

The RAG paradigm was introduced by Lewis et al. (2020), who proposed combining a pre-trained
parametric language model with a non-parametric dense retrieval component to enable access to
external knowledge dynamically at generation time. Their system indexed 21 million Wikipedia
passages in a FAISS dense vector store using Dense Passage Retrieval (DPR), and at inference time
retrieved the top-k relevant passages for any given input, concatenating these with the input as context
for a BART-based sequence-to-sequence generator. Two variants were proposed: RAG-Sequence,
which uses the same retrieved passages across an entire output sequence, and RAG-Token, which
permits different passages to condition different output tokens. Lewis et al. (2020) demonstrated that
RAG outperforms purely parametric sequence-to-sequence models on all evaluated open-domain
question answering tasks, generates more specific and factually accurate text, and crucially allows
knowledge updates without retraining simply by updating the external index. This last property is
directly relevant to the present study: because standard LLMs have limited exposure to Sinhala text
during pre-training, the RAG knowledge base provides the generation model with Sinhala-specific
emotional vocabulary and contextual examples dynamically at generation time, compensating for the


parametric knowledge gap without requiring full model retraining. The architecture of Lewis et al.
(2020) vector index plus retriever plus generator — is the direct foundation upon which the present
synthetic data pipeline is constructed, and this paper has accumulated over 10,000 citations, attesting
to the breadth of adoption of this paradigm across the NLP research community.

**2.6.2 Few-Shot Synthetic Data Generation via Dynamic Prompting**
The challenge of generating high-quality domain-specific training data with minimal human
annotation was directly addressed by Dai et al. (2022) in their Promptagator framework. Motivated
by the prohibitive cost of collecting thousands of manually labelled query-document pairs for domain-
specific dense retrieval, Dai et al. (2022) demonstrated that as few as eight human-labelled seed
examples per task when combined with LLM-based dynamic prompting and a round-trip consistency
filter can produce synthetic training datasets that match or exceed the performance of models trained
on over 50,000 human annotations. The Promptagator pipeline operates in five stages: first, a small
number of seed examples are provided; second, a large unlabelled corpus is indexed in a retrieval
store; third, GPT-3 is prompted with task-specific dynamic prompts to generate synthetic queries for
each indexed document; fourth, a round-trip consistency validator filters out generated queries that
cannot retrieve their source document; and fifth, a dense retriever is trained on the resulting synthetic
data. Evaluated across 18 tasks from the BEIR benchmark spanning legal, medical, news, and
argument retrieval domains, Promptagator demonstrated that task-specific dynamic prompting is
critical generic prompts produce substantially lower quality output and that the round-trip filtering
step significantly improves the quality of synthetic data by removing semantically inconsistent
examples. The direct relevance of Promptagator to the present study is substantial: the present Sinhala
synthetic data pipeline mirrors this architecture exactly, substituting Sinhala emotional text samples
for query-document pairs, replacing the BEIR domains with Sinhala emotion categories, and
replacing the round-trip retrieval filter with a semantic coherence validator. Promptagator establishes


the methodological precedent that seed data combined with dynamic LLM prompting and filtering
can replace large-scale manual annotation a conclusion that is critical for Sinhala, where large
annotated emotional text datasets do not exist.

**2.6.3 Domain-Specific RAG Data Generation at Scale**

The most architecturally proximate published system to the pipeline used in the present study is
DRAGON (Domain-specific Robust Automatic Data Generation for RAG Optimisation), proposed
by Shen et al. (2025). DRAGON was designed to address the failure of standard RAG retrievers
which rely on publicly available knowledge such as Wikipedia when deployed on domain-specific
queries. The DRAGON pipeline indexes domain-specific seed documents in a vector database,
applies query-type rules specifying single-hop, multi-hop, and partial-clue query structures as
dynamic prompt instructions to an LLM, generates synthetic question-answer pairs grounded in the
retrieved documents, and evaluates the resulting retrievers using DRAGONBench, a new benchmark
covering eight domain-specific document collections across finance, law, medicine, and technology.
Retrievers trained on DRAGON-generated synthetic data showed significant performance gains over
baselines and demonstrated strong generalisation across three distinct RAG paradigms: vanilla,
planning-based, and iterative. The architectural correspondence between DRAGON and the present
Sinhala pipeline is direct: the seed documents in DRAGON correspond to the seed JSON emotional
text data in the present study; the vector database and retrieval step are structurally identical; the
query-type rules correspond to the emotion category and linguistic style rules that govern dynamic
prompting in the Sinhala pipeline; and the DRAGONBench evaluation suite corresponds to the
validation and quality assessment component of the present system. DRAGON thereby provides the
most current and directly applicable published validation of the exact architectural pattern employed
in this research, confirming that structured rule-driven synthetic data generation from a RAG


knowledge base produces training data that meaningfully improves downstream model performance
across diverse domains.

**2.6.4 Self-Reflective Validation of Generated Outputs**

A central concern in any synthetic data generation pipeline is the quality and factual grounding of the
generated outputs. Asai et al. (2024) addressed this challenge in the SELF-RAG framework, which
trains a single language model to adaptively decide when to retrieve external context and to validate
whether its own generated outputs are grounded in the retrieved evidence. SELF-RAG introduces a
set of reflection tokens including tokens marking retrieval decisions, relevance assessments, and
support judgements that are embedded directly into the generation process rather than applied by a
separate post-hoc verifier. A dedicated Critic model, trained using approximately 150,000 GPT- 4 -
annotated examples, learns to classify each generated segment as supported, partially supported, or
not supported by the retrieved context, achieving over 90% agreement with GPT-4 quality
judgements. SELF-RAG was fine-tuned from Llama 2-7B and outperformed ChatGPT and GPT- 4
on several factuality benchmarks despite its smaller parameter count, demonstrating that embedded
self-critique is a more efficient route to output reliability than reliance on a larger external model at
inference time. The Critic model in SELF-RAG is the direct conceptual antecedent of the Validator
component in the present Sinhala synthetic data pipeline, which assesses whether each LLM-
generated Sinhala text sample is semantically coherent with its assigned emotion label and grounded
in the retrieved emotional vocabulary context. The 90% agreement result of Asai et al. (2024)
provides empirical justification for the feasibility of automated validation in lieu of exhaustive human
review, which is practically impossible at the scale of synthetic data generation required for the
present study.


#### 2.6.5 RAG-Based Synthetic Data Generation for Non-English Languages

The most directly analogous published application to the present study is the work of an author group
at a Spanish institution (2026), who constructed a synthetic text dataset for Spanish using a RAG-
based generation pipeline that explicitly compares RAG-grounded generation against no-context
baseline generation. Their pipeline collected real journalistic headlines from RSS feeds as seed data,
retrieved recent news descriptions as contextual evidence under the RAG condition, and generated
18,236 synthetic Spanish news descriptions using the Mistral 7B Instruct model at systematically
varied temperature settings. The dataset was publicly released with rich metadata linking each output
to its source headline, generation settings, and retrieved context. Human evaluation and statistical
metrics demonstrated that RAG-grounded generation produces significantly more coherent and
contextually accurate synthetic text than generation from the headline alone, and that temperature
variation systematically controls output diversity. This study constitutes the closest published
methodological analogue to the present work, demonstrating for a non-English language with fewer
NLP resources than English that RAG-grounded LLM generation outperforms no-context generation
for synthetic data construction. The present study applies this same principle to Sinhala, which has
substantially fewer NLP resources than Spanish, representing a further extension of the RAG
synthetic data paradigm to a more severely low-resource linguistic context. The open-source and
reproducible nature of the Spanish pipeline additionally provides a methodological template for the
present system's implementation.

#### 2.6.6 Automated Evaluation of RAG Pipelines

Evaluating the quality of RAG systems and by extension the quality of the synthetic data they
generate is non-trivial because both retrieval quality and generation faithfulness must be assessed
simultaneously, yet manual annotation is expensive. Es et al. (2023) proposed RAGAS (Retrieval-
Augmented Generation Assessment), an automated evaluation framework that generates synthetic


evaluation datasets from seed documents using a knowledge-graph-based approach and assesses
RAG output quality through four reference-free metrics: faithfulness (whether generated claims are
supported by the retrieved context), answer relevancy (whether the generated answer addresses the
question), context precision (whether retrieved passages are relevant to the question), and context
recall (whether all relevant information was retrieved). RAGAS builds a knowledge graph from
document entities and relationships, then applies diverse query synthesisers including simple, multi-
hop, and abstractive query types to automatically generate varied evaluation questions without
requiring manual annotation. Es et al. (2023) demonstrated that RAGAS metrics correlate well with
human judgement and that knowledge-graph-based multi-hop queries are harder and more realistic
than simple extractive questions, producing evaluation data that is more discriminative of system
quality differences. RAGAS has since been integrated with LangChain and LlamaIndex and has
accumulated over 900 citations alongside a widely-used open-source repository. The architectural
components of RAGAS knowledge graph serving the role of the vector database, diverse query
synthesisers corresponding to the dynamic prompting rules, and reference-free metrics corresponding
to the validation component map directly onto the present Sinhala synthetic data pipeline, and the
RAGAS framework itself may be used to assess the quality of the Sinhala synthetic data generated in
this study, providing an objective and scalable evaluation mechanism without requiring large-scale
human annotation.

#### 2.6.7 Synthesis and Implications for the Present Study

Taken together, the literature reviewed in this section establishes the following convergent findings.
First, RAG-grounded LLM generation consistently produces higher-quality and more factually
coherent outputs than generation without retrieval context, a finding demonstrated across English
(Lewis et al., 2020; Dai et al., 2022; Shen et al., 2025; Asai et al., 2024) and non-English languages
including Spanish (2026). Second, as few as eight seed examples combined with dynamic LLM


prompting can replace thousands of manually annotated training examples for domain-specific tasks
(Dai et al., 2022), a finding directly applicable to the present study where no large Sinhala emotional
text dataset exists. Third, automated validation through a trained critic or consistency-checking
mechanism is both feasible and effective as a quality control mechanism, achieving over 90%
agreement with human judgement (Asai et al., 2024) while enabling practical-scale synthetic data
generation. Fourth, structured rule-driven dynamic prompting where the LLM is instructed to
generate outputs matching specific structural or content criteria is critical for domain adaptation
quality (Dai et al., 2022; Shen et al., 2025). These four principles collectively form the
methodological foundation of the present study's Sinhala emotional text synthetic data pipeline,
which combines seed JSON emotional data, a vector database RAG knowledge base, emotion-
category and linguistic-rule-driven dynamic prompting, LLM generation, and a semantic coherence
validator to produce emotionally labelled Sinhala text samples at scale.

### 2.7 Low-Resource TTS Strategies and Transfer Learning

The scarcity of high-quality speech data for Sinhala makes the low-resource TTS literature
particularly relevant to this study. Researchers working on languages with limited data have
developed several complementary strategies that the present system draws upon.
Transfer learning has been consistently demonstrated as the most effective strategy for low-resource
TTS. Tits, El Haddad, and Dutoit (2019) investigated fine-tuning pre-trained neutral TTS models on
small emotional datasets, using the Deep Convolutional TTS (DCTTS) architecture pre-trained on
the LJSpeech corpus (approximately 24 hours) and then fine-tuned on 15 to 36 minutes of emotional
speech per category from the EmoV-DB dataset. When initialised from the pre-trained neutral model,
the fine-tuned emotional models achieved a word accuracy of 0.517 on neutral speech, compared to
just 0.004 when trained from random initialisation a result that unambiguously demonstrates the


necessity of pre-trained initialisation for achieving intelligible speech with limited data. MOS scores
for the emotional categories ranged from 2.00 for amused speech to 3.59 for neutral speech. While
these scores are modest compared to more recent systems, Tits et al. (2019) established the
fundamental principle that emotional TTS systems for low-resource settings must leverage pre-
training, a principle that is directly applied in the fine-tuning of Style-BERT-VITS2 in the present
study.
At a larger scale, Amalas et al. (2024) investigated multilingual pre-training as a strategy for TTS in
Moroccan Darija, a dialect with only 1.25 hours of available target-language data. Their approach
involved selecting linguistically similar languages Arabic, Hebrew, French, and Dutch using cosine
similarity between language embeddings, pre-training a TransformerTTS model on 12 hours of
multilingual data, and then sequentially fine-tuning on the Darija corpus, followed by knowledge
distillation into FastSpeech 2. Multilingual pre-training achieved a MOS of 3.89, compared to 3.45
for monolingual pre-training, a statistically significant improvement of approximately 12% in
intelligibility. Amalas et al. (2024) also demonstrated that data sourced from YouTube through
careful web scraping and forced alignment can produce viable TTS training material, reducing
dependence on professionally recorded studio datasets. Their language selection methodology, based
on phonetic similarity through embedding distance, is directly applicable to Sinhala, whose
phonological profile shares characteristics with South Indian Dravidian languages.
For low-resource languages within multilingual frameworks, Casanova et al. (2023) demonstrated
with YourTTS that zero-shot multi-speaker TTS is achievable even when the target language is
represented by a single-speaker dataset. YourTTS, which extends VITS with speaker embeddings
extracted from reference audio and multilingual training across English, Portuguese, and French,
achieved state-of-the-art zero-shot speaker similarity on VCTK while producing acceptable results
on Portuguese with only 10 hours of single-speaker training data. This finding suggests that cross-


lingual transfer from higher-resource languages can support the development of expressive Sinhala
TTS even when speaker diversity in the Sinhala training corpus is limited.
A challenge closely related to data scarcity is the availability of emotional speech data specifically.
Abilbekov et al. (2024) addressed this for Kazakh a language with a comparable resource situation
to Sinhala — by constructing KazEmoTTS, a dataset of 54,760 audio-text pairs totalling 74.85 hours
of speech recorded by three professional narrators across six emotional categories: neutral, angry,
happy, sad, scared, and surprised. Quality verification was performed using the Whisper ASR system.
A GradTTS-based TTS model trained on KazEmoTTS achieved MOS scores between 3.51 and 3.57,
with emotion recognition accuracies ranging from 65% for neutral to 22% for anger. Abilbekov et al.
(2024) noted that the emotion-content cognitive challenge the difficulty of producing a convincingly
happy rendition of sombre text is a fundamental limitation of label-conditioned approaches, and one
that semantic, context-aware emotion selection, as proposed in the present study, is better equipped
to handle. The dataset construction methodology of KazEmoTTS serves as a direct reference model
for the Sinhala emotional corpus developed in this research.
Pawar et al. (2025) contributed relevant insights through their multilingual TTS system for Hindi and
Indian English, which extended Parler-TTS with phoneme alignment encoder-decoders, culture-
sensitive emotion embeddings, and dynamic accent code-switching through residual vector
quantisation. Their system achieved a 23.7% improvement in accent accuracy and an emotion
recognition rate of 85.3% from native listeners, with a cultural correctness MOS of 4.2. The culture-
sensitive design of Pawar et al. (2025) which acknowledges that emotional expression in speech is
shaped by cultural norms is particularly relevant to Sinhala, where culturally specific prosodic
conventions must be respected for authentic and accessible synthesis.


### 2.8 Sinhala Text-to-Speech: Existing Work and Limitations

Despite Sinhala being the native language of approximately 17 million people in Sri Lanka
(Jayawardhana et al., 2019), the body of published research on Sinhala TTS remains sparse and
technically constrained relative to high-resource languages. A critical review of existing Sinhala TTS
systems reveals persistent limitations in quality, expressiveness, and data availability.
The earliest systematic Sinhala TTS effort in the reviewed literature is that of Nanayakkara et al.
(2018), who implemented a unit selection-based system using the MaryTTS framework. Their system
involved the construction of a custom Sinhala phoneme set, definition of letter-to-sound rules,
professional speaker recording, and voice compilation within MaryTTS. A 20-person user evaluation
reported intelligibility and naturalness scores of approximately 70%, with overall speech quality
around 60%. While this represented a meaningful baseline for Sinhala TTS, unit selection approaches
are inherently limited in their ability to generalise beyond recorded units, offering no mechanism for
prosodic variation or emotional expressiveness. Nanayakkara et al. (2018) explicitly identified the
need to extend to parametric or neural synthesis and to improve prosody modelling as priorities for
future work.
The transition to neural approaches for Sinhala TTS was attempted by Jayawardhana et al. (2019),
who adapted the Deep Voice 3 architecture consisting of encoder, decoder, and converter
components for a bilingual English-Sinhala TTS system. The system was trained on the LJSpeech
dataset for English and on a custom Sinhala dataset of 2,120 audio samples sourced from public
domain recordings. The Sinhala model achieved approximately 40% accuracy, which the authors
attributed primarily to the extremely small scale of the Sinhala training data and the absence of an
official Sinhala phonetic standard. Jayawardhana et al. (2019) identified the minimum viable training
data for English TTS as approximately 1,000 hours, and noted that even 96 hours for Sinhala showed
incremental improvement, underscoring the fundamental data scarcity challenge. This study was the


first to demonstrate the feasibility of neural TTS for Sinhala, but the gap between its output quality
and that of contemporary English neural TTS systems remained substantial.
The most recent published Sinhala TTS work identified in the reviewed literature is that of Senarath
(2024), a Master's dissertation from the University of Colombo School of Computing that compared
VAENAR, Tacotron 2, and WaveNet architectures for Sinhala synthesis, ultimately selecting
VAENAR for its balance of quality and resource requirements. Senarath (2024) compiled and
preprocessed a Sinhala dataset from the pnfo/sinhala-TTS-dataset GitHub repository and conducted
training on AWS EC2 and Google Cloud Platform GPU instances. The study found that VAENAR
required substantial computational resources and that simple adaptation from English to Sinhala was
inadequate for producing clear speech synthesis. Senarath (2024) emphasised the critical need for
Sinhala-specific deep learning approaches, enhanced linguistic data collection, and stronger academic
collaboration conclusions that directly motivate the dataset construction and pipeline integration
work of the present study.
Across these three studies, several consistent limitations emerge. First, none of the existing Sinhala
TTS systems incorporates emotional expressiveness; all are limited to neutral prosody. Second, the
datasets used are small, of variable quality, and in no case specifically designed for emotional speech
recording. Third, none of these systems incorporates any form of semantic analysis to infer
appropriate prosodic style from text content. These three gaps collectively define the primary
contribution space of the present research.

### 2.9 Grapheme-to-Phoneme Conversion for Multilingual and Low-Resource Settings

Grapheme-to-phoneme (G2P) conversion is a prerequisite component of any TTS pipeline,
responsible for mapping orthographic input to phonemic representations that can be processed by the
acoustic model. For Sinhala, whose Brahmic script contains complex conjunct character forms, half-


character representations, and Unicode-dependent rendering through the Zero-Width Joiner (ZWJ),
G2P is a non-trivial challenge with no standardised solution in the public literature.
The multilingual transformer-based approach to G2P was evaluated at the SIGMORPHON 2020
shared task by ElSaadany and Suter (2020), who trained a single Transformer model for G2P
conversion across 15 languages simultaneously, using a simple language code prefix to distinguish
between languages. Their best ensemble model (UZH-3) achieved a macro-average word error rate
(WER) of 16.34% and a phoneme error rate (PER) of 3.27% across all 15 languages, outperforming
separately trained monolingual baselines on several of the included languages. Language-specific
results ranged from 3.78% WER for Hungarian to 40.00% for Korean, the latter reflecting the
challenges of languages with complex writing systems. ElSaadany and Suter (2020) observed both
positive and negative cross-language interference effects, noting that phonologically similar
languages tended to benefit more from joint training. Their finding that a single model with language
code prefixing is a practical and effective solution for multilingual G2P is directly relevant to the
Sinhala pipeline, which must handle a writing system not covered by any existing publicly released
G2P model.
A complementary approach was proposed by Ni, Shiga, and Kawai (2018), who introduced Global
Character Vectors (GCVs) unsupervised character-level embeddings trained using a GloVe-style
objective on large text corpora combined with a supervised bidirectional RNN (BRNN) decoder for
G2P. Tested on Japanese, Korean, Thai, and Chinese, the GCV-BRNN model achieved monolingual
syllable accuracies of 97.7% to 99.5% and a multilingual accuracy of approximately 98%, with a
relative improvement of 27% to 90% over the MeCab morphological analyser baseline. The
unsupervised pre-training of GCVs is particularly advantageous for low-resource scenarios, as it
requires only unlabelled text data, which is more readily available for Sinhala than labelled phoneme-
alignment data.


From an industrial and efficiency perspective, Kim, Kim, and Kim (2022) demonstrated that non-
autoregressive G2P models can dramatically outperform autoregressive baselines in inference speed
while maintaining or improving accuracy. Their non-autoregressive structured Transformer with a
conditional random field (NART-CRF) achieved token-level accuracy of 87.75% and a PER of 0.43
at an inference speed of 140 milliseconds per sentence 27 times faster than the autoregressive baseline
at 3,830 milliseconds when evaluated on bilingual English-Korean industrial data from NAVER's
production TTS system. Kim et al. (2022) emphasised that output length prediction is the primary
bottleneck in non-autoregressive G2P, a problem they address through a dedicated length prediction
sub-network with data augmentation. This work demonstrates that G2P efficiency is a meaningful
design consideration in production TTS systems, particularly for real-time applications.
For the present Sinhala system, the language-specific challenges identified by Warusawithana et al.
(2022) including ZWJ-dependent character rendering, inconsistent spacing, and mixed-script text
impose constraints on any G2P approach that must be addressed through language-aware text
preprocessing before phoneme prediction.

### 2.10 Sinhala Speech Corpora and Data Resources

The construction or identification of an appropriate speech corpus is among the most significant
practical challenges in developing TTS for Sinhala. This section reviews the existing Sinhala speech
data resources and their suitability for emotional TTS development.
The largest publicly available Sinhala speech corpus is OpenSLR-52, originally described by
Kjartansson et al. (2018), who collected crowd-sourced speech recordings for five low-resource
languages Javanese, Sundanese, Sinhala, Nepali, and Bangladeshi Bengali using a mobile recording
application in which volunteers read text prompts on their smartphones. The Sinhala portion of the
corpus contains 185,000 utterances from 478 speakers totalling approximately 224 hours, making it
by far the largest available Sinhala speech dataset. A baseline Kaldi triphone ASR model trained on


this data achieved a WER of 23.29%. However, Kjartansson et al. (2018) acknowledged several
significant limitations: biographical information about speakers is unavailable, gender distribution is
unspecified, and the crowd-sourced recording environments introduce substantial background noise.
Furthermore, the dataset was designed for ASR, not TTS it does not control for recording quality,
prosodic consistency, or emotional content, making it unsuitable for direct use in emotional TTS
training without extensive filtering and quality control.
The quality limitations of OpenSLR-52 were systematically analysed by Warusawithana et al. (2022),
who proposed a refined version of the corpus addressing multiple categories of text transcription
errors including missing punctuation, embedded English utterances, numeric characters, inconsistent
ZWJ usage, and morphological spelling errors. After applying automated text cleaning and rule-based
linguistic corrections, they evaluated the impact on a Kaldi-based Sinhala ASR system and found a
relative WER reduction of 15.9%, from 20.35% to 17.11%. This result demonstrates that transcription
quality has a substantial impact on model performance and that raw crowd-sourced data cannot be
used without preprocessing for downstream speech applications. The specific Sinhala linguistic issues
identified by Warusawithana et al. (2022) particularly ZWJ-related rendering errors and inconsistent
spacing directly inform the text preprocessing pipeline of the present study.
More recently, Thayasivam et al. (2025) introduced SiTa, the first speaker diarization dataset for
Sinhala and Tamil in the wild, collected from YouTube debate and interview videos. The Sinhala
subset contains approximately 10 hours of audio. While not designed for TTS, SiTa provides a source
of naturalistic Sinhala speech that captures the emotional and prosodic variation present in real
conversational contexts, unlike the read speech of OpenSLR-52. Thayasivam et al. (2025) identified
overlapping speech as a major annotation challenge and noted that regional dialects are
underrepresented, limitations that would need to be addressed before any audio from this source could
be incorporated into a TTS corpus.


Beyond Sinhala-specific resources, methodological insights for corpus construction can be drawn
from the multilingual Common Voice initiative (Ardila et al., 2020), which demonstrated that
community-driven crowd-sourcing with a voting-based quality validation mechanism is scalable to
dozens of languages simultaneously. Ardila et al. (2020) also showed that transfer learning from high-
resource language models significantly improves downstream ASR performance for low-resource
languages. Complementing this, Ayrapetyan et al. (2025) conducted a comparative evaluation of four
data collection strategies offline volunteer events, paid crowd-sourcing through the Toloka platform,
audiobook alignment, and pseudo-labelling of YouTube audio for Armenian and Georgian, finding
that paid crowd-sourcing offered the best balance between cost and quality, and that adding
audiobook-aligned data improved model generalisation. Their approach of aligning audiobook audio
with text transcripts using forced alignment is methodologically relevant to the Sinhala corpus
construction strategy of the present study, where audiobook sources in Sinhala represent a potential
high-quality recording resource.

### 2.11 Emotion Recognition and Semantic Emotion Analysis

Since the present system infers emotional prosody from text content rather than from explicit labels,
the literature on emotion recognition from text and speech provides important theoretical and
technical grounding for the semantic analysis component of the proposed pipeline.
Sailunaz et al. (2018) provided a comprehensive survey of emotion detection from text and speech,
cataloguing feature sets, classifiers, and hybrid approaches. Their survey found that hybrid methods
combining acoustic prosodic features such as pitch, energy, MFCCs, jitter, shimmer, and formants
with linguistic features from text consistently outperform single-modality approaches, with
multimodal systems achieving accuracy of up to 89%. Among classifiers, Support Vector Machines
(SVMs) and Hidden Markov Models (HMMs) were found to be effective for speech-based emotion


classification, though Sailunaz et al. (2018) noted that deep learning methods were emerging as
superior alternatives. Their survey also highlighted fundamental challenges that remain unresolved:
individual and cultural variation in emotional expression, subjectivity in emotion annotation, and
limited availability of cross-cultural emotional speech datasets. These challenges are acutely relevant
to Sinhala, where cultural norms of emotional expression may differ substantially from those encoded
in English-language emotional datasets.
Lian et al. (2023) provided a more recent and deep-learning-focused survey of multimodal emotion
recognition (MER), covering datasets, feature extraction methods, and fusion strategies across
speech, text, and facial modalities. Their analysis of 17 state-of-the-art MER methods found that fine-
grained interaction fusion strategies consistently outperform simple early or late fusion, and that
wav2vec 2.0 and BERT representations demonstrate strong performance as speech and text feature
extractors respectively. Lian et al. (2023) identified IEMOCAP as the most widely used evaluation
dataset, though they noted that most datasets are English-centric, creating a generalisation gap for
other languages. Their finding that attention mechanisms enable models to weight the contribution of
different modalities dynamically is applicable to the semantic emotion inference component of the
present study, where the relative contributions of syntactic structure, lexical choice, and discourse
context to emotional interpretation must be weighted appropriately.

### 2.12 Ontology-Based and Frame-Based Emotion Representation

A distinct thread of literature relevant to the present study concerns the structured, ontological
representation of emotional meaning rather than its classification from acoustic or surface-level
lexical features. This perspective argues that emotions are not merely labels but structured semantic
situations involving an experiencer, an agent or cause, a triggered reaction, and a surrounding context.


This frame-based view of emotion has direct implications for semantic emotion inference in TTS. As
reflected in the design choices of the present system, a keyword-based approach to emotion detection
which identifies emotional words in isolation fails to capture the contextual dependencies that
determine emotional interpretation. Negation, intensification, focus, and discourse-level pragmatics
can all reverse or modulate the emotional valence of a surface expression. For example, the phrase
"he was not hurt" contains the potentially negative word "hurt" but conveys the absence of harm. A
frame-based approach, by contrast, parses the structural roles of participants and identifies the
presence or absence of harm, loss, pleasure, threat, or insult as event frames, enabling more robust
emotional interpretation.
The present system addresses this limitation through a two-stage architecture. In the first stage,
ontology-based keyword detection identifies explicit emotional vocabulary within the input Sinhala
text using a structured emotion ontology. In the second stage, where keyword matching is ambiguous
or produces no result, LaBSE (Language-Agnostic BERT Sentence Embeddings) representations of
the full input text are generated and compared against pre-computed centroid vectors for each emotion
class using cosine similarity scoring. This centroid-vector cosine similarity approach leverages the
contextual encoding capability of LaBSE to capture sentence-level semantic meaning beyond
individual keywords, providing a degree of frame-sensitivity that pure keyword approaches lack. The
move from keyword-based to embedding-based emotion representation in the present system aligns
with the broader direction in the literature toward richer semantic modelling for affective computing
applications, as surveyed by Lian et al. (2023) and Sailunaz et al. (2018).

### 2.13 Research Gaps

The reviewed literature collectively points to six significant gaps that the present study is positioned
to address.


First, no published end-to-end emotional TTS system for Sinhala currently exists. The three Sinhala
TTS studies identified in the literature Nanayakkara et al. (2018), Jayawardhana et al. (2019), and
Senarath (2024) all produce neutral-only speech and none incorporates any mechanism for emotional
prosody control or semantic content analysis. This represents the most fundamental gap in the existing
literature.
Second, there is no publicly available Sinhala emotional speech corpus. The OpenSLR-52 corpus
(Kjartansson et al., 2018) was designed for ASR and contains significant noise and quality
inconsistencies (Warusawithana et al., 2022). While KazEmoTTS (Abilbekov et al., 2024)
demonstrates that professional-quality emotional speech corpora can be constructed for low-resource
languages with limited speakers and budgets, no equivalent corpus has been created for Sinhala. The
construction of such a corpus is therefore a primary deliverable of the present study.
Third, while natural language and semantic emotion control in TTS has been demonstrated in English
by Bott et al. (2024) and Yang et al. (2025), no equivalent system exists for any South Asian language,
and the linguistic and cultural specificity of emotional expression in Sinhala means that these systems
cannot simply be transferred without adaptation.
Fourth, the specific G2P challenges of Sinhala including ZWJ-dependent character rendering,
conjunct character forms, and mixed-script input have not been addressed in any dedicated G2P study.
Existing multilingual G2P models (ElSaadany & Suter, 2020; Ni et al., 2018; Kim et al., 2022) do
not include Sinhala in their training or evaluation sets, creating a critical gap in the preprocessing
pipeline for any Sinhala TTS system.
Fifth, the majority of the low-resource emotional TTS literature treats emotion detection and TTS
generation as separate pipeline stages connected only by a label handover (Tits et al., 2019; Abilbekov
et al., 2024). The present study bridges these stages through an integrated semantic-to-prosody
workflow in which emotional parameters emerge directly from the text analysis component
combining ontology-based keyword detection with LaBSE centroid-vector cosine similarity


classification rather than from an externally supplied label. Style-BERT-VITS2 (Litagin, 2023),
which integrates BERT semantic conditioning (Devlin et al., 2019) with the VITS2 acoustic backbone
(Kong et al., 2023), is the first architecture identified in the reviewed literature that structurally
supports such an integrated pipeline through its cross-attention style conditioning mechanism, making
it the natural candidate for the voice generation component of the present system.

Sixth, no published study has applied a RAG-based synthetic data generation pipeline to
produce emotionally labelled text data for any South Asian language. While Dai et al. (2022),
Shen et al. (2025), and the Spanish-language study (2026) collectively demonstrate that
RAG-grounded LLM generation with dynamic prompting and validation produces high-
quality domain-specific training data, these contributions have been limited to English and,
in one case, Spanish. The application of this paradigm to Sinhala, where the absence of
emotionally labelled text corpora constitutes a fundamental bottleneck for both the semantic
emotion detection module and future research, represents an original methodological
contribution of the present study.

```
Figure 1 :Part of literature summery
```

## 3. Methodology

### 3.1 Research Design Overview

The research follows a design-and-development methodology, focusing on constructing and
iteratively refining an end-to-end semantic-aware emotional TTS system for Sinhala. It
proceeds through several phases:

1. Problem identification and refinement.
2. Literature study and proposal development.
3. Data collection (text and audio) and preprocessing.
4. Semantic-emotion modelling using ontology and deep learning.
5. Emotional speech model design and implementation.
6. Evaluation planning and partial implementation.

The workflow is iterative: insights from later stages (e.g., model behaviour) feed back into
earlier components such as ontology design and data selection.

### 3.2 Text Data Collection

Text data collection is organised into two main layers.Presentation.pdf+1

**Seed Dataset Creation**

The seed dataset consists of manually authored Sinhala sentences that cover everyday
language, varied semantic situations, and the four target emotions (happy, sad, angry,
neutral). Care is taken to ensure:


- Linguistic naturalness and grammatical correctness.
- Phonetic diversity to support robust TTS modelling.
- Culturally authentic ways of expressing emotions.

Sentences are grouped by emotion category based on intuitive and linguistic judgement.

**RAG-Based Expansion**

To scale the dataset, a Retrieval-Augmented Generation (RAG) workflow is used:

1. Seed sentences are embedded and stored in a vector database.
2. A large language model is prompted to generate new emotionally oriented Sinhala
    sentences, using retrieved similar seeds as context.
3. Generated sentences are filtered by similarity thresholds to avoid drift from the target
    emotion and domain.

## Figure 2 : Text data (SEED data)


4. Human reviewers clean the outputs, removing ungrammatical, repetitive, or
    culturally inappropriate sentences.

This process increases the effective dataset size by roughly an order of magnitude, reaching
several thousand emotion-oriented Sinhala sentences suitable for training and evaluation.

### 3.3 Voice Recording and Corpus Construction

The speech corpus is recorded using a single professional Sinhala speaker to maintain
consistent vocal identity and focus on emotion modelling. Key considerations include:

- Controlled recording environment (quiet room, appropriate microphone, stable
    distance).
- Standardised technical settings (e.g., 22,050 Hz sampling rate, 16-bit PCM, WAV
    format).

## Figure 3 : RAG-based synthetic data generation architecture


- Session planning that reduces fatigue and maintains emotional authenticity.

Each sentence is recorded in an emotional style consistent with its intended label. Multiple
takes are captured when necessary, and the best versions are selected during corpus curation.

Metadata is maintained for:

- Sentence text and ID.
- Emotion category.
- Audio file path and recording notes.

This corpus becomes the primary resource for emotional acoustic modelling and evaluation.

### 3.4 Audio Preprocessing

Audio preprocessing ensures stable model training and high perceived quality.

The pipeline includes:

- **Normalisation** : Adjusting signal levels to a consistent loudness range.
- **Noise reduction and enhancement** : Using tools such as Adobe Audio Enhancer to
    reduce background noise and improve clarity.
- **Length handling** : Padding or trimming recordings to handle extreme duration
    variations where required by the training pipeline.
- **Quality checks** : Manually inspecting processed samples for artefacts, clipping, or
    misalignment.


Preprocessed audio files and their aligned metadata are then prepared for feature extraction
and model training.

### 3.5 Semantic Emotion Analysis Framework

The semantic emotion analysis framework is hybrid, comprising a rule-based Sinhala
Emotion Ontology and a contextual deep learning classifier based on LaBSE embeddings.

## Figure 4 : Audio enhancement example using Adobe Audio Enhancer

## Figure 5 : Hybrid ontology-plus-LaBSE emotion detection workflow


### 3.5.1 Sinhala Emotion Ontology

The Sinhala Emotion Ontology (SEO) evolved from an initial keyword-based approach to a
richer frame-based design. Early prototypes mapped specific lexical triggers directly to
emotions, but struggled with context, negation, and role-dependence.

The final ontology:

- Defines frame types (e.g., PhysicalHarm, PositiveEmotion, LossExperience, Insult,
    Threat).
- Encodes semantic roles such as agent, experiencer, patient, and possessor.
- Accounts for modifiers like negation (which can invert emotion polarity), intensifiers,
    and diminishers.
- Supports role-aware interpretation (e.g., “I hit him” vs. “I was hit”).

Linguistic analysis identifies lexical units and syntactic patterns that instantiate frames. The
ontology engine then infers an emotion label and a confidence score based on matched
frames, roles, and modifiers.


### 3.5.2 Context-Aware LaBSE Classification.....................................................................

When ontology rules fail to provide a clear decision due to ambiguous wording, unseen
constructions, or sparse lexical cues the system falls back to a contextual classifier built on
LaBSE.

## Figure 6 : Sinhala Emotion Ontology output example.........................................................

## Figure 7 : LaBSE-based emotion detection architecture......................................................


The classifier operates as follows:

1. Each sentence is encoded using LaBSE into a sentence-level embedding.
2. During training, embeddings are clustered or associated with prototype vectors per
    emotion category.
3. At inference, a new sentence embedding is compared against these prototypes using
    cosine similarity.
4. The closest cluster determines the predicted emotion and a confidence value.

There is a hybrid decision logic **:**

- If the ontology yields a confident match, its label is used.
- If ontology output is uncertain or conflicting, the LaBSE classifier’s prediction is
    chosen.This design combines interpretability (through ontology) with flexibility
    (through embeddings).

## Figure 8 : LaBSE-based emotion detection output example


### 3.6 Emotional Speech Generation Model

The emotional speech generation model has evolved through the project:

- Initial architecture: FastSpeech2-style acoustic model predicting mel-spectrograms
    conditioned on phonemes and emotion embeddings, followed by a HiFi-GAN
    vocoder.
- Current direction: Fine-tuning Style-BERT-VITS2, which integrates BERT-based
    text encoding and expressive style control in an end-to-end framework.

In the final design, the semantic emotion signal (from the ontology and LaBSE) is
transformed into conditioning features for Style-BERT-VITS2 so that pitch, duration, and
spectral characteristics reflect the inferred emotional state. Detailed hyperparameters and
training curves are planned for inclusion in the final result section once experiments are
completed.

### 3.7 Evaluation Plan

The evaluation plan combines objective and subjective metrics.

Objective measures:

- **Mel-Cepstral Distortion (MCD)** to quantify spectral similarity between synthetic
    and reference speech.
- **Pitch-related metrics** (correlation, RMSE) to measure prosody alignment.
- **Duration accuracy** to assess timing and rhythm.


Subjective measures:

- **Mean Opinion Score (MOS)** tests for naturalness and overall quality.
- **Emotion appropriateness tests** , where listeners judge how well the emotion in the
    audio matches the semantic content of the text.

Test sentences will include standard evaluation sets as well as challenging examples
involving negation, sarcasm, and culturally specific expressions.

### 3.8 Ethical Considerations

Ethical concerns in this project primarily relate to the use of human voice recordings.
Measures include:

- Obtaining written informed consent from the speaker, clearly stating the scope of data
    use (academic research).
- Ensuring that recordings and metadata are stored securely and used only for
    authorised purposes.
- Allowing the participant to withdraw from the study according to agreed conditions.
- Avoiding misuse of the recorded voice in unintended contexts.No other sensitive
    personal data or vulnerable groups are involved, but ethical principles of privacy,
    respect, and responsible data handling are observed throughout.


## Figure 9 : Participant consent form


## 4. Experimental Plan / System Design Overview

### 4.1 High-Level Architecture

The proposed system architecture connects text understanding, semantic-emotion analysis,
and emotional speech generation through a modular yet integrated workflow.

## Figure 10 : High level Architecture


At a high level:

1. **Input** : Raw Sinhala text.
2. **Text processing** : Normalisation, tokenisation, and basic linguistic analysis.
3. **Semantic-emotion analysis** : Hybrid SEO + LaBSE pipeline that outputs an emotion
    label and confidence.
4. **TTS model** : Style-BERT-VITS2 conditioned on both phonetic and emotional
    features to produce speech.
5. **Output** : Waveform audio that reflects the lexical content and inferred emotional
    state.

### 4.2 Training Phase

During training, the system learns from a parallel corpus of text, semantic labels, and
emotional speech.

Main steps:

- Prepare aligned text–audio pairs with emotion tags (from recording design).
- Train and validate the semantic emotion analysis module using text data and manually
    assigned emotion labels.
- Train or fine-tune the emotional speech model using phoneme sequences, emotion
    embeddings, and mel-spectrogram targets (or end-to-end waveforms).
- Iterate over configuration choices (e.g., embedding injection points, loss weighting)
    based on validation metrics.


**4 .3 Inference Phase**

In inference, a user supplies Sinhala text without any manual emotion tags.

The pipeline:

1. Text is normalised and processed.
2. The semantic analysis module predicts an emotion label (and possibly an intensity
    score).
3. Text and emotion features are passed to the TTS model.
4. The model generates emotionally appropriate speech.

This design allows emotion to emerge from meaning rather than from external control,
making it suitable for dynamic content.

### 4.4 Component Integration...............................................................................................

Integration focuses on the interface between the semantic-emotion module and the acoustic
model.

Key aspects:

- Defining a consistent emotion embedding space that can be consumed by Style-
    BERT-VITS2.
- Designing training objectives that encourage the model to utilise emotion features.
- Ensuring that timing and context alignment between text tokens and emotion cues are
    coherent.


The modular architecture also allows future improvements or replacements of components
(e.g., upgrading the classifier or changing the TTS backbone) without redesigning the entire
system

### 4.5 Implementation Environment and Tools

```
Table 1 : Major components and tools used in the system design
Layer Main tools / methods Purpose
Text data
preparation
```
```
Python, structured JSON, manual
curation, RAG workflow
```
```
Sentence generation,
validation, and organization
```
```
Audio processing WAV recordings, enhancement tools, preprocessing scripts
```
```
Noise reduction,
normalization, and corpus
preparation
Semantic modelling Sinhala Emotion Ontology, rulebased inference - Contextinterpretation-sensitive emotional
```
```
Contextual
classification
```
```
LaBSE embeddings, centroid-based
cosine similarity
```
```
Fallback emotion
classification for ambiguous
cases
Speech synthesis Style(current stage)-BERT-VITS2 fine - tuning Emotionspeech generation-aware Sinhala
```
```
Project management GitHub, presentation artefacts, thesis documentation Traceability and collaborative development
```

## 5. Results and Evaluation

### 5.1 Completed Outputs

Completed technical artefacts include:

- A seed and RAG-expanded text dataset of several thousand emotionally oriented
    Sinhala sentences.
- A curated, preprocessed single-speaker emotional speech corpus.
- The Sinhala Emotion Ontology and its implementation.
- A LaBSE-based contextual emotion classifier integrated into a hybrid decision
    pipeline.

These outputs create a robust foundation for training and evaluating the emotional TTS
system.


## Figure 11 Result of Ontology

## Figure 12 : Result of Classification ML Model


### 5.2 Qualitative Findings

Preliminary qualitative observations show that:

- The frame-based ontology provides more robust and interpretable emotion
    predictions than simple keyword lists, especially for role-dependent constructions
    and negated sentences.
- The LaBSE classifier successfully resolves some ambiguous cases where ontology
    coverage is limited, capturing contextual cues such as sarcasm or indirect
    expressions.

Audio samples from early synthesis experiments (where available) indicate that emotion
conditioning affects pitch range and energy patterns, although formal listening tests are still
pending.

### 5.3 Planned Quantitative Evaluation

Once Style-BERT-VITS2 fine-tuning and full integration are complete, results will be
evaluated using:

- MCD and pitch-based metrics between synthetic and reference emotional speech.
- MOS tests for naturalness and emotional appropriateness, involving a panel of native
    Sinhala speakers.
- Comparisons with a neutral Sinhala TTS baseline to demonstrate the benefit of
    semantic-aware emotional conditioning.


## 6. Discussion

The proposed semantic-aware emotional TTS system addresses the core limitations
identified in the literature and problem statement. By combining a custom emotional corpus,
a hybrid semantic-emotion analysis framework, and a modern expressive TTS backbone, the
project demonstrates a feasible pathway towards emotionally expressive Sinhala speech
synthesis.

From a methodological perspective:

- The RAG-based data expansion approach is an effective strategy to overcome limited
    initial text resources while preserving language authenticity through human filtering.
- The ontology-plus-embedding hybrid architecture illustrates how symbolic and
    neural methods can complement each other in emotion detection.
- The evolution from a FastSpeech2 + HiFi-GAN pipeline to Style-BERT-VITS2
    shows adaptability to emerging models that are better suited for expressive control
    under project constraints.

## Figure 13 : MOS result for Style-bert-vits2 model


The system lays the groundwork for future extensions such as multi-speaker support, richer
emotion taxonomies, and integration into real-world applications like screen readers and
educational systems.

## 7. Conclusion

This thesis presents the design and partial implementation of a semantic-aware emotional
text-to-speech (TTS) system for Sinhala, developed using a single-speaker deep learning
approach. The research makes several key contributions, including the creation of a
semantically rich Sinhala emotional text corpus expanded through Retrieval-Augmented
Generation (RAG), and the development of a curated and preprocessed single-speaker
emotional speech corpus. Additionally, it introduces a Sinhala Emotion Ontology along with
a hybrid emotion detection framework that combines ontology-based methods with
Language-Agnostic BERT Sentence Embeddings (LaBSE). The study also proposes an
architectural design for integrating semantic emotion signals into an expressive TTS model
based on Style-BERT-VITS2. Although the final end-to-end training and comprehensive
evaluations are still in progress, this research establishes both the theoretical and practical
foundations necessary for achieving emotionally expressive Sinhala speech synthesis.


## 8. Limitations and Future Work

### 8.1 Limitations

Key limitations include:

- The single-speaker focus, which simplifies modelling but limits generalisability to
    multiple voices.
- A restricted emotional palette of four primary categories, which does not capture
    more nuanced affective states.
- Incomplete end-to-end quantitative evaluation at the time of writing due to time and
    resource constraints.
- The absence of large-scale user studies in real-world applications.

### 8.2 Future Work

Future work can build on this foundation in several directions:

- Extending the corpus and model to multi-speaker or speaker-adaptive emotional TTS.
- Expanding emotional categories to include additional states such as fear, surprise, or
    calm, and modelling emotional intensity more finely.
- Enhancing the ontology with discourse-level and pragmatic phenomena.
- Exploring code-switched Sinhala–English emotional TTS for real-world Sri Lankan
    usage.


- Conducting user-centred evaluations by integrating the system into accessible reading
    tools, educational platforms, or conversational agents and measuring user satisfaction
    and impact.


## 9. References

Here is the reference list formatted as requested:
Abilbekov, A., Mussakhojayeva, S., Yeshpanov, R. & Varol, H.A., 2024. KazEmoTTS: A
Dataset for Kazakh Emotional Text-to-Speech Synthesis. Proceedings of the 2024 Joint
International Conference on Computational Linguistics, Language Resources and
Evaluation (LREC-COLING 2024), pp.9626–9632.
Amalas, A., Ghogho, M., Chetouani, M. & Oulad Haj Thami, R., 2024. A Multilingual
Training Strategy for Low Resource Text to Speech. arXiv preprint arXiv:2409.01217.
Ardila, R. et al., 2020. Common Voice: A Massively-Multilingual Speech Corpus.
Proceedings of the 12th Language Resources and Evaluation Conference (LREC 2020).
Ayrapetyan, A. et al., 2025. Methods to Increase the Amount of Data for Speech Recognition for Low Resource Languages. arXiv preprint arXiv:2501.14788.

Bott, T., Lux, F. & Vu, N.T., 2024. Controlling Emotion in Text-to-Speech with Natural
Language Prompts. Proceedings of Interspeech 2024.
Casanova, E., Weber, J., Shulby, C., Candido Junior, A., Gölge, E. & Ponti, M.A., 2023.
YourTTS: Towards ZeroEveryone. arXiv preprint arXiv:2112.02418.-Shot Multi-Speaker TTS and Zero - Shot Voice Conversion for

Cho, D.-H., Oh, H.-S., Kim, S.-B., Lee, S.-H. & Lee, S.-W., 2024. EmoSphere-TTS:
Emotional Style and Intensity Modeling via Spherical Emotion Vector for Controllable
Emotional Text-to-Speech. arXiv preprint arXiv:2406.07803.
Diatlova, D. & Shutov, V., 2023. EmoSpeech: Guiding FastSpeech2 Towards Emotional Text to Speech. arXiv preprint arXiv:2307.00024.

ElSaadany, O. & Suter, B., 2020. Grapheme-to-Phoneme Conversion with a Multilingual
Transformer Model. Proceedings of the Seventeenth SIGMORPHON Workshop on
Computational Research in Phonetics, Phonology, and Morphology, pp.85–89.
Jayawardhana, P., Aponso, A., Krishnarajah, N. & Rathnayake, A., 2019. An Intelligent Approach of Text-To-Speech Synthesizers for English and Sinhala Languages. Proceedings
of the 2019 IEEE 2nd International Conference on Information and Computer
Technologies, pp.229–234.
Kim, H.-Y., Kim, J.-H. & Kim, J.-M., 2022. Fast Bilingual Grapheme-to-Phoneme
Conversion. Proceedings of the 2022 Conference of the North American Chapter of the


Association for Computational Linguistics: Human Language Technologies: Industry
Track, pp.1–10.
Kim, J., Kong, J. & Son, J., 2021. Conditional Variational Autoencoder with Adversarial
Learning for Endon Machine Learning (ICML 2021), pp.5530-to-End Text-to-Speech. Proceedings of the 38th International Conference –5540.

Kim, J., Kim, S., Kong, J. & Yoon, S., 2020. Glow-TTS: A Generative Flow for Text-to-
Speech via Monotonic Alignment Search. Advances in Neural Information Processing
Systems (NeurIPS) 34.
Kjartansson, O., Sarin, S., Pipatsrisawat, K., Jansche, M. & Ha, L., 2018. CrowdSpeech Corpora for Javanese, Sundanese, Sinhala, Nepali, and Bangladeshi Bengali. -Sourced
Proceedings of the 6th Workshop on Spoken Language Technologies for Under-Resourced
Languages (SLTU 2018).
Kong, J., Kim, J. & Bae, J., 2020. HiFi-GAN: Generative Adversarial Networks for
Efficient and High Fidelity Speech Synthesis. Advances in Neural Information Processing Systems (NeurIPS) 34.

Li, Y.A., Han, C., Raghavan, V.S., Mischler, G. & Mesgarani, N., 2023. StyleTTS 2:
Towards Human-Level Text-to-Speech through Style Diffusion and Adversarial Training
with Large Speech Language Models. arXiv preprint arXiv:2306.07691.
Lian, H., Lu, C., Li, S., Zhao, Y., Tang, C. & Zong, Y., 2023. A Survey of Deep Learning-
Based Multimodal Emotion Recognition: Speech, Text and Face. Entropy, 25(10), p.1440.
Liu, Y., Wang, L., Gao, S., Yu, Z., Dong, L. & Tian, T., 2025. Lao-English Code-Switched
Speech Synthesis via Neural Codec Language Modeling. Proceedings of the 24th China
National Conference on Computational Linguistics (CCL 2025), pp.1067–1077.
Mamyrbayev, O., Oralbekova, D., Keylan, A., Tolganay, T. & Mohamed, O., 2022. A Study of Transformer-Based End-to-End Speech Recognition System for Kazakh
Language. Scientific Reports, 12(1), p.8337.
Nanayakkara, L., Liyanage, C., Viswakula, P.T., Nadungodage, T., Pushpananda, R. &
Weerasinghe, R., 2018. A Human Quality Text to Speech System for Sinhala. Proceedings
of the 6th International Workshop on Spoken Language Technologies for UnderLanguages (SLTU 2018). - Resourced

Ni, J., Shiga, Y. & Kawai, H., 2018. Multilingual Grapheme-to-Phoneme Conversion with
Global Character Vectors. Proceedings of Interspeech 2018, pp.2823–2827.


Panayotov, V., Chen, G., Povey, D. & Khudanpur, S., 2015. LibriSpeech: An ASR Corpus
Based on Public Domain Audio Books. Proceedings of the 2015 IEEE International
Conference on Acoustics, Speech and Signal Processing (ICASSP 2015).
Pawar, P., Dwivedi, A., Boricha, J., Gohil, H. & Dubey, A., 2025. Optimizing Multilingual Text-To-Speech with Accents and Emotions. arXiv preprint arXiv:2506.16310.

Ren, Y., Hu, C., Tan, X., Qin, T., Zhao, S., Zhao, Z. & Liu, T.Y., 2020. FastSpeech 2: Fast
and High-Quality End-to-End Text to Speech. arXiv preprint arXiv:2006.04558.
Sailunaz, K., Dhaliwal, M., Rokne, J. & Alhajj, R., 2018. Emotion Detection from Text and
Speech: A Survey. Social Network Analysis and Mining, 8(1), p.28.
Senarath, K.L.P.M., 2024. Enhancing Sinhala Text-to-Speech System Using Deep Learning
Techniques. Dissertation, Master of Computer Science, University of Colombo School of
Computing.
Shen, J. et al., 2018. Natural TTS Synthesis by Conditioning WaveNet on Mel Spectrogram
Predictions. arXiv preprint arXiv:1712.05884.
Thayasivam, U., Gnanenthiram, T., Jeewantha, S. & Jayawickrama, U., 2025. SiTa –
Sinhala and Tamil Speaker Diarization Dataset in the Wild. Proceedings of CHiPSAL
2025.
Tits, N., El Haddad, K. & Dutoit, T., 2019. Exploring Transfer Learning for Low Resource
Emotional TTS. arXiv preprint arXiv:1901.04276.
van den Oord, A. et al., 2016. WaveNet: A Generative Model for Raw Audio. arXiv
preprint arXiv:1609.03499.
Wang, C. et al., 2023. Neural Codec Language Models are Zero-Shot Text to Speech
Synthesizers. arXiv preprint arXiv:2301.02111.
Warusawithana, D., Kulaweera, N., Weerasinghe, L. & Karunarathne, B., 2022. A Systematic Approach to Derive a Refined Speech Corpus for Sinhala. Proceedings of the
13th Language Resources and Evaluation Conference (LREC 2022).
Yang, G. et al., 2025. EmoVoice: LLM-based Emotional Text-to-Speech Model with
Freestyle Text Prompting. Proceedings of the 33rd ACM International Conference on
Multimedia (MM '25), pp.10748–10757.


## 10. Appendices

- **Appendix A** : Project timeline.
- **Appendix B** : Sample text sentences and emotion labels.
- **Appendix C** : Research paper summery table.
- **Appendix D** : Consent form.


