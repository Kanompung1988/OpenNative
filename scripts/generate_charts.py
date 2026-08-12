import os

try:
    import matplotlib.pyplot as plt
    import numpy as np
except ImportError:
    os.system("pip install matplotlib numpy")
    import matplotlib.pyplot as plt
    import numpy as np

# Dark theme styling matching Artificial Analysis & Catppuccin aesthetic
plt.style.use('dark_background')
fig, ax = plt.subplots(figsize=(10, 6), dpi=300)

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
colors = [
    '#f38ba8', # GPT-4
    '#89b4fa', # GLM-4
    '#a6e3a1', # DeepSeek
    '#f9e2af', # Llama
    '#b4befe', # Claude
    '#fab387', # Qwen
    '#89dceb', # Gemini
    '#cba6f7'  # GPT-4o
]

y_pos = np.arange(len(models))

bars = ax.barh(y_pos, savings, align='center', color=colors, height=0.55, edgecolor='none')
ax.set_yticks(y_pos)
ax.set_yticklabels(models, fontsize=11, fontweight='bold', color='#cdd6f4')
ax.invert_yaxis()  # top-down display

ax.set_xlabel('Average Token Savings (%)', fontsize=12, fontweight='bold', color='#cdd6f4', labelpad=10)
ax.set_title('OpenNative — Artificial Analysis Top LLM Leaderboard Token Tax Benchmark', fontsize=13, fontweight='bold', color='#89b4fa', pad=15)
ax.set_xlim(0, 100)

# Add value labels
for bar, val in zip(bars, savings):
    ax.text(bar.get_width() + 1.2, bar.get_y() + bar.get_height()/2, f'{val}% Saved',
            va='center', ha='left', fontsize=10, fontweight='bold', color='#a6e3a1')

ax.spines['top'].set_visible(False)
ax.spines['right'].set_visible(False)
ax.spines['left'].set_color('#45475a')
ax.spines['bottom'].set_color('#45475a')
ax.tick_params(colors='#bac2de')

ax.xaxis.grid(True, linestyle='--', alpha=0.2, color='#6c7086')

os.makedirs("assets", exist_ok=True)
output_path = "assets/benchmark-token-tax.png"
plt.tight_layout()
plt.savefig(output_path, dpi=300, bbox_inches='tight', transparent=False, facecolor='#11111b')
print(f"Artificial Analysis benchmark chart successfully saved to {output_path}")
