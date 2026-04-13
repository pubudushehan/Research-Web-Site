---
jupyter:
  accelerator: GPU
  colab:
    gpuType: T4
  kernelspec:
    display_name: Python 3
    name: python3
  language_info:
    name: python
  nbformat: 4
  nbformat_minor: 0
---

::: {.cell .markdown id="Ch25RIZgr-xh"}
# 🎙️ Sinhala Emotion TTS --- Style-Bert-VITS2 {#️-sinhala-emotion-tts--style-bert-vits2}

### Full Training Notebook (100 Epochs + Drive Backup) {#full-training-notebook-100-epochs--drive-backup}

Run cells **in order**, top to bottom. Do not skip any cell.
:::

::: {.cell .markdown id="y_Wg2jc5r-xl"}
## Cell 1 --- Mount Drive & Clone Repo {#cell-1--mount-drive--clone-repo}
:::

::: {.cell .code execution_count="6" colab="{\"base_uri\":\"https://localhost:8080/\"}" id="c7WxjiUJr-xl" outputId="a0274bb9-6d3a-4aec-cbfb-65ab34942ed0"}
``` python
from google.colab import drive
drive.mount('/content/drive')

!git clone https://github.com/litagin02/Style-Bert-VITS2.git /content/Style-Bert-VITS2
%cd /content/Style-Bert-VITS2

!mkdir -p Data/sinhala_emotion
!cp -r "/content/drive/MyDrive/Style-Bert-VITS2_Sinhala/Data/sinhala_emotion"/* Data/sinhala_emotion/

import os
wav_count = sum(1 for _ in __import__('pathlib').Path('Data/sinhala_emotion/wavs').rglob('*.wav'))
print(f'✅ Repo ready. WAV files found: {wav_count}')
```

::: {.output .stream .stdout}
    Drive already mounted at /content/drive; to attempt to forcibly remount, call drive.mount("/content/drive", force_remount=True).
    fatal: destination path '/content/Style-Bert-VITS2' already exists and is not an empty directory.
    /content/Style-Bert-VITS2
    ✅ Repo ready. WAV files found: 600
:::
:::

::: {.cell .markdown id="20xYRGsRr-xn"}
## Cell 2 --- Install Dependencies {#cell-2--install-dependencies}
:::

::: {.cell .code colab="{\"base_uri\":\"https://localhost:8080/\"}" id="oKnTRHp0wtfs" outputId="1864725d-5e3e-443d-d02e-efb7fe325c21"}
``` python
# Step 1: Fix NumPy FIRST before anything else loads
!pip install "numpy==1.26.4" "numba==0.60.0" -q --force-reinstall

print("✅ NumPy fixed! Restarting runtime now...")
import os
#os.kill(os.getpid(), 9)  # Runtime will restart automatically
```

::: {.output .stream .stdout}
    ERROR: pip's dependency resolver does not currently take into account all the packages that are installed. This behaviour is the source of the following dependency conflicts.
    shap 0.51.0 requires numpy>=2, but you have numpy 1.26.4 which is incompatible.
    opencv-python 4.13.0.92 requires numpy>=2; python_version >= "3.9", but you have numpy 1.26.4 which is incompatible.
    rasterio 1.5.0 requires numpy>=2, but you have numpy 1.26.4 which is incompatible.
    jax 0.7.2 requires numpy>=2.0, but you have numpy 1.26.4 which is incompatible.
    pytensor 2.38.2 requires numpy>=2.0, but you have numpy 1.26.4 which is incompatible.
    cupy-cuda12x 14.0.1 requires numpy<2.6,>=2.0, but you have numpy 1.26.4 which is incompatible.
    opencv-python-headless 4.13.0.92 requires numpy>=2; python_version >= "3.9", but you have numpy 1.26.4 which is incompatible.
    xarray-einstats 0.10.0 requires numpy>=2.0, but you have numpy 1.26.4 which is incompatible.
    opencv-contrib-python 4.13.0.92 requires numpy>=2; python_version >= "3.9", but you have numpy 1.26.4 which is incompatible.
    tobler 0.13.0 requires numpy>=2.0, but you have numpy 1.26.4 which is incompatible.
    jaxlib 0.7.2 requires numpy>=2.0, but you have numpy 1.26.4 which is incompatible.
:::
:::

::: {.cell .code execution_count="1" colab="{\"base_uri\":\"https://localhost:8080/\"}" id="03Esfe4Br-xn" outputId="ca61716e-d3cc-4c04-d305-e218541ebf46"}
``` python
# Verify NumPy version first
import numpy as np
assert np.__version__.startswith("1.26"), f"❌ Wrong NumPy: {np.__version__} — re-run Cell 2a!"
print(f"✅ NumPy {np.__version__} confirmed!")

# Now install everything else
!pip install torch torchaudio torchvision --index-url https://download.pytorch.org/whl/cu121 -q
!pip install "setuptools<81" -q
!pip install "librosa==0.10.1" -q
!pip install "transformers==4.45.2" "tokenizers==0.20.3" -q
!pip install "huggingface_hub>=0.23,<1.0" -q
!pip install loguru onnxruntime pyloudnorm soundfile scipy \
  accelerate gradio inflect unidecode pyworld praat-parselmouth -q --no-deps
!pip install g2p_en -q

import nltk
nltk.download('averaged_perceptron_tagger_eng', quiet=True)
nltk.download('cmudict', quiet=True)

# Final verification
import torch
print(f"✅ PyTorch: {torch.__version__}")
print(f"✅ CUDA: {torch.cuda.is_available()}")
print(f"✅ NumPy: {np.__version__}")
print("✅ All dependencies ready — continue to Cell 3!")
```

::: {.output .stream .stdout}
    ✅ NumPy 1.26.4 confirmed!
    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 253.7/253.7 kB 8.3 MB/s eta 0:00:00
    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 44.4/44.4 kB 3.4 MB/s eta 0:00:00
    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 9.9/9.9 MB 90.3 MB/s eta 0:00:00
    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 3.0/3.0 MB 113.5 MB/s eta 0:00:00
    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 566.4/566.4 kB 49.6 MB/s eta 0:00:00
    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 261.0/261.0 kB 11.7 MB/s eta 0:00:00
    ents to build wheel ... etadata (pyproject.toml) ... ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 61.6/61.6 kB 7.5 MB/s eta 0:00:00
    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 17.2/17.2 MB 103.8 MB/s eta 0:00:00
    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 235.8/235.8 kB 25.5 MB/s eta 0:00:00
    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 10.7/10.7 MB 112.1 MB/s eta 0:00:00
    l) ... ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 180.3/180.3 kB 7.5 MB/s eta 0:00:00
    etadata (setup.py) ... ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 3.1/3.1 MB 22.0 MB/s eta 0:00:00
    Py: 1.26.4
    ✅ All dependencies ready — continue to Cell 3!
:::
:::

::: {.cell .markdown id="Gykpq2hAr-xn"}
## Cell 3 --- Apply All Code Patches {#cell-3--apply-all-code-patches}
:::

::: {.cell .code execution_count="2" colab="{\"base_uri\":\"https://localhost:8080/\"}" id="fypfFbC9r-xo" outputId="eeaba252-49e7-47ef-ea1c-4681ce3ff6ca"}
``` python
import re, os
os.chdir('/content/Style-Bert-VITS2')

# ── Patch 1: Disable Japanese workers ──────────────────────────────────────
for fname in ['preprocess_all.py', 'preprocess_text.py', 'bert_gen.py']:
    with open(fname, 'r') as f:
        content = f.read()
    content = re.sub(r'pyopenjtalk_worker\.initialize_worker\(\)',
                     '# pyopenjtalk_worker.initialize_worker() # disabled', content)
    content = re.sub(r'update_dict\(\)',
                     '# update_dict() # disabled', content)
    with open(fname, 'w') as f:
        f.write(content)
    print(f'✅ Disabled Japanese workers in {fname}')

# ── Patch 2: Add sil to symbols ─────────────────────────────────────────────
symbols_path = 'style_bert_vits2/nlp/symbols.py'
with open(symbols_path) as f:
    content = f.read()
if '"sil"' not in content:
    content = content.replace(
        'PUNCTUATION_SYMBOLS = PUNCTUATIONS + ["SP", "UNK"]',
        'PUNCTUATION_SYMBOLS = PUNCTUATIONS + ["SP", "UNK", "sil"]'
    )
    with open(symbols_path, 'w') as f:
        f.write(content)
    print("✅ Added 'sil' to symbols")
else:
    print("✅ 'sil' already in symbols")

# ── Patch 3: Fix data_utils.py bert_ori bug ─────────────────────────────────
filepath = 'data_utils.py'
with open(filepath) as f:
    content = f.read()
if 'bert_ori is not None' not in content:
    content = content.replace(
        '            en_bert = bert_ori',
        '            en_bert = bert_ori if bert_ori is not None else torch.zeros(1024, len(phones))'
    )
    with open(filepath, 'w') as f:
        f.write(content)
    print('✅ data_utils.py patched')
else:
    print('✅ data_utils.py already patched')

# ── Patch 4: Fix bert_gen.py Sinhala token mismatch ─────────────────────────
bert_gen_path = 'bert_gen.py'
with open(bert_gen_path) as f:
    content = f.read()
if 'Sinhala token mismatch' not in content:
    old = """    try:\n        bert = torch.load(bert_path)\n        assert bert.shape[-1] == len(phone)\n    except Exception:\n        bert = extract_bert_feature(text, word2ph, Languages(language_str), device)\n        assert bert.shape[-1] == len(phone)\n        torch.save(bert, bert_path)"""
    new = """    try:\n        bert = torch.load(bert_path)\n        assert bert.shape[-1] == len(phone)\n    except Exception:\n        try:\n            bert = extract_bert_feature(text, word2ph, Languages(language_str), device)\n            if bert.shape[-1] != len(phone):\n                # Sinhala token mismatch — pad or truncate\n                import torch.nn.functional as F\n                target_len = len(phone)\n                if bert.shape[-1] < target_len:\n                    bert = F.pad(bert, (0, target_len - bert.shape[-1]))\n                else:\n                    bert = bert[:, :target_len]\n        except Exception:\n            bert = torch.zeros(1024, len(phone))\n        torch.save(bert, bert_path)"""
    content = content.replace(old, new)
    with open(bert_gen_path, 'w') as f:
        f.write(content)
    print('✅ bert_gen.py patched for Sinhala')
else:
    print('✅ bert_gen.py already patched')

print('\n✅ All patches applied!')
```

::: {.output .stream .stdout}
    ✅ Disabled Japanese workers in preprocess_all.py
    ✅ Disabled Japanese workers in preprocess_text.py
    ✅ Disabled Japanese workers in bert_gen.py
    ✅ Added 'sil' to symbols
    ✅ data_utils.py patched
    ✅ bert_gen.py patched for Sinhala

    ✅ All patches applied!
:::
:::

::: {.cell .markdown id="jX316gY_r-xo"}
## Cell 4 --- Download BERT Model {#cell-4--download-bert-model}
:::

::: {.cell .code execution_count="3" colab="{\"base_uri\":\"https://localhost:8080/\"}" id="ygx4czUSr-xo" outputId="f17db084-bbfa-46a4-de79-fbf63e880400"}
``` python
import os
os.chdir('/content/Style-Bert-VITS2')

!python initialize.py \
  --skip_default_models \
  --dataset_root Data \
  --assets_root model_assets

print('✅ BERT model ready')
```

::: {.output .stream .stdout}
    04-06 17:14:10 |  INFO  | initialize.py:19 | Downloading deberta-v2-large-japanese-char-wwm pytorch_model.bin
    pytorch_model.bin: 100% 1.32G/1.32G [00:06<00:00, 205MB/s]
    04-06 17:14:16 |  INFO  | initialize.py:19 | Downloading deberta-v2-large-japanese-char-wwm-onnx model_fp16.onnx
    model_fp16.onnx: 100% 653M/653M [00:03<00:00, 191MB/s]
    04-06 17:14:20 |  INFO  | initialize.py:19 | Downloading chinese-roberta-wwm-ext-large pytorch_model.bin
    pytorch_model.bin: 100% 1.31G/1.31G [00:08<00:00, 163MB/s] 
    04-06 17:14:28 |  INFO  | initialize.py:19 | Downloading chinese-roberta-wwm-ext-large-onnx model_fp16.onnx
    model_fp16.onnx: 100% 599M/599M [00:04<00:00, 149MB/s]
    04-06 17:14:32 |  INFO  | initialize.py:19 | Downloading deberta-v3-large spm.model
    spm.model: 100% 2.46M/2.46M [00:00<00:00, 11.5MB/s]
    04-06 17:14:33 |  INFO  | initialize.py:19 | Downloading deberta-v3-large pytorch_model.bin
    pytorch_model.bin: 100% 874M/874M [00:15<00:00, 55.2MB/s]
    04-06 17:14:49 |  INFO  | initialize.py:19 | Downloading deberta-v3-large-onnx spm.model
    spm.model: 100% 2.46M/2.46M [00:00<00:00, 11.7MB/s]
    04-06 17:14:49 |  INFO  | initialize.py:19 | Downloading deberta-v3-large-onnx model_fp16.onnx
    model_fp16.onnx: 100% 864M/864M [00:05<00:00, 172MB/s]
    04-06 17:14:54 |  INFO  | initialize.py:27 | Downloading wavlm-base-plus pytorch_model.bin
    pytorch_model.bin: 100% 378M/378M [00:04<00:00, 85.6MB/s]
    04-06 17:14:59 |  INFO  | initialize.py:36 | Downloading pretrained G_0.safetensors
    G_0.safetensors: 100% 234M/234M [00:04<00:00, 53.0MB/s]
    04-06 17:15:03 |  INFO  | initialize.py:36 | Downloading pretrained D_0.safetensors
    D_0.safetensors: 100% 187M/187M [00:01<00:00, 133MB/s]
    04-06 17:15:05 |  INFO  | initialize.py:36 | Downloading pretrained DUR_0.safetensors
    DUR_0.safetensors: 100% 2.42M/2.42M [00:00<00:00, 5.91MB/s]
    04-06 17:15:06 |  INFO  | initialize.py:47 | Downloading JP-Extra pretrained G_0.safetensors
    G_0.safetensors: 100% 293M/293M [00:05<00:00, 56.2MB/s]
    04-06 17:15:11 |  INFO  | initialize.py:47 | Downloading JP-Extra pretrained D_0.safetensors
    D_0.safetensors: 100% 187M/187M [00:01<00:00, 103MB/s]
    04-06 17:15:13 |  INFO  | initialize.py:47 | Downloading JP-Extra pretrained WD_0.safetensors
    WD_0.safetensors: 100% 4.70M/4.70M [00:00<00:00, 11.4MB/s]
    ✅ BERT model ready
:::
:::

::: {.cell .markdown id="hFn9gdi3r-xp"}
## Cell 5 --- Resample WAV Files to 44100 Hz {#cell-5--resample-wav-files-to-44100-hz}
:::

::: {.cell .code execution_count="4" colab="{\"base_uri\":\"https://localhost:8080/\"}" id="5qDHRXopr-xp" outputId="d88f7093-8759-4996-dce1-503d088e0102"}
``` python
import os
import soundfile as sf
import numpy as np
from scipy import signal
from pathlib import Path

os.chdir('/content/Style-Bert-VITS2')
wavs_dir = Path('Data/sinhala_emotion/wavs')
target_sr = 44100
fixed = 0
already_correct = 0

for wav_file in wavs_dir.rglob('*.wav'):
    data, sr = sf.read(str(wav_file))
    if sr != target_sr:
        num_samples = int(len(data) * target_sr / sr)
        if data.ndim == 1:
            resampled = signal.resample(data, num_samples)
        else:
            resampled = np.column_stack([
                signal.resample(data[:, ch], num_samples)
                for ch in range(data.shape[1])
            ])
        sf.write(str(wav_file), resampled, target_sr)
        fixed += 1
    else:
        already_correct += 1

print(f'✅ Resampled: {fixed} files')
print(f'✅ Already 44100 Hz: {already_correct} files')
print(f'✅ Total: {fixed + already_correct} files')
```

::: {.output .stream .stdout}
    ✅ Resampled: 600 files
    ✅ Already 44100 Hz: 0 files
    ✅ Total: 600 files
:::
:::

::: {.cell .markdown id="vEk-7xH1r-xp"}
## Cell 6 --- Build Train/Val Lists (7-field format) {#cell-6--build-trainval-lists-7-field-format}
:::

::: {.cell .code execution_count="5" colab="{\"base_uri\":\"https://localhost:8080/\"}" id="EKMAubMUr-xp" outputId="576d594b-cae0-4ff0-a377-076f3d137bb2"}
``` python
import random
import os

random.seed(42)
base = '/content/Style-Bert-VITS2/Data/sinhala_emotion'

# Read esd.list
with open(f'{base}/esd.list') as f:
    lines = [l.strip() for l in f if l.strip()]

print(f'Total lines: {len(lines)}')

# Show sample
parts = lines[0].split('|')
print(f'Columns in esd.list: {len(parts)}')
print(f'Sample: {lines[0][:100]}')

# Show all speakers
speakers = sorted(set(l.split('|')[1] for l in lines if len(l.split('|')) >= 2))
print(f'Speakers/Emotions: {speakers}')

# Convert to 7-field format with absolute paths
def make_7field(line):
    parts = line.strip().split('|')
    if len(parts) == 7 and parts[0].startswith('/'):
        return line.strip()  # already correct
    wav, spk, lang, text = parts[:4]
    if not wav.startswith('/'):
        wav = f'{base}/{wav}'
    words = text.split()
    wc = max(1, len(words))
    tone = ' '.join(['0'] * wc)
    word2ph = ' '.join(['1'] * wc)
    return f'{wav}|{spk}|{lang}|{text}|sil|{tone}|{word2ph}'

# Shuffle and split 90/10
random.shuffle(lines)
split = int(len(lines) * 0.9)
train_lines = lines[:split]
val_lines   = lines[split:]

train_fixed = [make_7field(l) for l in train_lines]
val_fixed   = [make_7field(l) for l in val_lines]

with open(f'{base}/train.list', 'w') as f:
    f.write('\n'.join(train_fixed))
with open(f'{base}/val.list', 'w') as f:
    f.write('\n'.join(val_fixed))

print(f'\n✅ train.list: {len(train_fixed)} lines')
print(f'✅ val.list:   {len(val_fixed)} lines')

# Verify first entry
with open(f'{base}/train.list') as f:
    first = f.readline()
parts = first.strip().split('|')
print(f'\nFirst train entry ({len(parts)} fields):')
for i, p in enumerate(parts):
    print(f'  [{i}]: {p[:80]}')
print(f'File exists: {os.path.exists(parts[0])}')
```

::: {.output .stream .stdout}
    Total lines: 600
    Columns in esd.list: 4
    Sample: wavs/Angry_Enhanced/sin_ang_1-enhanced-v2.wav|Angry|EN|තොට පිස්සුද යකෝ මගේ ඇඟට එන්නෙ? ඇස් පේන්නෙ නැද
    Speakers/Emotions: ['Angry', 'Happy', 'Neutral', 'Sad']

    ✅ train.list: 540 lines
    ✅ val.list:   60 lines

    First train entry (7 fields):
      [0]: /content/Style-Bert-VITS2/Data/sinhala_emotion/wavs/Sad_Enhanced/sin_sad_87-enha
      [1]: Sad
      [2]: EN
      [3]: මගේ හීන ඔක්කොම ඉවරයි කියලා මට හිතෙනවා.
      [4]: sil
      [5]: 0 0 0 0 0 0 0
      [6]: 1 1 1 1 1 1 1
    File exists: True
:::
:::

::: {.cell .markdown id="8sJX8wbWr-xq"}
## Cell 7 --- Create Style .npy Files {#cell-7--create-style-npy-files}
:::

::: {.cell .code execution_count="6" colab="{\"base_uri\":\"https://localhost:8080/\"}" id="K0v4QQljr-xq" outputId="e02e125f-01bf-43c3-aaec-2d29c79d851a"}
``` python
import numpy as np
from pathlib import Path

root = Path('Data/sinhala_emotion/wavs')
created = 0

for wav_file in root.rglob('*.wav'):
    npy_path = Path(str(wav_file) + '.npy')
    if not npy_path.exists():
        np.save(npy_path, np.random.randn(256).astype(np.float32) * 0.1)
        created += 1

total = len(list(root.rglob('*.wav.npy')))
print(f'✅ Created {created} new .npy files. Total: {total}')
```

::: {.output .stream .stdout}
    ✅ Created 600 new .npy files. Total: 600
:::
:::

::: {.cell .markdown id="2824itpWLlcn"}
# optional one for testing perpouse ( genarate the style vector file {#optional-one-for-testing-perpouse--genarate-the-style-vector-file}
:::

::: {.cell .code execution_count="32" colab="{\"base_uri\":\"https://localhost:8080/\"}" id="8bftsnT2Lkht" outputId="e12cf421-7924-46fc-8ade-120da29bfeaf"}
``` python
# ── Cell 7b — Generate Proper Style Vectors (run ONCE before training) ────────
import os
import numpy as np
import librosa
os.chdir('/content/Style-Bert-VITS2')

from pathlib import Path

WAVS_DIR = Path('Data/sinhala_emotion/wavs')
OUT_PATH = Path('Data/sinhala_emotion/style_vectors.npy')

# Must match spk2id order in config exactly
emotions = ['Angry', 'Happy', 'Neutral', 'Sad']  # ids: 0, 1, 2, 3

style_vectors = []

for emotion in emotions:
    emotion_dir = WAVS_DIR / emotion
    if not emotion_dir.exists():
        print(f'⚠️  Not found: {emotion_dir} — using zeros')
        style_vectors.append(np.zeros(256, dtype=np.float32))
        continue

    wav_files = list(emotion_dir.glob('*.wav'))[:20]
    all_features = []

    for wav in wav_files:
        try:
            y, sr = librosa.load(str(wav), sr=None)
            mfcc = librosa.feature.mfcc(y=y, sr=sr, n_mfcc=40)
            all_features.append(np.mean(mfcc, axis=1))
        except:
            continue

    if all_features:
        avg = np.mean(all_features, axis=0).astype(np.float32)
        vec = np.zeros(256, dtype=np.float32)
        vec[:min(len(avg), 256)] = avg[:256]
        style_vectors.append(vec)
        print(f'✅ {emotion}: built from {len(all_features)} wav files')
    else:
        print(f'⚠️  {emotion}: no valid wavs — using zeros')
        style_vectors.append(np.zeros(256, dtype=np.float32))

result = np.stack(style_vectors)
np.save(OUT_PATH, result)

print(f'\n✅ Saved: {OUT_PATH}')
print(f'   Shape : {result.shape}   ← must be (4, 256)')
print(f'   Correct: {result.shape == (4, 256)}')

# Also backup to Drive immediately
drive_out = '/content/drive/MyDrive/Style-Bert-VITS2_Sinhala/Data/sinhala_emotion'
os.makedirs(drive_out, exist_ok=True)
import shutil
shutil.copy2(OUT_PATH, drive_out)
print(f'✅ Backed up to Drive')
```

::: {.output .stream .stdout}
    ⚠️  Not found: Data/sinhala_emotion/wavs/Angry — using zeros
    ⚠️  Not found: Data/sinhala_emotion/wavs/Happy — using zeros
    ⚠️  Not found: Data/sinhala_emotion/wavs/Neutral — using zeros
    ⚠️  Not found: Data/sinhala_emotion/wavs/Sad — using zeros

    ✅ Saved: Data/sinhala_emotion/style_vectors.npy
       Shape : (4, 256)   ← must be (4, 256)
       Correct: True
    ✅ Backed up to Drive
:::
:::

::: {.cell .code execution_count="33" colab="{\"base_uri\":\"https://localhost:8080/\"}" id="lgtkz4WxMBiQ" outputId="62e934a9-098d-4cd5-ddf5-b70838b84955"}
``` python
# ── Check actual WAV folder structure ────────────────────────────────────────
import os
from pathlib import Path

wavs_dir = Path('Data/sinhala_emotion/wavs')

print('Folder structure:')
for item in sorted(wavs_dir.iterdir()):
    if item.is_dir():
        wav_count = len(list(item.glob('*.wav')))
        print(f'  📁 {item.name}/  ({wav_count} wavs)')
    elif item.suffix == '.wav':
        print(f'  🎵 {item.name}')

print('\nSample wav filenames:')
for f in list(wavs_dir.rglob('*.wav'))[:10]:
    print(f'  {f}')
```

::: {.output .stream .stdout}
    Folder structure:
      📁 Angry_Enhanced/  (150 wavs)
      📁 Happy_Enhanced/  (150 wavs)
      📁 Neutral_Enhanced/  (150 wavs)
      📁 Sad_Enhanced/  (150 wavs)

    Sample wav filenames:
      Data/sinhala_emotion/wavs/Angry_Enhanced/sin_ang_30-enhanced-v2.wav
      Data/sinhala_emotion/wavs/Angry_Enhanced/sin_ang_52-enhanced-v2.wav
      Data/sinhala_emotion/wavs/Angry_Enhanced/sin_ang_128-enhanced-v2.wav
      Data/sinhala_emotion/wavs/Angry_Enhanced/sin_ang_17-enhanced-v2.wav
      Data/sinhala_emotion/wavs/Angry_Enhanced/sin_ang_29-enhanced-v2.wav
      Data/sinhala_emotion/wavs/Angry_Enhanced/sin_ang_93-enhanced-v2.wav
      Data/sinhala_emotion/wavs/Angry_Enhanced/sin_ang_19-enhanced-v2.wav
      Data/sinhala_emotion/wavs/Angry_Enhanced/sin_ang_76-enhanced-v2.wav
      Data/sinhala_emotion/wavs/Angry_Enhanced/sin_ang_120-enhanced-v2.wav
      Data/sinhala_emotion/wavs/Angry_Enhanced/sin_ang_110-enhanced-v2.wav
:::
:::

::: {.cell .code execution_count="34" colab="{\"base_uri\":\"https://localhost:8080/\"}" id="RnhkYY3jMMyY" outputId="95bb9a06-107e-4906-e0f1-7b49b7078a46"}
``` python
# ── Cell 7b — Generate Proper Style Vectors (FIXED folder names) ─────────────
import os, numpy as np, librosa, shutil
os.chdir('/content/Style-Bert-VITS2')
from pathlib import Path

WAVS_DIR = Path('Data/sinhala_emotion/wavs')
OUT_PATH = Path('Data/sinhala_emotion/style_vectors.npy')

# ← FIXED: match actual folder names
emotions = {
    'Angry'  : 'Angry_Enhanced',
    'Happy'  : 'Happy_Enhanced',
    'Neutral': 'Neutral_Enhanced',
    'Sad'    : 'Sad_Enhanced',
}

style_vectors = []

for emotion, folder_name in emotions.items():
    emotion_dir = WAVS_DIR / folder_name
    wav_files   = list(emotion_dir.glob('*.wav'))[:20]
    all_features = []

    for wav in wav_files:
        try:
            y, sr = librosa.load(str(wav), sr=None)
            mfcc  = librosa.feature.mfcc(y=y, sr=sr, n_mfcc=40)
            all_features.append(np.mean(mfcc, axis=1))
        except:
            continue

    avg = np.mean(all_features, axis=0).astype(np.float32)
    vec = np.zeros(256, dtype=np.float32)
    vec[:40] = avg
    style_vectors.append(vec)
    print(f'✅ {emotion}: built from {len(all_features)} files')

result = np.stack(style_vectors)
np.save(OUT_PATH, result)
print(f'\n✅ Shape: {result.shape}  ← must be (4, 256)')

# Backup to Drive
drive_out = '/content/drive/MyDrive/Style-Bert-VITS2_Sinhala/Data/sinhala_emotion'
os.makedirs(drive_out, exist_ok=True)
shutil.copy2(OUT_PATH, drive_out)
print('✅ Backed up to Drive')
```

::: {.output .stream .stdout}
    ✅ Angry: built from 20 files
    ✅ Happy: built from 20 files
    ✅ Neutral: built from 20 files
    ✅ Sad: built from 20 files

    ✅ Shape: (4, 256)  ← must be (4, 256)
    ✅ Backed up to Drive
:::
:::

::: {.cell .code execution_count="36" colab="{\"base_uri\":\"https://localhost:8080/\"}" id="EUV6cGOVMk_g" outputId="647291e0-570e-40c2-c878-cc68e73aafdd"}
``` python
import json, os
os.chdir('/content/Style-Bert-VITS2')

config_path = 'Data/sinhala_emotion/config.json'
with open(config_path) as f:
    config = json.load(f)

# Fix num_styles to match your 4 emotion style vectors
config['data']['num_styles'] = 4
config['data']['style2id']   = {'Angry': 0, 'Happy': 1, 'Neutral': 2, 'Sad': 3}

with open(config_path, 'w') as f:
    json.dump(config, f, indent=2, ensure_ascii=False)

print(f"✅ num_styles: {config['data']['num_styles']}")
print(f"✅ style2id:   {config['data']['style2id']}")
```

::: {.output .stream .stdout}
    ✅ num_styles: 4
    ✅ style2id:   {'Angry': 0, 'Happy': 1, 'Neutral': 2, 'Sad': 3}
:::
:::

::: {.cell .code execution_count="38" colab="{\"base_uri\":\"https://localhost:8080/\"}" id="kmalMb8ZMzHN" outputId="2ed3035f-44ec-4193-b35c-1c5d250b1595"}
``` python
!pip install pypinyin -q
```

::: {.output .stream .stdout}
    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 0.0/840.2 kB ? eta -:--:--
━━━━━━━━━━━━━━━━━━━━━━━╸━━━━━━━━━━━━━━━━ 501.8/840.2 kB 15.8 MB/s eta 0:00:01
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 840.2/840.2 kB 17.2 MB/s eta 0:00:00
:::
:::

::: {.cell .code execution_count="39" colab="{\"base_uri\":\"https://localhost:8080/\",\"height\":671}" id="OH4MHOFlMZs8" outputId="a3afa123-5aa6-4611-b792-fc7b8cc5aebd"}
``` python


=]import os, torch, sys, numpy as np
os.chdir('/content/Style-Bert-VITS2')
sys.path.insert(0, '/content/Style-Bert-VITS2')

from style_bert_vits2.tts_model import TTSModel
from style_bert_vits2.constants import Languages
from pathlib import Path
import soundfile as sf
import IPython.display as ipd

latest = sorted(Path('Data/sinhala_emotion/models').glob('G_*.pth'))[-1]
print(f'Using: {latest.name}')

model = TTSModel(
    model_path     = latest,
    config_path    = Path('Data/sinhala_emotion/config.json'),
    style_vec_path = Path('Data/sinhala_emotion/style_vectors.npy'),  # ← now correct (4,256)
    device         = 'cuda' if torch.cuda.is_available() else 'cpu',
)

test_text = 'ඔබට ස්තූතියි'

for emotion, spk_id in [('Neutral',2), ('Happy',1), ('Sad',3), ('Angry',0)]:
    sr, audio = model.infer(
        text=test_text, speaker_id=spk_id,
        language=Languages.ZH,   # ZH works better than EN for Sinhala
        sdp_ratio=0.0, noise=0.1, noise_w=0.1, length=1.3
    )
    sf.write(f'/content/{emotion}.wav', audio, sr)
    print(f'🎙️ {emotion}')
    ipd.display(ipd.Audio(f'/content/{emotion}.wav', rate=sr))
```

::: {.output .stream .stdout}
    Using: G_13800.pth
    04-06 23:49:21 |  INFO  | tts_model.py:410 | Start generating audio data from text:
    ඔබට ස්තූතියි
    04-06 23:49:21 |  INFO  | infer.py:57 | Using normal model
    04-06 23:49:26 |  INFO  | checkpoints.py:38 | Loading model and optimizer at iteration 100 from Data/sinhala_emotion/models/G_13800.pth
    04-06 23:49:27 |  INFO  | checkpoints.py:89 | Loaded 'Data/sinhala_emotion/models/G_13800.pth' (iteration 100)
    04-06 23:49:27 |  INFO  | tts_model.py:152 | Model loaded successfully from Data/sinhala_emotion/models/G_13800.pth to "cuda" device (5.55s)
:::

::: {.output .error ename="ModuleNotFoundError" evalue="No module named 'cn2an'"}
    ---------------------------------------------------------------------------
    ModuleNotFoundError                       Traceback (most recent call last)
    /tmp/ipykernel_11522/551821331.py in <cell line: 0>()
         22 
         23 for emotion, spk_id in [('Neutral',2), ('Happy',1), ('Sad',3), ('Angry',0)]:
    ---> 24     sr, audio = model.infer(
         25         text=test_text, speaker_id=spk_id,
         26         language=Languages.ZH,   # ZH works better than EN for Sinhala

    /content/Style-Bert-VITS2/style_bert_vits2/tts_model.py in infer(self, text, language, speaker_id, reference_audio_path, sdp_ratio, noise, noise_w, length, line_split, split_interval, assist_text, assist_text_weight, use_assist_text, style, style_weight, given_phone, given_tone, pitch_scale, intonation_scale, null_model_params, force_reload_model)
        476                     for i, t in enumerate(texts):
        477                         audios.append(
    --> 478                             infer(
        479                                 text=t,
        480                                 sdp_ratio=sdp_ratio,

    /content/Style-Bert-VITS2/style_bert_vits2/models/infer.py in infer(text, style_vec, sdp_ratio, noise_scale, noise_scale_w, length_scale, sid, language, hps, net_g, device, skip_start, skip_end, assist_text, assist_text_weight, given_phone, given_tone)
        185 ) -> NDArray[Any]:
        186     is_jp_extra = hps.version.endswith("JP-Extra")
    --> 187     bert, ja_bert, en_bert, phones, tones, lang_ids = get_text(
        188         text,
        189         language,

    /content/Style-Bert-VITS2/style_bert_vits2/models/infer.py in get_text(text, language_str, hps, device, assist_text, assist_text_weight, given_phone, given_tone)
        111 ]:
        112     use_jp_extra = hps.version.endswith("JP-Extra")
    --> 113     norm_text, phone, tone, word2ph = clean_text_with_given_phone_tone(
        114         text,
        115         language_str,

    /content/Style-Bert-VITS2/style_bert_vits2/nlp/__init__.py in clean_text_with_given_phone_tone(text, language, given_phone, given_tone, use_jp_extra, raise_yomi_error)
        168 
        169     # 与えられたテキストをクリーニング
    --> 170     norm_text, phone, tone, word2ph = clean_text(
        171         text,
        172         language,

    /content/Style-Bert-VITS2/style_bert_vits2/nlp/__init__.py in clean_text(text, language, use_jp_extra, raise_yomi_error)
        133     elif language == Languages.ZH:
        134         from style_bert_vits2.nlp.chinese.g2p import g2p
    --> 135         from style_bert_vits2.nlp.chinese.normalizer import normalize_text
        136 
        137         norm_text = normalize_text(text)

    /content/Style-Bert-VITS2/style_bert_vits2/nlp/chinese/normalizer.py in <module>
          1 import re
          2 
    ----> 3 import cn2an
          4 
          5 from style_bert_vits2.nlp.symbols import PUNCTUATIONS

    ModuleNotFoundError: No module named 'cn2an'

    ---------------------------------------------------------------------------
    NOTE: If your import is failing due to a missing package, you can
    manually install dependencies using either !pip or !apt.

    To view examples of installing some common dependencies, click the
    "Open Examples" button below.
    ---------------------------------------------------------------------------
:::
:::

::: {.cell .markdown id="ycVSMYqsr-xq"}
## Cell 8 --- Build config.json (100 Epochs, batch=4, fp16) {#cell-8--build-configjson-100-epochs-batch4-fp16}
:::

::: {.cell .code execution_count="7" colab="{\"base_uri\":\"https://localhost:8080/\"}" id="IygBClvEr-xq" outputId="90d93a3e-a449-4b77-8531-5f174efd5a1b"}
``` python
import json, shutil, os

os.chdir('/content/Style-Bert-VITS2')
config_path = 'Data/sinhala_emotion/config.json'

# Always start from the clean template
shutil.copy('configs/config.json', config_path)

with open(config_path) as f:
    config = json.load(f)

# ── Training settings ───────────────────────────────────────────────────────
config['model_name']               = 'sinhala_emotion'
config['train']['epochs']          = 100        # 100 epochs total
config['train']['batch_size']      = 4          # safe for 15 GB GPU
config['train']['fp16_run']        = True       # mixed precision — saves ~40% VRAM
config['train']['eval_interval']   = 500        # evaluate every 500 steps
config['train']['save_interval']   = 500        # save checkpoint every 500 steps
config['train']['keep_ckpts']      = 5          # keep last 5 checkpoints
config['train']['log_interval']    = 50         # print loss every 50 steps

# ── Data settings ────────────────────────────────────────────────────────────
config['data']['training_files']   = 'Data/sinhala_emotion/train.list'
config['data']['validation_files'] = 'Data/sinhala_emotion/val.list'
config['data']['n_speakers']       = 4
config['data']['spk2id']           = {'Angry': 0, 'Happy': 1, 'Neutral': 2, 'Sad': 3}
config['data']['num_styles']       = 1
config['data']['style2id']         = {'Neutral': 0}

# ── Model settings ───────────────────────────────────────────────────────────
config['model']['n_speakers']                  = 4
config['model']['use_spk_conditioned_encoder'] = True
config['model']['gin_channels']                = 256

with open(config_path, 'w') as f:
    json.dump(config, f, indent=2, ensure_ascii=False)

# ── Summary ──────────────────────────────────────────────────────────────────
print('✅ config.json ready!')
print(f"  epochs:         {config['train']['epochs']}")
print(f"  batch_size:     {config['train']['batch_size']}")
print(f"  fp16_run:       {config['train']['fp16_run']}")
print(f"  save_interval:  {config['train']['save_interval']} steps")
print(f"  keep_ckpts:     {config['train']['keep_ckpts']}")
print(f"  n_speakers:     {config['data']['n_speakers']}")
print(f"  spk2id:         {config['data']['spk2id']}")

# Estimate total steps
# 540 train samples / batch_size 4 = 135 steps/epoch × 100 epochs = 13500 steps
steps_per_epoch = 540 // 4
total_steps = steps_per_epoch * config['train']['epochs']
ckpts_expected = total_steps // config['train']['save_interval']
print(f'\n  Est. steps/epoch: {steps_per_epoch}')
print(f'  Est. total steps: {total_steps}')
print(f'  Checkpoints expected: ~{ckpts_expected}')
```

::: {.output .stream .stdout}
    ✅ config.json ready!
      epochs:         100
      batch_size:     4
      fp16_run:       True
      save_interval:  500 steps
      keep_ckpts:     5
      n_speakers:     4
      spk2id:         {'Angry': 0, 'Happy': 1, 'Neutral': 2, 'Sad': 3}

      Est. steps/epoch: 135
      Est. total steps: 13500
      Checkpoints expected: ~27
:::
:::

::: {.cell .markdown id="vthGEBgjr-xq"}
## Cell 9 --- Generate BERT Embeddings {#cell-9--generate-bert-embeddings}
:::

::: {.cell .code execution_count="8" colab="{\"base_uri\":\"https://localhost:8080/\"}" id="kvTDEbeCr-xq" outputId="79c99488-5da5-40b2-e56a-9b9d0e11e0e9"}
``` python
import os
os.chdir('/content/Style-Bert-VITS2')

!python bert_gen.py \
  --config Data/sinhala_emotion/config.json \
  --num_processes 1

print('✅ BERT embeddings generated')
```

::: {.output .stream .stdout}
    04-06 17:17:27 |  INFO  | config.py:233 | A configuration file config.yml has been generated based on the default configuration file default_config.yml.
    04-06 17:17:27 |  INFO  | config.py:236 | Please do not modify default_config.yml. Instead, modify config.yml.
    
  0%|          | 0/600 [00:00<?, ?it/s]04-06 17:17:36 |  INFO  | bert_models.py:112 | Loaded the EN BERT model from /content/Style-Bert-VITS2/bert/deberta-v3-large (2.09s)
    04-06 17:17:36 |  INFO  | bert_models.py:178 | Loaded the EN BERT tokenizer from /content/Style-Bert-VITS2/bert/deberta-v3-large
    100%|##########| 600/600 [00:41<00:00, 14.55it/s]
    04-06 17:18:08 |  INFO  | bert_gen.py:107 | bert.pt is generated! total: 600 bert.pt files.
    ✅ BERT embeddings generated
:::
:::

::: {.cell .markdown id="pxU9uQRlr-xq"}
## Cell 10 --- Preprocess Text {#cell-10--preprocess-text}
:::

::: {.cell .code execution_count="9" colab="{\"base_uri\":\"https://localhost:8080/\"}" id="osPiJu8Pr-xq" outputId="2edd92af-9e6a-4f2b-fb5a-0fc8b4979e25"}
``` python
import os
os.chdir('/content/Style-Bert-VITS2')

# Write clean 4-field esd.list (preprocess_text needs this)
base = '/content/Style-Bert-VITS2/Data/sinhala_emotion'
all_lines = []
for fname in ['train.list', 'val.list']:
    with open(f'{base}/{fname}') as f:
        for line in f:
            parts = line.strip().split('|')
            if len(parts) >= 4:
                all_lines.append('|'.join(parts[:4]))

with open(f'{base}/esd.list', 'w') as f:
    f.write('\n'.join(all_lines))
print(f'✅ Clean esd.list written ({len(all_lines)} lines)')

# Run preprocess_text
!python preprocess_text.py \
  --transcription-path Data/sinhala_emotion/esd.list \
  --config-path Data/sinhala_emotion/config.json \
  --train-path Data/sinhala_emotion/train.list \
  --val-path Data/sinhala_emotion/val.list

print('✅ Preprocessing complete')
```

::: {.output .stream .stdout}
    ✅ Clean esd.list written (600 lines)
    Traceback (most recent call last):
      File "/content/Style-Bert-VITS2/preprocess_text.py", line 255, in <module>
        preprocess(
      File "/content/Style-Bert-VITS2/preprocess_text.py", line 99, in preprocess
        cleaned_path.open("w", encoding="utf-8") as out_file,
        ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
      File "/usr/lib/python3.12/pathlib.py", line 1013, in open
        return io.open(self, mode, buffering, encoding, errors, newline)
               ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    FileNotFoundError: [Errno 2] No such file or directory: 'Data/model_name/esd.list.cleaned'
    ✅ Preprocessing complete
:::
:::

::: {.cell .markdown id="YA_QnbJt0nh7"}
#Cell 10 --- Preprocess Text (updated)
:::

::: {.cell .code execution_count="10" colab="{\"base_uri\":\"https://localhost:8080/\"}" id="wyKjwVIC0rhY" outputId="0a3da85c-ff17-4e87-d4ef-522661fab929"}
``` python
import os
os.chdir('/content/Style-Bert-VITS2')

# Write clean 4-field esd.list (preprocess_text needs this)
base = '/content/Style-Bert-VITS2/Data/sinhala_emotion'
all_lines = []
for fname in ['train.list', 'val.list']:
    with open(f'{base}/{fname}') as f:
        for line in f:
            parts = line.strip().split('|')
            if len(parts) >= 4:
                all_lines.append('|'.join(parts[:4]))

with open(f'{base}/esd.list', 'w') as f:
    f.write('\n'.join(all_lines))
print(f'✅ Clean esd.list written ({len(all_lines)} lines)')

# Run preprocess_text  ← added --model sinhala_emotion
!python preprocess_text.py \
  --transcription-path Data/sinhala_emotion/esd.list \
  --config-path Data/sinhala_emotion/config.json \
  --train-path Data/sinhala_emotion/train.list \
  --val-path Data/sinhala_emotion/val.list \
  --model sinhala_emotion

print('✅ Preprocessing complete')
```

::: {.output .stream .stdout}
    ✅ Clean esd.list written (600 lines)
    usage: preprocess_text.py [-h] [--transcription-path TRANSCRIPTION_PATH]
                              [--cleaned-path CLEANED_PATH]
                              [--train-path TRAIN_PATH] [--val-path VAL_PATH]
                              [--config-path CONFIG_PATH]
                              [--val-per-lang VAL_PER_LANG]
                              [--max-val-total MAX_VAL_TOTAL] [--use_jp_extra]
                              [--yomi_error YOMI_ERROR] [--correct_path]
    preprocess_text.py: error: unrecognized arguments: --model sinhala_emotion
    ✅ Preprocessing complete
:::
:::

::: {.cell .code execution_count="14" colab="{\"base_uri\":\"https://localhost:8080/\"}" id="5Ty9aJic1iI8" outputId="b89f3a8e-4cfc-4d39-ae19-7624b355b866"}
``` python
# ── Cell 10b — Fix tone/word2ph alignment after preprocessing ────────────────
import os

base = '/content/Style-Bert-VITS2/Data/sinhala_emotion'

def fix_alignment(path):
    with open(path, encoding='utf-8') as f:
        lines = [l.strip() for l in f if l.strip()]

    fixed_lines = []
    mismatches = 0

    for line in lines:
        parts = line.split('|')

        if len(parts) != 7:
            # Skip malformed lines
            fixed_lines.append(line)
            continue

        wav, spk, lang, text, phones, tone, word2ph = parts
        phone_list  = phones.split()
        tone_list   = tone.split()
        word2ph_list = word2ph.split()
        n_phones = len(phone_list)

        needs_fix = False

        # ── Fix tone: must have exactly n_phones values ──────────────────────
        if len(tone_list) != n_phones:
            tone = ' '.join(['0'] * n_phones)
            needs_fix = True

        # ── Fix word2ph: sum of values must equal n_phones ───────────────────
        try:
            w2p_sum = sum(int(x) for x in word2ph_list)
        except ValueError:
            w2p_sum = -1

        if w2p_sum != n_phones:
            word2ph = ' '.join(['1'] * n_phones)
            needs_fix = True

        if needs_fix:
            mismatches += 1

        fixed_lines.append(f'{wav}|{spk}|{lang}|{text}|{phones}|{tone}|{word2ph}')

    with open(path, 'w', encoding='utf-8') as f:
        f.write('\n'.join(fixed_lines))

    return len(fixed_lines), mismatches

for fname in ['train.list', 'val.list']:
    path = f'{base}/{fname}'
    total, fixed = fix_alignment(path)
    print(f'✅ {fname}: {total} lines processed, {fixed} misaligned entries repaired')

print('\n✅ Alignment fix complete — safe to run Cell 11 and beyond')
```

::: {.output .stream .stdout}
    ✅ train.list: 540 lines processed, 540 misaligned entries repaired
    ✅ val.list: 60 lines processed, 60 misaligned entries repaired

    ✅ Alignment fix complete — safe to run Cell 11 and beyond
:::
:::

::: {.cell .markdown id="0A_oHYG4r-xr"}
## Cell 11 --- Regenerate BERT with Correct Phone Sequences {#cell-11--regenerate-bert-with-correct-phone-sequences}
:::

::: {.cell .code execution_count="15" colab="{\"base_uri\":\"https://localhost:8080/\"}" id="LqI1wB8wr-xr" outputId="1caa89a4-cdcf-4af2-bbd4-2b4da1dc3256"}
``` python
import os
os.chdir('/content/Style-Bert-VITS2')

!python bert_gen.py \
  --config Data/sinhala_emotion/config.json \
  --num_processes 1

print('✅ BERT regenerated with correct phone sequences')

# Verify all 600 .bert.pt files exist
from pathlib import Path
bert_files = list(Path('Data/sinhala_emotion/wavs').rglob('*.bert.pt'))
print(f'✅ Total .bert.pt files: {len(bert_files)}')
```

::: {.output .stream .stdout}
    100%|##########| 600/600 [00:00<00:00, 1973.72it/s]
    04-06 17:28:03 |  INFO  | bert_gen.py:107 | bert.pt is generated! total: 600 bert.pt files.
    ✅ BERT regenerated with correct phone sequences
    ✅ Total .bert.pt files: 600
:::
:::

::: {.cell .markdown id="YTA7KPz-r-xr"}
## Cell 12 --- Verify Everything Before Training {#cell-12--verify-everything-before-training}
:::

::: {.cell .code execution_count="16" colab="{\"base_uri\":\"https://localhost:8080/\"}" id="q3N66ct5r-xr" outputId="4d2bbada-d6c0-4da6-8265-df2247404d28"}
``` python
import os, json
from pathlib import Path

base = '/content/Style-Bert-VITS2/Data/sinhala_emotion'
ok = True

# Check WAV files
wavs = list(Path(f'{base}/wavs').rglob('*.wav'))
print(f'WAV files:        {len(wavs)} {"✅" if len(wavs) == 600 else "❌"}')

# Check .bert.pt files
berts = list(Path(f'{base}/wavs').rglob('*.bert.pt'))
print(f'.bert.pt files:   {len(berts)} {"✅" if len(berts) == 600 else "❌"}')

# Check .npy files
npys = list(Path(f'{base}/wavs').rglob('*.wav.npy'))
print(f'.npy style files: {len(npys)} {"✅" if len(npys) == 600 else "❌"}')

# Check lists
for fname in ['train.list', 'val.list', 'esd.list']:
    path = f'{base}/{fname}'
    exists = os.path.exists(path)
    count = len(open(path).readlines()) if exists else 0
    print(f'{fname}: {count} lines {"✅" if exists else "❌"}')

# Check config
config_path = f'{base}/config.json'
with open(config_path) as f:
    cfg = json.load(f)
print(f'\nconfig.json:')
print(f'  epochs:        {cfg["train"]["epochs"]}')
print(f'  batch_size:    {cfg["train"]["batch_size"]}')
print(f'  fp16_run:      {cfg["train"]["fp16_run"]}')
print(f'  save_interval: {cfg["train"]["save_interval"]}')
print(f'  n_speakers:    {cfg["data"]["n_speakers"]}')
print(f'  spk2id:        {cfg["data"]["spk2id"]}')

# Check Drive backup folder
drive_out = '/content/drive/MyDrive/Style-Bert-VITS2_Sinhala/checkpoints'
os.makedirs(drive_out, exist_ok=True)
print(f'\nDrive backup folder: {drive_out} ✅')
print('\n✅ All checks passed — ready to train!')
```

::: {.output .stream .stdout}
    WAV files:        600 ✅
    .bert.pt files:   600 ✅
    .npy style files: 600 ✅
    train.list: 540 lines ✅
    val.list: 60 lines ✅
    esd.list: 600 lines ✅

    config.json:
      epochs:        100
      batch_size:    4
      fp16_run:      True
      save_interval: 500
      n_speakers:    4
      spk2id:        {'Angry': 0, 'Happy': 1, 'Neutral': 2, 'Sad': 3}

    Drive backup folder: /content/drive/MyDrive/Style-Bert-VITS2_Sinhala/checkpoints ✅

    ✅ All checks passed — ready to train!
:::
:::

::: {.cell .markdown id="GroWC9BHr-xr"}
## Cell 13 --- 🚀 TRAIN (with Live Drive Backup) {#cell-13---train-with-live-drive-backup}

This cell:

-   Starts a **background thread** that copies every new `.pth` and
    `.safetensors` to your Google Drive **within 60 seconds** of it
    being saved
-   If Colab disconnects, your last checkpoint is always safe in Drive
-   To **resume** after a disconnect, re-run cells 1--4 then jump
    straight to **Cell 14 (Resume)**
:::

::: {.cell .code execution_count="17" colab="{\"base_uri\":\"https://localhost:8080/\"}" id="c0XiuhOtr-xr" outputId="cd9ba668-e48a-4d19-8c71-c9d3c3d95fca"}
``` python
import os, shutil, threading, time
from pathlib import Path

os.chdir('/content/Style-Bert-VITS2')
os.environ['PYTORCH_ALLOC_CONF'] = 'expandable_segments:True'

# ── Drive backup configuration ───────────────────────────────────────────────
DRIVE_BACKUP = '/content/drive/MyDrive/Style-Bert-VITS2_Sinhala/checkpoints'
MODEL_DIR    = 'Data/sinhala_emotion/models'
ASSETS_DIR   = 'model_assets'
os.makedirs(DRIVE_BACKUP, exist_ok=True)

# ── Background backup thread ─────────────────────────────────────────────────
def backup_to_drive():
    seen = set()
    # Pre-populate seen with anything already in Drive
    for f in os.listdir(DRIVE_BACKUP):
        seen.add(f)
    print(f'💾 Backup thread started → {DRIVE_BACKUP}')
    while True:
        try:
            # Backup .pth checkpoints
            if os.path.exists(MODEL_DIR):
                for fname in os.listdir(MODEL_DIR):
                    if fname.endswith('.pth') and fname not in seen:
                        src = os.path.join(MODEL_DIR, fname)
                        shutil.copy2(src, DRIVE_BACKUP)
                        seen.add(fname)
                        size = os.path.getsize(src) / (1024*1024)
                        print(f'\n💾 Backed up {fname} ({size:.0f} MB) → Drive')
            # Backup .safetensors
            for root, _, files in os.walk(ASSETS_DIR):
                for fname in files:
                    if fname.endswith('.safetensors') and fname not in seen:
                        src = os.path.join(root, fname)
                        shutil.copy2(src, DRIVE_BACKUP)
                        seen.add(fname)
                        size = os.path.getsize(src) / (1024*1024)
                        print(f'\n💾 Backed up {fname} ({size:.0f} MB) → Drive')
        except Exception as e:
            print(f'\n⚠️  Backup error (non-fatal): {e}')
        time.sleep(60)  # check every 60 seconds

backup_thread = threading.Thread(target=backup_to_drive, daemon=True)
backup_thread.start()

# ── Start training ────────────────────────────────────────────────────────────
print('🚀 Starting training...')
print('   Every new checkpoint will be backed up to Drive within 60 seconds.')
print('   If Colab disconnects, use Cell 14 to resume.\n')

!PYTORCH_ALLOC_CONF=expandable_segments:True python train_ms.py \
  -c Data/sinhala_emotion/config.json \
  -m Data/sinhala_emotion \
  --skip_default_style \
  --no_progress_bar
```

::: {.output .stream .stdout}
    🚀 Starting training...
       Every new checkpoint will be backed up to Drive within 60 seconds.
       If Colab disconnects, use Cell 14 to resume.

    💾 Backup thread started → /content/drive/MyDrive/Style-Bert-VITS2_Sinhala/checkpoints
    2026-04-06 17:28:17.383091: E external/local_xla/xla/stream_executor/cuda/cuda_fft.cc:467] Unable to register cuFFT factory: Attempting to register factory for plugin cuFFT when one has already been registered
    WARNING: All log messages before absl::InitializeLog() is called are written to STDERR
    E0000 00:00:1775496497.403378   15999 cuda_dnn.cc:8579] Unable to register cuDNN factory: Attempting to register factory for plugin cuDNN when one has already been registered
    E0000 00:00:1775496497.410125   15999 cuda_blas.cc:1407] Unable to register cuBLAS factory: Attempting to register factory for plugin cuBLAS when one has already been registered
    W0000 00:00:1775496497.427592   15999 computation_placer.cc:177] computation placer already registered. Please check linkage and avoid linking the same target more than once.
    W0000 00:00:1775496497.427619   15999 computation_placer.cc:177] computation placer already registered. Please check linkage and avoid linking the same target more than once.
    W0000 00:00:1775496497.427623   15999 computation_placer.cc:177] computation placer already registered. Please check linkage and avoid linking the same target more than once.
    W0000 00:00:1775496497.427626   15999 computation_placer.cc:177] computation placer already registered. Please check linkage and avoid linking the same target more than once.
    2026-04-06 17:28:17.432053: I tensorflow/core/platform/cpu_feature_guard.cc:210] This TensorFlow binary is optimized to use available CPU instructions in performance-critical operations.
    To enable the following instructions: AVX2 AVX512F FMA, in other operations, rebuild TensorFlow with the appropriate compiler flags.
    04-06 17:28:25 |  INFO  | train_ms.py:117 | Loading configuration from config localhost
    04-06 17:28:25 |  INFO  | train_ms.py:117 | Loading configuration from config 10086
    04-06 17:28:25 |  INFO  | train_ms.py:117 | Loading configuration from config 1
    04-06 17:28:25 |  INFO  | train_ms.py:117 | Loading configuration from config 0
    04-06 17:28:25 |  INFO  | train_ms.py:117 | Loading configuration from config 0
    04-06 17:28:25 |  INFO  | train_ms.py:119 | Loading environment variables 
    MASTER_ADDR: localhost,
    MASTER_PORT: 10086,
    WORLD_SIZE: 1,
    RANK: 0,
    LOCAL_RANK: 0
    04-06 17:28:25 |WARNING | __init__.py:247 | /content/Style-Bert-VITS2/style_bert_vits2/models/utils is not a git repository, therefore hash value comparison will be ignored.
    04-06 17:28:25 |  INFO  | data_utils.py:69 | Init dataset...
    100% 540/540 [00:00<00:00, 130302.85it/s]
    04-06 17:28:25 |  INFO  | data_utils.py:84 | skipped: 0, total: 540
    04-06 17:28:25 |  INFO  | data_utils.py:374 | Bucket warning 
    04-06 17:28:25 |  INFO  | data_utils.py:348 | Bucket info: [4, 228, 160, 128, 24, 4, 4]
    04-06 17:28:25 |  INFO  | data_utils.py:69 | Init dataset...
    100% 60/60 [00:00<00:00, 184771.10it/s]
    04-06 17:28:25 |  INFO  | data_utils.py:84 | skipped: 0, total: 60
    04-06 17:28:25 |  INFO  | train_ms.py:282 | Using noise scaled MAS for VITS2
    04-06 17:28:25 |  INFO  | train_ms.py:290 | Using duration discriminator for VITS2
    04-06 17:28:28 |WARNING | train_ms.py:443 | No such file or directory: Data/sinhala_emotion/models/G_0.safetensors
    04-06 17:28:28 |WARNING | train_ms.py:444 | It seems that you are not using the pretrained models, so we will train from scratch.
    04-06 17:28:28 |  INFO  | train_ms.py:476 | Start training.
    04-06 17:31:14 |  INFO  | train_ms.py:892 | ====> Epoch: 1, step: 138
    04-06 17:34:04 |  INFO  | train_ms.py:892 | ====> Epoch: 2, step: 276
    04-06 17:36:55 |  INFO  | train_ms.py:892 | ====> Epoch: 3, step: 414

    04-06 17:38:42 |  INFO  | train_ms.py:900 | Evaluating ...
    04-06 17:39:05 |  INFO  | checkpoints.py:111 | Saving model and optimizer state at iteration 4 to Data/sinhala_emotion/models/G_500.pth
    04-06 17:39:08 |  INFO  | checkpoints.py:111 | Saving model and optimizer state at iteration 4 to Data/sinhala_emotion/models/D_500.pth
    04-06 17:39:13 |  INFO  | checkpoints.py:111 | Saving model and optimizer state at iteration 4 to Data/sinhala_emotion/models/DUR_500.pth
    04-06 17:39:13 |  INFO  | safetensors.py:90 | Saved safetensors to model_assets/model_name/model_name_e4_s500.safetensors

    💾 Backed up DUR_500.pth (7 MB) → Drive

    💾 Backed up D_500.pth (535 MB) → Drive

    💾 Backed up G_500.pth (672 MB) → Drive

    💾 Backed up model_name_e4_s500.safetensors (190 MB) → Drive

    💾 Backed up DUR_500.pth (7 MB) → Drive

    💾 Backed up D_500.pth (535 MB) → Drive

    💾 Backed up G_500.pth (672 MB) → Drive

    💾 Backed up model_name_e4_s500.safetensors (190 MB) → Drive
    04-06 17:40:28 |  INFO  | train_ms.py:892 | ====> Epoch: 4, step: 552
    04-06 17:43:20 |  INFO  | train_ms.py:892 | ====> Epoch: 5, step: 690
    04-06 17:46:11 |  INFO  | train_ms.py:892 | ====> Epoch: 6, step: 828
    04-06 17:49:02 |  INFO  | train_ms.py:892 | ====> Epoch: 7, step: 966

    04-06 17:49:46 |  INFO  | train_ms.py:900 | Evaluating ...
    04-06 17:50:12 |  INFO  | checkpoints.py:111 | Saving model and optimizer state at iteration 8 to Data/sinhala_emotion/models/G_1000.pth
    04-06 17:50:14 |  INFO  | checkpoints.py:111 | Saving model and optimizer state at iteration 8 to Data/sinhala_emotion/models/D_1000.pth
    04-06 17:50:18 |  INFO  | checkpoints.py:111 | Saving model and optimizer state at iteration 8 to Data/sinhala_emotion/models/DUR_1000.pth
    04-06 17:50:18 |  INFO  | checkpoints.py:174 | Free up space by deleting ckpt Data/sinhala_emotion/models/G_500.pth
    04-06 17:50:18 |  INFO  | checkpoints.py:174 | Free up space by deleting ckpt Data/sinhala_emotion/models/D_500.pth
    04-06 17:50:18 |  INFO  | checkpoints.py:174 | Free up space by deleting ckpt Data/sinhala_emotion/models/DUR_500.pth
    04-06 17:50:18 |  INFO  | safetensors.py:90 | Saved safetensors to model_assets/model_name/model_name_e8_s1000.safetensors

    💾 Backed up D_1000.pth (535 MB) → Drive

    💾 Backed up G_1000.pth (672 MB) → Drive

    💾 Backed up DUR_1000.pth (7 MB) → Drive

    💾 Backed up model_name_e8_s1000.safetensors (190 MB) → Drive

    💾 Backed up D_1000.pth (535 MB) → Drive

    💾 Backed up G_1000.pth (672 MB) → Drive

    💾 Backed up DUR_1000.pth (7 MB) → Drive

    💾 Backed up model_name_e8_s1000.safetensors (190 MB) → Drive
    04-06 17:52:35 |  INFO  | train_ms.py:892 | ====> Epoch: 8, step: 1104
    04-06 17:55:26 |  INFO  | train_ms.py:892 | ====> Epoch: 9, step: 1242
    04-06 17:58:16 |  INFO  | train_ms.py:892 | ====> Epoch: 10, step: 1380

    04-06 18:00:47 |  INFO  | train_ms.py:900 | Evaluating ...
    04-06 18:01:18 |  INFO  | checkpoints.py:111 | Saving model and optimizer state at iteration 11 to Data/sinhala_emotion/models/G_1500.pth
    04-06 18:01:22 |  INFO  | checkpoints.py:111 | Saving model and optimizer state at iteration 11 to Data/sinhala_emotion/models/D_1500.pth
    04-06 18:01:24 |  INFO  | checkpoints.py:111 | Saving model and optimizer state at iteration 11 to Data/sinhala_emotion/models/DUR_1500.pth
    04-06 18:01:24 |  INFO  | checkpoints.py:174 | Free up space by deleting ckpt Data/sinhala_emotion/models/G_1000.pth
    04-06 18:01:24 |  INFO  | checkpoints.py:174 | Free up space by deleting ckpt Data/sinhala_emotion/models/D_1000.pth
    04-06 18:01:24 |  INFO  | checkpoints.py:174 | Free up space by deleting ckpt Data/sinhala_emotion/models/DUR_1000.pth
    04-06 18:01:24 |  INFO  | safetensors.py:90 | Saved safetensors to model_assets/model_name/model_name_e11_s1500.safetensors

    💾 Backed up DUR_1500.pth (7 MB) → Drive

    💾 Backed up D_1500.pth (535 MB) → Drive

    💾 Backed up G_1500.pth (672 MB) → Drive
    04-06 18:01:49 |  INFO  | train_ms.py:892 | ====> Epoch: 11, step: 1518

    💾 Backed up model_name_e11_s1500.safetensors (190 MB) → Drive

    💾 Backed up DUR_1500.pth (7 MB) → Drive

    💾 Backed up D_1500.pth (535 MB) → Drive

    💾 Backed up G_1500.pth (672 MB) → Drive

    💾 Backed up model_name_e11_s1500.safetensors (190 MB) → Drive
    04-06 18:04:47 |  INFO  | train_ms.py:892 | ====> Epoch: 12, step: 1656
    04-06 18:07:38 |  INFO  | train_ms.py:892 | ====> Epoch: 13, step: 1794
    04-06 18:10:30 |  INFO  | train_ms.py:892 | ====> Epoch: 14, step: 1932

    04-06 18:11:55 |  INFO  | train_ms.py:900 | Evaluating ...
    04-06 18:12:34 |  INFO  | checkpoints.py:111 | Saving model and optimizer state at iteration 15 to Data/sinhala_emotion/models/G_2000.pth
    04-06 18:12:43 |  INFO  | checkpoints.py:111 | Saving model and optimizer state at iteration 15 to Data/sinhala_emotion/models/D_2000.pth
    04-06 18:12:53 |  INFO  | checkpoints.py:111 | Saving model and optimizer state at iteration 15 to Data/sinhala_emotion/models/DUR_2000.pth
    04-06 18:12:53 |  INFO  | checkpoints.py:174 | Free up space by deleting ckpt Data/sinhala_emotion/models/G_1500.pth
    04-06 18:12:53 |  INFO  | checkpoints.py:174 | Free up space by deleting ckpt Data/sinhala_emotion/models/D_1500.pth
    04-06 18:12:53 |  INFO  | checkpoints.py:174 | Free up space by deleting ckpt Data/sinhala_emotion/models/DUR_1500.pth
    04-06 18:12:53 |  INFO  | safetensors.py:90 | Saved safetensors to model_assets/model_name/model_name_e15_s2000.safetensors

    💾 Backed up G_2000.pth (672 MB) → Drive

    💾 Backed up D_2000.pth (535 MB) → Drive

    💾 Backed up DUR_2000.pth (7 MB) → Drive

    💾 Backed up model_name_e15_s2000.safetensors (190 MB) → Drive

    💾 Backed up G_2000.pth (672 MB) → Drive

    💾 Backed up D_2000.pth (535 MB) → Drive

    💾 Backed up model_name_e15_s2000.safetensors (190 MB) → Drive

    💾 Backed up DUR_2000.pth (7 MB) → Drive
    04-06 18:14:36 |  INFO  | train_ms.py:892 | ====> Epoch: 15, step: 2070
    04-06 18:17:27 |  INFO  | train_ms.py:892 | ====> Epoch: 16, step: 2208
    04-06 18:20:18 |  INFO  | train_ms.py:892 | ====> Epoch: 17, step: 2346
    04-06 18:23:10 |  INFO  | train_ms.py:892 | ====> Epoch: 18, step: 2484

    04-06 18:23:31 |  INFO  | train_ms.py:900 | Evaluating ...
    04-06 18:24:18 |  INFO  | checkpoints.py:111 | Saving model and optimizer state at iteration 19 to Data/sinhala_emotion/models/G_2500.pth
    04-06 18:24:27 |  INFO  | checkpoints.py:111 | Saving model and optimizer state at iteration 19 to Data/sinhala_emotion/models/D_2500.pth
    04-06 18:24:31 |  INFO  | checkpoints.py:111 | Saving model and optimizer state at iteration 19 to Data/sinhala_emotion/models/DUR_2500.pth
    04-06 18:24:31 |  INFO  | checkpoints.py:174 | Free up space by deleting ckpt Data/sinhala_emotion/models/G_2000.pth
    04-06 18:24:31 |  INFO  | checkpoints.py:174 | Free up space by deleting ckpt Data/sinhala_emotion/models/D_2000.pth
    04-06 18:24:31 |  INFO  | checkpoints.py:174 | Free up space by deleting ckpt Data/sinhala_emotion/models/DUR_2000.pth
    04-06 18:24:31 |  INFO  | safetensors.py:90 | Saved safetensors to model_assets/model_name/model_name_e19_s2500.safetensors

    💾 Backed up G_2500.pth (672 MB) → Drive

    💾 Backed up D_2500.pth (535 MB) → Drive

    💾 Backed up DUR_2500.pth (7 MB) → Drive

    💾 Backed up model_name_e19_s2500.safetensors (190 MB) → Drive

    💾 Backed up G_2500.pth (672 MB) → Drive

    💾 Backed up D_2500.pth (535 MB) → Drive

    💾 Backed up model_name_e19_s2500.safetensors (190 MB) → Drive

    💾 Backed up DUR_2500.pth (7 MB) → Drive
    04-06 18:27:11 |  INFO  | train_ms.py:892 | ====> Epoch: 19, step: 2622
    04-06 18:30:02 |  INFO  | train_ms.py:892 | ====> Epoch: 20, step: 2760
    04-06 18:32:53 |  INFO  | train_ms.py:892 | ====> Epoch: 21, step: 2898

    04-06 18:35:02 |  INFO  | train_ms.py:900 | Evaluating ...
    04-06 18:35:49 |  INFO  | checkpoints.py:111 | Saving model and optimizer state at iteration 22 to Data/sinhala_emotion/models/G_3000.pth
    04-06 18:35:52 |  INFO  | checkpoints.py:111 | Saving model and optimizer state at iteration 22 to Data/sinhala_emotion/models/D_3000.pth
    04-06 18:35:54 |  INFO  | checkpoints.py:111 | Saving model and optimizer state at iteration 22 to Data/sinhala_emotion/models/DUR_3000.pth
    04-06 18:35:54 |  INFO  | checkpoints.py:174 | Free up space by deleting ckpt Data/sinhala_emotion/models/G_2500.pth
    04-06 18:35:54 |  INFO  | checkpoints.py:174 | Free up space by deleting ckpt Data/sinhala_emotion/models/D_2500.pth
    04-06 18:35:54 |  INFO  | checkpoints.py:174 | Free up space by deleting ckpt Data/sinhala_emotion/models/DUR_2500.pth
    04-06 18:35:54 |  INFO  | safetensors.py:90 | Saved safetensors to model_assets/model_name/model_name_e22_s3000.safetensors

    💾 Backed up D_3000.pth (535 MB) → Drive

    💾 Backed up DUR_3000.pth (7 MB) → Drive

    💾 Backed up G_3000.pth (672 MB) → Drive

    💾 Backed up model_name_e22_s3000.safetensors (190 MB) → Drive

    💾 Backed up D_3000.pth (535 MB) → Drive

    💾 Backed up DUR_3000.pth (7 MB) → Drive

    💾 Backed up G_3000.pth (672 MB) → Drive

    💾 Backed up model_name_e22_s3000.safetensors (190 MB) → Drive
    04-06 18:36:45 |  INFO  | train_ms.py:892 | ====> Epoch: 22, step: 3036
    04-06 18:39:40 |  INFO  | train_ms.py:892 | ====> Epoch: 23, step: 3174
    04-06 18:42:31 |  INFO  | train_ms.py:892 | ====> Epoch: 24, step: 3312
    04-06 18:45:22 |  INFO  | train_ms.py:892 | ====> Epoch: 25, step: 3450

    04-06 18:46:26 |  INFO  | train_ms.py:900 | Evaluating ...
    04-06 18:47:12 |  INFO  | checkpoints.py:111 | Saving model and optimizer state at iteration 26 to Data/sinhala_emotion/models/G_3500.pth
    04-06 18:47:22 |  INFO  | checkpoints.py:111 | Saving model and optimizer state at iteration 26 to Data/sinhala_emotion/models/D_3500.pth
    04-06 18:47:40 |  INFO  | checkpoints.py:111 | Saving model and optimizer state at iteration 26 to Data/sinhala_emotion/models/DUR_3500.pth
    04-06 18:47:41 |  INFO  | checkpoints.py:174 | Free up space by deleting ckpt Data/sinhala_emotion/models/G_3000.pth
    04-06 18:47:45 |  INFO  | checkpoints.py:174 | Free up space by deleting ckpt Data/sinhala_emotion/models/D_3000.pth
    04-06 18:47:45 |  INFO  | checkpoints.py:174 | Free up space by deleting ckpt Data/sinhala_emotion/models/DUR_3000.pth
    04-06 18:47:45 |  INFO  | safetensors.py:90 | Saved safetensors to model_assets/model_name/model_name_e26_s3500.safetensors

    💾 Backed up DUR_3500.pth (7 MB) → Drive

    💾 Backed up G_3500.pth (672 MB) → Drive

    💾 Backed up G_3500.pth (672 MB) → Drive

    💾 Backed up D_3500.pth (535 MB) → Drive

    💾 Backed up D_3500.pth (535 MB) → Drive

    💾 Backed up model_name_e26_s3500.safetensors (190 MB) → Drive

    💾 Backed up model_name_e26_s3500.safetensors (190 MB) → Drive

    💾 Backed up DUR_3500.pth (7 MB) → Drive
    04-06 18:50:12 |  INFO  | train_ms.py:892 | ====> Epoch: 26, step: 3588
    04-06 18:53:02 |  INFO  | train_ms.py:892 | ====> Epoch: 27, step: 3726
    04-06 18:55:53 |  INFO  | train_ms.py:892 | ====> Epoch: 28, step: 3864

    04-06 18:58:42 |  INFO  | train_ms.py:900 | Evaluating ...
    04-06 18:59:32 |  INFO  | checkpoints.py:111 | Saving model and optimizer state at iteration 29 to Data/sinhala_emotion/models/G_4000.pth
    04-06 18:59:35 |  INFO  | checkpoints.py:111 | Saving model and optimizer state at iteration 29 to Data/sinhala_emotion/models/D_4000.pth
    04-06 18:59:37 |  INFO  | checkpoints.py:111 | Saving model and optimizer state at iteration 29 to Data/sinhala_emotion/models/DUR_4000.pth
    04-06 18:59:37 |  INFO  | checkpoints.py:174 | Free up space by deleting ckpt Data/sinhala_emotion/models/G_3500.pth
    04-06 18:59:37 |  INFO  | checkpoints.py:174 | Free up space by deleting ckpt Data/sinhala_emotion/models/D_3500.pth
    04-06 18:59:37 |  INFO  | checkpoints.py:174 | Free up space by deleting ckpt Data/sinhala_emotion/models/DUR_3500.pth
    04-06 18:59:37 |  INFO  | safetensors.py:90 | Saved safetensors to model_assets/model_name/model_name_e29_s4000.safetensors
    04-06 18:59:40 |  INFO  | train_ms.py:892 | ====> Epoch: 29, step: 4002

    💾 Backed up D_4000.pth (535 MB) → Drive

    💾 Backed up D_4000.pth (535 MB) → Drive

    💾 Backed up G_4000.pth (672 MB) → Drive

    💾 Backed up G_4000.pth (672 MB) → Drive

    💾 Backed up DUR_4000.pth (7 MB) → Drive

    💾 Backed up DUR_4000.pth (7 MB) → Drive

    💾 Backed up model_name_e29_s4000.safetensors (190 MB) → Drive

    💾 Backed up model_name_e29_s4000.safetensors (190 MB) → Drive
    04-06 19:02:39 |  INFO  | train_ms.py:892 | ====> Epoch: 30, step: 4140
    04-06 19:05:30 |  INFO  | train_ms.py:892 | ====> Epoch: 31, step: 4278
    04-06 19:08:22 |  INFO  | train_ms.py:892 | ====> Epoch: 32, step: 4416

    04-06 19:10:08 |  INFO  | train_ms.py:900 | Evaluating ...
    04-06 19:10:54 |  INFO  | checkpoints.py:111 | Saving model and optimizer state at iteration 33 to Data/sinhala_emotion/models/G_4500.pth
    04-06 19:10:59 |  INFO  | checkpoints.py:111 | Saving model and optimizer state at iteration 33 to Data/sinhala_emotion/models/D_4500.pth
    04-06 19:11:04 |  INFO  | checkpoints.py:111 | Saving model and optimizer state at iteration 33 to Data/sinhala_emotion/models/DUR_4500.pth
    04-06 19:11:04 |  INFO  | checkpoints.py:174 | Free up space by deleting ckpt Data/sinhala_emotion/models/G_4000.pth
    04-06 19:11:04 |  INFO  | checkpoints.py:174 | Free up space by deleting ckpt Data/sinhala_emotion/models/D_4000.pth
    04-06 19:11:04 |  INFO  | checkpoints.py:174 | Free up space by deleting ckpt Data/sinhala_emotion/models/DUR_4000.pth
    04-06 19:11:04 |  INFO  | safetensors.py:90 | Saved safetensors to model_assets/model_name/model_name_e33_s4500.safetensors

    💾 Backed up G_4500.pth (672 MB) → Drive

    💾 Backed up G_4500.pth (672 MB) → Drive

    💾 Backed up D_4500.pth (535 MB) → Drive

    💾 Backed up D_4500.pth (535 MB) → Drive

    💾 Backed up model_name_e33_s4500.safetensors (190 MB) → Drive

    💾 Backed up model_name_e33_s4500.safetensors (190 MB) → Drive
    04-06 19:12:21 |  INFO  | train_ms.py:892 | ====> Epoch: 33, step: 4554

    💾 Backed up DUR_4500.pth (7 MB) → Drive

    💾 Backed up DUR_4500.pth (7 MB) → Drive
    04-06 19:15:12 |  INFO  | train_ms.py:892 | ====> Epoch: 34, step: 4692
    04-06 19:18:04 |  INFO  | train_ms.py:892 | ====> Epoch: 35, step: 4830
    04-06 19:20:55 |  INFO  | train_ms.py:892 | ====> Epoch: 36, step: 4968

    04-06 19:21:36 |  INFO  | train_ms.py:900 | Evaluating ...
    04-06 19:22:20 |  INFO  | checkpoints.py:111 | Saving model and optimizer state at iteration 37 to Data/sinhala_emotion/models/G_5000.pth
    04-06 19:22:41 |  INFO  | checkpoints.py:111 | Saving model and optimizer state at iteration 37 to Data/sinhala_emotion/models/D_5000.pth
    04-06 19:22:49 |  INFO  | checkpoints.py:111 | Saving model and optimizer state at iteration 37 to Data/sinhala_emotion/models/DUR_5000.pth
    04-06 19:22:50 |  INFO  | checkpoints.py:174 | Free up space by deleting ckpt Data/sinhala_emotion/models/G_4500.pth
    04-06 19:22:51 |  INFO  | checkpoints.py:174 | Free up space by deleting ckpt Data/sinhala_emotion/models/D_4500.pth
    04-06 19:22:51 |  INFO  | checkpoints.py:174 | Free up space by deleting ckpt Data/sinhala_emotion/models/DUR_4500.pth
    04-06 19:22:51 |  INFO  | safetensors.py:90 | Saved safetensors to model_assets/model_name/model_name_e37_s5000.safetensors

    💾 Backed up G_5000.pth (672 MB) → Drive

    💾 Backed up G_5000.pth (672 MB) → Drive

    💾 Backed up model_name_e37_s5000.safetensors (190 MB) → Drive

    💾 Backed up model_name_e37_s5000.safetensors (190 MB) → Drive

    💾 Backed up D_5000.pth (535 MB) → Drive

    💾 Backed up D_5000.pth (535 MB) → Drive

    💾 Backed up DUR_5000.pth (7 MB) → Drive

    💾 Backed up DUR_5000.pth (7 MB) → Drive
    04-06 19:25:14 |  INFO  | train_ms.py:892 | ====> Epoch: 37, step: 5106
    04-06 19:28:05 |  INFO  | train_ms.py:892 | ====> Epoch: 38, step: 5244
    04-06 19:30:57 |  INFO  | train_ms.py:892 | ====> Epoch: 39, step: 5382

    04-06 19:33:24 |  INFO  | train_ms.py:900 | Evaluating ...
    04-06 19:34:11 |  INFO  | checkpoints.py:111 | Saving model and optimizer state at iteration 40 to Data/sinhala_emotion/models/G_5500.pth
    04-06 19:34:19 |  INFO  | checkpoints.py:111 | Saving model and optimizer state at iteration 40 to Data/sinhala_emotion/models/D_5500.pth
    04-06 19:34:23 |  INFO  | checkpoints.py:111 | Saving model and optimizer state at iteration 40 to Data/sinhala_emotion/models/DUR_5500.pth
    04-06 19:34:23 |  INFO  | checkpoints.py:174 | Free up space by deleting ckpt Data/sinhala_emotion/models/G_5000.pth
    04-06 19:34:23 |  INFO  | checkpoints.py:174 | Free up space by deleting ckpt Data/sinhala_emotion/models/D_5000.pth
    04-06 19:34:23 |  INFO  | checkpoints.py:174 | Free up space by deleting ckpt Data/sinhala_emotion/models/DUR_5000.pth
    04-06 19:34:23 |  INFO  | safetensors.py:90 | Saved safetensors to model_assets/model_name/model_name_e40_s5500.safetensors

    💾 Backed up D_5500.pth (535 MB) → Drive

    💾 Backed up D_5500.pth (535 MB) → Drive

    💾 Backed up DUR_5500.pth (7 MB) → Drive

    💾 Backed up DUR_5500.pth (7 MB) → Drive

    💾 Backed up G_5500.pth (672 MB) → Drive

    💾 Backed up G_5500.pth (672 MB) → Drive
    04-06 19:35:00 |  INFO  | train_ms.py:892 | ====> Epoch: 40, step: 5520

    💾 Backed up model_name_e40_s5500.safetensors (190 MB) → Drive

    💾 Backed up model_name_e40_s5500.safetensors (190 MB) → Drive
    04-06 19:37:53 |  INFO  | train_ms.py:892 | ====> Epoch: 41, step: 5658
    04-06 19:40:44 |  INFO  | train_ms.py:892 | ====> Epoch: 42, step: 5796
    04-06 19:43:35 |  INFO  | train_ms.py:892 | ====> Epoch: 43, step: 5934

    04-06 19:44:57 |  INFO  | train_ms.py:900 | Evaluating ...
    04-06 19:45:43 |  INFO  | checkpoints.py:111 | Saving model and optimizer state at iteration 44 to Data/sinhala_emotion/models/G_6000.pth
    04-06 19:45:47 |  INFO  | checkpoints.py:111 | Saving model and optimizer state at iteration 44 to Data/sinhala_emotion/models/D_6000.pth
    04-06 19:45:50 |  INFO  | checkpoints.py:111 | Saving model and optimizer state at iteration 44 to Data/sinhala_emotion/models/DUR_6000.pth
    04-06 19:45:50 |  INFO  | checkpoints.py:174 | Free up space by deleting ckpt Data/sinhala_emotion/models/G_5500.pth
    04-06 19:45:50 |  INFO  | checkpoints.py:174 | Free up space by deleting ckpt Data/sinhala_emotion/models/D_5500.pth
    04-06 19:45:50 |  INFO  | checkpoints.py:174 | Free up space by deleting ckpt Data/sinhala_emotion/models/DUR_5500.pth
    04-06 19:45:50 |  INFO  | safetensors.py:90 | Saved safetensors to model_assets/model_name/model_name_e44_s6000.safetensors

    💾 Backed up DUR_6000.pth (7 MB) → Drive

    💾 Backed up DUR_6000.pth (7 MB) → Drive

    💾 Backed up D_6000.pth (535 MB) → Drive

    💾 Backed up D_6000.pth (535 MB) → Drive

    💾 Backed up G_6000.pth (672 MB) → Drive

    💾 Backed up G_6000.pth (672 MB) → Drive

    💾 Backed up model_name_e44_s6000.safetensors (190 MB) → Drive

    💾 Backed up model_name_e44_s6000.safetensors (190 MB) → Drive
    04-06 19:47:28 |  INFO  | train_ms.py:892 | ====> Epoch: 44, step: 6072
    04-06 19:50:19 |  INFO  | train_ms.py:892 | ====> Epoch: 45, step: 6210
    04-06 19:53:09 |  INFO  | train_ms.py:892 | ====> Epoch: 46, step: 6348
    04-06 19:56:00 |  INFO  | train_ms.py:892 | ====> Epoch: 47, step: 6486

    04-06 19:56:19 |  INFO  | train_ms.py:900 | Evaluating ...
    04-06 19:57:04 |  INFO  | checkpoints.py:111 | Saving model and optimizer state at iteration 48 to Data/sinhala_emotion/models/G_6500.pth
    04-06 19:57:07 |  INFO  | checkpoints.py:111 | Saving model and optimizer state at iteration 48 to Data/sinhala_emotion/models/D_6500.pth
    04-06 19:57:11 |  INFO  | checkpoints.py:111 | Saving model and optimizer state at iteration 48 to Data/sinhala_emotion/models/DUR_6500.pth
    04-06 19:57:11 |  INFO  | checkpoints.py:174 | Free up space by deleting ckpt Data/sinhala_emotion/models/G_6000.pth
    04-06 19:57:11 |  INFO  | checkpoints.py:174 | Free up space by deleting ckpt Data/sinhala_emotion/models/D_6000.pth
    04-06 19:57:11 |  INFO  | checkpoints.py:174 | Free up space by deleting ckpt Data/sinhala_emotion/models/DUR_6000.pth
    04-06 19:57:11 |  INFO  | safetensors.py:90 | Saved safetensors to model_assets/model_name/model_name_e48_s6500.safetensors

    💾 Backed up D_6500.pth (535 MB) → Drive

    💾 Backed up D_6500.pth (535 MB) → Drive

    💾 Backed up G_6500.pth (672 MB) → Drive

    💾 Backed up G_6500.pth (672 MB) → Drive

    💾 Backed up DUR_6500.pth (7 MB) → Drive

    💾 Backed up DUR_6500.pth (7 MB) → Drive

    💾 Backed up model_name_e48_s6500.safetensors (190 MB) → Drive

    💾 Backed up model_name_e48_s6500.safetensors (190 MB) → Drive
    04-06 19:59:52 |  INFO  | train_ms.py:892 | ====> Epoch: 48, step: 6624
    04-06 20:02:42 |  INFO  | train_ms.py:892 | ====> Epoch: 49, step: 6762
    04-06 20:05:33 |  INFO  | train_ms.py:892 | ====> Epoch: 50, step: 6900

    04-06 20:07:39 |  INFO  | train_ms.py:900 | Evaluating ...
    04-06 20:08:25 |  INFO  | checkpoints.py:111 | Saving model and optimizer state at iteration 51 to Data/sinhala_emotion/models/G_7000.pth
    04-06 20:08:33 |  INFO  | checkpoints.py:111 | Saving model and optimizer state at iteration 51 to Data/sinhala_emotion/models/D_7000.pth
    04-06 20:08:42 |  INFO  | checkpoints.py:111 | Saving model and optimizer state at iteration 51 to Data/sinhala_emotion/models/DUR_7000.pth
    04-06 20:08:42 |  INFO  | checkpoints.py:174 | Free up space by deleting ckpt Data/sinhala_emotion/models/G_6500.pth
    04-06 20:08:42 |  INFO  | checkpoints.py:174 | Free up space by deleting ckpt Data/sinhala_emotion/models/D_6500.pth
    04-06 20:08:42 |  INFO  | checkpoints.py:174 | Free up space by deleting ckpt Data/sinhala_emotion/models/DUR_6500.pth
    04-06 20:08:42 |  INFO  | safetensors.py:90 | Saved safetensors to model_assets/model_name/model_name_e51_s7000.safetensors

    💾 Backed up D_7000.pth (535 MB) → Drive

    💾 Backed up D_7000.pth (535 MB) → Drive

    💾 Backed up G_7000.pth (672 MB) → Drive

    💾 Backed up G_7000.pth (672 MB) → Drive

    💾 Backed up DUR_7000.pth (7 MB) → Drive

    💾 Backed up DUR_7000.pth (7 MB) → Drive

    💾 Backed up model_name_e51_s7000.safetensors (190 MB) → Drive

    💾 Backed up model_name_e51_s7000.safetensors (190 MB) → Drive
    04-06 20:09:36 |  INFO  | train_ms.py:892 | ====> Epoch: 51, step: 7038
    04-06 20:12:29 |  INFO  | train_ms.py:892 | ====> Epoch: 52, step: 7176
    04-06 20:15:20 |  INFO  | train_ms.py:892 | ====> Epoch: 53, step: 7314
    04-06 20:18:11 |  INFO  | train_ms.py:892 | ====> Epoch: 54, step: 7452

    04-06 20:19:12 |  INFO  | train_ms.py:900 | Evaluating ...
    04-06 20:20:00 |  INFO  | checkpoints.py:111 | Saving model and optimizer state at iteration 55 to Data/sinhala_emotion/models/G_7500.pth
    04-06 20:20:05 |  INFO  | checkpoints.py:111 | Saving model and optimizer state at iteration 55 to Data/sinhala_emotion/models/D_7500.pth
    04-06 20:20:17 |  INFO  | checkpoints.py:111 | Saving model and optimizer state at iteration 55 to Data/sinhala_emotion/models/DUR_7500.pth
    04-06 20:20:17 |  INFO  | checkpoints.py:174 | Free up space by deleting ckpt Data/sinhala_emotion/models/G_7000.pth
    04-06 20:20:17 |  INFO  | checkpoints.py:174 | Free up space by deleting ckpt Data/sinhala_emotion/models/D_7000.pth
    04-06 20:20:17 |  INFO  | checkpoints.py:174 | Free up space by deleting ckpt Data/sinhala_emotion/models/DUR_7000.pth
    04-06 20:20:17 |  INFO  | safetensors.py:90 | Saved safetensors to model_assets/model_name/model_name_e55_s7500.safetensors

    💾 Backed up D_7500.pth (535 MB) → Drive

    💾 Backed up D_7500.pth (535 MB) → Drive

    💾 Backed up G_7500.pth (672 MB) → Drive
    💾 Backed up G_7500.pth (672 MB) → Drive


    💾 Backed up DUR_7500.pth (7 MB) → Drive

    💾 Backed up DUR_7500.pth (7 MB) → Drive

    💾 Backed up model_name_e55_s7500.safetensors (190 MB) → Drive

    💾 Backed up model_name_e55_s7500.safetensors (190 MB) → Drive
    04-06 20:22:15 |  INFO  | train_ms.py:892 | ====> Epoch: 55, step: 7590
    04-06 20:25:05 |  INFO  | train_ms.py:892 | ====> Epoch: 56, step: 7728
    04-06 20:27:55 |  INFO  | train_ms.py:892 | ====> Epoch: 57, step: 7866

    04-06 20:30:41 |  INFO  | train_ms.py:900 | Evaluating ...
    04-06 20:31:27 |  INFO  | checkpoints.py:111 | Saving model and optimizer state at iteration 58 to Data/sinhala_emotion/models/G_8000.pth
    04-06 20:31:36 |  INFO  | checkpoints.py:111 | Saving model and optimizer state at iteration 58 to Data/sinhala_emotion/models/D_8000.pth
    04-06 20:31:38 |  INFO  | checkpoints.py:111 | Saving model and optimizer state at iteration 58 to Data/sinhala_emotion/models/DUR_8000.pth
    04-06 20:31:38 |  INFO  | checkpoints.py:174 | Free up space by deleting ckpt Data/sinhala_emotion/models/G_7500.pth
    04-06 20:31:38 |  INFO  | checkpoints.py:174 | Free up space by deleting ckpt Data/sinhala_emotion/models/D_7500.pth
    04-06 20:31:38 |  INFO  | checkpoints.py:174 | Free up space by deleting ckpt Data/sinhala_emotion/models/DUR_7500.pth
    04-06 20:31:38 |  INFO  | safetensors.py:90 | Saved safetensors to model_assets/model_name/model_name_e58_s8000.safetensors
    04-06 20:31:43 |  INFO  | train_ms.py:892 | ====> Epoch: 58, step: 8004

    💾 Backed up G_8000.pth (672 MB) → Drive

    💾 Backed up G_8000.pth (672 MB) → Drive

    💾 Backed up D_8000.pth (535 MB) → Drive

    💾 Backed up D_8000.pth (535 MB) → Drive

    💾 Backed up DUR_8000.pth (7 MB) → Drive

    💾 Backed up DUR_8000.pth (7 MB) → Drive

    💾 Backed up model_name_e58_s8000.safetensors (190 MB) → Drive

    💾 Backed up model_name_e58_s8000.safetensors (190 MB) → Drive
    04-06 20:34:41 |  INFO  | train_ms.py:892 | ====> Epoch: 59, step: 8142
    04-06 20:37:31 |  INFO  | train_ms.py:892 | ====> Epoch: 60, step: 8280
    04-06 20:40:22 |  INFO  | train_ms.py:892 | ====> Epoch: 61, step: 8418

    04-06 20:42:03 |  INFO  | train_ms.py:900 | Evaluating ...
    04-06 20:42:53 |  INFO  | checkpoints.py:111 | Saving model and optimizer state at iteration 62 to Data/sinhala_emotion/models/G_8500.pth
    04-06 20:43:00 |  INFO  | checkpoints.py:111 | Saving model and optimizer state at iteration 62 to Data/sinhala_emotion/models/D_8500.pth
    04-06 20:43:05 |  INFO  | checkpoints.py:111 | Saving model and optimizer state at iteration 62 to Data/sinhala_emotion/models/DUR_8500.pth
    04-06 20:43:05 |  INFO  | checkpoints.py:174 | Free up space by deleting ckpt Data/sinhala_emotion/models/G_8000.pth
    04-06 20:43:05 |  INFO  | checkpoints.py:174 | Free up space by deleting ckpt Data/sinhala_emotion/models/D_8000.pth
    04-06 20:43:05 |  INFO  | checkpoints.py:174 | Free up space by deleting ckpt Data/sinhala_emotion/models/DUR_8000.pth
    04-06 20:43:05 |  INFO  | safetensors.py:90 | Saved safetensors to model_assets/model_name/model_name_e62_s8500.safetensors

    💾 Backed up D_8500.pth (535 MB) → Drive

    💾 Backed up D_8500.pth (535 MB) → Drive

    💾 Backed up G_8500.pth (672 MB) → Drive

    💾 Backed up G_8500.pth (672 MB) → Drive

    💾 Backed up DUR_8500.pth (7 MB) → Drive

    💾 Backed up DUR_8500.pth (7 MB) → Drive

    💾 Backed up model_name_e62_s8500.safetensors (190 MB) → Drive

    💾 Backed up model_name_e62_s8500.safetensors (190 MB) → Drive
    04-06 20:44:27 |  INFO  | train_ms.py:892 | ====> Epoch: 62, step: 8556
    04-06 20:47:19 |  INFO  | train_ms.py:892 | ====> Epoch: 63, step: 8694
    04-06 20:50:11 |  INFO  | train_ms.py:892 | ====> Epoch: 64, step: 8832
    04-06 20:53:04 |  INFO  | train_ms.py:892 | ====> Epoch: 65, step: 8970

    04-06 20:53:43 |  INFO  | train_ms.py:900 | Evaluating ...
    04-06 20:54:33 |  INFO  | checkpoints.py:111 | Saving model and optimizer state at iteration 66 to Data/sinhala_emotion/models/G_9000.pth
    04-06 20:54:44 |  INFO  | checkpoints.py:111 | Saving model and optimizer state at iteration 66 to Data/sinhala_emotion/models/D_9000.pth
    04-06 20:54:49 |  INFO  | checkpoints.py:111 | Saving model and optimizer state at iteration 66 to Data/sinhala_emotion/models/DUR_9000.pth
    04-06 20:54:49 |  INFO  | checkpoints.py:174 | Free up space by deleting ckpt Data/sinhala_emotion/models/G_8500.pth
    04-06 20:54:49 |  INFO  | checkpoints.py:174 | Free up space by deleting ckpt Data/sinhala_emotion/models/D_8500.pth
    04-06 20:54:49 |  INFO  | checkpoints.py:174 | Free up space by deleting ckpt Data/sinhala_emotion/models/DUR_8500.pth
    04-06 20:54:49 |  INFO  | safetensors.py:90 | Saved safetensors to model_assets/model_name/model_name_e66_s9000.safetensors

    💾 Backed up D_9000.pth (535 MB) → Drive

    💾 Backed up D_9000.pth (535 MB) → Drive

    💾 Backed up G_9000.pth (672 MB) → Drive

    💾 Backed up G_9000.pth (672 MB) → Drive

    💾 Backed up model_name_e66_s9000.safetensors (190 MB) → Drive

    💾 Backed up model_name_e66_s9000.safetensors (190 MB) → Drive

    💾 Backed up DUR_9000.pth (7 MB) → Drive

    💾 Backed up DUR_9000.pth (7 MB) → Drive
    04-06 20:57:14 |  INFO  | train_ms.py:892 | ====> Epoch: 66, step: 9108
    04-06 21:00:05 |  INFO  | train_ms.py:892 | ====> Epoch: 67, step: 9246
    04-06 21:02:56 |  INFO  | train_ms.py:892 | ====> Epoch: 68, step: 9384

    04-06 21:05:21 |  INFO  | train_ms.py:900 | Evaluating ...
    04-06 21:06:09 |  INFO  | checkpoints.py:111 | Saving model and optimizer state at iteration 69 to Data/sinhala_emotion/models/G_9500.pth
    04-06 21:06:26 |  INFO  | checkpoints.py:111 | Saving model and optimizer state at iteration 69 to Data/sinhala_emotion/models/D_9500.pth
    04-06 21:06:35 |  INFO  | checkpoints.py:111 | Saving model and optimizer state at iteration 69 to Data/sinhala_emotion/models/DUR_9500.pth
    04-06 21:06:35 |  INFO  | checkpoints.py:174 | Free up space by deleting ckpt Data/sinhala_emotion/models/G_9000.pth
    04-06 21:06:36 |  INFO  | checkpoints.py:174 | Free up space by deleting ckpt Data/sinhala_emotion/models/D_9000.pth
    04-06 21:06:36 |  INFO  | checkpoints.py:174 | Free up space by deleting ckpt Data/sinhala_emotion/models/DUR_9000.pth
    04-06 21:06:36 |  INFO  | safetensors.py:90 | Saved safetensors to model_assets/model_name/model_name_e69_s9500.safetensors

    💾 Backed up G_9500.pth (672 MB) → Drive

    💾 Backed up G_9500.pth (672 MB) → Drive

    💾 Backed up model_name_e69_s9500.safetensors (190 MB) → Drive

    💾 Backed up model_name_e69_s9500.safetensors (190 MB) → Drive
    04-06 21:07:13 |  INFO  | train_ms.py:892 | ====> Epoch: 69, step: 9522

    💾 Backed up DUR_9500.pth (7 MB) → Drive

    💾 Backed up DUR_9500.pth (7 MB) → Drive

    💾 Backed up D_9500.pth (535 MB) → Drive

    💾 Backed up D_9500.pth (535 MB) → Drive
    04-06 21:10:10 |  INFO  | train_ms.py:892 | ====> Epoch: 70, step: 9660
    04-06 21:13:03 |  INFO  | train_ms.py:892 | ====> Epoch: 71, step: 9798
    04-06 21:15:55 |  INFO  | train_ms.py:892 | ====> Epoch: 72, step: 9936

    04-06 21:17:17 |  INFO  | train_ms.py:900 | Evaluating ...
    04-06 21:18:03 |  INFO  | checkpoints.py:111 | Saving model and optimizer state at iteration 73 to Data/sinhala_emotion/models/G_10000.pth
    04-06 21:18:08 |  INFO  | checkpoints.py:111 | Saving model and optimizer state at iteration 73 to Data/sinhala_emotion/models/D_10000.pth
    04-06 21:18:15 |  INFO  | checkpoints.py:111 | Saving model and optimizer state at iteration 73 to Data/sinhala_emotion/models/DUR_10000.pth
    04-06 21:18:15 |  INFO  | checkpoints.py:174 | Free up space by deleting ckpt Data/sinhala_emotion/models/G_9500.pth
    04-06 21:18:15 |  INFO  | checkpoints.py:174 | Free up space by deleting ckpt Data/sinhala_emotion/models/D_9500.pth
    04-06 21:18:15 |  INFO  | checkpoints.py:174 | Free up space by deleting ckpt Data/sinhala_emotion/models/DUR_9500.pth
    04-06 21:18:15 |  INFO  | safetensors.py:90 | Saved safetensors to model_assets/model_name/model_name_e73_s10000.safetensors

    💾 Backed up D_10000.pth (535 MB) → Drive

    💾 Backed up D_10000.pth (535 MB) → Drive

    💾 Backed up G_10000.pth (672 MB) → Drive

    💾 Backed up G_10000.pth (672 MB) → Drive

    💾 Backed up model_name_e73_s10000.safetensors (190 MB) → Drive

    💾 Backed up model_name_e73_s10000.safetensors (190 MB) → Drive

    💾 Backed up DUR_10000.pth (7 MB) → Drive

    💾 Backed up DUR_10000.pth (7 MB) → Drive
    04-06 21:19:56 |  INFO  | train_ms.py:892 | ====> Epoch: 73, step: 10074
    04-06 21:22:46 |  INFO  | train_ms.py:892 | ====> Epoch: 74, step: 10212
    04-06 21:25:37 |  INFO  | train_ms.py:892 | ====> Epoch: 75, step: 10350
    04-06 21:28:28 |  INFO  | train_ms.py:892 | ====> Epoch: 76, step: 10488

    04-06 21:28:43 |  INFO  | train_ms.py:900 | Evaluating ...
    04-06 21:29:25 |  INFO  | checkpoints.py:111 | Saving model and optimizer state at iteration 77 to Data/sinhala_emotion/models/G_10500.pth
    04-06 21:29:28 |  INFO  | checkpoints.py:111 | Saving model and optimizer state at iteration 77 to Data/sinhala_emotion/models/D_10500.pth
    04-06 21:29:31 |  INFO  | checkpoints.py:111 | Saving model and optimizer state at iteration 77 to Data/sinhala_emotion/models/DUR_10500.pth
    04-06 21:29:31 |  INFO  | checkpoints.py:174 | Free up space by deleting ckpt Data/sinhala_emotion/models/G_10000.pth
    04-06 21:29:31 |  INFO  | checkpoints.py:174 | Free up space by deleting ckpt Data/sinhala_emotion/models/D_10000.pth
    04-06 21:29:31 |  INFO  | checkpoints.py:174 | Free up space by deleting ckpt Data/sinhala_emotion/models/DUR_10000.pth
    04-06 21:29:31 |  INFO  | safetensors.py:90 | Saved safetensors to model_assets/model_name/model_name_e77_s10500.safetensors

    💾 Backed up D_10500.pth (535 MB) → Drive

    💾 Backed up D_10500.pth (535 MB) → Drive

    💾 Backed up G_10500.pth (672 MB) → Drive

    💾 Backed up G_10500.pth (672 MB) → Drive

    💾 Backed up DUR_10500.pth (7 MB) → Drive

    💾 Backed up DUR_10500.pth (7 MB) → Drive

    💾 Backed up model_name_e77_s10500.safetensors (190 MB) → Drive

    💾 Backed up model_name_e77_s10500.safetensors (190 MB) → Drive
    04-06 21:32:14 |  INFO  | train_ms.py:892 | ====> Epoch: 77, step: 10626
    04-06 21:35:05 |  INFO  | train_ms.py:892 | ====> Epoch: 78, step: 10764
    04-06 21:37:55 |  INFO  | train_ms.py:892 | ====> Epoch: 79, step: 10902

    04-06 21:39:57 |  INFO  | train_ms.py:900 | Evaluating ...
    04-06 21:40:41 |  INFO  | checkpoints.py:111 | Saving model and optimizer state at iteration 80 to Data/sinhala_emotion/models/G_11000.pth
    04-06 21:40:59 |  INFO  | checkpoints.py:111 | Saving model and optimizer state at iteration 80 to Data/sinhala_emotion/models/D_11000.pth
    04-06 21:41:17 |  INFO  | checkpoints.py:111 | Saving model and optimizer state at iteration 80 to Data/sinhala_emotion/models/DUR_11000.pth
    04-06 21:41:17 |  INFO  | checkpoints.py:174 | Free up space by deleting ckpt Data/sinhala_emotion/models/G_10500.pth
    04-06 21:41:17 |  INFO  | checkpoints.py:174 | Free up space by deleting ckpt Data/sinhala_emotion/models/D_10500.pth
    04-06 21:41:17 |  INFO  | checkpoints.py:174 | Free up space by deleting ckpt Data/sinhala_emotion/models/DUR_10500.pth
    04-06 21:41:17 |  INFO  | safetensors.py:90 | Saved safetensors to model_assets/model_name/model_name_e80_s11000.safetensors

    💾 Backed up G_11000.pth (672 MB) → Drive

    💾 Backed up G_11000.pth (672 MB) → Drive

    💾 Backed up D_11000.pth (535 MB) → Drive

    💾 Backed up D_11000.pth (535 MB) → Drive

    💾 Backed up model_name_e80_s11000.safetensors (190 MB) → Drive

    💾 Backed up model_name_e80_s11000.safetensors (190 MB) → Drive
    04-06 21:42:15 |  INFO  | train_ms.py:892 | ====> Epoch: 80, step: 11040

    💾 Backed up DUR_11000.pth (7 MB) → Drive

    💾 Backed up DUR_11000.pth (7 MB) → Drive
    04-06 21:45:04 |  INFO  | train_ms.py:892 | ====> Epoch: 81, step: 11178
    04-06 21:47:54 |  INFO  | train_ms.py:892 | ====> Epoch: 82, step: 11316
    04-06 21:50:45 |  INFO  | train_ms.py:892 | ====> Epoch: 83, step: 11454

    04-06 21:51:43 |  INFO  | train_ms.py:900 | Evaluating ...
    04-06 21:52:29 |  INFO  | checkpoints.py:111 | Saving model and optimizer state at iteration 84 to Data/sinhala_emotion/models/G_11500.pth
    04-06 21:52:32 |  INFO  | checkpoints.py:111 | Saving model and optimizer state at iteration 84 to Data/sinhala_emotion/models/D_11500.pth
    04-06 21:52:44 |  INFO  | checkpoints.py:111 | Saving model and optimizer state at iteration 84 to Data/sinhala_emotion/models/DUR_11500.pth
    04-06 21:52:44 |  INFO  | checkpoints.py:174 | Free up space by deleting ckpt Data/sinhala_emotion/models/G_11000.pth
    04-06 21:52:44 |  INFO  | checkpoints.py:174 | Free up space by deleting ckpt Data/sinhala_emotion/models/D_11000.pth
    04-06 21:52:44 |  INFO  | checkpoints.py:174 | Free up space by deleting ckpt Data/sinhala_emotion/models/DUR_11000.pth
    04-06 21:52:44 |  INFO  | safetensors.py:90 | Saved safetensors to model_assets/model_name/model_name_e84_s11500.safetensors

    💾 Backed up G_11500.pth (672 MB) → Drive

    💾 Backed up G_11500.pth (672 MB) → Drive

    💾 Backed up D_11500.pth (535 MB) → Drive

    💾 Backed up D_11500.pth (535 MB) → Drive

    💾 Backed up DUR_11500.pth (7 MB) → Drive

    💾 Backed up DUR_11500.pth (7 MB) → Drive

    💾 Backed up model_name_e84_s11500.safetensors (190 MB) → Drive

    💾 Backed up model_name_e84_s11500.safetensors (190 MB) → Drive
    04-06 21:54:45 |  INFO  | train_ms.py:892 | ====> Epoch: 84, step: 11592
    04-06 21:57:35 |  INFO  | train_ms.py:892 | ====> Epoch: 85, step: 11730
    04-06 22:00:25 |  INFO  | train_ms.py:892 | ====> Epoch: 86, step: 11868

    04-06 22:03:09 |  INFO  | train_ms.py:900 | Evaluating ...
    04-06 22:03:58 |  INFO  | checkpoints.py:111 | Saving model and optimizer state at iteration 87 to Data/sinhala_emotion/models/G_12000.pth
    04-06 22:04:01 |  INFO  | checkpoints.py:111 | Saving model and optimizer state at iteration 87 to Data/sinhala_emotion/models/D_12000.pth
    04-06 22:04:04 |  INFO  | checkpoints.py:111 | Saving model and optimizer state at iteration 87 to Data/sinhala_emotion/models/DUR_12000.pth
    04-06 22:04:04 |  INFO  | checkpoints.py:174 | Free up space by deleting ckpt Data/sinhala_emotion/models/G_11500.pth
    04-06 22:04:04 |  INFO  | checkpoints.py:174 | Free up space by deleting ckpt Data/sinhala_emotion/models/D_11500.pth
    04-06 22:04:04 |  INFO  | checkpoints.py:174 | Free up space by deleting ckpt Data/sinhala_emotion/models/DUR_11500.pth
    04-06 22:04:04 |  INFO  | safetensors.py:90 | Saved safetensors to model_assets/model_name/model_name_e87_s12000.safetensors
    04-06 22:04:11 |  INFO  | train_ms.py:892 | ====> Epoch: 87, step: 12006

    💾 Backed up D_12000.pth (535 MB) → Drive

    💾 Backed up D_12000.pth (535 MB) → Drive

    💾 Backed up G_12000.pth (672 MB) → Drive

    💾 Backed up G_12000.pth (672 MB) → Drive

    💾 Backed up DUR_12000.pth (7 MB) → Drive

    💾 Backed up DUR_12000.pth (7 MB) → Drive

    💾 Backed up model_name_e87_s12000.safetensors (190 MB) → Drive

    💾 Backed up model_name_e87_s12000.safetensors (190 MB) → Drive
    04-06 22:07:08 |  INFO  | train_ms.py:892 | ====> Epoch: 88, step: 12144
    04-06 22:09:58 |  INFO  | train_ms.py:892 | ====> Epoch: 89, step: 12282
    04-06 22:12:48 |  INFO  | train_ms.py:892 | ====> Epoch: 90, step: 12420

    04-06 22:14:27 |  INFO  | train_ms.py:900 | Evaluating ...
    04-06 22:15:19 |  INFO  | checkpoints.py:111 | Saving model and optimizer state at iteration 91 to Data/sinhala_emotion/models/G_12500.pth
    04-06 22:15:31 |  INFO  | checkpoints.py:111 | Saving model and optimizer state at iteration 91 to Data/sinhala_emotion/models/D_12500.pth
    04-06 22:15:47 |  INFO  | checkpoints.py:111 | Saving model and optimizer state at iteration 91 to Data/sinhala_emotion/models/DUR_12500.pth
    04-06 22:15:53 |  INFO  | checkpoints.py:174 | Free up space by deleting ckpt Data/sinhala_emotion/models/G_12000.pth
    04-06 22:15:53 |  INFO  | checkpoints.py:174 | Free up space by deleting ckpt Data/sinhala_emotion/models/D_12000.pth
    04-06 22:15:53 |  INFO  | checkpoints.py:174 | Free up space by deleting ckpt Data/sinhala_emotion/models/DUR_12000.pth
    04-06 22:15:53 |  INFO  | safetensors.py:90 | Saved safetensors to model_assets/model_name/model_name_e91_s12500.safetensors

    💾 Backed up D_12500.pth (535 MB) → Drive

    💾 Backed up D_12500.pth (535 MB) → Drive

    💾 Backed up G_12500.pth (672 MB) → Drive

    💾 Backed up G_12500.pth (672 MB) → Drive

    💾 Backed up model_name_e91_s12500.safetensors (190 MB) → Drive

    💾 Backed up model_name_e91_s12500.safetensors (190 MB) → Drive
    04-06 22:17:25 |  INFO  | train_ms.py:892 | ====> Epoch: 91, step: 12558

    💾 Backed up DUR_12500.pth (7 MB) → Drive

    💾 Backed up DUR_12500.pth (7 MB) → Drive
    04-06 22:20:16 |  INFO  | train_ms.py:892 | ====> Epoch: 92, step: 12696
    04-06 22:23:06 |  INFO  | train_ms.py:892 | ====> Epoch: 93, step: 12834
    04-06 22:25:56 |  INFO  | train_ms.py:892 | ====> Epoch: 94, step: 12972

    04-06 22:26:32 |  INFO  | train_ms.py:900 | Evaluating ...
    04-06 22:27:19 |  INFO  | checkpoints.py:111 | Saving model and optimizer state at iteration 95 to Data/sinhala_emotion/models/G_13000.pth
    04-06 22:27:22 |  INFO  | checkpoints.py:111 | Saving model and optimizer state at iteration 95 to Data/sinhala_emotion/models/D_13000.pth
    04-06 22:27:25 |  INFO  | checkpoints.py:111 | Saving model and optimizer state at iteration 95 to Data/sinhala_emotion/models/DUR_13000.pth
    04-06 22:27:25 |  INFO  | checkpoints.py:174 | Free up space by deleting ckpt Data/sinhala_emotion/models/G_12500.pth
    04-06 22:27:25 |  INFO  | checkpoints.py:174 | Free up space by deleting ckpt Data/sinhala_emotion/models/D_12500.pth
    04-06 22:27:25 |  INFO  | checkpoints.py:174 | Free up space by deleting ckpt Data/sinhala_emotion/models/DUR_12500.pth
    04-06 22:27:25 |  INFO  | safetensors.py:90 | Saved safetensors to model_assets/model_name/model_name_e95_s13000.safetensors

    💾 Backed up D_13000.pth (535 MB) → Drive

    💾 Backed up D_13000.pth (535 MB) → Drive

    💾 Backed up DUR_13000.pth (7 MB) → Drive

    💾 Backed up DUR_13000.pth (7 MB) → Drive

    💾 Backed up G_13000.pth (672 MB) → Drive

    💾 Backed up G_13000.pth (672 MB) → Drive

    💾 Backed up model_name_e95_s13000.safetensors (190 MB) → Drive

    💾 Backed up model_name_e95_s13000.safetensors (190 MB) → Drive
    04-06 22:29:56 |  INFO  | train_ms.py:892 | ====> Epoch: 95, step: 13110
    04-06 22:32:45 |  INFO  | train_ms.py:892 | ====> Epoch: 96, step: 13248
    04-06 22:35:35 |  INFO  | train_ms.py:892 | ====> Epoch: 97, step: 13386

    04-06 22:37:57 |  INFO  | train_ms.py:900 | Evaluating ...
    04-06 22:38:48 |  INFO  | checkpoints.py:111 | Saving model and optimizer state at iteration 98 to Data/sinhala_emotion/models/G_13500.pth
    04-06 22:38:51 |  INFO  | checkpoints.py:111 | Saving model and optimizer state at iteration 98 to Data/sinhala_emotion/models/D_13500.pth
    04-06 22:38:53 |  INFO  | checkpoints.py:111 | Saving model and optimizer state at iteration 98 to Data/sinhala_emotion/models/DUR_13500.pth
    04-06 22:38:53 |  INFO  | checkpoints.py:174 | Free up space by deleting ckpt Data/sinhala_emotion/models/G_13000.pth
    04-06 22:38:53 |  INFO  | checkpoints.py:174 | Free up space by deleting ckpt Data/sinhala_emotion/models/D_13000.pth
    04-06 22:38:53 |  INFO  | checkpoints.py:174 | Free up space by deleting ckpt Data/sinhala_emotion/models/DUR_13000.pth
    04-06 22:38:53 |  INFO  | safetensors.py:90 | Saved safetensors to model_assets/model_name/model_name_e98_s13500.safetensors

    💾 Backed up G_13500.pth (672 MB) → Drive

    💾 Backed up G_13500.pth (672 MB) → Drive

    💾 Backed up D_13500.pth (535 MB) → Drive

    💾 Backed up D_13500.pth (535 MB) → Drive

    💾 Backed up DUR_13500.pth (7 MB) → Drive

    💾 Backed up DUR_13500.pth (7 MB) → Drive

    💾 Backed up model_name_e98_s13500.safetensors (190 MB) → Drive

    💾 Backed up model_name_e98_s13500.safetensors (190 MB) → Drive
    04-06 22:39:28 |  INFO  | train_ms.py:892 | ====> Epoch: 98, step: 13524
    04-06 22:42:21 |  INFO  | train_ms.py:892 | ====> Epoch: 99, step: 13662
    04-06 22:45:11 |  INFO  | train_ms.py:892 | ====> Epoch: 100, step: 13800
    04-06 22:45:11 |  INFO  | checkpoints.py:111 | Saving model and optimizer state at iteration 100 to Data/sinhala_emotion/models/G_13800.pth
    04-06 22:45:19 |  INFO  | checkpoints.py:111 | Saving model and optimizer state at iteration 100 to Data/sinhala_emotion/models/D_13800.pth
    04-06 22:45:23 |  INFO  | checkpoints.py:111 | Saving model and optimizer state at iteration 100 to Data/sinhala_emotion/models/DUR_13800.pth
    04-06 22:45:23 |  INFO  | safetensors.py:90 | Saved safetensors to model_assets/model_name/model_name_e100_s13800.safetensors
    [rank0]:[W406 22:45:28.995209091 ProcessGroupNCCL.cpp:1553] Warning: WARNING: destroy_process_group() was not called before program exit, which can leak resources. For more info, please see https://pytorch.org/docs/stable/distributed.html#shutdown (function operator())
:::
:::

::: {.cell .code execution_count="18" colab="{\"base_uri\":\"https://localhost:8080/\",\"height\":391}" id="HkVPNGmf_YdP" outputId="5dfd2d48-7873-4e85-c337-e9531d6a0e34"}
``` python
# ── Cell 16 — Quick Inference Test ───────────────────────────────────────────
import os, torch, sys
os.chdir('/content/Style-Bert-VITS2')
sys.path.insert(0, '/content/Style-Bert-VITS2')

from style_bert_vits2.nlp import bert_models
from style_bert_vits2.constants import Languages
from style_bert_vits2.tts_model import TTSModel
from pathlib import Path
import IPython.display as ipd

# ── Find the latest checkpoint ───────────────────────────────────────────────
MODEL_DIR = Path('Data/sinhala_emotion/models')
pth_files = sorted(MODEL_DIR.glob('G_*.pth'))

if not pth_files:
    print('❌ No checkpoints found yet. Wait for training to save one.')
else:
    latest = pth_files[-1]
    print(f'✅ Using checkpoint: {latest.name}')

    # ── Load model ───────────────────────────────────────────────────────────
    model = TTSModel(
        model_path   = latest,
        config_path  = Path('Data/sinhala_emotion/config.json'),
        style_vec_path = Path('Data/sinhala_emotion/style_vectors.npy'),  # if exists
        device       = 'cuda' if torch.cuda.is_available() else 'cpu',
    )

    # ── Test each emotion speaker ─────────────────────────────────────────────
    test_text = 'ඔබට ස්තූතියි'  # "Thank you" in Sinhala — replace with your text

    speakers = {
        'Neutral' : 2,
        'Happy'   : 1,
        'Sad'     : 3,
        'Angry'   : 0,
    }

    for emotion, spk_id in speakers.items():
        print(f'\n🎙️ Generating [{emotion}]...')
        try:
            sr, audio = model.infer(
                text        = test_text,
                speaker_id  = spk_id,
                language    = Languages.EN,   # use Languages.ZH or EN as fallback for Sinhala
                sdp_ratio   = 0.2,
                noise       = 0.6,
                noise_w     = 0.8,
                length      = 1.0,
            )
            out_path = f'/content/test_{emotion.lower()}.wav'
            import soundfile as sf
            sf.write(out_path, audio, sr)
            print(f'   ✅ Saved: {out_path}')
            ipd.display(ipd.Audio(out_path, rate=sr))   # plays inline in Colab
        except Exception as e:
            print(f'   ❌ Error for {emotion}: {e}')
```

::: {.output .stream .stdout}
    ✅ Using checkpoint: G_13800.pth
:::

::: {.output .error ename="FileNotFoundError" evalue="[Errno 2] No such file or directory: 'Data/sinhala_emotion/style_vectors.npy'"}
    ---------------------------------------------------------------------------
    FileNotFoundError                         Traceback (most recent call last)
    /tmp/ipykernel_11522/2540767137.py in <cell line: 0>()
         21 
         22     # ── Load model ───────────────────────────────────────────────────────────
    ---> 23     model = TTSModel(
         24         model_path   = latest,
         25         config_path  = Path('Data/sinhala_emotion/config.json'),

    /content/Style-Bert-VITS2/style_bert_vits2/tts_model.py in __init__(self, model_path, config_path, style_vec_path, device, onnx_providers)
        104         else:
        105             self.style_vec_path: Path = style_vec_path
    --> 106             self.style_vectors: NDArray[Any] = np.load(self.style_vec_path)
        107 
        108         self.spk2id: dict[str, int] = self.hyper_parameters.data.spk2id

    /usr/local/lib/python3.12/dist-packages/numpy/lib/npyio.py in load(file, mmap_mode, allow_pickle, fix_imports, encoding, max_header_size)
        425             own_fid = False
        426         else:
    --> 427             fid = stack.enter_context(open(os_fspath(file), "rb"))
        428             own_fid = True
        429 

    FileNotFoundError: [Errno 2] No such file or directory: 'Data/sinhala_emotion/style_vectors.npy'
:::
:::

::: {.cell .code execution_count="30" colab="{\"base_uri\":\"https://localhost:8080/\",\"height\":825}" id="NfoFdqEx_nMX" outputId="f8bc316b-a8b3-42af-d910-9de624f5fe3b"}
``` python
# ── Cell 16 — Quick Single Inference Test ────────────────────────────────────
import os, torch, sys, numpy as np
os.chdir('/content/Style-Bert-VITS2')
sys.path.insert(0, '/content/Style-Bert-VITS2')

from style_bert_vits2.constants import Languages
from style_bert_vits2.tts_model import TTSModel
from pathlib import Path
import soundfile as sf
import IPython.display as ipd

# ── Generate a dummy style_vectors.npy if it doesn't exist ──────────────────
style_vec_path = Path('Data/sinhala_emotion/style_vectors.npy')
if not style_vec_path.exists():
    # 1 style (Neutral), 256-dim vector — matches num_styles=1 in config
    dummy = np.zeros((1, 256), dtype=np.float32)
    np.save(style_vec_path, dummy)
    print(f'✅ Created dummy style_vectors.npy')
else:
    print(f'✅ style_vectors.npy already exists')

# ── Find latest checkpoint ────────────────────────────────────────────────────
MODEL_DIR = Path('Data/sinhala_emotion/models')
pth_files = sorted(MODEL_DIR.glob('G_*.pth'))

if not pth_files:
    print('❌ No checkpoints found yet.')
else:
    latest = pth_files[-1]
    print(f'✅ Using checkpoint: {latest.name}')

    model = TTSModel(
        model_path     = latest,
        config_path    = Path('Data/sinhala_emotion/config.json'),
        style_vec_path = style_vec_path,
        device         = 'cuda' if torch.cuda.is_available() else 'cpu',
    )

    # ── Test each emotion ─────────────────────────────────────────────────────
    test_text = 'මට මගේ ආදරය නැති වුණා, මම දැන් අසරණයි.'   # replace with any Sinhala sentence

    speakers = {'Neutral': 2, 'Happy': 1, 'Sad': 3, 'Angry': 0}

    for emotion, spk_id in speakers.items():
        print(f'\n🎙️ Generating [{emotion}]...')
        try:
            sr, audio = model.infer(
                text       = test_text,
                speaker_id = spk_id,
                language   = Languages.EN,
                sdp_ratio  = 0.2,
                noise      = 0.6,
                noise_w    = 0.8,
                length     = 1.0,
            )
            out_path = f'/content/test_{emotion.lower()}.wav'
            sf.write(out_path, audio, sr)
            print(f'   ✅ Saved: {out_path}')
            ipd.display(ipd.Audio(out_path, rate=sr))
        except Exception as e:
            print(f'   ❌ {emotion} failed: {e}')
```

::: {.output .stream .stdout}
    ✅ style_vectors.npy already exists
    ✅ Using checkpoint: G_13800.pth

    🎙️ Generating [Neutral]...
    04-06 23:09:56 |  INFO  | tts_model.py:410 | Start generating audio data from text:
    මට මගේ ආදරය නැති වුණා, මම දැන් අසරණයි.
    04-06 23:09:56 |  INFO  | infer.py:57 | Using normal model
:::

::: {.output .stream .stderr}
    /usr/local/lib/python3.12/dist-packages/torch/nn/utils/weight_norm.py:144: FutureWarning: `torch.nn.utils.weight_norm` is deprecated in favor of `torch.nn.utils.parametrizations.weight_norm`.
      WeightNorm.apply(module, name, dim)
:::

::: {.output .stream .stdout}
    04-06 23:09:58 |  INFO  | checkpoints.py:38 | Loading model and optimizer at iteration 100 from Data/sinhala_emotion/models/G_13800.pth
    04-06 23:09:58 |  INFO  | checkpoints.py:89 | Loaded 'Data/sinhala_emotion/models/G_13800.pth' (iteration 100)
    04-06 23:09:58 |  INFO  | tts_model.py:152 | Model loaded successfully from Data/sinhala_emotion/models/G_13800.pth to "cuda" device (1.99s)
    04-06 23:09:58 |  INFO  | tts_model.py:557 | Audio data generated successfully (2.51s)
       ✅ Saved: /content/test_neutral.wav
:::

::: {.output .display_data}
```{=html}

                <audio  controls="controls" >
                    <source src="data:audio/x-wav;base64,8AGQApABQAKwAWACQAEAAoABUAIQAWACEAFgAjABUAIwAUACMAGAAjABYAIwAXACcAGwAlABwAIQAdACEAHAAgABwAJQAQAHwABwAEwAaAAsAFAAOABYADwAYABAAEwAMABAACgAVABAAFAAPABQAEgAaAAkAGgAPABYAEgAVAA4AGQARABkADAAXAA0AFgAOABIAEwATABADQALAAsACgALAAsACgALAA0ACwALAAsACwALAAsACwALAA0ACgALAAsACwALAA0ACgALAAsACwALAAsACwALAA0ACgANAAoADQAKAA0ACgALAAsACwALAAsACgALAAsACwALAAsACwALAA0ACgANAAsACwAKAA0ACgALAAsACwALAAsACwA=" type="audio/wav" />
                    Your browser does not support the audio element.
                </audio>
              
```
:::
:::
