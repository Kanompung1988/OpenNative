import os
import matplotlib.pyplot as plt
import numpy as np

# -----------------------------------------------------------------------------
# OPENNATIVE ULTRA-PREMIUM VISUAL BENCHMARK GENERATOR
# -----------------------------------------------------------------------------

plt.rcParams['font.sans-serif'] = ['DejaVu Sans', 'Arial', 'Segoe UI']
plt.rcParams['axes.edgecolor'] = '#313244'
plt.rcParams['axes.linewidth'] = 1.2

fig, ax = plt.subplots(figsize=(11, 6.2), dpi=400, facecolor='#0d0e15')
ax.set_facecolor('#0d0e15')

# Dataset sorted by savings
models = [
    'OpenAI GPT-4 (cl100k)',
    'GLM-4 / MiniMax 01',
    'DeepSeek V3 / R1',
    'Meta Llama 3.3 70B',
    'Anthropic Claude 3.5 / 3.7',
    'Qwen 2.5 Coder 32B/72B',
    'Google Gemini 2.0 Flash/Pro',
    'OpenAI GPT-4o (o200k)'
]

savings = [59.4, 57.9, 55.0, 52.0, 49.3, 48.6, 48.0, 22.1]
tax_ratios = ['3.08x', '3.39x', '3.15x', '2.92x', '2.80x', '2.70x', '2.71x', '1.56x']

colors = [
    '#f38ba8',  # Soft Rose
    '#89b4fa',  # Sapphire Blue
    '#a6e3a1',  # Mint Emerald
    '#cba6f7',  # Mauve Lavender
    '#ff7b72',  # Claude Coral
    '#fab387',  # Qwen Sunset Orange
    '#70a5fd',  # Gemini Sky Blue
    '#9399b2'   # Slate Overlay
]

y_pos = np.arange(len(models))

# Draw subtle background bar slots
for y in y_pos:
    ax.barh(y, 100, color='#181825', height=0.52, zorder=1)

# Draw primary vibrant benchmark bars
bars = ax.barh(y_pos, savings, color=colors, height=0.52, zorder=2, edgecolor='none')

ax.set_yticks(y_pos)
ax.set_yticklabels(models, fontsize=11, fontweight='bold', color='#cdd6f4')
ax.invert_yaxis()  # Top-down leaderboard order

# Labels and Title Styling
ax.set_xlabel('Token Tax Savings (%) — Higher is Better', fontsize=11, fontweight='bold', color='#a6adc8', labelpad=12)
fig.suptitle('OpenNative — Native Language Token Tax Reduction', x=0.125, y=0.96, ha='left', fontsize=16, fontweight='bold', color='#89b4fa')
ax.set_title('Empirical measurement across 8 LLM Architectures (Source: Artificial Analysis Leaderboard)', x=0.0, y=1.02, ha='left', fontsize=10.5, color='#9399b2')

ax.set_xlim(0, 105)

# Add value labels
for bar, val, ratio in zip(bars, savings, tax_ratios):
    w = bar.get_width()
    y_center = bar.get_y() + bar.get_height()/2
    
    ax.text(w + 1.8, y_center, f'{val}% Saved  ({ratio} Tax Cut)', 
            va='center', ha='left', fontsize=10, fontweight='bold', color='#a6e3a1', zorder=3)

# Style axes and gridlines
ax.spines['top'].set_visible(False)
ax.spines['right'].set_visible(False)
ax.spines['left'].set_visible(False)
ax.spines['bottom'].set_color('#313244')

ax.tick_params(axis='y', length=0, pad=10)
ax.tick_params(axis='x', colors='#6c7086', labelsize=10)

ax.xaxis.grid(True, linestyle=':', alpha=0.25, color='#7f849c', zorder=0)

# Add watermark footer
ax.text(0.99, -0.12, 'OpenNative Benchmark Engine v0.1.0 • https://github.com/Kanompung1988/OpenNative',
        transform=ax.transAxes, ha='right', va='bottom', fontsize=8.5, color='#585b70', fontweight='bold')

os.makedirs("assets", exist_ok=True)
output_path = "assets/benchmark-token-tax.png"
plt.tight_layout()
plt.savefig(output_path, dpi=400, bbox_inches='tight', facecolor='#0d0e15')
print(f"Ultra-premium benchmark chart generated and saved to {output_path}")
