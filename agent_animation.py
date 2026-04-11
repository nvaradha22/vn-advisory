import matplotlib.pyplot as plt
import networkx as nx
from matplotlib.animation import FuncAnimation

# Create directed graph
G = nx.DiGraph()

# Nodes
nodes = [
    "Data Input",
    "Scout Agent",
    "Analyst Agent",
    "Decision Engine",
    "Execution"
]

G.add_nodes_from(nodes)

# Edges (workflow)
edges = [
    ("Data Input", "Scout Agent"),
    ("Scout Agent", "Analyst Agent"),
    ("Analyst Agent", "Decision Engine"),
    ("Decision Engine", "Execution")
]

G.add_edges_from(edges)

# Fixed positions (clean layout)
pos = {
    "Data Input": (0, 0),
    "Scout Agent": (1, 1),
    "Analyst Agent": (2, 0),
    "Decision Engine": (3, 1),
    "Execution": (4, 0)
}

# Create figure
fig, ax = plt.subplots(figsize=(10, 5))

# Animation function
def update(frame):
    ax.clear()

    # Background
    fig.patch.set_facecolor("#0b0f14")
    ax.set_facecolor("#0b0f14")

    # Draw nodes
    nx.draw_networkx_nodes(
        G, pos,
        node_size=2500,
        node_color="#4da6ff",
        ax=ax
    )

    # Draw labels
    nx.draw_networkx_labels(
        G, pos,
        font_size=9,
        font_color="white",
        ax=ax
    )

    # Animate edges step by step
    current_edges = edges[:frame + 1]

    nx.draw_networkx_edges(
        G,
        pos,
        edgelist=current_edges,
        width=2,
        edge_color="cyan",
        arrows=True,
        ax=ax
    )

    # Title
    ax.set_title("AI Agent Workflow", color="white", fontsize=14)

    # Remove axis
    ax.axis("off")

# Create animation
ani = FuncAnimation(
    fig,
    update,
    frames=len(edges),
    interval=1000,
    repeat=True
)

# Save as GIF (no ffmpeg required)
ani.save("agent-animation.gif", writer="pillow", fps=1)

print("Animation created: agent-animation.gif")