import os

try:
    import matplotlib.pyplot as plt
    import numpy as np
except ImportError:
    os.system("pip install matplotlib numpy")
    import matplotlib.pyplot as plt
    import numpy as np

# Set dark theme styling matching Ponytail & Catppuccin aesthetic
plt.style.use('dark_background')
fig, ax = plt.subplots(figsize=(10, 5), dpi=300)

models = ['GLM-4 / MiniMax', 'DeepSeek V3 / R1', 'Meta Llama 3.3', 'Qwen 2.5 Coder', 'GPT-4 (cl100k)', 'GPT-4o (o200k)']
savings = [73.3, 70.5, 67.9, 60.5, 48.7, 14.8]
colors = ['#89b4fa', '#a6e3a1', '#f9e2af', '#fab387', '#f38ba8', '#cba6f7']

y_pos = np.arange(len(models))

bars = ax.barh(y_pos, savings, align='center', color=colors, height=0.55, edgecolor='none')
ax.set_yticks(y_pos)
ax.set_yticklabels(models, fontsize=11, fontweight='bold', color='#cdd6f4')
ax.invert_yaxis()  # top-down

ax.set_xlabel('Token Savings (%)', fontsize=12, fontweight='bold', color='#cdd6f4', labelpad=10)
ax.set_title('OpenNative — Language Token Tax Reduction Across Tokenizers', fontsize=14, fontweight='bold', color='#89b4fa', pad=15)
ax.set_xlim(0, 100)

# Add value labels inside/outside bars
for bar, val in zip(bars, savings):
    ax.text(bar.get_width() + 1.5, bar.get_y() + bar.get_height()/2, f'{val}% Saved',
            va='center', ha='left', fontsize=10, fontweight='bold', color='#a6e3a1')

# Remove top and right spines
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
print(f"Chart successfully saved to {output_path}")
