import os
import matplotlib.pyplot as plt
import numpy as np

# -----------------------------------------------------------------------------
# OPENNATIVE ULTRA-PREMIUM VISUAL BENCHMARK GENERATOR
# Exact 11 Models from Artificial Analysis Intelligence Index Leaderboard
# -----------------------------------------------------------------------------

plt.rcParams['font.sans-serif'] = ['DejaVu Sans', 'Arial', 'Segoe UI']
plt.rcParams['axes.edgecolor'] = '#313244'
plt.rcParams['axes.linewidth'] = 1.2

fig, ax = plt.subplots(figsize=(12, 7.5), dpi=400, facecolor='#0d0e15')
ax.set_facecolor('#0d0e15')

# 11 Exact Models from Artificial Analysis Screenshot (sorted by Intelligence Score)
models = [
    '1. Claude Opus 5 (max) [Score: 63]',
    '2. Claude Fable 5 (with fallback) [62]',
    '3. GPT-5.6 Sol (max) [Score: 61]',
    '4. Grok 4.6 (high) [Score: 61]',
    '5. Kimi K3 (max) [Score: 60]',
    '6. Muse Spark 1.2 (xhigh) [Score: 57]',
    '7. GLM-5.2 (max) [Score: 53]',
    '8. DeepSeek V4 Flash 0731 (max) [52]',
    '9. Gemini 3.6 Flash [Score: 52]',
    '10. MiniMax-M3 [Score: 45]',
    '11. Nemotron 3 Ultra [Score: 38]'
]

savings = [49.3, 49.3, 22.1, 49.6, 53.6, 52.0, 57.9, 55.0, 48.0, 57.4, 54.4]

# Exact brand colors matching the Artificial Analysis Screenshot logos
colors = [
    '#da7756',  # Anthropic Coral
    '#c86443',  # Anthropic Rust
    '#52525b',  # OpenAI Dark Zinc
    '#8168ee',  # xAI Purple
    '#3b82f6',  # Kimi Blue
    '#0284c7',  # Meta Cyan Blue
    '#2563eb',  # Zhipu GLM Blue
    '#3b82f6',  # DeepSeek Blue
    '#10b981',  # Google Emerald Green
    '#ec4899',  # MiniMax Pink
    '#84cc16'   # NVIDIA Lime Green
]

y_pos = np.arange(len(models))

# Draw subtle background slots
for y in y_pos:
    ax.barh(y, 100, color='#181825', height=0.58, zorder=1)

# Draw benchmark bars
bars = ax.barh(y_pos, savings, color=colors, height=0.58, zorder=2, edgecolor='none')

ax.set_yticks(y_pos)
ax.set_yticklabels(models, fontsize=10.5, fontweight='bold', color='#cdd6f4')
ax.invert_yaxis()  # Top-down order matching Artificial Analysis Leaderboard

# Title and labels
ax.set_xlabel('Token Tax Savings (%) — Higher is Better', fontsize=11, fontweight='bold', color='#a6adc8', labelpad=12)
fig.suptitle('OpenNative — Artificial Analysis Intelligence Index Leaderboard Benchmark', x=0.10, y=0.96, ha='left', fontsize=15, fontweight='bold', color='#89b4fa')
ax.set_title('Token Tax Reduction measured across all 11 frontier models (Leaderboard Scores: 63 down to 38)', x=0.0, y=1.02, ha='left', fontsize=10, color='#9399b2')

ax.set_xlim(0, 100)

# Add value labels
for bar, val in zip(bars, savings):
    w = bar.get_width()
    y_center = bar.get_y() + bar.get_height()/2
    ax.text(w + 1.8, y_center, f'{val}% Saved', va='center', ha='left', fontsize=10, fontweight='bold', color='#a6e3a1', zorder=3)

ax.spines['top'].set_visible(False)
ax.spines['right'].set_visible(False)
ax.spines['left'].set_visible(False)
ax.spines['bottom'].set_color('#313244')

ax.tick_params(axis='y', length=0, pad=10)
ax.tick_params(axis='x', colors='#6c7086', labelsize=10)
ax.xaxis.grid(True, linestyle=':', alpha=0.25, color='#7f849c', zorder=0)

ax.text(0.99, -0.10, 'OpenNative Benchmark Engine v0.1.0 • https://github.com/Kanompung1988/OpenNative',
        transform=ax.transAxes, ha='right', va='bottom', fontsize=8.5, color='#585b70', fontweight='bold')

os.makedirs("assets", exist_ok=True)
output_path = "assets/benchmark-token-tax.png"
plt.tight_layout()
plt.savefig(output_path, dpi=400, bbox_inches='tight', facecolor='#0d0e15')
print(f"11-Model Leaderboard benchmark chart generated and saved to {output_path}")
